<script lang="ts">
	import SiteHeader from '$lib/components/ui/SiteHeader.svelte';
	import NotesDrawer from '$lib/components/notes/NotesDrawer.svelte';
	import { chapterIndex } from '$lib/content';
	import { notes } from '$lib/notes/store.svelte';
	const live = chapterIndex.filter((c) => c.status === 'live');
	const countFor = (n: number) => notes.forChapter(n).length;
</script>

<svelte:head>
	<title>Accounting Hub · Wild, Financial and Managerial Accounting</title>
	<meta
		name="description"
		content="An open study site for Wild’s Financial and Managerial Accounting (2025 release). Each chapter opens on an instrument you can move, and your notes attach to what you were looking at."
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
			Every chapter here starts with an instrument, not a wall of text: a timeline you drag, cost
			layers that drain, a curve that bends. The explanation lives around it. When a number finally
			clicks, pin the state you were looking at and it becomes a note you can export.
		</p>
	</div>

	<section class="border-rule border-t pt-6">
		<div class="flex items-baseline justify-between">
			<h2 class="text-lg">Chapters 1–13 · Financial</h2>
			<span class="text-ink-3 text-xs">{live.length} of {chapterIndex.length} built</span>
		</div>
		<ol class="divide-rule-2 mt-3 divide-y">
			{#each chapterIndex as c (c.number)}
				<li
					class="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-3 py-3 sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1fr)_7rem] sm:items-baseline"
				>
					<span class="num text-ink-3 font-serif text-lg">{String(c.number).padStart(2, '0')}</span>
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
					<div class="text-ink-3 col-start-2 mt-1 text-xs sm:col-start-auto sm:mt-0 sm:text-right">
						{#if c.status === 'live'}
							<span class="text-ok">Live</span>{#if countFor(c.number)}
								· <span class="num">{countFor(c.number)}</span> notes{/if}
						{:else}
							{c.instrument ?? 'Planned'}
						{/if}
					</div>
				</li>
			{/each}
		</ol>
		<p class="text-ink-3 mt-4 text-xs">
			Chapters 14–24 (managerial) follow after the financial half is complete. Chapter 3 was built
			first because adjusting entries are the hardest idea in the first half and the best stress
			test for the template.
		</p>
	</section>

	<section class="border-rule mt-10 border-t pt-6">
		<h2 class="text-lg">How notes work here</h2>
		<div class="text-ink-2 mt-3 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
			<p>
				<span class="text-ink font-medium">Nothing is pre-marked.</span> Select any sentence in a reading
				and a small popover offers to keep it. If what you selected is a key term, it asks for the meaning
				in your words first.
			</p>
			<p>
				<span class="text-ink font-medium">Instruments pin.</span> Move an instrument off its default
				and a pin appears. It saves what you were looking at, numbers included.
			</p>
			<p>
				<span class="text-ink font-medium">Drills pay out after.</span> Finish a drill and it offers the
				one line it just taught you.
			</p>
			<p>
				<span class="text-ink font-medium">Chapter end is an audit.</span> A list of key terms you never
				captured, each waiting for your definition before it shows the book’s. Notes live in this browser
				and export as Markdown for NotebookLM.
			</p>
		</div>
	</section>
</main>

<NotesDrawer chapter={0} title="All chapters" />
