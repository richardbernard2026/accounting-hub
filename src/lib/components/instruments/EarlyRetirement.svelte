<script lang="ts">
	/** Move the call price and watch the gain or loss against carrying value, not par. */
	import { fmt } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	let {
		chapter,
		href,
		par,
		carryingValue,
		gainOrLossOf
	}: {
		chapter: number;
		href?: string;
		par: number;
		carryingValue: number;
		gainOrLossOf: (callPrice: number) => number;
	} = $props();

	let callPrice = $state(carryingValue);
	let touched = $state(false);

	function setCallPrice(v: number) {
		callPrice = v;
		touched = true;
	}
	const result = $derived(gainOrLossOf(callPrice));
	const sentence = $derived(
		`Called at ${fmt(callPrice, { dollar: true })}: ${result >= 0 ? 'gain' : 'loss'} of ${fmt(Math.abs(result), { dollar: true })} against carrying value ${fmt(carryingValue, { dollar: true })}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<label class="flex items-center gap-2 text-sm" for="call-price-slider">
			<span>Call price</span>
			<span class="num font-medium">{fmt(callPrice, { dollar: true })}</span>
		</label>
		<PinState {chapter} lo="A1" label="Early retirement" {href} {sentence} dirty={touched} />
	</div>
	<input
		id="call-price-slider"
		type="range"
		min={Math.round(par * 0.85)}
		max={Math.round(par * 1.15)}
		step="500"
		value={callPrice}
		oninput={(e) => setCallPrice(Number((e.target as HTMLInputElement).value))}
		class="mt-2 w-full"
	/>

	<div class="mt-6 grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Par value</div>
			<p class="num mt-1 text-lg">{fmt(par, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Carrying value</div>
			<p class="num mt-1 text-lg">{fmt(carryingValue, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm {result >= 0 ? 'border-ok' : 'border-warn'}">
			<div class="eyebrow">{result >= 0 ? 'Gain' : 'Loss'}</div>
			<p class="num mt-1 text-lg">{fmt(Math.abs(result), { dollar: true })}</p>
		</div>
	</div>
</div>
