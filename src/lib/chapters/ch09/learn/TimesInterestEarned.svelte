<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import { fmt } from '$lib/ledger';
	import { incomeBeforeInterestAndTaxes, interestExpenseForTurnover, timesInterestEarned } from '$lib/content/chapters/ch09';

	const href = '/ch/9/learn/times-interest-earned';
	setContext('href', href);
</script>

<div class="frame">
	<p class="mb-4 max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		See how comfortably a generic company’s income covers its interest payments.
	</p>
	<div class="grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Income before interest and taxes</div>
			<p class="num mt-1 text-lg">{fmt(incomeBeforeInterestAndTaxes, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Interest expense</div>
			<p class="num mt-1 text-lg">{fmt(interestExpenseForTurnover, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Times interest earned</div>
			<p class="num mt-1 text-lg">{timesInterestEarned.toFixed(1)} times</p>
		</div>
	</div>
</div>

<Reading chapter={9} lo="A3" label="A cushion, measured in multiples">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Times interest earned">Times interest earned</TermMark> divides income before
			interest expense and income taxes by interest expense: how many times over the company could
			have paid its interest out of this year's income.
		</p>
		<p>
			A ratio near 1 means income barely covers interest, with nothing left for taxes or profit. A
			much higher ratio means interest payments are a comfortable, not a strained, obligation.
		</p>
	</div>
</Reading>
