<script lang="ts">
	/** Toggle between multiple-step and single-step on the same year's numbers. Same bottom line either way. */
	import { fmt } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	let {
		chapter,
		href,
		multipleStep,
		singleStep
	}: {
		chapter: number;
		href?: string;
		multipleStep: {
			sales: number;
			salesDiscounts: number;
			salesReturns: number;
			netSales: number;
			costOfGoodsSold: number;
			grossProfit: number;
			sellingExpenses: number;
			adminExpenses: number;
			incomeFromOperations: number;
			interestRevenue: number;
			interestExpense: number;
			netIncome: number;
		};
		singleStep: { totalRevenues: number; totalExpenses: number; netIncome: number };
	} = $props();

	let format = $state<'multiple' | 'single'>('multiple');
	let touched = $state(false);

	function pick(f: 'multiple' | 'single') {
		format = f;
		touched = true;
	}

	const sentence = $derived(
		`${format === 'multiple' ? 'Multiple-step' : 'Single-step'}: net income ${fmt(multipleStep.netIncome, { dollar: true })}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<div class="flex gap-1.5">
			<button
				class="border px-2.5 py-1 text-sm transition-colors {format === 'multiple'
					? 'border-ink bg-ink text-paper'
					: 'border-rule hover:bg-paper-2'}"
				onclick={() => pick('multiple')}
				aria-pressed={format === 'multiple'}>Multiple-step</button
			>
			<button
				class="border px-2.5 py-1 text-sm transition-colors {format === 'single'
					? 'border-ink bg-ink text-paper'
					: 'border-rule hover:bg-paper-2'}"
				onclick={() => pick('single')}
				aria-pressed={format === 'single'}>Single-step</button
			>
		</div>
		<PinState {chapter} lo="P2" label="Income statement formats" {href} {sentence} dirty={touched} />
	</div>

	<table class="ledger mt-5 text-sm">
		<tbody>
			{#if format === 'multiple'}
				<tr><th>Sales</th><td class="num text-right">{fmt(multipleStep.sales, { dollar: true })}</td></tr>
				<tr><th class="text-ink-2">Less sales discounts</th><td class="num text-ink-2 text-right">({fmt(multipleStep.salesDiscounts, { dollar: true })})</td></tr>
				<tr><th class="text-ink-2">Less sales returns and allowances</th><td class="num text-ink-2 text-right">({fmt(multipleStep.salesReturns, { dollar: true })})</td></tr>
				<tr class="border-rule-2 border-t"><th>Net sales</th><td class="num text-right font-medium">{fmt(multipleStep.netSales, { dollar: true })}</td></tr>
				<tr><th class="text-ink-2">Cost of goods sold</th><td class="num text-ink-2 text-right">({fmt(multipleStep.costOfGoodsSold, { dollar: true })})</td></tr>
				<tr class="border-rule-2 border-t"><th>Gross profit</th><td class="num text-right font-medium">{fmt(multipleStep.grossProfit, { dollar: true })}</td></tr>
				<tr><th class="text-ink-2">Selling expenses</th><td class="num text-ink-2 text-right">({fmt(multipleStep.sellingExpenses, { dollar: true })})</td></tr>
				<tr><th class="text-ink-2">General and administrative expenses</th><td class="num text-ink-2 text-right">({fmt(multipleStep.adminExpenses, { dollar: true })})</td></tr>
				<tr class="border-rule-2 border-t"><th>Income from operations</th><td class="num text-right font-medium">{fmt(multipleStep.incomeFromOperations, { dollar: true })}</td></tr>
				<tr><th class="text-ink-2">Other revenues and gains — interest revenue</th><td class="num text-ink-2 text-right">{fmt(multipleStep.interestRevenue, { dollar: true })}</td></tr>
				<tr><th class="text-ink-2">Other expenses and losses — interest expense</th><td class="num text-ink-2 text-right">({fmt(multipleStep.interestExpense, { dollar: true })})</td></tr>
				<tr class="border-rule-2 border-double border-t-4"><th>Net income</th><td class="num text-right font-medium">{fmt(multipleStep.netIncome, { dollar: true })}</td></tr>
			{:else}
				<tr><th>Revenues (net sales + interest revenue)</th><td class="num text-right">{fmt(singleStep.totalRevenues, { dollar: true })}</td></tr>
				<tr><th class="text-ink-2">Expenses (cost of goods sold + operating + interest)</th><td class="num text-ink-2 text-right">({fmt(singleStep.totalExpenses, { dollar: true })})</td></tr>
				<tr class="border-rule-2 border-double border-t-4"><th>Net income</th><td class="num text-right font-medium">{fmt(singleStep.netIncome, { dollar: true })}</td></tr>
			{/if}
		</tbody>
	</table>
</div>
