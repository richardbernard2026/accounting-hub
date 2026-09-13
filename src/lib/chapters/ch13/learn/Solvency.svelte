<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import { fmt } from '$lib/ledger';
	import { debtRatio, equityRatio, debtToEquityRatio, timesInterestEarned } from '$lib/content/chapters/ch13';

	const href = '/ch/13/learn/solvency';
	setContext('href', href);
</script>

<div class="frame">
	<p class="mb-4 max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		Who financed the assets, and can earnings cover the interest?
	</p>
	<div class="grid gap-4 sm:grid-cols-4">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Debt ratio</div>
			<p class="num mt-1 text-lg">{debtRatio}%</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Equity ratio</div>
			<p class="num mt-1 text-lg">{equityRatio}%</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Debt-to-equity</div>
			<p class="num mt-1 text-lg">{debtToEquityRatio}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Times interest earned</div>
			<p class="num mt-1 text-lg">{timesInterestEarned}</p>
		</div>
	</div>
</div>

<Reading chapter={13} lo="A2" label="Two sources of financing, one balance sheet">
	<div class="prose-col mt-8">
		<p>
			The <TermMark name="Solvency">solvency</TermMark> ratios all compare creditor financing to owner
			financing. The debt ratio and
			<TermMark name="Equity ratio">equity ratio</TermMark> always sum to 100%, since every asset is
			financed by one or the other.
		</p>
		<p>
			More debt relative to equity is
			<TermMark name="Financial leverage">financial leverage</TermMark> — it magnifies both gains and
			losses to owners. Times interest earned asks a related but separate question: whatever the mix,
			can this year's earnings actually cover the interest bill?
		</p>
	</div>
</Reading>
