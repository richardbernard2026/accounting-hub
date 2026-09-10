<script lang="ts">
	import SiteHeader from '$lib/components/ui/SiteHeader.svelte';
	import { chapterIndex } from '$lib/content';
	import { notes, isNote, type Note } from '$lib/notes/store.svelte';
	import { allMarkdown, chapterMarkdown, download, studySheetMarkdown } from '$lib/notes/markdown';
	import { chapters } from '$lib/content';
	const labels = chapterIndex.map((c) => ({ number: c.number, title: c.title }));
	const byChapter = $derived(labels.filter((c) => notes.notes.some((n) => n.chapter === c.number)));
	let copied = $state(false);
	let confirmClear = $state<number | null>(null);
	const KIND: Record<Note['kind'], string> = {
		term: 'Term',
		line: 'Line',
		state: 'State',
		own: 'Own words'
	};
	function exportAll() {
		download('accounting-notes.md', allMarkdown(labels, notes.notes));
	}
	async function copyAll() {
		try {
			await navigator.clipboard.writeText(allMarkdown(labels, notes.notes));
			copied = true;
			setTimeout(() => (copied = false), 1200);
		} catch {}
	}
	function studySheet(c: { number: number; title: string }) {
		const ch = chapters[c.number];
		const entries = (ch?.entryCards ?? []).map((e) => ({
			id: e.entry.id,
			explanation: e.entry.explanation,
			lines: e.entry.lines.map((l) => ({
				name: ch?.accounts?.find((a) => a.num === l.acct)?.name ?? l.acct,
				dr: l.dr,
				cr: l.cr
			}))
		}));
		download(
			`ch${String(c.number).padStart(2, '0')}-study-sheet.md`,
			studySheetMarkdown(c, notes.notes, entries)
		);
	}
	const LO_ORDER = (lo?: string) =>
		lo ? ['C', 'A', 'P'].indexOf(lo[0]) * 10 + Number(lo.slice(1) || 0) : 99;
	function byLo(list: Note[]): [string, Note[]][] {
		const groups = new Map<string, Note[]>();
		for (const n of [...list].sort((a, b) => LO_ORDER(a.source?.lo) - LO_ORDER(b.source?.lo))) {
			const k = n.source?.lo ?? 'Own';
			groups.set(k, [...(groups.get(k) ?? []), n]);
		}
		return [...groups.entries()];
	}
	function exportJson() {
		download('accounting-notes.json', JSON.stringify(notes.notes, null, 2), 'application/json');
	}
	async function importJson(e: Event) {
		const f = (e.target as HTMLInputElement).files?.[0];
		if (!f) return;
		try {
			const arr = JSON.parse(await f.text());
			if (Array.isArray(arr)) {
				const ids = new Set(notes.notes.map((n) => n.id));
				notes.replaceAll([
					...notes.notes,
					...arr.filter((n: unknown) => isNote(n) && !ids.has(n.id))
				]);
			}
		} catch {}
		(e.target as HTMLInputElement).value = '';
	}
</script>

<svelte:head><title>All notes · Accounting Hub</title></svelte:head>
<SiteHeader notesButton={false} />

