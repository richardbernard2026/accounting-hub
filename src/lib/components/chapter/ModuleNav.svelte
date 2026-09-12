<script lang="ts">
	/** Top tab bar for the six modules. Not a progress rail — no scroll tie-in, no forced height. */
	import { page } from '$app/state';
	let { chapter }: { chapter: number } = $props();
	const base = `/ch/${chapter}`;
	const tabs = [
		{ href: `${base}/learn`, label: 'Learn' },
		{ href: `${base}/lab`, label: 'Lab' },
		{ href: `${base}/practice`, label: 'Practice' },
		{ href: `${base}/recall`, label: 'Recall' },
		{ href: `${base}/notes`, label: 'Notes' },
		{ href: `${base}/reference`, label: 'Reference' }
	];
	const isActive = (href: string) => page.url.pathname.startsWith(href);
</script>

<div class="border-rule bg-paper/95 sticky top-12 z-30 border-b backdrop-blur-sm">
	<nav class="mx-auto flex max-w-[1280px] items-center gap-1 overflow-x-auto px-4 py-2 sm:px-6">
		<a
			href={base}
			class="text-ink-2 hover:text-ink mr-2 shrink-0 text-sm underline-offset-4 hover:underline"
			>← Chapter {chapter}</a
		>
		{#each tabs as t (t.href)}
			<a
				href={t.href}
				class="shrink-0 px-3 py-1 text-sm underline-offset-4 {isActive(t.href)
					? 'bg-ink text-paper'
					: 'text-ink-2 hover:text-ink hover:underline'}"
				aria-current={isActive(t.href) ? 'page' : undefined}>{t.label}</a
			>
		{/each}
	</nav>
</div>
