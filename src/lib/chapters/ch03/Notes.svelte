<script lang="ts">
	/** This chapter's notes, grouped by lesson, editable, with study-sheet and Markdown export. */
	import { notes, type Note } from '$lib/notes/store.svelte';
	import { chapterMarkdown, studySheetMarkdown, download } from '$lib/notes/markdown';
	import { chapter } from '$lib/content/chapters/ch03';

	const n = chapter.meta.number;
	const label = { number: n, title: chapter.meta.title };
	const mine = $derived(notes.forChapter(n));

	const KIND: Record<Note['kind'], string> = {
		term: 'Term',
		line: 'Line',
		state: 'State',
		own: 'Own words'
	};
	const LO_ORDER = (lo?: string) =>
		lo ? ['C', 'A', 'P'].indexOf(lo[0]) * 10 + Number(lo.slice(1) || 0) : 99;
	function byLo(list: Note[]): [string, Note[]][] {
		const groups = new Map<string, Note[]>();
		for (const note of [...list].sort((a, b) => LO_ORDER(a.source?.lo) - LO_ORDER(b.source?.lo))) {
			const k = note.source?.lo ?? 'Own';
			groups.set(k, [...(groups.get(k) ?? []), note]);
		}
		return [...groups.entries()];
	}

	let draft = $state('');
	let editing = $state<string | null>(null);
	let editText = $state('');
	let editBody = $state('');
	let copied = $state(false);
	let confirmClear = $state(false);

	function addOwn() {
		const t = draft.trim();
		if (!t) return;
		notes.add({ chapter: n, kind: 'own', text: t });
		draft = '';
	}
	function startEdit(note: Note) {
		editing = note.id;
		editText = note.text;
		editBody = note.body ?? '';
	}
	function commitEdit() {
		if (editing) notes.update(editing, { text: editText, body: editBody || undefined });
		editing = null;
	}
	function exportMd() {
		download(
			`ch${String(n).padStart(2, '0')}-notes.md`,
			`# Accounting notes\n\n${chapterMarkdown(label, notes.notes)}`
		);
	}
	async function copyMd() {
		try {
			await navigator.clipboard.writeText(chapterMarkdown(label, notes.notes));
			copied = true;
			setTimeout(() => (copied = false), 1200);
		} catch {}
	}
	function studySheet() {
		const entries = (chapter.entryCards ?? []).map((e) => ({
			id: e.entry.id,
			explanation: e.entry.explanation,
			lines: e.entry.lines.map((l) => ({
				name: chapter.accounts?.find((a) => a.num === l.acct)?.name ?? l.acct,
				dr: l.dr,
				cr: l.cr
			}))
		}));
		download(
			`ch${String(n).padStart(2, '0')}-study-sheet.md`,
			studySheetMarkdown(label, notes.notes, entries)
		);
	}
</script>

