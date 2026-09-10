<script lang="ts">
	import { notes, type Note } from '$lib/notes/store.svelte';
	import { allMarkdown, chapterMarkdown, download } from '$lib/notes/markdown';
	import { chapterIndex } from '$lib/content';
	import { fly, fade } from 'svelte/transition';
	let { chapter, title }: { chapter: number; title: string } = $props();
	/** chapter 0 = every chapter (the home page). */
	const mine = $derived(chapter ? notes.forChapter(chapter) : notes.notes);
	const labels = chapterIndex.map((c) => ({ number: c.number, title: c.title }));
	const md = () =>
		chapter
			? `# Accounting notes\n\n${chapterMarkdown({ number: chapter, title }, notes.notes)}`
			: allMarkdown(labels, notes.notes);
	let draft = $state('');
	let editing = $state<string | null>(null);
	let editText = $state('');
	let editBody = $state('');
	let copied = $state(false);

	const KIND: Record<Note['kind'], string> = {
		term: 'Term',
		line: 'Line',
		state: 'State',
		own: 'Own words'
	};

	function addOwn() {
		const t = draft.trim();
		if (!t) return;
		notes.add({ chapter, kind: 'own', text: t });
		draft = '';
	}
	function startEdit(n: Note) {
		editing = n.id;
		editText = n.text;
		editBody = n.body ?? '';
	}
	function commitEdit() {
		if (editing) notes.update(editing, { text: editText, body: editBody || undefined });
		editing = null;
	}
	function exportMd() {
		download(
			chapter ? `ch${String(chapter).padStart(2, '0')}-notes.md` : 'accounting-notes.md',
			md()
		);
	}
	async function copyMd() {
		try {
			await navigator.clipboard.writeText(md());
			copied = true;
			setTimeout(() => (copied = false), 1200);
		} catch {
			/* clipboard blocked; the download still works */
		}
	}
	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape') notes.drawerOpen = false;
	}
	let closeBtn: HTMLButtonElement | undefined = $state();
	let opener: HTMLElement | null = null;
	$effect(() => {
		if (notes.drawerOpen) {
			opener = document.activeElement as HTMLElement | null;
			setTimeout(() => closeBtn?.focus(), 30);
		} else if (opener) {
			const back = document.getElementById('notes-toggle') ?? opener;
			opener = null;
			setTimeout(() => back?.focus(), 30);
		}
	});
</script>

<svelte:window onkeydown={onKey} />

{#if notes.drawerOpen}
	<button
		class="bg-ink/20 fixed inset-0 z-40 backdrop-blur-[1px]"
		aria-label="Close notes"
		onclick={() => (notes.drawerOpen = false)}
		transition:fade={{ duration: 150 }}
	></button>
	<aside
		class="border-rule bg-paper shadow-lift fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l"
		transition:fly={{ x: 40, duration: 220 }}
		aria-label={chapter ? `Notes for chapter ${chapter}` : 'All notes'}
	>
		<header class="border-rule flex items-start justify-between gap-3 border-b px-4 py-3">
			<div>
				<div class="eyebrow">
					{chapter ? `Notes · Chapter ${chapter}` : 'Notes · every chapter'}
				</div>
				<div class="font-serif text-lg leading-tight">{title}</div>
			</div>
			<button
				bind:this={closeBtn}
				class="btn btn-quiet text-xs"
				onclick={() => (notes.drawerOpen = false)}>Close</button
			>
		</header>

		{#if chapter}
			<div class="border-rule-2 border-b px-4 py-3">
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
					<span class="text-ink-3 text-xs">⌘/Ctrl + Enter to save</span>
					<button class="btn text-xs" onclick={addOwn} disabled={!draft.trim()}>Save</button>
				</div>
			</div>
		{/if}

		<div class="flex-1 overflow-y-auto px-4 py-3">
			{#if mine.length === 0}
				<div class="text-ink-3 py-8 text-center text-sm">
					<p>Nothing captured yet.</p>
					<p class="mt-2 text-pretty">
						{chapter
							? 'Select a sentence in the reading, pin an instrument after you move it, or finish a drill and keep its takeaway.'
							: 'Open a chapter and select a sentence.'}
					</p>
				</div>
			{:else}
				<ul class="divide-rule-2 divide-y">
					{#each mine as n (n.id)}
						<li
							class="py-3 {notes.lastSavedId === n.id
								? 'bg-mark/30'
								: ''} transition-colors duration-700"
						>
							<div class="flex items-center justify-between gap-2">
								<span class="eyebrow"
									>{chapter ? '' : `Ch ${n.chapter} · `}{KIND[n.kind]}{n.source?.lo
										? ` · ${n.source.lo}`
										: ''}{n.origin === 'book' ? ' · book wording' : ''}</span
								>
								<span class="flex gap-1">
									{#if editing !== n.id}<button
											class="text-ink-3 hover:text-ink text-xs"
											onclick={() => startEdit(n)}>Edit</button
										>{/if}
									<button
										class="text-ink-3 hover:text-credit text-xs"
										onclick={() => notes.remove(n.id)}>Delete</button
									>
								</span>
							</div>
							{#if editing === n.id}
								<input class="field mt-1 text-sm" bind:value={editText} aria-label="Note text" />
								{#if n.kind !== 'own'}<textarea
										class="field mt-1 min-h-14 text-sm"
										bind:value={editBody}
										aria-label="Note body"></textarea>{/if}
								<div class="mt-1 flex gap-2">
									<button class="btn text-xs" onclick={commitEdit}>Done</button><button
										class="btn btn-quiet text-xs"
										onclick={() => (editing = null)}>Cancel</button
									>
								</div>
							{:else if n.kind === 'term'}
								<div class="mt-1 text-sm">
									<span class="font-medium">{n.text}</span> <span class="text-ink-3">—</span>
									{n.body}
								</div>
							{:else if n.kind === 'line'}
								<blockquote class="border-rule mt-1 border-l-2 pl-2 text-sm">{n.text}</blockquote>
								{#if n.body}<p class="text-ink-2 mt-1 text-sm">{n.body}</p>{/if}
							{:else if n.kind === 'state'}
								<p class="mt-1 text-sm">{n.text}</p>
								{#if n.data}<p class="num text-ink-3 mt-1 text-xs">
										{Object.entries(n.data)
											.map(([k, v]) => `${k}: ${v}`)
											.join(' · ')}
									</p>{/if}
							{:else}
								<p class="mt-1 text-sm">{n.text}</p>
							{/if}
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		<footer class="border-rule flex flex-wrap items-center gap-2 border-t px-4 py-3">
			<button class="btn text-xs" onclick={exportMd} disabled={mine.length === 0}
				>Export Markdown</button
			>
			<button class="btn btn-quiet text-xs" onclick={copyMd} disabled={mine.length === 0}
				>{copied ? 'Copied' : 'Copy'}</button
			>
			<a
				class="text-ink-2 hover:text-ink ml-auto text-xs underline underline-offset-2"
				href="/notes">All chapters</a
			>
		</footer>
	</aside>
{/if}
