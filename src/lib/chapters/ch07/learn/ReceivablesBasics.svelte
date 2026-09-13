<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';

	const href = '/ch/7/learn/receivables-basics';
	setContext('href', href);
</script>

<div class="frame">
	<p class="max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		Some customers will never pay. Accounting estimates that loss up front, before anyone knows
		which customers they are.
	</p>
	<div class="mt-5 grid gap-4 sm:grid-cols-2">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">One controlling balance</div>
			<p class="text-ink-2 mt-1">Accounts receivable in the general ledger is the sum of every customer’s balance in a subsidiary ledger.</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Credit card sales</div>
			<p class="text-ink-2 mt-1">The card company’s fee is an expense the moment the sale happens, not a reduction of revenue.</p>
		</div>
	</div>
</div>

<Reading chapter={7} lo="C1" label="Beyond holding the receivables directly">
	<div class="prose-col mt-8">
		<p>
			A company does not have to hold every receivable it creates. It can raise cash sooner by
			<TermMark name="Pledging receivables">pledging</TermMark> them as collateral for a loan, or by
			<TermMark name="Factoring">factoring</TermMark> them outright to a
			<TermMark name="Factor">factor</TermMark> for immediate cash, usually at a discount.
		</p>
		<p>
			A <TermMark name="Credit card">credit card</TermMark> sale works like factoring at the register:
			the merchant accepts a little less cash today in exchange for skipping the risk and the wait.
		</p>
	</div>
</Reading>
