<script lang="ts">
	/** Move the dividend declared and toggle cumulative/noncumulative to see who gets paid first. */
	import { fmt } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	let {
		chapter,
		href,
		preferredShares,
		preferredParValue,
		preferredRate,
		preferredAnnualEntitlement,
		arrearsFromYear1,
		defaultDeclared,
		allocateDividend
	}: {
		chapter: number;
		href?: string;
		preferredShares: number;
		preferredParValue: number;
		preferredRate: number;
		preferredAnnualEntitlement: number;
		arrearsFromYear1: number;
		defaultDeclared: number;
		allocateDividend: (declared: number, cumulative: boolean) => { preferred: number; common: number };
	} = $props();

	let declared = $state(defaultDeclared);
	let cumulative = $state(true);
	let touched = $state(false);

	function setDeclared(v: number) {
		declared = v;
		touched = true;
	}
	function setCumulative(v: boolean) {
		cumulative = v;
		touched = true;
	}

	const result = $derived(allocateDividend(declared, cumulative));
	const preferredClaim = $derived(cumulative ? arrearsFromYear1 + preferredAnnualEntitlement : preferredAnnualEntitlement);
	const sentence = $derived(
		`Declared ${fmt(declared, { dollar: true })}, ${cumulative ? 'cumulative' : 'noncumulative'}: preferred ${fmt(result.preferred, { dollar: true })}, common ${fmt(result.common, { dollar: true })}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<label class="flex items-center gap-2 text-sm" for="declared-slider">
			<span>Dividend declared</span>
			<span class="num font-medium">{fmt(declared, { dollar: true })}</span>
		</label>
		<PinState {chapter} lo="A1" label="Preferred dividend allocator" {href} {sentence} dirty={touched} />
	</div>
	<input
		id="declared-slider"
		type="range"
		min="0"
		max="30000"
		step="1000"
		value={declared}
		oninput={(e) => setDeclared(Number((e.target as HTMLInputElement).value))}
		class="mt-2 w-full"
	/>

	<div class="mt-4 flex gap-1.5">
		<button
			class="border px-2.5 py-1 text-sm transition-colors {cumulative
				? 'border-ink bg-ink text-paper'
				: 'border-rule hover:bg-paper-2'}"
			onclick={() => setCumulative(true)}
			aria-pressed={cumulative}>Cumulative</button
		>
		<button
			class="border px-2.5 py-1 text-sm transition-colors {!cumulative
				? 'border-ink bg-ink text-paper'
				: 'border-rule hover:bg-paper-2'}"
			onclick={() => setCumulative(false)}
			aria-pressed={!cumulative}>Noncumulative</button
		>
	</div>

	<div class="mt-4 grid gap-4 sm:grid-cols-3 text-sm">
		<div class="border-rule-2 bg-paper border px-3 py-2">
			<div class="eyebrow">{preferredShares.toLocaleString()} preferred shares, {(preferredRate * 100).toFixed(0)}% of {fmt(preferredParValue, { dollar: true })} par</div>
			<p class="num mt-1 text-lg">{fmt(preferredAnnualEntitlement, { dollar: true })} a year</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2">
			<div class="eyebrow">Arrears carried in{cumulative ? '' : ' (forfeited)'}</div>
			<p class="num mt-1 text-lg">{fmt(cumulative ? arrearsFromYear1 : 0, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2">
			<div class="eyebrow">Preferred's full claim this year</div>
			<p class="num mt-1 text-lg">{fmt(preferredClaim, { dollar: true })}</p>
		</div>
	</div>

	<div class="mt-4 grid gap-4 sm:grid-cols-2">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Preferred</div>
			<p class="num mt-1 text-lg">{fmt(result.preferred, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Common</div>
			<p class="num mt-1 text-lg">{fmt(result.common, { dollar: true })}</p>
		</div>
	</div>
</div>
