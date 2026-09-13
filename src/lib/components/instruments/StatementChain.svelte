<script lang="ts">
	/**
	 * Change December's rent and watch one number move through all four
	 * statements: income statement → retained earnings → balance sheet,
	 * with cash confirmed by the statement of cash flows.
	 */
	import { fmt } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	let {
		chapter,
		href,
		base,
		withRent
	}: {
		chapter: number;
		href?: string;
		base: { netIncome: number; endingRE: number; cash: number; totalAssets: number; totalEquity: number };
		withRent: (rent: number) => {
			netIncome: number;
			endingRE: number;
			cash: number;
			totalAssets: number;
			totalEquity: number;
		};
	} = $props();

	let rent = $state(1000);
	let touched = $state(false);
	const figures = $derived(rent === 1000 ? base : withRent(rent));
	const changed = $derived(rent !== 1000);

	function setRent(v: number) {
		rent = v;
		touched = true;
	}
	const sentence = $derived(
		`Rent at ${fmt(rent, { dollar: true })}: net income ${fmt(figures.netIncome, { dollar: true })} → retained earnings ${fmt(figures.endingRE, { dollar: true })} → cash ${fmt(figures.cash, { dollar: true })}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<label class="flex items-center gap-2 text-sm" for="rent-slider">
			<span>December rent</span>
			<span class="num font-medium">{fmt(rent, { dollar: true })}</span>
		</label>
		<PinState {chapter} lo="P1" label="Statement chain" {href} {sentence} dirty={touched} />
	</div>
	<input
		id="rent-slider"
		type="range"
		min="500"
		max="2000"
		step="100"
		value={rent}
		oninput={(e) => setRent(Number((e.target as HTMLInputElement).value))}
		class="mt-2 w-full"
	/>

	<div class="mt-6 grid gap-3 sm:grid-cols-4">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm {changed ? 'border-ink' : ''}">
			<div class="eyebrow">Income statement</div>
			<p class="num mt-1 text-lg">{fmt(figures.netIncome, { dollar: true })}</p>
			<p class="text-ink-2 text-xs">Net income</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm {changed ? 'border-ink' : ''}">
			<div class="eyebrow">Retained earnings</div>
			<p class="num mt-1 text-lg">{fmt(figures.endingRE, { dollar: true })}</p>
			<p class="text-ink-2 text-xs">Ending balance</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm {changed ? 'border-ink' : ''}">
			<div class="eyebrow">Balance sheet</div>
			<p class="num mt-1 text-lg">{fmt(figures.totalAssets, { dollar: true })}</p>
			<p class="text-ink-2 text-xs">Total assets</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm {changed ? 'border-ink' : ''}">
			<div class="eyebrow">Cash flows</div>
			<p class="num mt-1 text-lg">{fmt(figures.cash, { dollar: true })}</p>
			<p class="text-ink-2 text-xs">Ending cash</p>
		</div>
	</div>
</div>
