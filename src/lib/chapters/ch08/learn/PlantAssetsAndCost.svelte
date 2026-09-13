<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import JournalEntry from '$lib/components/ledger/JournalEntry.svelte';
	import { bayRidge, landAllocated, buildingAllocated, accountName } from '$lib/content/chapters/ch08';
	import { fmt } from '$lib/ledger';

	const href = '/ch/8/learn/plant-assets-and-cost';
	setContext('href', href);
	const lumpSum = bayRidge.entries.find((e) => e.id === '4')!;
</script>

<div class="frame">
	<p class="max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		$900,000 buys land and a building in one deal. Neither price is given — only what each was
		appraised at.
	</p>
	<div class="border-rule-2 bg-paper mt-5 border px-3 py-2">
		<div class="text-ink-2 text-xs">Lump-sum purchase, allocated by appraised value</div>
		<JournalEntry entry={lumpSum} {accountName} compact date={false} />
	</div>
	<p class="text-ink-2 mt-3 text-xs">
		Land {fmt(landAllocated, { dollar: true })} + Building {fmt(buildingAllocated, { dollar: true })} = {fmt(
			landAllocated + buildingAllocated,
			{ dollar: true }
		)}
	</p>
</div>

<Reading chapter={8} lo="C1" label="Cost means ready for use">
	<div class="prose-col mt-8">
		<p>
			The <TermMark name="Cost principle">cost principle</TermMark> records a
			<TermMark name="Plant assets">plant asset</TermMark> at everything normal and necessary to get it
			ready for its intended use — price, freight, installation, testing. Once it is running,
			later costs are a different question.
		</p>
		<p>
			A <TermMark name="Lump-sum purchase">lump-sum purchase</TermMark> splits one price across several
			assets by their relative appraised values, because <TermMark name="Land">land</TermMark> and
			<TermMark name="Buildings">buildings</TermMark> need separate cost bases — only one of them
			depreciates.
		</p>
	</div>
</Reading>
