<script lang="ts">
	/**
	 * Sort each reconciling item to the bank side or the book side. Book-side
	 * items grow a journal entry below; bank-side items do not. Both adjusted
	 * balances converge to the same number only once everything is placed.
	 */
	import type { Entry } from '$lib/ledger';
	import { fmt } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';
	import JournalEntry from '../ledger/JournalEntry.svelte';

	interface ReconItem {
		id: string;
		label: string;
		side: 'bank' | 'book';
		amount: number;
		entryId?: string;
	}

	let {
		chapter,
		href,
		bankStatementBalance,
		bookBalance,
		items,
		entries,
		accountName
	}: {
		chapter: number;
		href?: string;
		bankStatementBalance: number;
		bookBalance: number;
		items: ReconItem[];
		entries: Entry[];
		accountName: (n: string) => string;
	} = $props();

	// svelte-ignore state_referenced_locally
	let assigned = $state<Record<string, 'bank' | 'book'>>({});
	let missed = $state<Record<string, boolean>>({});
	let touched = $state(false);

	function place(item: ReconItem, side: 'bank' | 'book') {
		touched = true;
		if (assigned[item.id]) return;
		if (side === item.side) {
			assigned[item.id] = side;
			missed[item.id] = false;
		} else {
			missed[item.id] = true;
		}
	}

	const unsorted = $derived(items.filter((i) => !assigned[i.id]));
	const bankItems = $derived(items.filter((i) => assigned[i.id] === 'bank'));
	const bookItems = $derived(items.filter((i) => assigned[i.id] === 'book'));
	const bankTotal = $derived(round2(bankStatementBalance + bankItems.reduce((s, i) => s + i.amount, 0)));
	const bookTotal = $derived(round2(bookBalance + bookItems.reduce((s, i) => s + i.amount, 0)));
	const bookEntries = $derived(
		bookItems.filter((i) => i.entryId).map((i) => entries.find((e) => e.id === i.entryId)!)
	);
	const done = $derived(unsorted.length === 0);
	function round2(n: number) {
		return Math.round(n * 100) / 100;
	}

	const sentence = $derived(
		`Adjusted bank balance ${fmt(bankTotal, { dollar: true })}, adjusted book balance ${fmt(bookTotal, { dollar: true })}, ${unsorted.length} item${unsorted.length === 1 ? '' : 's'} left to sort.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<div class="text-ink-2 text-sm">{items.length - unsorted.length} of {items.length} sorted</div>
		<PinState {chapter} lo="P2" label="Bank reconciliation" {href} {sentence} dirty={touched} />
	</div>

	{#if unsorted.length > 0}
		<div class="border-rule bg-paper-2/40 mt-4 border p-4">
			<div class="text-ink-3 mb-2 text-xs">Unsorted</div>
			<div class="space-y-2">
				{#each unsorted as item (item.id)}
					<div class="border-rule-2 bg-paper flex flex-wrap items-center justify-between gap-2 border px-3 py-2 text-sm">
						<span>{item.label}</span>
						<div class="flex items-center gap-1.5">
							{#if missed[item.id]}<span class="text-warn text-xs">Not that side.</span>{/if}
							<button class="btn btn-quiet text-xs" onclick={() => place(item, 'bank')}>Bank side</button>
							<button class="btn btn-quiet text-xs" onclick={() => place(item, 'book')}>Book side</button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<div class="mt-6 grid gap-4 sm:grid-cols-2">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Bank side</div>
			<div class="mt-1 flex justify-between"><span>Statement balance</span><span class="num">{fmt(bankStatementBalance, { dollar: true })}</span></div>
			{#each bankItems as i (i.id)}
				<div class="text-ink-2 flex justify-between"><span>{i.label}</span><span class="num">{i.amount > 0 ? '+' : ''}{fmt(i.amount, { dollar: true })}</span></div>
			{/each}
			<div class="border-rule-2 mt-1 flex justify-between border-t pt-1 font-medium">
				<span>Adjusted bank balance</span><span class="num">{fmt(bankTotal, { dollar: true })}</span>
			</div>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Book side</div>
			<div class="mt-1 flex justify-between"><span>Cash account balance</span><span class="num">{fmt(bookBalance, { dollar: true })}</span></div>
			{#each bookItems as i (i.id)}
				<div class="text-ink-2 flex justify-between"><span>{i.label}</span><span class="num">{i.amount > 0 ? '+' : ''}{fmt(i.amount, { dollar: true })}</span></div>
			{/each}
			<div class="border-rule-2 mt-1 flex justify-between border-t pt-1 font-medium">
				<span>Adjusted book balance</span><span class="num">{fmt(bookTotal, { dollar: true })}</span>
			</div>
		</div>
	</div>

	{#if bookEntries.length > 0}
		<div class="border-rule-2 mt-6 border-t pt-6">
			<div class="kicker mb-3">Journal entries from the book side</div>
			<div class="grid gap-3 sm:grid-cols-2">
				{#each bookEntries as e (e.id)}
					<div class="border-rule-2 bg-paper border px-3 py-2">
						<div class="text-ink-2 text-xs">{e.explanation}</div>
						<JournalEntry entry={e} {accountName} compact date={false} />
					</div>
				{/each}
			</div>
		</div>
	{/if}

	{#if done}
		<div class="border-rule-2 mt-6 border-t pt-3 text-sm font-medium">
			{bankTotal === bookTotal
				? `Matched: ${fmt(bankTotal, { dollar: true })} = ${fmt(bookTotal, { dollar: true })}`
				: `Not matched yet: ${fmt(bankTotal, { dollar: true })} ≠ ${fmt(bookTotal, { dollar: true })}`}
		</div>
	{/if}
</div>
