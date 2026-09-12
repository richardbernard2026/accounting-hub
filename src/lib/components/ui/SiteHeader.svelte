<script lang="ts">
	import { notes } from '$lib/notes/store.svelte';
	import { page } from '$app/state';
	/** When set, "Notes" links to this chapter's own notes page instead of the global one. */
	let { chapter }: { chapter?: number } = $props();
	const count = $derived(chapter ? notes.forChapter(chapter).length : notes.notes.length);
	const notesHref = $derived(chapter ? `/ch/${chapter}/notes` : '/notes');
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
	const active = (href: string) => (page.url.pathname === href ? 'underline' : '');
</script>

<header class="border-rule bg-paper/90 sticky top-0 z-40 h-12 border-b backdrop-blur-sm">
	<div class="mx-auto flex h-12 max-w-[1280px] items-center gap-4 px-4 sm:px-6">
		<a href="/" class="font-serif text-lg leading-none tracking-tight"
			>Accounting<span class="text-ink-2"> Hub</span></a
		>
		<span class="text-ink-2 hidden text-xs sm:inline"
			>Wild · Financial &amp; Managerial Accounting · 2025 release</span
		>
		<nav class="ml-auto flex items-center gap-1 text-sm">
			<a
				href="/"
				class="hidden px-2 py-1 underline-offset-4 hover:underline sm:inline {active('/')}"
				>Chapters</a
			>
			<a
				href="/review"
				class="hidden px-2 py-1 underline-offset-4 hover:underline sm:inline {active('/review')}"
				>Review</a
			>
			<a
				href={notesHref}
				class="border-rule hover:bg-paper-2 ml-1 inline-flex items-center gap-1.5 border px-2.5 py-1 underline-offset-4 {notes.lastSavedId
					? 'bg-mark/40'
					: ''} {active(notesHref) ? 'underline' : ''} transition-colors"
			>
				<span>Notes</span>
				<span class="num text-ink-2 text-xs">{count}</span>
			</a>
			<button
				class="text-ink-2 hover:text-ink ml-1 px-2 py-1 text-xs"
				onclick={cycle}
				aria-label="Theme: {theme === 'dark' ? 'Dark' : theme === 'light' ? 'Light' : 'Auto'}"
				title="Theme: {theme}"
			>
				{theme === 'dark' ? 'Dark' : theme === 'light' ? 'Light' : 'Auto'}
			</button>
		</nav>
	</div>
</header>
