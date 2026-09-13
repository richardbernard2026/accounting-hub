<script lang="ts">
	/**
	 * Chapter 5's hero: step through Trekking's six transactions while a
	 * method toggle controls which costing method's layers are drawn as
	 * stacked blocks. All three methods' income statements run live, side by
	 * side, from the same replay() results — nothing here is hardcoded.
	 */
	import { fmt } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	interface Layer {
		units: number;
		cost: number;
	}
	interface StepState {
		layers: Layer[];
		cogs?: number;
		cumulativeCogs: number;
		cumulativeSales: number;
	}
	interface Transaction {
		date: string;
		label: string;
		kind: 'purchase' | 'sale';
		units: number;
	}

	let {
		chapter,
		href,
		transactions,
		methodSteps,
		goodsAvailableCost
	}: {
		chapter: number;
		href?: string;
		transactions: Transaction[];
		methodSteps: Record<'fifo' | 'lifo' | 'wavg', StepState[]>;
		goodsAvailableCost: number;
	} = $props();

	const METHODS: { id: 'fifo' | 'lifo' | 'wavg'; label: string }[] = [
		{ id: 'fifo', label: 'FIFO' },
		{ id: 'lifo', label: 'LIFO' },
		{ id: 'wavg', label: 'Weighted average' }
	];

	let stepIndex = $state(0);
	let currentApplied = $state(false);
	let visualMethod = $state<'fifo' | 'lifo' | 'wavg'>('fifo');
	let touched = $state(false);

	function next() {
		touched = true;
		if (!currentApplied) currentApplied = true;
		else if (stepIndex < transactions.length - 1) {
			stepIndex++;
			currentApplied = false;
		}
	}
	function back() {
		if (currentApplied) currentApplied = false;
		else if (stepIndex > 0) {
			stepIndex--;
			currentApplied = true;
		}
	}
	function jump(i: number) {
		touched = true;
		stepIndex = i;
		currentApplied = false;
	}
	function pickMethod(m: 'fifo' | 'lifo' | 'wavg') {
		visualMethod = m;
		touched = true;
	}

	const applied = $derived(stepIndex + (currentApplied ? 1 : 0));
	const done = $derived(applied === transactions.length);
	const zero: StepState = { layers: [], cumulativeCogs: 0, cumulativeSales: 0 };
	const stateAt = (m: 'fifo' | 'lifo' | 'wavg') => (applied === 0 ? zero : methodSteps[m][applied - 1]);
	const visualLayers = $derived(stateAt(visualMethod).layers);

	function pct(units: number) {
		return Math.max(2, (units / 55) * 100);
	}
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<div class="flex flex-wrap gap-1">
			{#each transactions as t, i (t.date + t.kind)}
				<button
					class="border px-2 py-0.5 text-xs transition-colors {i === stepIndex
						? 'border-ink bg-ink text-paper'
						: i < applied
							? 'border-ok bg-ok-soft text-ok'
							: 'border-rule hover:bg-paper-2'}"
					onclick={() => jump(i)}
					aria-pressed={i === stepIndex}>{i + 1}</button
				>
			{/each}
		</div>
		<PinState {chapter} lo="C1" label="Cost layers" {href} sentence={`After ${applied} of ${transactions.length} transactions.`} dirty={touched} />
	</div>

	<div class="border-rule bg-paper-2/40 mt-4 border p-4">
		<div class="text-ink-3 text-xs">Transaction {stepIndex + 1} of {transactions.length}</div>
		<p class="mt-1 text-[1.05rem] leading-snug">{transactions[stepIndex].label}</p>
		<div class="mt-4 flex items-center gap-2">
			<button class="btn btn-quiet text-sm" onclick={back} disabled={stepIndex === 0 && !currentApplied}
				>← Back</button
			>
			<button class="btn text-sm" onclick={next} disabled={stepIndex === transactions.length - 1 && currentApplied}>
				{currentApplied ? 'Next →' : 'Apply this transaction'}
			</button>
		</div>
	</div>

	<div class="mt-6 flex flex-wrap items-center justify-between gap-3">
		<div class="flex flex-wrap gap-1.5">
			{#each METHODS as m (m.id)}
				<button
					class="border px-2.5 py-1 text-sm transition-colors {visualMethod === m.id
						? 'border-ink bg-ink text-paper'
						: 'border-rule hover:bg-paper-2'}"
					onclick={() => pickMethod(m.id)}
					aria-pressed={visualMethod === m.id}>{m.label}</button
				>
			{/each}
		</div>
		<span class="text-ink-2 text-xs">Layers drawn oldest at the bottom</span>
	</div>

	<div class="border-rule-2 bg-paper mt-3 flex min-h-[7rem] flex-col-reverse gap-0.5 border p-3">
		{#if visualLayers.length === 0}
			<div class="text-ink-3 py-6 text-center text-sm">The shelf is empty.</div>
		{:else}
			{#each visualLayers as l, i (i)}
				<div
					class="flex items-center justify-between px-2 py-1.5 text-sm {visualMethod === 'wavg'
						? 'bg-paper-3'
						: i % 2 === 0
							? 'bg-debit-soft'
							: 'bg-paper-3'}"
					style="width:{pct(l.units)}%"
				>
					<span class="num">{l.units} × {fmt(l.cost, { dollar: true })}</span>
				</div>
			{/each}
		{/if}
	</div>

	<div class="border-rule-2 mt-6 border-t pt-6">
		<div class="kicker mb-3">Three income statements, live</div>
		<div class="grid gap-4 sm:grid-cols-3">
			{#each METHODS as m (m.id)}
				{@const s = stateAt(m.id)}
				<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
					<div class="eyebrow">{m.label}</div>
					<div class="mt-1 flex justify-between"><span>Sales</span><span class="num">{fmt(s.cumulativeSales, { dollar: true })}</span></div>
					<div class="flex justify-between"><span>Cost of goods sold</span><span class="num">{fmt(s.cumulativeCogs, { dollar: true })}</span></div>
					<div class="border-rule-2 mt-1 flex justify-between border-t pt-1 font-medium">
						<span>Gross profit</span><span class="num">{fmt(s.cumulativeSales - s.cumulativeCogs, { dollar: true })}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>

	{#if done}
		<div class="border-rule-2 mt-6 border-t pt-6 text-sm">
			<span class="text-ink-2">Goods available for sale, every method:</span>
			<span class="num font-medium">{fmt(goodsAvailableCost, { dollar: true })}</span>
		</div>
	{/if}
</div>
