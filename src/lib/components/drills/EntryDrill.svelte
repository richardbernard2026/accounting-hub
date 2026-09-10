<script lang="ts">
	/** Build each of FastForward's six adjusting entries from the facts. */
	import type { Entry } from '$lib/ledger';
	import type { Account } from '$lib/ledger';
	import type { Lane } from '$lib/content/chapters/ch03';
	import { fmt } from '$lib/ledger';
	import JournalEntry from '../ledger/JournalEntry.svelte';
	import Takeaway from '../notes/Takeaway.svelte';
	let {
		chapter,
		lanes,
		entries,
		accounts,
		accountName,
		lift
	}: {
		chapter: number;
		lanes: Lane[];
		entries: Entry[];
		accounts: Account[];
		accountName: (n: string) => string;
		lift: { from: number; to: number };
	} = $props();

	let idx = $state(0);
	const lane = $derived(lanes[idx]);
	const target = $derived(entries.find((e) => e.id === lane.id)!);
	const targetDr = $derived(target.lines.find((l) => l.dr)!);
	const targetCr = $derived(target.lines.find((l) => l.cr)!);

	let dr = $state('');
	let cr = $state('');
	let amount = $state('');
	let tries = $state(0);
	let feedback = $state<string | null>(null);
	let solved = $state<boolean[]>(lanes.map(() => false));
	let revealed = $state(false);
	const allDone = $derived(solved.every(Boolean));

	function go(i: number) {
		idx = i;
		dr = '';
		cr = '';
		amount = '';
		tries = 0;
		feedback = null;
		revealed = false;
	}
	function check() {
		const amt = Number(amount.replace(/[^0-9.]/g, ''));
		tries++;
		const okDr = dr === targetDr.acct;
		const okCr = cr === targetCr.acct;
		const okAmt = Math.abs(amt - targetDr.dr!) < 0.5;
		if (okDr && okCr && okAmt) {
			solved[idx] = true;
			feedback = `Right. ${target.explanation}.`;
			return;
		}
		const hints: string[] = [];
		if (!okDr)
			hints.push(
				dr && accounts.find((a) => a.num === dr)?.type === 'asset' && lane.kind === 'prepaid'
					? 'The debit is the expense, not the asset.'
					: 'Which account goes up on the debit side here?'
			);
		if (!okCr)
			hints.push(
				lane.id === 'c' && cr === '167'
					? 'Credit the contra account, not Equipment itself.'
					: lane.kind === 'accrued-expense' && cr === '101'
						? 'No cash has been paid. Credit a payable.'
						: 'Which balance sheet account is being corrected?'
			);
		if (!okAmt)
			hints.push(
				`Amount: re-read the facts and compute it (${lane.rule === 'monthly' ? 'per month' : lane.rule === 'daily' ? 'per day × days' : lane.rule === 'workdays' ? 'per workday × workdays' : 'purchased less on hand'}).`
			);
		feedback = hints.join(' ');
	}
	function reveal() {
		dr = targetDr.acct;
		cr = targetCr.acct;
		amount = String(targetDr.dr);
		revealed = true;
		feedback = null;
	}
</script>

<div class="border-rule bg-paper-2/40 border p-4 sm:p-5">
	<div class="flex flex-wrap items-baseline justify-between gap-2">
		<div>
			<div class="eyebrow">Drill · Wild P1</div>
			<h3 class="mt-0.5 text-lg">Journalize the six yourself</h3>
		</div>
		<div class="flex gap-1">
			{#each lanes as l, i (l.id)}
				<button
					class="num border px-2 py-0.5 text-sm transition-colors {idx === i
						? 'border-ink bg-ink text-paper'
						: solved[i]
							? 'border-ok bg-ok-soft text-ok'
							: 'border-rule hover:bg-paper-3'}"
					onclick={() => go(i)}
					aria-pressed={idx === i}>({l.id})</button
				>
			{/each}
		</div>
	</div>

	<p class="mt-4 text-[0.95rem]"><span class="font-medium">{lane.title}.</span> {lane.facts}</p>

	{#if solved[idx] || revealed}
		<div class="bg-paper mt-3 px-2 py-1"><JournalEntry entry={target} {accountName} compact /></div>
		{#if revealed && !solved[idx]}<p class="text-ink-3 mt-2 text-sm">
				Shown, not solved. Come back to it.
			</p>{/if}
	{:else}
		<div class="mt-3 grid gap-3 sm:grid-cols-[1fr_1fr_140px]">
			<label class="text-sm"
				><span class="dr text-xs font-medium">Debit</span>
				<select class="field mt-1" bind:value={dr}
					><option value="" disabled>Choose account</option>{#each accounts as a (a.num)}<option
							value={a.num}>{a.num} {a.name}</option
						>{/each}</select
				></label
			>
			<label class="text-sm"
				><span class="cr text-xs font-medium">Credit</span>
				<select class="field mt-1" bind:value={cr}
					><option value="" disabled>Choose account</option>{#each accounts as a (a.num)}<option
							value={a.num}>{a.num} {a.name}</option
						>{/each}</select
				></label
			>
			<label class="text-sm"
				><span class="text-xs font-medium">Amount</span>
				<input
					class="field num mt-1"
					inputmode="decimal"
					bind:value={amount}
					placeholder="0"
					onkeydown={(e) => e.key === 'Enter' && check()}
				/></label
			>
		</div>
		<div class="mt-3 flex flex-wrap items-center gap-2">
			<button class="btn text-sm" onclick={check} disabled={!dr || !cr || !amount}
				>Check entry</button
			>
			{#if tries >= 2}<button class="btn btn-quiet text-sm" onclick={reveal}>Show me</button>{/if}
		</div>
	{/if}
	{#if feedback}
		<p class="mt-2 text-sm {solved[idx] ? 'text-ok' : 'text-warn'}" aria-live="polite">
			{feedback}
		</p>
	{/if}
	{#if solved[idx] && idx < lanes.length - 1}
		<button class="btn btn-quiet mt-3 text-xs" onclick={() => go(idx + 1)}>Next adjustment</button>
	{/if}

	<Takeaway
		{chapter}
		lo="P1"
		label="Entry drill"
		show={allDone}
		text="FastForward’s six adjustments at Dec 31: (a) Insurance Expense 100 / Prepaid Insurance 100; (b) Supplies Expense 1,050 / Supplies 1,050; (c) Depreciation Expense 375 / Accumulated Depreciation 375; (d) Unearned Consulting Revenue 250 / Consulting Revenue 250; (e) Salaries Expense 210 / Salaries Payable 210; (f) Accounts Receivable 1,800 / Consulting Revenue 1,800. Trial balance totals move from {fmt(
			lift.from
		)} to {fmt(lift.to)}."
	/>
</div>
