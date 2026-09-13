<script lang="ts">
	/**
	 * Toggle between three depreciation methods and two metrics (annual
	 * expense, book value). Every method starts from the same cost and
	 * salvage and totals the same $9,000 — only the yearly split differs.
	 */
	import { fmt } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	type Method = 'sl' | 'uop' | 'ddb';

	let {
		chapter,
		href,
		methods,
		machineCost,
		machineSalvage,
		scheduleFor,
		bookValueSchedule
	}: {
		chapter: number;
		href?: string;
		methods: { id: Method; label: string }[];
		machineCost: number;
		machineSalvage: number;
		scheduleFor: (m: Method) => number[];
		bookValueSchedule: (m: Method) => number[];
	} = $props();

	let method = $state<Method>('sl');
	let metric = $state<'expense' | 'bookValue'>('expense');
	let touched = $state(false);

	function pickMethod(m: Method) {
		method = m;
		touched = true;
	}
	function pickMetric(m: 'expense' | 'bookValue') {
		metric = m;
		touched = true;
	}

	const expenseSchedule = $derived(scheduleFor(method));
	const bvSchedule = $derived(bookValueSchedule(method));
	const values = $derived(metric === 'expense' ? expenseSchedule : bvSchedule);
	const maxValue = $derived(metric === 'expense' ? Math.max(...expenseSchedule, 1) : machineCost);
	const total = $derived(Math.round(expenseSchedule.reduce((s, v) => s + v, 0) * 100) / 100);

	function pct(v: number) {
		return Math.max(2, (v / maxValue) * 100);
	}

	const sentence = $derived(
		`${methods.find((m) => m.id === method)!.label}, ${metric === 'expense' ? 'annual expense' : 'book value'}: ${values.map((v) => fmt(v, { dollar: true })).join(', ')}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<div class="flex flex-wrap gap-1.5">
			{#each methods as m (m.id)}
				<button
					class="border px-2.5 py-1 text-sm transition-colors {method === m.id
						? 'border-ink bg-ink text-paper'
						: 'border-rule hover:bg-paper-2'}"
					onclick={() => pickMethod(m.id)}
					aria-pressed={method === m.id}>{m.label}</button
				>
			{/each}
		</div>
		<PinState {chapter} lo="P1" label="Depreciation curves" {href} {sentence} dirty={touched} />
	</div>

	<div class="mt-4 flex gap-1.5">
		<button
			class="border px-2.5 py-1 text-sm transition-colors {metric === 'expense'
				? 'border-ink bg-ink text-paper'
				: 'border-rule hover:bg-paper-2'}"
			onclick={() => pickMetric('expense')}
			aria-pressed={metric === 'expense'}>Annual expense</button
		>
		<button
			class="border px-2.5 py-1 text-sm transition-colors {metric === 'bookValue'
				? 'border-ink bg-ink text-paper'
				: 'border-rule hover:bg-paper-2'}"
			onclick={() => pickMetric('bookValue')}
			aria-pressed={metric === 'bookValue'}>Book value</button
		>
	</div>

	<div class="mt-5 space-y-2">
		{#each values as v, i (i)}
			<div class="flex items-center gap-2">
				<span class="w-16 shrink-0 text-sm">Year {i + 1}</span>
				<div class="bg-paper-3 h-5 flex-1">
					<div class="bg-debit h-5 transition-[width] duration-200" style="width:{pct(v)}%"></div>
				</div>
				<span class="num w-20 shrink-0 text-right text-sm">{fmt(v, { dollar: true })}</span>
			</div>
		{/each}
	</div>

	{#if metric === 'expense'}
		<div class="border-rule-2 mt-4 flex justify-between border-t pt-2 text-sm font-medium">
			<span>Total</span><span class="num">{fmt(total, { dollar: true })}</span>
		</div>
	{:else}
		<p class="text-ink-2 mt-3 text-xs">Salvage value {fmt(machineSalvage, { dollar: true })} is the floor every method ends at.</p>
	{/if}
</div>
