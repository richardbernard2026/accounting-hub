<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import JournalEntry from '$lib/components/ledger/JournalEntry.svelte';
	import { bayRidge, accountName } from '$lib/content/chapters/ch08';

	const href = '/ch/8/learn/expenditures';
	setContext('href', href);
	const repair = bayRidge.entries.find((e) => e.id === '5')!;
	const betterment = bayRidge.entries.find((e) => e.id === '6')!;
</script>

<div class="frame">
	<p class="max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		Two spending decisions on the same machine, one expensed and one capitalized.
	</p>
	<div class="mt-5 grid gap-4 sm:grid-cols-2">
		<div class="border-rule-2 bg-paper border px-3 py-2">
			<div class="text-ink-2 text-xs">Ordinary repair — expensed</div>
			<JournalEntry entry={repair} {accountName} compact date={false} />
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2">
			<div class="text-ink-2 text-xs">Betterment — capitalized</div>
			<JournalEntry entry={betterment} {accountName} compact date={false} />
		</div>
	</div>
</div>

<Reading chapter={8} lo="C2" label="The test is what the spending buys">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Revenue expenditures">Revenue expenditures</TermMark> keep an asset as it was —
			<TermMark name="Ordinary repairs">ordinary repairs</TermMark> like an oil change. They are
			expensed immediately, matched against the period they benefit.
		</p>
		<p>
			<TermMark name="Capital expenditures">Capital expenditures</TermMark> buy something more:
			<TermMark name="Betterments (improvements)">betterments</TermMark> make an asset better, and
			<TermMark name="Extraordinary repairs">extraordinary repairs</TermMark> extend its life beyond the
			original estimate. Both get added to the asset's cost instead.
		</p>
	</div>
</Reading>
