<script lang="ts">
	/**
	 * Chapter 1's hero: ten transactions, equation-level only — no debits or
	 * credits yet. Three bars (Assets, Liabilities, Equity), Equity expanded
	 * into common stock, dividends, revenues, and expenses so the student
	 * sees what pulls it down. After the tenth transaction, the four
	 * statements fill in underneath, in order.
	 */
	import type { Account, Entry } from '$lib/ledger';
	import { fmt, post } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	interface Step {
		entryIds: string[];
		label: string;
	}

	let {
		chapter,
		href,
		steps,
		entries,
		accounts,
		cashFlows
	}: {
		chapter: number;
		href?: string;
		steps: Step[];
		entries: Entry[];
		accounts: Account[];
		cashFlows: { operating: number; investing: number; financing: number };
	} = $props();

	let stepIndex = $state(0); // 0..steps.length-1, the transaction being viewed
	let currentApplied = $state(false); // has *this* transaction been applied yet
	let touched = $state(false);

	// Every transaction before stepIndex is always treated as already applied —
	// jumping to transaction 8 means 1–7 are already in the books.
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
	const balances = $derived(post(accounts, entries.filter((e) => appliedEntryIds.includes(e.id))));
	const assets = $derived(
		['101', '106', '126', '128', '167'].reduce((s, n) => s + (balances.get(n)?.balance ?? 0), 0)
	);
	const liabilities = $derived(balances.get('201')?.balance ?? 0);
	const commonStock = $derived(balances.get('307')?.balance ?? 0);
	const dividends = $derived(balances.get('319')?.balance ?? 0);
	const revenues = $derived((balances.get('403')?.balance ?? 0) + (balances.get('406')?.balance ?? 0));
	const expenses = $derived((balances.get('640')?.balance ?? 0) + (balances.get('622')?.balance ?? 0));
	const equity = $derived(commonStock - dividends + revenues - expenses);

	const finalAssets = 40400; // scale reference: FastForward's assets after all ten
	const pct = (n: number) => Math.max(0, Math.min(100, (n / finalAssets) * 100));

	const done = $derived(applied === steps.length);
	const netIncome = $derived(revenues - expenses);
	const endingRE = $derived(netIncome - dividends);
	const netCash = $derived(cashFlows.operating + cashFlows.investing + cashFlows.financing);

	const sentence = $derived(
		`After ${applied} of ${steps.length} transactions: Assets ${fmt(assets, { dollar: true })} = Liabilities ${fmt(liabilities, { dollar: true })} + Equity ${fmt(equity, { dollar: true })}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<div class="flex flex-wrap gap-1">
			{#each steps as s, i (i)}
				<button
					class="num border px-2 py-0.5 text-xs transition-colors {i === stepIndex
						? 'border-ink bg-ink text-paper'
						: i < applied
							? 'border-ok bg-ok-soft text-ok'
							: 'border-rule hover:bg-paper-2'}"
					onclick={() => jump(i)}
					aria-pressed={i === stepIndex}>{i + 1}</button
				>
			{/each}
		</div>
		<PinState {chapter} lo="A1" label="Equation balance" {href} {sentence} dirty={touched} />
	</div>

	<div class="border-rule bg-paper-2/40 mt-4 border p-4">
		<div class="text-ink-3 text-xs">Transaction {stepIndex + 1} of {steps.length}</div>
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
				{currentApplied ? 'Next →' : 'Apply this transaction'}
			</button>
		</div>
	</div>

	<div class="mt-8">
		<div class="kicker mb-2">Assets = Liabilities + Equity</div>
		<div class="space-y-2">
			<div class="flex items-center gap-2">
				<span class="w-16 shrink-0 text-sm">Assets</span>
				<div class="bg-paper-3 h-5 flex-1">
					<div class="bg-debit h-5 transition-[width] duration-200" style="width:{pct(assets)}%"></div>
				</div>
				<span class="num w-24 shrink-0 text-right text-sm">{fmt(assets, { dollar: true })}</span>
			</div>
			<div class="flex items-center gap-2">
				<span class="w-16 shrink-0 text-sm">Liab. + Eq.</span>
				<div class="bg-paper-3 flex h-5 flex-1 overflow-hidden">
					<div class="bg-ink-3 h-5 transition-[width] duration-200" style="width:{pct(liabilities)}%"></div>
					<div class="bg-credit h-5 transition-[width] duration-200" style="width:{pct(equity)}%"></div>
				</div>
				<span class="num w-24 shrink-0 text-right text-sm">{fmt(liabilities + equity, { dollar: true })}</span>
			</div>
		</div>

		<div class="mt-4 max-w-[46ch] text-sm">
			<div class="text-ink-2">Equity, expanded:</div>
			<p class="num mt-1">
				{fmt(commonStock, { dollar: true })} common stock
				{#if dividends > 0}<span class="text-ink-2"> − {fmt(dividends, { dollar: true })} dividends</span>{/if}
				{#if revenues > 0}<span class="text-ink-2"> + {fmt(revenues, { dollar: true })} revenues</span>{/if}
				{#if expenses > 0}<span class="text-ink-2"> − {fmt(expenses, { dollar: true })} expenses</span>{/if}
				<span class="font-medium"> = {fmt(equity, { dollar: true })}</span>
			</p>
		</div>
	</div>

	{#if done}
		<div class="border-rule-2 mt-8 border-t pt-6">
			<div class="kicker mb-3">The four statements</div>
			<div class="grid gap-4 sm:grid-cols-2">
				<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
					<div class="eyebrow">Income statement</div>
					<div class="mt-1 flex justify-between"><span>Revenues</span><span class="num">{fmt(revenues, { dollar: true })}</span></div>
					<div class="flex justify-between"><span>Expenses</span><span class="num">{fmt(expenses, { dollar: true })}</span></div>
					<div class="border-rule-2 mt-1 flex justify-between border-t pt-1 font-medium">
						<span>Net income</span><span class="num">{fmt(netIncome, { dollar: true })}</span>
					</div>
				</div>
				<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
					<div class="eyebrow">Statement of retained earnings</div>
					<div class="mt-1 flex justify-between"><span>Beginning retained earnings</span><span class="num">{fmt(0, { dollar: true })}</span></div>
					<div class="flex justify-between"><span>+ Net income</span><span class="num">{fmt(netIncome, { dollar: true })}</span></div>
					<div class="flex justify-between"><span>− Dividends</span><span class="num">{fmt(dividends, { dollar: true })}</span></div>
					<div class="border-rule-2 mt-1 flex justify-between border-t pt-1 font-medium">
						<span>Ending retained earnings</span><span class="num">{fmt(endingRE, { dollar: true })}</span>
					</div>
				</div>
				<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
					<div class="eyebrow">Balance sheet</div>
					<div class="mt-1 flex justify-between"><span>Total assets</span><span class="num">{fmt(assets, { dollar: true })}</span></div>
					<div class="flex justify-between"><span>Total liabilities</span><span class="num">{fmt(liabilities, { dollar: true })}</span></div>
					<div class="border-rule-2 mt-1 flex justify-between border-t pt-1 font-medium">
						<span>Total equity</span><span class="num">{fmt(equity, { dollar: true })}</span>
					</div>
				</div>
				<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
					<div class="eyebrow">Statement of cash flows</div>
					<div class="mt-1 flex justify-between"><span>Operating</span><span class="num">{fmt(cashFlows.operating, { dollar: true })}</span></div>
					<div class="flex justify-between"><span>Investing</span><span class="num">{fmt(cashFlows.investing, { dollar: true })}</span></div>
					<div class="flex justify-between"><span>Financing</span><span class="num">{fmt(cashFlows.financing, { dollar: true })}</span></div>
					<div class="border-rule-2 mt-1 flex justify-between border-t pt-1 font-medium">
						<span>Net increase in cash</span><span class="num">{fmt(netCash, { dollar: true })}</span>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
