<script lang="ts">
	/** Drop the market price and watch the write-down reach cost of goods sold — never above cost, either. */
	import { fmt, round } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	let {
		chapter,
		href,
		units,
		cost
	}: {
		chapter: number;
		href?: string;
		units: number;
		cost: number;
	} = $props();

	let market = $state(cost);
	let touched = $state(false);

	function setMarket(v: number) {
		market = v;
		touched = true;
	}

	const costTotal = $derived(units * cost);
	const marketTotal = $derived(units * market);
	const reported = $derived(Math.min(costTotal, marketTotal));
	const writeDown = $derived(round(Math.max(0, costTotal - marketTotal)));
	const sentence = $derived(
		writeDown > 0
			? `Market at ${fmt(market, { dollar: true })}: inventory written down ${fmt(costTotal, { dollar: true })} → ${fmt(reported, { dollar: true })}, cost of goods sold up ${fmt(writeDown, { dollar: true })}.`
			: `Market at ${fmt(market, { dollar: true })}: at or above cost, so inventory stays at ${fmt(costTotal, { dollar: true })}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<label class="flex items-center gap-2 text-sm" for="market-slider">
			<span>Market price per unit</span>
			<span class="num font-medium">{fmt(market, { dollar: true })}</span>
		</label>
		<PinState {chapter} lo="C3" label="Lower of cost or market" {href} {sentence} dirty={touched} />
	</div>
	<input
		id="market-slider"
		type="range"
		min={Math.round(cost * 0.5)}
		max={Math.round(cost * 1.5)}
		step="1"
		value={market}
		oninput={(e) => setMarket(Number((e.target as HTMLInputElement).value))}
		class="mt-2 w-full"
	/>
	<div class="text-ink-2 mt-1 flex justify-between text-xs">
		<span>Below cost: written down</span>
		<span>At or above cost: {fmt(cost, { dollar: true })} stays</span>
	</div>

	<div class="mt-6 grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Cost</div>
			<p class="num mt-1 text-lg">{fmt(costTotal, { dollar: true })}</p>
			<p class="text-ink-2 text-xs">{units} units × {fmt(cost, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm {writeDown > 0 ? 'border-warn' : ''}">
			<div class="eyebrow">Reported inventory</div>
			<p class="num mt-1 text-lg">{fmt(reported, { dollar: true })}</p>
			<p class="text-ink-2 text-xs">Lower of cost or market</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Cost of goods sold</div>
			<p class="num mt-1 text-lg">{writeDown > 0 ? `+${fmt(writeDown, { dollar: true })}` : '—'}</p>
			<p class="text-ink-2 text-xs">{writeDown > 0 ? 'The write-down' : 'No write-down needed'}</p>
		</div>
	</div>
</div>
