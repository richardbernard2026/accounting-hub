<script lang="ts">
	/** Wild Exhibit 3.2: the $2,400 policy under the cash basis and the accrual basis, by year. */
	import { fmt } from '$lib/ledger';
	import { insuranceByYear } from '$lib/content/chapters/ch03';
	import PinState from '../notes/PinState.svelte';

	let { chapter, href }: { chapter: number; href?: string } = $props();

	const years = insuranceByYear.map((r) => ({ y: r.year, cash: r.cash, accrual: r.accrual }));
	const max = Math.max(...years.map((r) => r.cash));
	let selected = $state<number | null>(null);
	let touched = $state(false);

	function select(y: number) {
		selected = selected === y ? null : y;
		touched = true;
	}
	const row = $derived(years.find((r) => r.y === selected));
	const sentence = $derived(
		row
			? `${row.y} insurance expense: cash basis ${fmt(row.cash, { dollar: true })}, accrual basis ${fmt(row.accrual, { dollar: true })}.`
			: 'No year selected.'
	);
</script>

<figure class="max-w-[720px]">
	<figcaption class="flex items-baseline justify-between gap-2">
		<span class="eyebrow">Wild Exhibit 3.2 · $2,400, 24-month policy</span>
		<PinState {chapter} lo="C1" label="Cash versus accrual" {href} {sentence} dirty={touched} />
	</figcaption>
	<div class="mt-4 flex gap-2" role="group" aria-label="Select a year">
		{#each years as r (r.y)}
			<button
				class="border px-3 py-1 text-sm transition-colors {selected === r.y
					? 'border-ink bg-ink text-paper'
					: 'border-rule hover:bg-paper-2'}"
				onclick={() => select(r.y)}
				aria-pressed={selected === r.y}>{r.y}</button
			>
		{/each}
	</div>
	<div class="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-4 text-sm">
		{#each years as r (r.y)}
			<div class="figure text-ink-2 pt-1 text-[1.5rem] {selected === r.y ? 'text-ink' : ''}">
				{r.y}
			</div>
			<div class="space-y-1">
				<div class="flex items-center gap-2">
					<div
						class="h-3 transition-opacity {selected && selected !== r.y
							? 'opacity-30'
							: ''} bg-ink-3"
						style="width:{(r.cash / max) * 100}%"
					></div>
					<span class="num text-ink-2 text-xs"
						>{r.cash ? fmt(r.cash, { dollar: true }) : '0'} cash basis</span
					>
				</div>
				<div class="flex items-center gap-2">
					<div
						class="bg-debit h-3 transition-opacity {selected && selected !== r.y
							? 'opacity-30'
							: ''}"
						style="width:{(r.accrual / max) * 100}%"
					></div>
					<span class="num dr text-xs">{fmt(r.accrual, { dollar: true })} accrual basis</span>
				</div>
			</div>
		{/each}
	</div>
	{#if row}
		<p class="text-ink-2 mt-3 text-sm" aria-live="polite">
			{row.y}: the cash basis charges {fmt(row.cash, { dollar: true })}; the accrual basis charges
			only
			{fmt(row.accrual, { dollar: true })}, the coverage {row.y} actually used.
		</p>
	{/if}
</figure>
