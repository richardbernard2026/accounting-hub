<script lang="ts">
	/** Move either factor and watch return on assets move with it — margin times turnover. */
	import PinState from '../notes/PinState.svelte';

	let {
		chapter,
		href,
		defaultMargin,
		defaultTurnover,
		returnOnAssetsFrom
	}: {
		chapter: number;
		href?: string;
		defaultMargin: number;
		defaultTurnover: number;
		returnOnAssetsFrom: (marginPct: number, turnover: number) => number;
	} = $props();

	let margin = $state(defaultMargin);
	let turnover = $state(defaultTurnover);
	let touched = $state(false);

	function setMargin(v: number) {
		margin = v;
		touched = true;
	}
	function setTurnover(v: number) {
		turnover = v;
		touched = true;
	}

	const roa = $derived(returnOnAssetsFrom(margin, turnover));
	const sentence = $derived(`Profit margin ${margin}% × total asset turnover ${turnover} = return on assets ${roa}%.`);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<span class="text-sm">Margin × turnover</span>
		<PinState {chapter} lo="A3" label="Return on assets, taken apart" {href} {sentence} dirty={touched} />
	</div>

	<div class="mt-4">
		<label class="flex items-center gap-2 text-sm" for="margin-slider">
			<span>Profit margin</span>
			<span class="num font-medium">{margin}%</span>
		</label>
		<input
			id="margin-slider"
			type="range"
			min="2"
			max="20"
			step="0.5"
			value={margin}
			oninput={(e) => setMargin(Number((e.target as HTMLInputElement).value))}
			class="mt-2 w-full"
		/>
	</div>

	<div class="mt-4">
		<label class="flex items-center gap-2 text-sm" for="turnover-slider">
			<span>Total asset turnover</span>
			<span class="num font-medium">{turnover}</span>
		</label>
		<input
			id="turnover-slider"
			type="range"
			min="0.5"
			max="3"
			step="0.05"
			value={turnover}
			oninput={(e) => setTurnover(Number((e.target as HTMLInputElement).value))}
			class="mt-2 w-full"
		/>
	</div>

	<div class="mt-6 grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Profit margin</div>
			<p class="num mt-1 text-lg">{margin}%</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Total asset turnover</div>
			<p class="num mt-1 text-lg">{turnover}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Return on assets</div>
			<p class="num mt-1 text-lg">{roa}%</p>
		</div>
	</div>
</div>
