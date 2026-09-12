<script lang="ts">
	/** The study sheet: one printed page per chapter. Terms as a table, entries as journal blocks. */
	import { chapters, chapterIndex } from '$lib/content';
	import { notes } from '$lib/notes/store.svelte';
	import { fmt } from '$lib/ledger';
	import { browser } from '$app/environment';
	// Read the query client-side so the page can be prerendered.
	const only = browser ? Number(new URLSearchParams(location.search).get('ch')) || null : null;
	const list = $derived(
		chapterIndex.filter((c) =>
			only
				? c.number === only
				: notes.notes.some((n) => n.chapter === c.number) || chapters[c.number]
		)
	);
	const entriesOf = (n: number) => {
		const ch = chapters[n];
		return ch?.entryCards?.map((e) => e.entry) ?? [];
	};
	const nameOf = (n: number, acct: string) =>
		chapters[n]?.accounts?.find((a) => a.num === acct)?.name ?? acct;
</script>

<svelte:head><title>Study sheet · Accounting Hub</title></svelte:head>

<div class="mx-auto max-w-[860px] px-6 py-8 print:px-0 print:py-0">
	<div class="mb-6 flex items-center justify-between print:hidden">
		<a href="/notes" class="text-sm underline underline-offset-4">Back to notes</a>
		<button class="btn text-sm" onclick={() => window.print()}>Print</button>
	</div>
	{#each list as c (c.number)}
		{@const mine = notes.forChapter(c.number)}
		{@const terms = mine.filter((n) => n.kind === 'term')}
		{@const states = mine.filter((n) => n.kind === 'state')}
		{@const lines = mine.filter((n) => n.kind === 'line' || n.kind === 'own')}
		<article class="sheet break-after-page pb-10">
			<div class="kicker">Study sheet · Chapter {c.number}</div>
			<h1 class="font-serif text-[2rem] leading-tight">{c.title}</h1>
			{#if terms.length}
				<h2 class="kicker mt-8">Terms</h2>
				<table class="ledger mt-2 text-sm">
					<thead><tr><th class="w-44">Term</th><th>In my words</th><th>The book</th></tr></thead>
					<tbody>
						{#each terms as t (t.id)}
							<tr class="border-rule-2 border-t align-top"
								><td class="font-medium">{t.text}</td><td>{t.origin === 'book' ? '' : t.body}</td
								><td class="text-ink-2">{t.book ?? (t.origin === 'book' ? t.body : '')}</td></tr
							>
						{/each}
					</tbody>
				</table>
			{/if}
			{#if entriesOf(c.number).length}
				<h2 class="kicker mt-8">Entries the chapter teaches</h2>
				<div class="mt-2 grid gap-4 sm:grid-cols-2">
					{#each entriesOf(c.number) as e (e.id)}
						<div class="border-rule-2 border px-3 py-2 text-sm">
							<div class="text-ink-3 text-xs">({e.id}) {e.explanation}</div>
							<table class="ledger mt-1">
								<tbody>
									{#each e.lines.filter((l) => l.dr) as l (l.acct)}<tr
											><td class="dr">{nameOf(c.number, l.acct)}</td><td class="amt dr"
												>{fmt(l.dr!)}</td
											><td class="amt"></td></tr
										>{/each}
									{#each e.lines.filter((l) => l.cr) as l (l.acct)}<tr
											><td class="indent cr">{nameOf(c.number, l.acct)}</td><td class="amt"></td><td
												class="amt cr">{fmt(l.cr!)}</td
											></tr
										>{/each}
								</tbody>
							</table>
						</div>
					{/each}
				</div>
			{/if}
			{#if states.length}
				<h2 class="kicker mt-8">Instrument states I pinned</h2>
				<ul class="mt-2 list-disc pl-5 text-sm">
					{#each states as s (s.id)}<li>{s.text}</li>{/each}
				</ul>
			{/if}
			{#if lines.length}
				<h2 class="kicker mt-8">Lines and my own words</h2>
				<ul class="mt-2 list-disc pl-5 text-sm">
					{#each lines as l (l.id)}<li>
							{l.text}{#if l.body}
								<span class="text-ink-2">— {l.body}</span>{/if}
						</li>{/each}
				</ul>
			{/if}
			{#if !terms.length && !states.length && !lines.length}
				<p class="text-ink-3 mt-6 text-sm">No notes for this chapter yet.</p>
			{/if}
		</article>
	{/each}
</div>

<style>
	@media print {
		:global(body) {
			background: white !important;
			background-image: none !important;
		}
		.sheet {
			break-after: page;
		}
	}
</style>
