<script lang="ts">
	/**
	 * The chapter home: a short overview and a grid of six modules. This is the
	 * launcher, not content — no instrument, no prose beyond the one-liner.
	 */
	import type { ChapterContent } from '$lib/content/types';
	import { notes } from '$lib/notes/store.svelte';
	import { recall } from '$lib/recall/store.svelte';
	import { cardsFor } from '$lib/recall/cards';
	import { progress } from '$lib/progress/store.svelte';

	let { chapter }: { chapter: ChapterContent } = $props();
	const n = chapter.meta.number;
	const base = `/ch/${n}`;
	const lessons = chapter.lessons ?? [];
	const instruments = chapter.instruments ?? [];
	const drillKinds = [
		...(chapter.classifications?.length ? (['classification'] as const) : []),
		...(chapter.entryCards?.length ? (['entry'] as const) : [])
	];

	/** `**bold**` to `<strong>`. Content is our own authored copy, never user input. */
	function boldify(s: string): string {
		return s
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
	}

	const noteCount = $derived(notes.forChapter(n).length);
	const dueCount = $derived(recall.due(cardsFor(chapter)).length);
	const lessonsDone = $derived(progress.lessonsVisited(n));
	const instrumentsDone = $derived(progress.instrumentsTouched(n));
	const drillsDone = $derived(progress.drillsDone(n));
	const cardTotal = $derived(cardsFor(chapter).length);

	const modules = $derived([
		{
			href: `${base}/learn`,
			label: 'Learn',
			tagline: 'The guided walkthrough — one idea per page.',
			progress: lessons.length ? `${lessonsDone} of ${lessons.length} lessons` : 'Not started',
			start: lessonsDone === 0
		},
		{
			href: `${base}/lab`,
			label: 'Lab',
			tagline: 'Every instrument, on its own screen.',
			progress: instruments.length
				? `${instrumentsDone} of ${instruments.length} instruments`
				: 'Not started'
		},
		{
			href: `${base}/practice`,
			label: 'Practice',
			tagline: 'Classify situations and journalize entries, with a reason for every miss.',
			progress: drillKinds.length
				? `${drillsDone} of ${drillKinds.length} drills done`
				: 'Not started'
		},
		{
			href: `${base}/recall`,
			label: 'Recall',
			tagline: 'Produce the answer. Box 1–5, due in 1, 2, 4, 8, 16 days.',
			progress: `${dueCount} of ${cardTotal} cards due`,
			start: lessonsDone > 0 && dueCount > 0
		},
		{
			href: `${base}/notes`,
			label: 'Notes',
			tagline: 'What you captured, grouped by lesson.',
			progress: `${noteCount} note${noteCount === 1 ? '' : 's'}`
		},
		{
			href: `${base}/reference`,
			label: 'Reference',
			tagline: 'Every term, formula, and entry pattern, in one dense page.',
			progress: 'The pre-exam page'
		}
	]);
</script>

<div class="pt-10 pb-4">
	<div class="eyebrow">
		Chapter {n} · {chapter.meta.part === 'financial' ? 'Financial' : 'Managerial'}
	</div>
	<h1 class="display mt-2">{chapter.meta.title}</h1>
	<p class="text-ink-2 prose-col mt-4 text-[1.05rem] leading-relaxed">{chapter.meta.oneLine}</p>
	{#if chapter.meta.headline}
		<p class="mt-6 max-w-[68ch] text-[1.3rem] leading-snug">
			{@html boldify(chapter.meta.headline)}
		</p>
	{/if}
</div>

<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
	{#each modules as m (m.href)}
		<a
			href={m.href}
			class="border-rule hover:border-ink group relative flex flex-col justify-between border p-5 transition-colors"
		>
			<div>
				<div class="flex items-baseline justify-between gap-2">
					<span class="font-serif text-xl">{m.label}</span>
					{#if m.start}<span class="lo-tag">Start here</span>{/if}
				</div>
				<p class="text-ink-2 mt-2 text-sm leading-snug">{m.tagline}</p>
			</div>
			<p class="num text-ink-2 group-hover:text-ink mt-4 text-xs">{m.progress}</p>
		</a>
	{/each}
</div>
