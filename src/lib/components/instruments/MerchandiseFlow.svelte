<script lang="ts">
	/**
	 * Chapter 4's hero: five steps, two of them firing paired entries — a
	 * price entry above, a cost entry below. A shelf tracks units and their
	 * cost per unit alongside the dollar figures, which come from post().
	 */
	import type { Account, Entry } from '$lib/ledger';
	import { fmt, post, round } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';
	import JournalEntry from '../ledger/JournalEntry.svelte';

	interface Step {
		id: string;
		label: string;
		entryIds: string[];
	}

	let {
		chapter,
		href,
		steps,
		entries,
		accounts,
		accountName,
		unitDeltas,
		unitsBought,
		netSales,
		costOfGoodsSold,
		grossProfit,
		grossMarginRatio
	}: {
		chapter: number;
		href?: string;
		steps: Step[];
		entries: Entry[];
		accounts: Account[];
		accountName: (n: string) => string;
		/** Net unit change on the shelf after each step, in step order. */
		unitDeltas: number[];
		unitsBought: number;
		netSales: number;
		costOfGoodsSold: number;
		grossProfit: number;
		grossMarginRatio: number;
	} = $props();

	let stepIndex = $state(0);
	let currentApplied = $state(false);
	let touched = $state(false);

	function next() {
		touched = true;
		if (!currentApplied) currentApplied = true;
		else if (stepIndex < steps.length - 1) {
			stepIndex++;
			currentApplied = false;
		}
	}
	function back() {
		if (currentApplied) currentApplied = false;
		else if (stepIndex > 0) {
			stepIndex--;
			currentApplied = true;
		}
	}
	function jump(i: number) {
		touched = true;
		stepIndex = i;
		currentApplied = false;
	}

	const applied = $derived(stepIndex + (currentApplied ? 1 : 0));
	const appliedEntryIds = $derived(
		steps.slice(0, stepIndex).flatMap((s) => s.entryIds).concat(currentApplied ? steps[stepIndex].entryIds : [])
	);
	// Entries not claimed by any step (e.g. opening capital) are background context, always posted.
	const stepEntryIds = new Set(steps.flatMap((s) => s.entryIds));
	const backgroundIds = entries.filter((e) => !stepEntryIds.has(e.id)).map((e) => e.id);
	const balances = $derived(
		post(accounts, entries.filter((e) => backgroundIds.includes(e.id) || appliedEntryIds.includes(e.id)))
	);
	const inventoryValue = $derived(balances.get('119')?.balance ?? 0);
	const cashValue = $derived(balances.get('101')?.balance ?? 0);
	const unitsOnShelf = $derived(unitDeltas.slice(0, applied).reduce((s, d) => s + d, 0));
	const unitCost = $derived(unitsOnShelf > 0 ? round(inventoryValue / unitsOnShelf) : 0);
	const currentEntries = $derived(entries.filter((e) => steps[stepIndex].entryIds.includes(e.id)));
	const done = $derived(applied === steps.length);

	const sentence = $derived(
		`After ${applied} of ${steps.length} steps: ${unitsOnShelf} units on the shelf, cash ${fmt(cashValue, { dollar: true })}, inventory ${fmt(inventoryValue, { dollar: true })}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<div class="flex flex-wrap gap-1">
			{#each steps as s, i (s.id)}
				<button
					class="border px-2 py-0.5 text-xs transition-colors {i === stepIndex
						? 'border-ink bg-ink text-paper'
						: i < applied
							? 'border-ok bg-ok-soft text-ok'
							: 'border-rule hover:bg-paper-2'}"
					onclick={() => jump(i)}
					aria-pressed={i === stepIndex}>{i + 1}</button
				>
			{/each}
		</div>
		<PinState {chapter} lo="C3" label="Merchandise flow" {href} {sentence} dirty={touched} />
	</div>

	<div class="border-rule bg-paper-2/40 mt-4 border p-4">
		<div class="text-ink-3 text-xs">Step {stepIndex + 1} of {steps.length}</div>
		<p class="mt-1 text-[1.05rem] leading-snug">{steps[stepIndex].label}</p>
		<div class="mt-4 flex items-center gap-2">
			<button class="btn btn-quiet text-sm" onclick={back} disabled={stepIndex === 0 && !currentApplied}
				>← Back</button
			>
			<button
				class="btn text-sm"
				onclick={next}
				disabled={stepIndex === steps.length - 1 && currentApplied}
			>
				{currentApplied ? 'Next →' : 'Apply this step'}
			</button>
		</div>
	</div>

	{#if currentApplied}
		<div class="mt-4 grid gap-3 {currentEntries.length > 1 ? 'border-l-4 border-rule pl-4' : ''}">
			{#each currentEntries as e, i (e.id)}
				<div class="border-rule-2 bg-paper border px-3 py-2">
					<div class="text-ink-2 text-xs">{i === 0 && currentEntries.length > 1 ? 'Price entry' : currentEntries.length > 1 ? 'Cost entry' : 'Entry'}</div>
					<JournalEntry entry={e} {accountName} compact date={false} />
				</div>
			{/each}
		</div>
	{/if}

	<div class="mt-8 grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">The shelf</div>
			<div class="num mt-1 text-2xl font-medium">{unitsOnShelf} <span class="text-ink-3 text-sm font-normal">units</span></div>
			<div class="text-ink-2 mt-1">at {fmt(unitCost, { dollar: true })} each of {unitsBought} bought</div>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Cash</div>
			<div class="num mt-1 text-2xl font-medium">{fmt(cashValue, { dollar: true })}</div>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Merchandise inventory</div>
			<div class="num mt-1 text-2xl font-medium">{fmt(inventoryValue, { dollar: true })}</div>
		</div>
	</div>

	{#if done}
		<div class="border-rule-2 mt-8 border-t pt-6">
			<div class="kicker mb-3">The sale, netted out</div>
			<div class="border-rule-2 bg-paper max-w-[46ch] border px-3 py-2 text-sm">
				<div class="flex justify-between"><span>Net sales</span><span class="num">{fmt(netSales, { dollar: true })}</span></div>
				<div class="flex justify-between"><span>Cost of goods sold</span><span class="num">{fmt(costOfGoodsSold, { dollar: true })}</span></div>
				<div class="border-rule-2 mt-1 flex justify-between border-t pt-1 font-medium">
					<span>Gross profit</span><span class="num">{fmt(grossProfit, { dollar: true })}</span>
				</div>
				<div class="text-ink-2 mt-1 flex justify-between text-xs">
					<span>Gross margin</span><span class="num">{(grossMarginRatio * 100).toFixed(1)}%</span>
				</div>
			</div>
		</div>
	{/if}
</div>
