<script lang="ts">
	/** Change sales and the warranty rate and watch the liability build before any repair happens. */
	import { fmt } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	let {
		chapter,
		href,
		defaultSales,
		defaultRate,
		defaultRepairsUsed,
		expenseOf,
		liabilityAfterRepairsOf
	}: {
		chapter: number;
		href?: string;
		defaultSales: number;
		defaultRate: number;
		defaultRepairsUsed: number;
		expenseOf: (sales: number, rate: number) => number;
		liabilityAfterRepairsOf: (sales: number, rate: number, repairsUsed: number) => number;
	} = $props();

	let sales = $state(defaultSales);
	let rate = $state(defaultRate * 100);
	let repairsUsed = $state(0);
	let touched = $state(false);

	function setSales(v: number) {
		sales = v;
		touched = true;
	}
	function setRate(v: number) {
		rate = v;
		touched = true;
	}
	function setRepairsUsed(v: number) {
		repairsUsed = v;
		touched = true;
	}

	const expense = $derived(expenseOf(sales, rate / 100));
	const liability = $derived(liabilityAfterRepairsOf(sales, rate / 100, repairsUsed));
	const sentence = $derived(
		`Sales ${fmt(sales, { dollar: true })} at ${rate}%: warranty expense ${fmt(expense, { dollar: true })}, liability after ${fmt(repairsUsed, { dollar: true })} of repairs ${fmt(liability, { dollar: true })}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<div class="text-ink-2 text-sm">In the year of sale</div>
		<PinState {chapter} lo="A1" label="Warranty accrual" {href} {sentence} dirty={touched} />
	</div>

	<div class="mt-4 grid gap-4 sm:grid-cols-2">
		<label class="text-sm">
			<span class="flex justify-between"><span>Sales</span><span class="num font-medium">{fmt(sales, { dollar: true })}</span></span>
			<input
				type="range"
				min="0"
				max="400000"
				step="10000"
				value={sales}
				oninput={(e) => setSales(Number((e.target as HTMLInputElement).value))}
				class="mt-2 w-full"
			/>
		</label>
		<label class="text-sm">
			<span class="flex justify-between"><span>Warranty rate</span><span class="num font-medium">{rate}%</span></span>
			<input
				type="range"
				min="1"
				max="8"
				step="1"
				value={rate}
				oninput={(e) => setRate(Number((e.target as HTMLInputElement).value))}
				class="mt-2 w-full"
			/>
		</label>
	</div>

	<div class="mt-4 border-rule-2 bg-paper border px-3 py-2 text-sm">
		<div class="eyebrow">Warranty expense, recorded now</div>
		<p class="num mt-1 text-lg">{fmt(expense, { dollar: true })}</p>
	</div>

	<label class="mt-6 block text-sm">
		<span class="flex justify-between"
			><span>Later: repairs made using parts</span><span class="num font-medium">{fmt(repairsUsed, { dollar: true })}</span></span
		>
		<input
			type="range"
			min="0"
			max={expense}
			step="500"
			value={repairsUsed}
			oninput={(e) => setRepairsUsed(Number((e.target as HTMLInputElement).value))}
			class="mt-2 w-full"
		/>
	</label>

	<div class="mt-4 grid gap-4 sm:grid-cols-2">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Warranty expense (unchanged by repairs)</div>
			<p class="num mt-1 text-lg">{fmt(expense, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Liability remaining</div>
			<p class="num mt-1 text-lg">{fmt(liability, { dollar: true })}</p>
		</div>
	</div>
</div>
