<script lang="ts">
	/**
	 * One market-rate slider prices the bond and redraws its carrying value
	 * across all 8 periods for both amortization methods at once. At 8% the
	 * bond sells at par and both schedules are flat lines — moving off 8% is
	 * what makes there be anything to notice.
	 */
	import { fmt } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	let {
		chapter,
		href,
		par,
		cashInterest,
		periods,
		bondPrice,
		straightLineCarryingSchedule,
		effectiveInterestCarryingSchedule
	}: {
		chapter: number;
		href?: string;
		par: number;
		cashInterest: number;
		periods: number;
		bondPrice: (marketRatePct: number) => number;
		straightLineCarryingSchedule: (marketRatePct: number) => number[];
		effectiveInterestCarryingSchedule: (marketRatePct: number) => number[];
	} = $props();

	let marketRate = $state(8);
	let touched = $state(false);

	function setMarketRate(v: number) {
		marketRate = v;
		touched = true;
	}

	const price = $derived(bondPrice(marketRate));
	const diff = $derived(round2(price - par));
	function round2(n: number) {
		return Math.round(n * 100) / 100;
	}
	const label = $derived(diff > 0 ? 'Premium' : diff < 0 ? 'Discount' : 'Par');
	const slSchedule = $derived(straightLineCarryingSchedule(marketRate));
	const eiSchedule = $derived(effectiveInterestCarryingSchedule(marketRate));

	const sentence = $derived(
		`Market rate ${marketRate}%: issue price ${fmt(price, { dollar: true })}${label === 'Par' ? ' — par' : ` (${label.toLowerCase()} ${fmt(Math.abs(diff), { dollar: true })})`}, carrying value walks to ${fmt(par, { dollar: true })} by period ${periods}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<label class="flex items-center gap-2 text-sm" for="market-rate-slider">
			<span>Market rate</span>
			<span class="num font-medium">{marketRate}%</span>
		</label>
		<PinState {chapter} lo="P1" label="Bond price and carrying value" {href} {sentence} dirty={touched} />
	</div>
	<input
		id="market-rate-slider"
		type="range"
		min="4"
		max="12"
		step="0.5"
		value={marketRate}
		oninput={(e) => setMarketRate(Number((e.target as HTMLInputElement).value))}
		class="mt-2 w-full"
	/>

	<div class="mt-6 grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Cash interest, every period</div>
			<p class="num mt-1 text-lg">{fmt(cashInterest, { dollar: true })}</p>
			<p class="text-ink-2 text-xs">par × 4% — fixed by contract</p>
		</div>
		<div
			class="border-rule-2 bg-paper border px-3 py-2 text-sm {label === 'Par'
				? ''
				: label === 'Discount'
					? 'border-warn'
					: 'border-ok'}"
		>
			<div class="eyebrow">Issue price ({label})</div>
			<p class="num mt-1 text-lg">{fmt(price, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">{label === 'Par' ? 'Discount / premium' : label}</div>
			<p class="num mt-1 text-lg">{fmt(Math.abs(diff), { dollar: true })}</p>
		</div>
	</div>

	<div class="mt-6">
		<div class="kicker mb-2">Carrying value by period</div>
		<div class="overflow-x-auto">
			<table class="ledger w-full text-sm">
				<thead>
					<tr class="text-ink-2 text-left">
						<th class="pb-1 font-normal">Period</th>
						<th class="pb-1 text-right font-normal">Straight-line</th>
						<th class="pb-1 text-right font-normal">Effective interest</th>
					</tr>
				</thead>
				<tbody>
					{#each slSchedule as v, i (i)}
						<tr>
							<td>{i === 0 ? 'Issue' : i}</td>
							<td class="num text-right">{fmt(v, { dollar: true })}</td>
							<td class="num text-right">{fmt(eiSchedule[i], { dollar: true })}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
