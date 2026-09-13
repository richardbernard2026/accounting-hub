<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import { fmt } from '$lib/ledger';
	import { earningsPerShare, priceEarningsRatio, dividendYield, bookValuePerShare } from '$lib/content/chapters/ch11';

	const href = '/ch/11/learn/per-share-ratios';
	setContext('href', href);
</script>

<div class="frame">
	<p class="mb-4 max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		Four numbers, all built from the same one share.
	</p>
	<div class="grid gap-4 sm:grid-cols-4">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Earnings per share</div>
			<p class="num mt-1 text-lg">{fmt(earningsPerShare, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Price-earnings</div>
			<p class="num mt-1 text-lg">{priceEarningsRatio.toFixed(1)}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Dividend yield</div>
			<p class="num mt-1 text-lg">{(dividendYield * 100).toFixed(1)}%</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Book value per share</div>
			<p class="num mt-1 text-lg">{fmt(bookValuePerShare, { dollar: true })}</p>
		</div>
	</div>
</div>

<Reading chapter={11} lo="A2" label="Market price against the books">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Earnings per share">Earnings per share</TermMark> divides income left for common
			stockholders by the shares outstanding that earned it. The
			<TermMark name="Price-earnings ratio">price-earnings ratio</TermMark> compares that to what the
			market is actually paying for one share.
		</p>
		<p>
			<TermMark name="Dividend yield">Dividend yield</TermMark> and
			<TermMark name="Book value per share">book value per share</TermMark> both exclude treasury
			shares from their share count — only shares outstanding earn a dividend or a claim on equity.
		</p>
	</div>
</Reading>