<div class="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
	<div class="flex flex-wrap items-end justify-between gap-4">
		<div>
			<div class="eyebrow">Notes · Chapter {n}</div>
			<h1 class="display mt-1">{mine.length} note{mine.length === 1 ? '' : 's'}</h1>
		</div>
		<div class="flex flex-wrap gap-2">
			<button class="btn text-sm" onclick={exportMd} disabled={mine.length === 0}
				>Export Markdown</button
			>
			<button class="btn btn-quiet text-sm" onclick={copyMd} disabled={mine.length === 0}
				>{copied ? 'Copied' : 'Copy'}</button
			>
			<button class="btn btn-quiet text-sm" onclick={studySheet} disabled={mine.length === 0}
				>Study sheet</button
			>
		</div>
	</div>
	<p class="text-ink-2 mt-2 text-sm">
		Notes live in this browser only. Export before switching machines.
	</p>

	<div class="border-rule-2 mt-8 border-t pt-6">
		<label class="text-ink-2 text-xs" for="own-note">In your own words</label>
		<textarea
			id="own-note"
			class="field mt-1 min-h-14 text-sm"
			bind:value={draft}
			placeholder="Something you figured out…"
			onkeydown={(e) => {
				if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) addOwn();
			}}></textarea>
		<div class="mt-2 flex items-center justify-between">
			<span class="text-ink-2 text-xs">⌘/Ctrl + Enter to save</span>
			<button class="btn text-xs" onclick={addOwn} disabled={!draft.trim()}>Save</button>
		</div>
	</div>

	{#if mine.length === 0}
		<div class="text-ink-2 py-16 text-center text-sm">
			<p>Nothing captured yet.</p>
			<p class="mt-2 text-pretty">
				Select a sentence in Learn, capture a key term in place, pin an instrument in Lab after you
				move it, or finish a drill in Practice and keep its takeaway.
			</p>
		</div>
	{:else}
		{#each byLo(mine) as [lo, group] (lo)}
			<div class="mt-8 flex items-baseline gap-2">
				<span class="lo-tag">{lo}</span>
				<span class="text-ink-2 text-xs"
					>{chapter.objectives.find((o) => o.code === lo)?.text ?? 'In your own words'}</span
				>
			</div>
			<ul class="divide-rule-2 mt-2 divide-y">
				{#each group as note (note.id)}
					<li
						class="py-3 {notes.lastSavedId === note.id
							? 'bg-mark/30'
							: ''} transition-colors duration-700"
					>
						<div class="flex items-center justify-between gap-2">
							<span class="eyebrow"
								>{KIND[note.kind]}{note.source?.label ? ` · ${note.source.label}` : ''}</span
							>
							<span class="flex items-center gap-2">
								{#if note.source?.href}<a
										class="text-ink-2 hover:text-ink text-xs underline underline-offset-2"
										href={note.source.href}>Back to this screen</a
									>{/if}
								{#if editing !== note.id}<button
										class="text-ink-2 hover:text-ink text-xs"
										onclick={() => startEdit(note)}>Edit</button
									>{/if}
								<button
									class="text-ink-2 hover:text-credit text-xs"
									onclick={() => notes.remove(note.id)}>Delete</button
								>
							</span>
						</div>
						{#if editing === note.id}
							<input class="field mt-1 text-sm" bind:value={editText} aria-label="Note text" />
							{#if note.kind !== 'own'}<textarea
									class="field mt-1 min-h-14 text-sm"
									bind:value={editBody}
									aria-label="Note body"></textarea>{/if}
							<div class="mt-1 flex gap-2">
								<button class="btn text-xs" onclick={commitEdit}>Done</button>
								<button class="btn btn-quiet text-xs" onclick={() => (editing = null)}
									>Cancel</button
								>
							</div>
						{:else if note.kind === 'term'}
							<div class="mt-0.5 text-sm">
								<span class="font-medium">{note.text}</span> <span class="text-ink-2">—</span>
								{note.body}
							</div>
							{#if note.book && note.origin !== 'book'}<p class="text-ink-2 mt-0.5 text-xs">
									Book: {note.book}
								</p>{/if}
						{:else if note.kind === 'line'}
							<blockquote class="border-rule mt-0.5 border-l-2 pl-2 text-sm">
								{note.text}
							</blockquote>
							{#if note.body}<p class="text-ink-2 mt-0.5 text-sm">{note.body}</p>{/if}
						{:else}
							<p class="mt-0.5 text-sm">{note.text}</p>
							{#if note.data}<p class="num text-ink-2 mt-0.5 text-xs">
									{Object.entries(note.data)
										.map(([k, v]) => `${k}: ${v}`)
										.join(' · ')}
								</p>{/if}
						{/if}
					</li>
				{/each}
			</ul>
		{/each}

		<div class="border-rule-2 mt-10 flex justify-end border-t pt-6">
			{#if confirmClear}
				<span class="text-ink-2 mr-2 self-center text-xs">Delete all {mine.length}?</span>
				<button
					class="btn btn-quiet text-xs"
					onclick={() => {
						notes.clearChapter(n);
						confirmClear = false;
					}}>Really delete</button
				>
				<button class="btn btn-quiet ml-2 text-xs" onclick={() => (confirmClear = false)}
					>Keep</button
				>
			{:else}
				<button class="btn btn-quiet text-xs" onclick={() => (confirmClear = true)}
					>Clear this chapter</button
				>
			{/if}
		</div>
	{/if}
</div>
