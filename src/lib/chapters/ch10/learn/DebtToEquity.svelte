<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import { fmt } from '$lib/ledger';
	import { totalLiabilitiesForRatio, totalEquityForRatio, debtToEquity } from '$lib/content/chapters/ch10';

	const href = '/ch/10/learn/debt-to-equity';
	setContext('href', href);
</script>

<div class="frame">
	<p class="mb-4 max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		See how much of a generic company's financing comes from creditors versus owners.
	</p>
	<div class="grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Total liabilities</div>
			<p class="num mt-1 text-lg">{fmt(totalLiabilitiesForRatio, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Total equity</div>
			<p class="num mt-1 text-lg">{fmt(totalEquityForRatio, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Debt-to-equity</div>
			<p class="num mt-1 text-lg">{debtToEquity.toFixed(1)}</p>
		</div>
	</div>
</div>

<Reading chapter={10} lo="A2" label="Two sides of the balance sheet, compared">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Debt-to-equity ratio">Debt-to-equity</TermMark> divides total liabilities by
			total equity: for every dollar owners have invested, how many dollars creditors have lent.
		</p>
		<p>
			A ratio above 1 means creditors have supplied more financing than owners — more leverage, and
			more fixed obligations to meet regardless of how the business performs.
		</p>
	</div>
</Reading>
