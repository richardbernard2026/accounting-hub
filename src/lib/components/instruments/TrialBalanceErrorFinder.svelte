<script lang="ts">
	/**
	 * Plant one error in December's books at a time and watch whether the
	 * trial balance catches it. Every total here is recomputed from the real
	 * sixteen transactions with one line changed — nothing is hardcoded.
	 */
	import type { Entry } from '$lib/ledger';
	import { fmt, round } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	let { chapter, href, entries }: { chapter: number; href?: string; entries: Entry[] } = $props();

	interface FlatLine {
		entryId: string;
		acct: string;
		dr?: number;
		cr?: number;
	}
	function flatten(list: Entry[]): FlatLine[] {
		return list.flatMap((e) => e.lines.map((l) => ({ entryId: e.id, ...l })));
	}
	/**
	 * A trial balance nets each account's postings first, then sums the net
	 * debit and credit columns — it is not the sum of every line's raw amount
	 * (that trivially matches on both sides for any set of balanced entries
	 * and hides the account-level effect an error actually has).
	 */
	function totals(lines: FlatLine[]) {
		const perAccount = new Map<string, { dr: number; cr: number }>();
		for (const l of lines) {
			const b = perAccount.get(l.acct) ?? { dr: 0, cr: 0 };
			b.dr += l.dr ?? 0;
			b.cr += l.cr ?? 0;
			perAccount.set(l.acct, b);
		}
		let dr = 0,
			cr = 0;
		for (const b of perAccount.values()) {
			const net = round(b.dr - b.cr);
			if (net > 0) dr += net;
			else cr -= net;
		}
		return { dr: round(dr), cr: round(cr) };
	}
	const base = flatten(entries);
	const baseTotals = totals(base);

	interface Scenario {
		id: string;
		label: string;
		lines: FlatLine[];
	}
	const scenarios: Scenario[] = [
		{
			id: 'omitted',
			label: 'Entry 12 never recorded',
			lines: base.filter((l) => l.entryId !== '12')
		},
		{
			id: 'duplicated',
			label: 'Entry 5 recorded twice',
			lines: [...base, ...base.filter((l) => l.entryId === '5')]
		},
		{
			id: 'wrong-account',
			label: 'Rent in entry 6 debited to Salaries expense',
			lines: base.map((l) => (l.entryId === '6' && l.dr ? { ...l, acct: '622' } : l))
		},
		{
			id: 'transposed',
			label: 'Utilities posted as 320 instead of 230 (debit side only)',
			lines: base.map((l) => (l.entryId === '16' && l.dr ? { ...l, dr: 320 } : l))
		},
		{
			id: 'half-posted',
			label: 'Entry 10: debit posted, credit to Cash never posted',
			lines: base.filter((l) => !(l.entryId === '10' && l.cr))
		}
	];

	let idx = $state(0);
	let touched = $state(false);
	const scenario = $derived(scenarios[idx]);
	const t = $derived(totals(scenario.lines));
	const diff = $derived(round(Math.abs(t.dr - t.cr)));
	const caught = $derived(diff > 0);
	const divisibleBy9 = $derived(caught && diff % 9 === 0);

	function select(i: number) {
		idx = i;
		touched = true;
	}
	const sentence = $derived(
		caught
			? `${scenario.label}: the trial balance is off by ${fmt(diff, { dollar: true })} — caught.`
			: `${scenario.label}: the trial balance still balances at ${fmt(t.dr, { dollar: true })} — not caught.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<div class="text-ink-2 text-sm">
			Unplanted trial balance: <span class="num">{fmt(baseTotals.dr, { dollar: true })} = {fmt(
					baseTotals.cr,
					{ dollar: true }
				)}</span>
		</div>
		<PinState {chapter} lo="P2" label="Trial balance error finder" {href} {sentence} dirty={touched} />
	</div>

	<div class="mt-4 grid gap-1.5">
		{#each scenarios as s, i (s.id)}
			<button
				class="border px-3 py-2 text-left text-sm transition-colors {i === idx
					? 'border-ink bg-paper-3/70'
					: 'border-rule hover:bg-paper-2'}"
				onclick={() => select(i)}
				aria-pressed={i === idx}>{s.label}</button
			>
		{/each}
	</div>

	<div class="border-rule-2 mt-5 border-t pt-4">
		<div class="grid gap-4 sm:grid-cols-2">
			<div>
				<div class="eyebrow">Trial balance after this error</div>
				<p class="num mt-1 text-lg">
					<span class={caught ? 'text-warn' : ''}>{fmt(t.dr, { dollar: true })}</span>
					<span class="text-ink-3">vs</span>
					<span class={caught ? 'text-warn' : ''}>{fmt(t.cr, { dollar: true })}</span>
				</p>
			</div>
			<div>
				<div class="eyebrow">Caught?</div>
				<p class="mt-1 text-lg font-medium {caught ? 'text-warn' : 'text-ok'}">
					{caught ? 'Yes' : 'No'}
				</p>
			</div>
		</div>
		<p class="text-ink-2 mt-3 max-w-[56ch] text-sm">
			{#if caught}
				Difference {fmt(diff, { dollar: true })}{divisibleBy9
					? ' — divisible by 9, look for a transposition or a slide.'
					: '.'}
			{:else}
				The trial balance still balances at {fmt(t.dr, { dollar: true })}. Equal totals do not mean
				the books are right.
			{/if}
		</p>
	</div>
</div>
