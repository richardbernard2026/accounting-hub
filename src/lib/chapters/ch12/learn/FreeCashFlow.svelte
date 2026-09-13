<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import { fmt } from '$lib/ledger';
	import { operatingCashFlow, capitalExpenditures, freeCashFlow, cashFlowOnTotalAssets } from '$lib/content/chapters/ch12';

	const href = '/ch/12/learn/free-cash-flow';
	setContext('href', href);
</script>

<div class="frame">
	<p class="mb-4 max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		What is left after the business reinvests in itself.
	</p>
	<div class="grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Operating cash flow</div>
			<p class="num mt-1 text-lg">{fmt(operatingCashFlow, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">− Capital expenditures</div>
			<p class="num mt-1 text-lg">{fmt(capitalExpenditures, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Free cash flow</div>
			<p class="num mt-1 text-lg">{fmt(freeCashFlow, { dollar: true })}</p>
		</div>
	</div>
</div>

<Reading chapter={12} lo="A2" label="Cash with no strings attached">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Free cash flow">Free cash flow</TermMark> subtracts the cash a company must
			reinvest in long-term assets just to keep operating, leaving what is genuinely available for
			debt, dividends, or growth.
		</p>
		<p>
			<TermMark name="Cash flow on total assets">Cash flow on total assets</TermMark> divides operating
			cash flow by average total assets — {(cashFlowOnTotalAssets * 100).toFixed(1)}% here — measuring
			how much cash a dollar of assets actually generates, independent of accrual accounting choices.
		</p>
	</div>
</Reading>
