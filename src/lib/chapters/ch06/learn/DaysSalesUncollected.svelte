<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import { fmt } from '$lib/ledger';
	import { accountsReceivableForTurnover, netSalesForTurnover, daysSalesUncollected } from '$lib/content/chapters/ch06';

	const href = '/ch/6/learn/days-sales-uncollected';
	setContext('href', href);
</script>

<div class="frame">
	<p class="mb-4 max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		See how long a generic company's receivables take to turn into cash.
	</p>
	<div class="grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Accounts receivable</div>
			<p class="num mt-1 text-lg">{fmt(accountsReceivableForTurnover, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Net sales</div>
			<p class="num mt-1 text-lg">{fmt(netSalesForTurnover, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Days' sales uncollected</div>
			<p class="num mt-1 text-lg">{daysSalesUncollected.toFixed(1)} days</p>
		</div>
	</div>
	<p class="text-ink-3 mt-3 text-xs">
		A worked example for a generic company, not one of this chapter's own — no receivables balance was
		built into the bank reconciliation or petty cash scenarios.
	</p>
</div>

<Reading chapter={6} lo="A1" label="How long cash takes to arrive">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Days' sales uncollected">Days' sales uncollected</TermMark> turns a receivables
			balance into a time estimate: roughly how many days of sales are still sitting uncollected, at the
			rate the company sells.
		</p>
		<p>
			A rising number, period over period, usually means collections are slowing down — worth
			watching well before it becomes a cash problem.
		</p>
	</div>
</Reading>
