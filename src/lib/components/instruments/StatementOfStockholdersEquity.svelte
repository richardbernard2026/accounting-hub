<script lang="ts">
	/** Step through each equity event and watch every column reconcile to the ending balance sheet. */
	import { fmt } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	interface EquityStep {
		label: string;
		commonStock: number;
		paidInExcess: number;
		paidInTreasury: number;
		retainedEarnings: number;
		treasuryStock: number;
		totalEquity: number;
	}

	let {
		chapter,
		href,
		rows
	}: {
		chapter: number;
		href?: string;
		rows: EquityStep[];
	} = $props();

	let rowIndex = $state(0);
	let touched = $state(false);

	function setRowIndex(v: number) {
		rowIndex = v;
		touched = true;
	}

	const current = $derived(rows[rowIndex]);
	const sentence = $derived(
		`Through "${current.label}": retained earnings ${fmt(current.retainedEarnings, { dollar: true })}, total equity ${fmt(current.totalEquity, { dollar: true })}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<label class="flex items-center gap-2 text-sm" for="row-slider">
			<span>Through</span>
			<span class="num font-medium">{current.label}</span>
		</label>
		<PinState {chapter} lo="P4" label="Statement of stockholders' equity" {href} {sentence} dirty={touched} />
	</div>
	<input
		id="row-slider"
		type="range"
		min="0"
		max={rows.length - 1}
		step="1"
		value={rowIndex}
		oninput={(e) => setRowIndex(Number((e.target as HTMLInputElement).value))}
		class="mt-2 w-full"
	/>

	<div class="mt-6 grid gap-4 sm:grid-cols-2">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Retained earnings</div>
			<p class="num mt-1 text-lg">{fmt(current.retainedEarnings, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Total equity</div>
			<p class="num mt-1 text-lg">{fmt(current.totalEquity, { dollar: true })}</p>
		</div>
	</div>

	<div class="mt-6 overflow-x-auto">
		<table class="ledger w-full text-sm">
			<thead>
				<tr class="text-ink-2 text-left">
					<th class="pb-1 font-normal">Event</th>
					<th class="pb-1 text-right font-normal">Common stock</th>
					<th class="pb-1 text-right font-normal">Paid-in capital</th>
					<th class="pb-1 text-right font-normal">Retained earnings</th>
					<th class="pb-1 text-right font-normal">Treasury stock</th>
					<th class="pb-1 text-right font-normal">Total</th>
				</tr>
			</thead>
			<tbody>
				{#each rows as row, i (row.label)}
					<tr class={i === rowIndex ? 'font-medium' : ''}>
						<td>{row.label}{i === rowIndex ? ' ←' : ''}</td>
						<td class="num text-right">{fmt(row.commonStock, { dollar: true })}</td>
						<td class="num text-right">{fmt(row.paidInExcess + row.paidInTreasury, { dollar: true })}</td>
						<td class="num text-right">{fmt(row.retainedEarnings, { dollar: true })}</td>
						<td class="num text-right">({fmt(row.treasuryStock, { dollar: true })})</td>
						<td class="num text-right">{fmt(row.totalEquity, { dollar: true })}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
