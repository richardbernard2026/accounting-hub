<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import { returnOnAssetsExample } from '$lib/content/chapters/ch01';
	import { fmt } from '$lib/ledger';

	const href = '/ch/1/learn/return-on-assets';
	setContext('href', href);
	const ex = returnOnAssetsExample;
</script>

<div class="frame">
	<p class="mb-4 max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		See how a retailer's income compares to the assets that produced it.
	</p>
	<div class="grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Net income</div>
			<p class="num mt-1 text-lg">{fmt(ex.netIncome, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Average total assets</div>
			<p class="num mt-1 text-lg">{fmt(ex.averageAssets, { dollar: true })}</p>
			<p class="text-ink-2 text-xs">
				({fmt(ex.beginningAssets, { dollar: true })} + {fmt(ex.endingAssets, { dollar: true })}) ÷ 2
			</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Return on assets</div>
			<p class="num mt-1 text-lg">{(ex.roa * 100).toFixed(1)}%</p>
		</div>
	</div>
	<p class="text-ink-3 mt-3 text-xs">
		A worked example for a generic retailer, not FastForward — FastForward is one month old and has
		no prior-year assets to average against.
	</p>
</div>

<Reading chapter={1} lo="A2" label="Return on assets">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Return on assets">Return on assets</TermMark> divides net income by average total
			assets. It answers how much income a company squeezed out of what it owns, not just how much income
			it made.
		</p>
		<p>
			Average assets, not the year-end figure, is the denominator. A company that bought a warehouse
			on the last day of the year should not get credit for a full year of income from it.
		</p>
	</div>
</Reading>