<main class="mx-auto max-w-[900px] px-4 pb-24 sm:px-6">
	<div class="flex flex-wrap items-end justify-between gap-4 pt-8 pb-4">
		<div>
			<div class="eyebrow">Your notes · every chapter</div>
			<h1 class="mt-1 text-2xl sm:text-[2.5rem]">
				{notes.notes.length} note{notes.notes.length === 1 ? '' : 's'}
			</h1>
		</div>
		<div class="flex flex-wrap gap-2">
			<button class="btn text-sm" onclick={exportAll} disabled={notes.notes.length === 0}
				>Export all as Markdown</button
			>
			<button class="btn btn-quiet text-sm" onclick={copyAll} disabled={notes.notes.length === 0}
				>{copied ? 'Copied' : 'Copy'}</button
			>
			<a class="btn btn-quiet text-sm" href="/study">Study sheet (print)</a>
			<button class="btn btn-quiet text-sm" onclick={exportJson} disabled={notes.notes.length === 0}
				>Backup JSON</button
			>
			<label class="btn btn-quiet cursor-pointer text-sm"
				>Restore JSON<input
					type="file"
					accept="application/json"
					class="sr-only"
					onchange={importJson}
				/></label
			>
		</div>
	</div>
	<p class="text-ink-2 text-sm">
		Notes live in this browser only. Export before switching machines; the Markdown drops straight
		into NotebookLM.
	</p>

	{#if byChapter.length === 0}
		<p class="text-ink-3 mt-10">
			Nothing yet. Open <a class="underline" href="/ch/3">Chapter 3</a> and select a sentence.
		</p>
	{/if}
	{#each byChapter as c (c.number)}
		{@const mine = notes.forChapter(c.number)}
		<section class="border-rule mt-8 border-t pt-4">
			<div class="flex flex-wrap items-baseline justify-between gap-2">
				<h2 class="text-lg">
					<a href="/ch/{c.number}" class="underline-offset-4 hover:underline"
						>Chapter {c.number} · {c.title}</a
					> <span class="num text-ink-3 text-sm">{mine.length}</span>
				</h2>
				<div class="flex gap-2 text-xs">
					<button
						class="btn btn-quiet text-xs"
						onclick={() =>
							download(
								`ch${String(c.number).padStart(2, '0')}-notes.md`,
								`# Accounting notes\n\n${chapterMarkdown(c, notes.notes)}`
							)}>Export chapter</button
					>
					<button class="btn btn-quiet text-xs" onclick={() => studySheet(c)}>Study sheet</button>
					{#if confirmClear === c.number}
						<button
							class="btn text-xs"
							onclick={() => {
								notes.clearChapter(c.number);
								confirmClear = null;
							}}>Really delete {mine.length}</button
						>
						<button class="btn btn-quiet text-xs" onclick={() => (confirmClear = null)}>Keep</button
						>
					{:else}
						<button class="btn btn-quiet text-xs" onclick={() => (confirmClear = c.number)}
							>Clear chapter</button
						>
					{/if}
				</div>
			</div>
			{#each byLo(mine) as [lo, group] (lo)}
				<div class="mt-3 flex items-baseline gap-2">
					<span class="lo-tag">{lo}</span>
					<span class="text-ink-3 text-xs"
						>{chapters[c.number]?.objectives.find((o) => o.code === lo)?.text ?? ''}</span
					>
				</div>
				<ul class="divide-rule-2 divide-y">
					{#each group as n (n.id)}
						<li class="py-2.5 text-sm">
							<div class="eyebrow flex items-center justify-between gap-2">
								<span>{KIND[n.kind]}{n.source?.label ? ` · ${n.source.label}` : ''}</span>
								{#if n.source?.stop}<a
										class="text-ink-3 hover:text-ink tracking-normal normal-case underline underline-offset-2"
										href="/ch/{c.number}#{n.source.stop}">Back to the stop</a
									>{/if}
							</div>
							{#if n.kind === 'term'}
								<div class="mt-0.5">
									<span class="font-medium">{n.text}</span> <span class="text-ink-3">—</span>
									{n.body}
								</div>
								{#if n.book && n.origin !== 'book'}<p class="text-ink-3 mt-0.5 text-xs">
										Book: {n.book}
									</p>{/if}
							{:else if n.kind === 'line'}
								<blockquote class="border-rule mt-0.5 border-l-2 pl-2">{n.text}</blockquote>
								{#if n.body}<p class="text-ink-2 mt-0.5">{n.body}</p>{/if}
							{:else}
								<p class="mt-0.5">{n.text}</p>
								{#if n.data}<p class="num text-ink-3 mt-0.5 text-xs">
										{Object.entries(n.data)
											.map(([k, v]) => `${k}: ${v}`)
											.join(' · ')}
									</p>{/if}
							{/if}
						</li>
					{/each}
				</ul>
			{/each}
		</section>
	{/each}
</main>
