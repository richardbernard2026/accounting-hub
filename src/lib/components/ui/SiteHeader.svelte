<script lang="ts">
	import { notes } from '$lib/notes/store.svelte';
	import { page } from '$app/state';
	let { chapter, notesButton = true }: { chapter?: number; notesButton?: boolean } = $props();
	const count = $derived(chapter ? notes.forChapter(chapter).length : notes.notes.length);
	let theme = $state<'system' | 'light' | 'dark'>('system');
	$effect(() => {
		try {
			const t = localStorage.getItem('accounting-hub:theme');
			if (t === 'light' || t === 'dark') theme = t;
		} catch {}
	});
	function cycle() {
		theme = theme === 'system' ? 'dark' : theme === 'dark' ? 'light' : 'system';
		const root = document.documentElement;
		if (theme === 'system') root.removeAttribute('data-theme');
		else root.setAttribute('data-theme', theme);
		try {
			localStorage.setItem('accounting-hub:theme', theme);
		} catch {}
	}
</script>

<header class="border-rule bg-paper/90 border-b backdrop-blur-sm">
	<div class="mx-auto flex max-w-[1280px] items-center gap-4 px-4 py-2.5 sm:px-6">
		<a href="/" class="font-serif text-lg leading-none tracking-tight"
			>Accounting<span class="text-ink-3"> Hub</span></a
		>
		<span class="text-ink-3 hidden text-xs sm:inline"
			>Wild · Financial &amp; Managerial Accounting · 2025 release</span
		>
		<nav class="ml-auto flex items-center gap-1 text-sm">
			<a
				href="/"
				class="hidden px-2 py-1 underline-offset-4 hover:underline sm:inline {page.url.pathname ===
				'/'
					? 'underline'
					: ''}">Chapters</a
			>
			<a
				href="/notes"
				class="hidden px-2 py-1 underline-offset-4 hover:underline sm:inline {page.url.pathname ===
				'/notes'
					? 'underline'
					: ''}">All notes</a
			>
			{#if notesButton}
				<button
					id="notes-toggle"
					class="border-rule hover:bg-paper-2 ml-1 inline-flex items-center gap-1.5 border px-2.5 py-1 {notes.lastSavedId
						? 'bg-mark/40'
						: ''} transition-colors"
					onclick={() => (notes.drawerOpen = !notes.drawerOpen)}
					aria-label="Open notes"
					aria-expanded={notes.drawerOpen}
				>
					<span>Notes</span>
					<span class="num text-ink-2 text-xs">{count}</span>
				</button>
			{/if}
			<button
				class="text-ink-3 hover:text-ink ml-1 px-2 py-1 text-xs"
				onclick={cycle}
				aria-label="Toggle theme"
				title="Theme: {theme}"
			>
				{theme === 'dark' ? 'Dark' : theme === 'light' ? 'Light' : 'Auto'}
			</button>
		</nav>
	</div>
</header>
