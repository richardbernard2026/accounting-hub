<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import { fmt } from '$lib/ledger';
	import { netSalesForTurnover, beginningAR, endingAR, averageAR, arTurnover } from '$lib/content/chapters/ch07';

	const href = '/ch/7/learn/turnover';
	setContext('href', href);
</script>

<div class="frame">
	<p class="mb-4 max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		See how many times a generic company’s receivables cycled through in a year.
	</p>
	<div class="grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Net sales</div>
			<p class="num mt-1 text-lg">{fmt(netSalesForTurnover, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Average accounts receivable</div>
			<p class="num mt-1 text-lg">{fmt(averageAR, { dollar: true })}</p>
			<p class="text-ink-2 text-xs">({fmt(beginningAR, { dollar: true })} + {fmt(endingAR, { dollar: true })}) ÷ 2</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Turnover</div>
			<p class="num mt-1 text-lg">{arTurnover.toFixed(1)} times</p>
		</div>
	</div>
</div>

<Reading chapter={7} lo="A2" label="How many times receivables turn over">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Accounts receivable turnover">Accounts receivable turnover</TermMark> divides net
			sales by average accounts receivable: how many times, in a year, the company collected and
			re-extended credit to its customers.
		</p>
		<p>
			A higher number means faster collection. Compared against a competitor or the company’s own
			history, a falling turnover is often the first sign that credit policy has gotten too loose.
		</p>
	</div>
</Reading>
