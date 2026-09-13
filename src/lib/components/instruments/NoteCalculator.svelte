<script lang="ts">
	/** Change the principal, rate, and days on a promissory note and watch interest, maturity value, and the year-end accrual. */
	import { fmt } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	let {
		chapter,
		href,
		defaultPrincipal,
		defaultRate,
		defaultDays,
		daysToYearEnd,
		interestOf,
		maturityValueOf,
		accruedOf
	}: {
		chapter: number;
		href?: string;
		defaultPrincipal: number;
		defaultRate: number;
		defaultDays: number;
		daysToYearEnd: number;
		interestOf: (principal: number, rate: number, days: number) => number;
		maturityValueOf: (principal: number, rate: number, days: number) => number;
		accruedOf: (principal: number, rate: number, daysElapsed: number, totalDays: number) => number;
	} = $props();

	let principal = $state(defaultPrincipal);
	let rate = $state(defaultRate);
	let days = $state(defaultDays);
	let touched = $state(false);

	function set(field: 'principal' | 'rate' | 'days', v: number) {
		touched = true;
		if (field === 'principal') principal = v;
		else if (field === 'rate') rate = v;
		else days = v;
	}

	const interest = $derived(interestOf(principal, rate, days));
	const maturityValue = $derived(maturityValueOf(principal, rate, days));
	const accrued = $derived(accruedOf(principal, rate, daysToYearEnd, days));

	const sentence = $derived(
		`${fmt(principal, { dollar: true })} at ${rate}% for ${days} days: interest ${fmt(interest, { dollar: true })}, maturity value ${fmt(maturityValue, { dollar: true })}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<div class="text-ink-2 text-sm">Interest on a 360-day year</div>
		<PinState {chapter} lo="P2" label="Note calculator" {href} {sentence} dirty={touched} />
	</div>

	<div class="mt-4 grid gap-4 sm:grid-cols-3">
		<label class="text-sm">
			<span class="flex justify-between"><span>Principal</span><span class="num font-medium">{fmt(principal, { dollar: true })}</span></span>
			<input
				type="range"
				min="1000"
				max="20000"
				step="500"
				value={principal}
				oninput={(e) => set('principal', Number((e.target as HTMLInputElement).value))}
				class="mt-2 w-full"
			/>
		</label>
		<label class="text-sm">
			<span class="flex justify-between"><span>Rate</span><span class="num font-medium">{rate}%</span></span>
			<input
				type="range"
				min="3"
				max="18"
				step="1"
				value={rate}
				oninput={(e) => set('rate', Number((e.target as HTMLInputElement).value))}
				class="mt-2 w-full"
			/>
		</label>
		<label class="text-sm">
			<span class="flex justify-between"><span>Days</span><span class="num font-medium">{days}</span></span>
			<input
				type="range"
				min="30"
				max="180"
				step="30"
				value={days}
				oninput={(e) => set('days', Number((e.target as HTMLInputElement).value))}
				class="mt-2 w-full"
			/>
		</label>
	</div>

	<div class="mt-6 grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Interest</div>
			<p class="num mt-1 text-lg">{fmt(interest, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Maturity value</div>
			<p class="num mt-1 text-lg">{fmt(maturityValue, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Accrued at Dec 31</div>
			<p class="num mt-1 text-lg">{fmt(accrued, { dollar: true })}</p>
			<p class="text-ink-2 text-xs">{Math.min(daysToYearEnd, days)} of {days} days</p>
		</div>
	</div>
</div>
