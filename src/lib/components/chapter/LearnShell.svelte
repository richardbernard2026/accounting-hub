<script lang="ts">
	/**
	 * Learn's shell: a slim lesson list, the active lesson's content, and
	 * previous/next at the foot. Normal vertical scroll — no snap, no forced
	 * section height. The lesson's own content decides how tall it is.
	 */
	import { onMount, type Snippet } from 'svelte';
	import type { LessonMeta } from '$lib/content/types';
	import { progress } from '$lib/progress/store.svelte';

	let {
		chapter,
		lessons,
		activeId,
		children
	}: { chapter: number; lessons: LessonMeta[]; activeId: string; children: Snippet } = $props();

	const base = `/ch/${chapter}/learn`;
	const idx = $derived(lessons.findIndex((l) => l.id === activeId));
	const active = $derived(lessons[idx]);
	const prev = $derived(idx > 0 ? lessons[idx - 1] : undefined);
	const next = $derived(idx < lessons.length - 1 ? lessons[idx + 1] : undefined);

	$effect(() => {
		if (active) progress.visitLesson(chapter, active.id);
	});

	// Reset on every lesson change — prev/next reuses this component, so
	// onMount alone would only fire once. `instant` bypasses the global
	// `scroll-behavior: smooth` so this snaps rather than visibly sliding.
	let mounted = false;
	$effect(() => {
		activeId;
		if (mounted) window.scrollTo({ top: 0, behavior: 'instant' });
	});

	// On first mount (i.e. a hard reload), Chrome keeps re-asserting the
	// scroll offset it remembers for this URL for a brief window after
	// load — a single scrollTo(0) loses that fight. Out-stubborn it for a
	// few frames, then leave scroll alone.
	onMount(() => {
		let frames = 0;
		let raf = requestAnimationFrame(function fight() {
			window.scrollTo({ top: 0, behavior: 'instant' });
			if (++frames < 20) raf = requestAnimationFrame(fight);
			else mounted = true;
		});
		return () => cancelAnimationFrame(raf);
	});
</script>

<div
	class="mx-auto grid max-w-[1280px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[200px_minmax(0,1fr)]"
>
	<nav aria-label="Lessons" class="lg:sticky lg:top-24 lg:self-start">
		<div class="kicker mb-2">Learn · {lessons.length} lessons</div>
		<ol class="space-y-0.5">
			{#each lessons as l, i (l.id)}
				<li>
					<a
						href="{base}/{l.id}"
						class="block px-2 py-1.5 text-sm leading-snug {l.id === activeId
							? 'bg-paper-2 text-ink font-medium'
							: 'text-ink-2 hover:text-ink hover:bg-paper-2/60'}"
						aria-current={l.id === activeId ? 'page' : undefined}
					>
						<span class="num text-ink-2 mr-1.5">{i + 1}.</span>{l.title}
					</a>
				</li>
			{/each}
		</ol>
	</nav>

	<div class="min-w-0">
		{#if active}
			<div class="eyebrow">{active.lo}</div>
			<h1 class="display mt-1">{active.title}</h1>
			<div class="mt-8">
				{@render children()}
			</div>
			<nav class="border-rule-2 mt-16 flex items-center justify-between border-t pt-6 text-sm">
				{#if prev}
					<a
						href="{base}/{prev.id}"
						class="text-ink-2 hover:text-ink underline-offset-4 hover:underline">← {prev.title}</a
					>
				{:else}
					<span></span>
				{/if}
				{#if next}
					<a href="{base}/{next.id}" class="hover:underline">{next.title} →</a>
				{:else}
					<a href="/ch/{chapter}/practice" class="btn">Continue to Practice →</a>
				{/if}
			</nav>
		{/if}
	</div>
</div>
