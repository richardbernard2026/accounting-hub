<script lang="ts">
	/** Move the sale price and watch the gain or loss against book value, not cost. */
	import { fmt } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	let {
		chapter,
		href,
		cost,
		accumulatedDepreciation,
		bookValue,
		gainOrLossOf
	}: {
		chapter: number;
		href?: string;
		cost: number;
		accumulatedDepreciation: number;
		bookValue: number;
		gainOrLossOf: (proceeds: number) => number;
	} = $props();

	let proceeds = $state(bookValue);
	let touched = $state(false);

	function setProceeds(v: number) {
		proceeds = v;
		touched = true;
	}
	const result = $derived(gainOrLossOf(proceeds));
	const sentence = $derived(
		`Sold for ${fmt(proceeds, { dollar: true })}: ${result >= 0 ? 'gain' : 'loss'} of ${fmt(Math.abs(result), { dollar: true })} against book value ${fmt(bookValue, { dollar: true })}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<label class="flex items-center gap-2 text-sm" for="proceeds-slider">
			<span>Sale price</span>
			<span class="num font-medium">{fmt(proceeds, { dollar: true })}</span>
		</label>
		<PinState {chapter} lo="A1" label="Disposal" {href} {sentence} dirty={touched} />
	</div>
	<input
		id="proceeds-slider"
		type="range"
		min="0"
		max={cost}
		step="100"
		value={proceeds}
		oninput={(e) => setProceeds(Number((e.target as HTMLInputElement).value))}
		class="mt-2 w-full"
	/>

	<div class="mt-6 grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Cost</div>
			<p class="num mt-1 text-lg">{fmt(cost, { dollar: true })}</p>
			<p class="text-ink-2 text-xs">less accumulated depreciation {fmt(accumulatedDepreciation, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Book value</div>
			<p class="num mt-1 text-lg">{fmt(bookValue, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm {result >= 0 ? 'border-ok' : 'border-warn'}">
			<div class="eyebrow">{result >= 0 ? 'Gain' : 'Loss'}</div>
			<p class="num mt-1 text-lg">{fmt(Math.abs(result), { dollar: true })}</p>
		</div>
	</div>
</div>
