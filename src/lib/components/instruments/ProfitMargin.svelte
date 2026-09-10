<script lang="ts">
	import { fmt } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';
	let { chapter, netIncome, netSales }: { chapter: number; netIncome: number; netSales: number } =
		$props();
	// svelte-ignore state_referenced_locally
	let ni = $state(netIncome);
	// svelte-ignore state_referenced_locally
	let sales = $state(netSales);
	const margin = $derived(sales > 0 ? Math.min(1, ni / sales) : 0);
	$effect(() => {
		if (ni > sales) ni = sales;
	});
	const dirty = $derived(ni !== netIncome || sales !== netSales);
	const sentence = $derived(
		`Profit margin = net income ${fmt(ni, { dollar: true })} ÷ net sales ${fmt(sales, { dollar: true })} = ${(margin * 100).toFixed(1)}%: ${(margin * 100).toFixed(1)} cents of every sales dollar became profit.`
	);
	function reset() {
		ni = netIncome;
		sales = netSales;
	}
</script>

<div class="border-rule bg-paper-2/40 border p-4 sm:p-5">
	<div class="flex items-start justify-between gap-3">
		<div>
			<div class="eyebrow">Instrument · Wild A2</div>
			<h3 class="mt-0.5 text-lg">Profit margin</h3>
		</div>
		<div class="flex gap-2">
			{#if dirty}<button class="btn btn-quiet text-xs" onclick={reset}>FastForward</button>{/if}
			<PinState
				{chapter}
				lo="A2"
				label="Profit margin"
				{sentence}
				{dirty}
				data={{
					'net income': fmt(ni),
					'net sales': fmt(sales),
					margin: `${(margin * 100).toFixed(1)}%`
				}}
			/>
		</div>
	</div>
	<div class="mt-4 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
		<div class="space-y-4">
			<label class="block text-sm">
				<span class="flex justify-between"
					><span>Net income</span><span class="num">{fmt(ni, { dollar: true })}</span></span
				>
				<input
					type="range"
					min="0"
					max={Math.max(sales, 1)}
					step="5"
					bind:value={ni}
					class="mt-1 w-full accent-[var(--debit)]"
				/>
			</label>
			<label class="block text-sm">
				<span class="flex justify-between"
					><span>Net sales</span><span class="num">{fmt(sales, { dollar: true })}</span></span
				>
				<input
					type="range"
					min="1000"
					max="20000"
					step="50"
					bind:value={sales}
					class="mt-1 w-full accent-[var(--credit)]"
				/>
			</label>
			<div class="bg-paper-3 relative h-4 w-full" aria-hidden="true">
				<div
					class="bg-ink absolute inset-y-0 left-0 transition-[width] duration-150"
					style="width:{Math.min(100, margin * 100)}%"
				></div>
			</div>
			<p class="text-ink-2 text-sm">
				Each sales dollar: <span class="num text-ink">{(margin * 100).toFixed(1)}¢</span> kept as
				profit, <span class="num text-ink">{Math.max(0, 100 - margin * 100).toFixed(1)}¢</span> consumed
				by expenses.
			</p>
		</div>
		<div class="text-center sm:min-w-44">
			<div class="eyebrow">Net income ÷ Net sales</div>
			<div class="num font-serif text-[3rem] leading-none">
				{(margin * 100).toFixed(1)}<span class="text-ink-3 text-xl">%</span>
			</div>
			<div class="num text-ink-3 mt-1 text-xs">{fmt(ni)} ÷ {fmt(sales)}</div>
		</div>
	</div>
</div>
