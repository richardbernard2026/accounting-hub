<script lang="ts">
	/** Move the overstatement and watch year 1's profit gain exactly what year 2's loses. */
	import { fmt } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	interface ErrorSeesaw {
		overstatement: number;
		correctCogsY1: number;
		reportedCogsY1: number;
		correctGpY1: number;
		reportedGpY1: number;
		correctCogsY2: number;
		reportedCogsY2: number;
		correctGpY2: number;
		reportedGpY2: number;
		swingY1: number;
		swingY2: number;
	}

	let {
		chapter,
		href,
		compute
	}: {
		chapter: number;
		href?: string;
		compute: (overstatement: number) => ErrorSeesaw;
	} = $props();

	let overstatement = $state(2000);
	let touched = $state(false);
	const s = $derived(compute(overstatement));

	function setOverstatement(v: number) {
		overstatement = v;
		touched = true;
	}
	const sentence = $derived(
		`Overstating year 1's ending inventory by ${fmt(overstatement, { dollar: true })}: year 1 profit swings ${fmt(s.swingY1, { dollar: true })}, year 2 swings ${fmt(s.swingY2, { dollar: true })}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<label class="flex items-center gap-2 text-sm" for="overstatement-slider">
			<span>Year 1 ending inventory overstated by</span>
			<span class="num font-medium">{fmt(overstatement, { dollar: true })}</span>
		</label>
		<PinState {chapter} lo="A1" label="Inventory error see-saw" {href} {sentence} dirty={touched} />
	</div>
	<input
		id="overstatement-slider"
		type="range"
		min="0"
		max="5000"
		step="500"
		value={overstatement}
		oninput={(e) => setOverstatement(Number((e.target as HTMLInputElement).value))}
		class="mt-2 w-full"
	/>

	<div class="mt-6 grid gap-4 sm:grid-cols-2">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Year 1</div>
			<div class="mt-1 flex justify-between"><span>Cost of goods sold, reported</span><span class="num">{fmt(s.reportedCogsY1, { dollar: true })}</span></div>
			<div class="flex justify-between"><span>Cost of goods sold, correct</span><span class="num">{fmt(s.correctCogsY1, { dollar: true })}</span></div>
			<div class="border-rule-2 mt-1 flex justify-between border-t pt-1"><span>Gross profit, reported</span><span class="num">{fmt(s.reportedGpY1, { dollar: true })}</span></div>
			<div class="flex justify-between font-medium"><span>Gross profit, correct</span><span class="num">{fmt(s.correctGpY1, { dollar: true })}</span></div>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Year 2</div>
			<div class="mt-1 flex justify-between"><span>Cost of goods sold, reported</span><span class="num">{fmt(s.reportedCogsY2, { dollar: true })}</span></div>
			<div class="flex justify-between"><span>Cost of goods sold, correct</span><span class="num">{fmt(s.correctCogsY2, { dollar: true })}</span></div>
			<div class="border-rule-2 mt-1 flex justify-between border-t pt-1"><span>Gross profit, reported</span><span class="num">{fmt(s.reportedGpY2, { dollar: true })}</span></div>
			<div class="flex justify-between font-medium"><span>Gross profit, correct</span><span class="num">{fmt(s.correctGpY2, { dollar: true })}</span></div>
		</div>
	</div>

	<div class="mt-4 flex justify-between text-sm">
		<span>Year 1 profit swing</span><span class="num font-medium {s.swingY1 >= 0 ? 'text-warn' : 'text-ok'}">{s.swingY1 >= 0 ? '+' : ''}{fmt(s.swingY1, { dollar: true })}</span>
	</div>
	<div class="flex justify-between text-sm">
		<span>Year 2 profit swing</span><span class="num font-medium {s.swingY2 >= 0 ? 'text-warn' : 'text-ok'}">{s.swingY2 >= 0 ? '+' : ''}{fmt(s.swingY2, { dollar: true })}</span>
	</div>
	<div class="border-rule-2 mt-1 flex justify-between border-t pt-1 text-sm font-medium">
		<span>Two-year total</span><span class="num">{fmt(s.swingY1 + s.swingY2, { dollar: true })}</span>
	</div>
</div>
