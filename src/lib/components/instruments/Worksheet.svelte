<script lang="ts">
	/** Unadjusted → adjustments → adjusted, the three column pairs Wild uses to build the adjusted trial balance. */
	import type { Entry, TrialBalance } from '$lib/ledger';
	import { fmt } from '$lib/ledger';
	import JournalEntry from '../ledger/JournalEntry.svelte';
	let {
		unadjusted,
		adjusted,
		adjustments,
		accounts,
		accountName
	}: {
		unadjusted: TrialBalance;
		adjusted: TrialBalance;
		adjustments: Entry[];
		accounts: { num: string; name: string }[];
		accountName: (n: string) => string;
	} = $props();

	let active = $state<string | null>(null);
	const activeEntry = $derived(adjustments.find((e) => e.id === active) ?? null);

	interface Row {
		num: string;
		name: string;
		uDr: number;
		uCr: number;
		aDr: { id: string; amt: number }[];
		aCr: { id: string; amt: number }[];
		jDr: number;
		jCr: number;
	}
	const rows = $derived.by((): Row[] => {
		const nums = new Set<string>([
			...unadjusted.rows.map((r) => r.num),
			...adjusted.rows.map((r) => r.num)
		]);
		return accounts
			.filter((a) => nums.has(a.num))
			.map((a) => {
				const u = unadjusted.rows.find((r) => r.num === a.num);
				const j = adjusted.rows.find((r) => r.num === a.num);
				const aDr: Row['aDr'] = [];
				const aCr: Row['aCr'] = [];
				for (const e of adjustments)
					for (const l of e.lines) {
						if (l.acct !== a.num) continue;
						if (l.dr) aDr.push({ id: e.id, amt: l.dr });
						if (l.cr) aCr.push({ id: e.id, amt: l.cr });
					}
				return {
					num: a.num,
					name: a.name,
					uDr: u?.dr ?? 0,
					uCr: u?.cr ?? 0,
					aDr,
					aCr,
					jDr: j?.dr ?? 0,
					jCr: j?.cr ?? 0
				};
			});
	});
	const adjTotal = $derived(
		adjustments.reduce((s, e) => s + e.lines.reduce((t, l) => t + (l.dr ?? 0), 0), 0)
	);
	const lift = $derived(adjusted.totalDr - unadjusted.totalDr);
	const cell = (ids: { id: string }[]) =>
		active && ids.some((x) => x.id === active) ? 'bg-mark/50' : '';
	const inActive = (r: Row) => active && [...r.aDr, ...r.aCr].some((x) => x.id === active);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-2 pb-3">
		<div class="text-ink-2 text-sm">Wild’s three column pairs</div>
		<div class="flex flex-wrap items-center gap-1 text-sm">
			<span class="text-ink-3 mr-1">Trace an adjustment:</span>
			{#each adjustments as e (e.id)}
				<button
					class="num border px-2 py-0.5 transition-colors {active === e.id
						? 'border-ink bg-ink text-paper'
						: 'border-rule hover:bg-paper-3'}"
					onclick={() => (active = active === e.id ? null : e.id)}
					aria-pressed={active === e.id}>({e.id})</button
				>
			{/each}
		</div>
	</div>
	<div class="border-rule bg-paper-2/40 overflow-x-auto border">
		<table class="ledger min-w-[720px] text-sm">
			<thead>
				<tr>
					<th rowspan="2" class="align-bottom">Account</th>
					<th colspan="2" class="border-rule-2 border-b text-center">Unadjusted trial balance</th>
					<th colspan="2" class="border-rule-2 border-b text-center">Adjustments</th>
					<th colspan="2" class="border-rule-2 border-b text-center">Adjusted trial balance</th>
				</tr>
				<tr
					><th class="amt">Dr.</th><th class="amt">Cr.</th><th class="amt">Dr.</th><th class="amt"
						>Cr.</th
					><th class="amt">Dr.</th><th class="amt">Cr.</th></tr
				>
			</thead>
			<tbody>
				{#each rows as r, i (r.num)}
					<tr class="transition-colors {inActive(r) ? 'bg-paper-3/60' : ''}">
						<td><span class="num text-ink-3 mr-2 text-xs">{r.num}</span>{r.name}</td>
						<td class="amt num dr">{r.uDr ? fmt(r.uDr, { dollar: i === 0 }) : ''}</td>
						<td class="amt num cr">{r.uCr ? fmt(r.uCr, { dollar: i === 0 }) : ''}</td>
						<td class="amt num dr {cell(r.aDr)}"
							>{#each r.aDr as x (x.id)}<span class="whitespace-nowrap"
									><span class="text-ink-3 text-xs">({x.id})</span> {fmt(x.amt)}</span
								>{/each}</td
						>
						<td class="amt num cr {cell(r.aCr)}"
							>{#each r.aCr as x (x.id)}<span class="whitespace-nowrap"
									><span class="text-ink-3 text-xs">({x.id})</span> {fmt(x.amt)}</span
								>{/each}</td
						>
						<td class="amt num dr {inActive(r) && r.jDr ? 'font-medium' : ''}"
							>{r.jDr ? fmt(r.jDr, { dollar: i === 0 }) : ''}</td
						>
						<td class="amt num cr {inActive(r) && r.jCr ? 'font-medium' : ''}"
							>{r.jCr ? fmt(r.jCr, { dollar: i === 0 }) : ''}</td
						>
					</tr>
				{/each}
				<tr class="total">
					<td>Totals</td>
					<td class="amt num">{fmt(unadjusted.totalDr, { dollar: true })}</td>
					<td class="amt num">{fmt(unadjusted.totalCr, { dollar: true })}</td>
					<td class="amt num">{fmt(adjTotal, { dollar: true })}</td>
					<td class="amt num">{fmt(adjTotal, { dollar: true })}</td>
					<td class="amt num">{fmt(adjusted.totalDr, { dollar: true })}</td>
					<td class="amt num">{fmt(adjusted.totalCr, { dollar: true })}</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="pt-4 text-sm">
		{#if activeEntry}
			<div class="grid gap-3 sm:grid-cols-[1fr_auto]">
				<div>
					<span class="eyebrow">Adjustment ({activeEntry.id})</span>
					<p class="text-ink-2 mt-1">{activeEntry.explanation}.</p>
				</div>
				<div class="bg-paper px-2 py-1">
					<JournalEntry entry={activeEntry} {accountName} compact date={false} />
				</div>
			</div>
		{:else}
			<p class="text-ink-2">
				The adjustments column adds <span class="num">{fmt(adjTotal, { dollar: true })}</span> of
				debits and credits, but the totals rise by only
				<span class="num">{fmt(lift, { dollar: true })}</span>. Entries (a), (b), and (d) shift
				amounts within a column; only (c), (e), and (f) add to both columns.
			</p>
		{/if}
	</div>
</div>
