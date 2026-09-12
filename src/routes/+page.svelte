<script lang="ts">
	import SiteHeader from '$lib/components/ui/SiteHeader.svelte';
	import { chapterIndex } from '$lib/content';
	import { notes } from '$lib/notes/store.svelte';
	import { chapters } from '$lib/content';
	import { cardsFor } from '$lib/recall/cards';
	import { recall } from '$lib/recall/store.svelte';
	const live = chapterIndex.filter((c) => c.status === 'live');
	const countFor = (n: number) => notes.forChapter(n).length;
	const dueFor = (n: number) => (chapters[n] ? recall.due(cardsFor(chapters[n])).length : 0);
</script>

<svelte:head>
	<title>Accounting Hub · Wild, Financial and Managerial Accounting</title>
	<meta
		name="description"
		content="An open study site for Wild’s Financial and Managerial Accounting (2025 release). Each chapter opens on a moving instrument, and your notes attach to what you were looking at."
	/>
</svelte:head>

<SiteHeader />

<main class="mx-auto max-w-[1280px] px-4 pb-24 sm:px-6">
	<div class="grid gap-8 pt-10 pb-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-end">
		<div>
			<div class="eyebrow">Wild · Financial and Managerial Accounting · 2025 release</div>
			<h1 class="mt-2 text-2xl leading-[1.05] sm:text-[3rem]">
				A chapter opens on something moving. Your notes attach to it.
			</h1>
		</div>
		<p class="text-ink-2 max-w-md text-[1.05rem] leading-relaxed">
			Each chapter is six short modules: Learn walks you through it, Lab holds every instrument on
			its own screen, Practice and Recall make you produce the answer, Notes and Reference are what
			you keep.
		</p>
	</div>

	<section class="border-rule border-t pt-6">
		<div class="flex items-baseline justify-between">
			<h2 class="text-lg">Chapters 1–13 · Financial</h2>
			<span class="text-ink-2 text-xs">{live.length} of {chapterIndex.length} built</span>
		</div>
		<ol class="divide-rule-2 mt-3 divide-y">
			{#each chapterIndex as c (c.number)}
				<li
					class="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-3 py-3 sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1fr)_9rem] sm:items-baseline"
				>
					<span class="num text-ink-2 font-serif text-lg">{String(c.number).padStart(2, '0')}</span>
					<div>
						{#if c.status === 'live'}
							<a
								href="/ch/{c.number}"
								class="decoration-rule hover:decoration-ink font-serif text-lg leading-tight underline underline-offset-4"
								>{c.title}</a
							>
						{:else}
							<span class="text-ink-2 font-serif text-lg leading-tight">{c.title}</span>
						{/if}
						<div class="text-ink-2 text-sm sm:hidden">{c.summary}</div>
					</div>
					<div class="text-ink-2 hidden text-sm sm:block">{c.summary}</div>
					<div class="text-ink-2 col-start-2 mt-1 text-xs sm:col-start-auto sm:mt-0 sm:text-right">
						{#if c.status === 'live'}
							<span class="text-ok font-medium">Live</span>{#if countFor(c.number)}
								· <span class="num">{countFor(c.number)}</span> notes{/if}{#if dueFor(c.number)}
								· <a href="/review" class="underline underline-offset-2"
									><span class="num">{dueFor(c.number)}</span> cards due</a
								>{/if}
						{:else}
							{c.instrument ?? 'Planned'}
						{/if}
					</div>
				</li>
			{/each}
		</ol>
		<p class="text-ink-2 mt-4 text-xs">
			Chapters 14–24 (managerial) follow after the financial half is complete. Chapter 3 was built
			first because adjusting entries are the hardest idea in the first half and the best stress
			test for the template.
		</p>
	</section>

	<section class="border-rule mt-10 border-t pt-6">
		<h2 class="text-lg">How a chapter works</h2>
		<div class="text-ink-2 mt-3 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
			<p>
				<span class="text-ink font-medium">Learn opens on the instrument, not the explanation.</span
				>
				Each lesson is a page: the diagram first, the idea beneath it, previous and next at the foot.
			</p>
			<p>
				<span class="text-ink font-medium">Lab is every instrument, alone.</span> One per screen, an instruction
				above it, and what to notice revealed only after you touch it.
			</p>
			<p>
				<span class="text-ink font-medium">Notes attach to what you were looking at.</span> Select a sentence,
				capture a term in place, or pin an instrument's numbers. Every note remembers the screen it came
				from.
			</p>
			<p>
				<span class="text-ink font-medium">Reference is the one dense page.</span> Every term, formula,
				and entry the chapter teaches, for the night before the exam.
			</p>
		</div>
	</section>
</main>
