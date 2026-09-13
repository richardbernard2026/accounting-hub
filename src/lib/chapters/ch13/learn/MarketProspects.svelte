<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import { fmt } from '$lib/ledger';
	import { earningsPerShare, priceEarningsRatio, dividendYield, bookValuePerShare } from '$lib/content/chapters/ch13';

	const href = '/ch/13/learn/market-prospects';
	setContext('href', href);
</script>

<div class="frame">
	<p class="mb-4 max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		What the market is paying for one share of this company.
	</p>
	<div class="grid gap-4 sm:grid-cols-4">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Earnings per share</div>
			<p class="num mt-1 text-lg">{fmt(earningsPerShare, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Price-earnings</div>
			<p class="num mt-1 text-lg">{priceEarningsRatio}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Dividend yield</div>
			<p class="num mt-1 text-lg">{dividendYield}%</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Book value per share</div>
			<p class="num mt-1 text-lg">{fmt(bookValuePerShare, { dollar: true })}</p>
		</div>
	</div>
</div>

<Reading chapter={13} lo="A4" label="Two prices for the same share">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Market prospects">Market prospects</TermMark> compare what the market is
			actually paying for a share against what the accounting records say it is worth. The
			price-earnings ratio compares price to a year's earnings; book value per share compares it to
			recorded equity.
		</p>
		<p>
			Dividend yield measures something else again: the cash return a shareholder receives just for
			holding the stock, independent of whatever the share price does next.
		</p>
	</div>
</Reading>
