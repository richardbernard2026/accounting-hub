<script lang="ts">
	/** Appendix 3A: record a prepayment as an asset or as an expense; the adjustment differs, the ending balances do not. */
	import type { Entry } from '$lib/ledger';
	import { fmt } from '$lib/ledger';
	import JournalEntry from '../ledger/JournalEntry.svelte';
	import PinState from '../notes/PinState.svelte';
	let {
		chapter,
		href,
		accountName
	}: { chapter: number; href?: string; accountName: (n: string) => string } = $props();
	let mode = $state<'asset' | 'expense'>('asset');
	let touched = $state(false);
	const paid = 2400;
	const used = 100;
	const initial = $derived<Entry>(
		mode === 'asset'
			? {
					id: 'x1',
					date: '2025-12-26',
					explanation: 'Paid for a 24-month policy, recorded as an asset',
					lines: [
						{ acct: '128', dr: paid },
						{ acct: '101', cr: paid }
					]
				}
			: {
					id: 'x1',
					date: '2025-12-26',
					explanation: 'Paid for a 24-month policy, recorded as an expense',
					lines: [
						{ acct: '637', dr: paid },
						{ acct: '101', cr: paid }
					]
				}
	);
	const adjust = $derived<Entry>(
		mode === 'asset'
			? {
					id: 'x2',
					date: '2025-12-31',
					explanation: 'Move the expired month out of the asset',
					lines: [
						{ acct: '637', dr: used },
						{ acct: '128', cr: used }
					]
				}
			: {
					id: 'x2',
					date: '2025-12-31',
					explanation: 'Move the unexpired 23 months out of expense and into the asset',
					lines: [
						{ acct: '128', dr: paid - used },
						{ acct: '637', cr: paid - used }
					]
				}
	);
	const sentence = $derived(
		`Prepaid insurance recorded ${mode === 'asset' ? 'as an asset' : 'as an expense'} first: the Dec 31 adjustment is ${accountName(adjust.lines[0].acct)} ${fmt(adjust.lines[0].dr!)} / ${accountName(adjust.lines[1].acct)} ${fmt(adjust.lines[1].cr!)}. Either way Prepaid Insurance ends at ${fmt(paid - used)} and Insurance Expense at ${fmt(used)}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-start justify-between gap-3">
		<div class="text-ink-2 text-sm">Insurance, $2,400 for 24 months</div>
		<div class="flex items-center gap-2">
			<div class="border-rule flex border text-sm" role="group" aria-label="Initial recording">
				<button
					class="px-3 py-1 {mode === 'asset' ? 'bg-ink text-paper' : 'hover:bg-paper-3'}"
					onclick={() => {
						mode = 'asset';
						touched = true;
					}}
					aria-pressed={mode === 'asset'}>Asset first</button
				>
				<button
					class="px-3 py-1 {mode === 'expense' ? 'bg-ink text-paper' : 'hover:bg-paper-3'}"
					onclick={() => {
						mode = 'expense';
						touched = true;
					}}
					aria-pressed={mode === 'expense'}>Expense first</button
				>
			</div>
			<PinState {chapter} lo="P4" label="Prepaid alternatives" {href} {sentence} dirty={touched} />
		</div>
	</div>
	<div class="mt-4 grid gap-4 md:grid-cols-2">
		<div>
			<div class="eyebrow">Dec 26 · when cash is paid</div>
			<div class="border-rule-2 bg-paper mt-1 border px-2 py-1">
				<JournalEntry entry={initial} {accountName} compact />
			</div>
		</div>
		<div>
			<div class="eyebrow">Dec 31 · adjusting entry</div>
			<div class="border-rule-2 bg-paper mt-1 border px-2 py-1">
				<JournalEntry entry={adjust} {accountName} compact />
			</div>
		</div>
	</div>
	<div class="border-rule-2 mt-4 grid grid-cols-2 gap-4 border-t pt-3 text-sm">
		<div class="flex justify-between">
			<span>Prepaid insurance, Dec 31</span><span class="num dr font-medium"
				>{fmt(paid - used)}</span
			>
		</div>
		<div class="flex justify-between">
			<span>Insurance expense, December</span><span class="num dr font-medium">{fmt(used)}</span>
		</div>
	</div>
	<p class="text-ink-2 mt-3 text-sm">
		The same idea works for unearned revenue: record the $3,000 as revenue on Dec 26, then at Dec 31
		move the $2,750 not yet earned into Unearned Consulting Revenue. Ending balances match the
		liability-first method.
	</p>
</div>
