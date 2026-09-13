<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import JournalEntry from '$lib/components/ledger/JournalEntry.svelte';
	import { bayRidge, accountName } from '$lib/content/chapters/ch08';

	const href = '/ch/8/learn/natural-resources-and-intangibles';
	setContext('href', href);
	const depletion = bayRidge.entries.find((e) => e.id === '9')!;
	const amortization = bayRidge.entries.find((e) => e.id === '10')!;
</script>

<div class="frame">
	<p class="max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		A mine is used up. A patent runs out. Neither wears out the way a machine does.
	</p>
	<div class="mt-5 grid gap-4 sm:grid-cols-2">
		<div class="border-rule-2 bg-paper border px-3 py-2">
			<div class="text-ink-2 text-xs">Depletion — 20,000 of 250,000 tons mined</div>
			<JournalEntry entry={depletion} {accountName} compact date={false} />
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2">
			<div class="text-ink-2 text-xs">Amortization — a 10-year patent</div>
			<JournalEntry entry={amortization} {accountName} compact date={false} />
		</div>
	</div>
</div>

<Reading chapter={8} lo="P2" label="Consumed, or expired">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Natural resources">Natural resources</TermMark> are physically removed and sold;
			<TermMark name="Depletion">depletion</TermMark> allocates their cost per unit extracted, the same
			logic as units-of-production depreciation.
		</p>
		<p>
			<TermMark name="Intangible assets">Intangible assets</TermMark> — a
			<TermMark name="Patent">patent</TermMark>, <TermMark name="Copyright">copyright</TermMark>, or
			<TermMark name="Trademark">trademark</TermMark> — have no physical form but a real legal life.
			<TermMark name="Amortization">Amortization</TermMark> spreads their cost over that life.
			<TermMark name="Goodwill">Goodwill</TermMark> is the one exception: never amortized, only tested
			for <TermMark name="Impairment">impairment</TermMark> when its value might have fallen.
		</p>
	</div>
</Reading>
