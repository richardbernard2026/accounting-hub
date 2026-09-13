<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import { fmt } from '$lib/ledger';
	import { netSalesForTurnover, averageTotalAssets, totalAssetTurnover } from '$lib/content/chapters/ch08';

	const href = '/ch/8/learn/turnover';
	setContext('href', href);
</script>

<div class="frame">
	<p class="mb-4 max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		See how many sales dollars a generic company squeezes out of each dollar of assets.
	</p>
	<div class="grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Net sales</div>
			<p class="num mt-1 text-lg">{fmt(netSalesForTurnover, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Average total assets</div>
			<p class="num mt-1 text-lg">{fmt(averageTotalAssets, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Total asset turnover</div>
			<p class="num mt-1 text-lg">{totalAssetTurnover.toFixed(1)} times</p>
		</div>
	</div>
</div>

<Reading chapter={8} lo="A3" label="How hard the assets work">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Total asset turnover">Total asset turnover</TermMark> divides net sales by
			average total assets: how many sales dollars each dollar tied up in assets produced during the
			period.
		</p>
		<p>
			A capital-heavy business — a lot of plant assets relative to sales — naturally turns over
			more slowly than one that owns little and rents or outsources the rest. Comparisons matter most
			within the same industry.
		</p>
	</div>
</Reading>
