<script lang="ts">
	/** Drag year end across the note's term and watch the interest split between two years. */
	import { fmt, round } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	let {
		chapter,
		href,
		principal,
		rate,
		totalDays,
		defaultDaysToYearEnd
	}: {
		chapter: number;
		href?: string;
		principal: number;
		rate: number;
		totalDays: number;
		defaultDaysToYearEnd: number;
	} = $props();

	let daysToYearEnd = $state(defaultDaysToYearEnd);
	let touched = $state(false);

	function setDays(v: number) {
		daysToYearEnd = v;
		touched = true;
	}
	const totalInterest = $derived(round(principal * (rate / 100) * (totalDays / 360)));
	const accrued = $derived(round(principal * (rate / 100) * (daysToYearEnd / 360)));
	const remaining = $derived(round(totalInterest - accrued));
	const maturityValue = $derived(round(principal + totalInterest));

	const sentence = $derived(
		`Year end at day ${daysToYearEnd} of ${totalDays}: ${fmt(accrued, { dollar: true })} accrued this year, ${fmt(remaining, { dollar: true })} belongs to next year.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<label class="flex items-center gap-2 text-sm" for="year-end-slider">
			<span>Year end falls on day</span>
			<span class="num font-medium">{daysToYearEnd} of {totalDays}</span>
		</label>
		<PinState {chapter} lo="P2" label="Note payable across year end" {href} {sentence} dirty={touched} />
	</div>
	<input
		id="year-end-slider"
		type="range"
		min="0"
		max={totalDays}
		step="1"
		value={daysToYearEnd}
		oninput={(e) => setDays(Number((e.target as HTMLInputElement).value))}
		class="mt-2 w-full"
	/>

	<div class="mt-6 grid gap-4 sm:grid-cols-2">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Accrued this year</div>
			<p class="num mt-1 text-lg">{fmt(accrued, { dollar: true })}</p>
			<p class="text-ink-2 text-xs">{daysToYearEnd} days</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Belongs to next year</div>
			<p class="num mt-1 text-lg">{fmt(remaining, { dollar: true })}</p>
			<p class="text-ink-2 text-xs">{totalDays - daysToYearEnd} days</p>
		</div>
	</div>

	<div class="mt-4 flex justify-between text-sm">
		<span>Principal {fmt(principal, { dollar: true })} + total interest {fmt(totalInterest, { dollar: true })}</span>
		<span class="num font-medium">Maturity value {fmt(maturityValue, { dollar: true })}</span>
	</div>
</div>
