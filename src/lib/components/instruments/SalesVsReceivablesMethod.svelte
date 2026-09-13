<script lang="ts">
	/** Toggle between the percent of sales method and the percent of receivables method on the same data. */
	import { fmt } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	let {
		chapter,
		href,
		creditSales,
		salesMethodRate,
		existingAllowanceCredit,
		salesMethod,
		receivablesMethod
	}: {
		chapter: number;
		href?: string;
		creditSales: number;
		salesMethodRate: number;
		existingAllowanceCredit: number;
		salesMethod: { expense: number; allowance: number };
		receivablesMethod: { expense: number; allowance: number };
	} = $props();

	let method = $state<'sales' | 'receivables'>('sales');
	let touched = $state(false);

	function pick(m: 'sales' | 'receivables') {
		method = m;
		touched = true;
	}
	const active = $derived(method === 'sales' ? salesMethod : receivablesMethod);
	const sentence = $derived(
		`${method === 'sales' ? 'Percent of sales' : 'Percent of receivables'}: expense ${fmt(active.expense, { dollar: true })}, allowance ${fmt(active.allowance, { dollar: true })}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<div class="flex gap-1.5">
			<button
				class="border px-2.5 py-1 text-sm transition-colors {method === 'sales'
					? 'border-ink bg-ink text-paper'
					: 'border-rule hover:bg-paper-2'}"
				onclick={() => pick('sales')}
				aria-pressed={method === 'sales'}>Percent of sales</button
			>
			<button
				class="border px-2.5 py-1 text-sm transition-colors {method === 'receivables'
					? 'border-ink bg-ink text-paper'
					: 'border-rule hover:bg-paper-2'}"
				onclick={() => pick('receivables')}
				aria-pressed={method === 'receivables'}>Percent of receivables</button
			>
		</div>
		<PinState {chapter} lo="A1" label="Sales method versus receivables method" {href} {sentence} dirty={touched} />
	</div>

	<div class="border-rule bg-paper-2/40 mt-4 border p-4 text-sm">
		{#if method === 'sales'}
			<p>Credit sales {fmt(creditSales, { dollar: true })} × {(salesMethodRate * 100).toFixed(0)}% = expense {fmt(salesMethod.expense, { dollar: true })}.</p>
			<p class="text-ink-2 mt-1">Existing allowance {fmt(existingAllowanceCredit, { dollar: true })} + expense {fmt(salesMethod.expense, { dollar: true })} = new allowance {fmt(salesMethod.allowance, { dollar: true })}.</p>
		{:else}
			<p>Aging requires an allowance of {fmt(receivablesMethod.allowance, { dollar: true })}.</p>
			<p class="text-ink-2 mt-1">Required {fmt(receivablesMethod.allowance, { dollar: true })} − existing {fmt(existingAllowanceCredit, { dollar: true })} = expense {fmt(receivablesMethod.expense, { dollar: true })}.</p>
		{/if}
	</div>

	<div class="mt-4 grid gap-4 sm:grid-cols-2">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Bad debts expense</div>
			<p class="num mt-1 text-lg">{fmt(active.expense, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Ending allowance</div>
			<p class="num mt-1 text-lg">{fmt(active.allowance, { dollar: true })}</p>
		</div>
	</div>
</div>
