<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import { fmt } from '$lib/ledger';
	import { discountAmount, bondPeriods, straightLineAmortizationPerPeriod, bondCashInterest } from '$lib/content/chapters/ch10';

	const href = '/ch/10/learn/straight-line-amortization';
	setContext('href', href);
	const totalInterestExpense = bondCashInterest + straightLineAmortizationPerPeriod;
</script>

<div class="frame">
	<p class="max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		Split the $6,463 discount into 8 equal periods.
	</p>
	<div class="mt-5 grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Discount</div>
			<p class="num mt-1 text-lg">{fmt(discountAmount, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">÷ {bondPeriods} periods</div>
			<p class="num mt-1 text-lg">{fmt(straightLineAmortizationPerPeriod, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Interest expense, each period</div>
			<p class="num mt-1 text-lg">{fmt(totalInterestExpense, { dollar: true })}</p>
		</div>
	</div>
</div>

<Reading chapter={10} lo="P2" label="The same slice, every time">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Straight-line bond amortization">Straight-line amortization</TermMark> divides
			the discount or premium evenly across every period. Add the amortized discount to cash interest,
			and interest expense is the same dollar figure period after period.
		</p>
		<p>
			A premium works the same way in reverse: an equal slice is subtracted from cash interest each
			period, since the bond is paying more than the market wants.
		</p>
	</div>
</Reading>
