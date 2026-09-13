<script lang="ts">
	/**
	 * Chapter 2's hero: push all sixteen December transactions through
	 * identify → analyze → journalize → post, one at a time, while the
	 * equation bars, the ledger, and the trial balance build up alongside.
	 */
	import type { Account, Entry, Line } from '$lib/ledger';
	import { accountNameOf, chartOf, elementLabel, fmt, normalSide, post, trialBalance } from '$lib/ledger';
	import TAccount from '../ledger/TAccount.svelte';
	import PinState from '../notes/PinState.svelte';

	let {
		chapter,
		href,
		entries,
		accounts,
		sourceDocs
	}: {
		chapter: number;
		href?: string;
		entries: Entry[];
		accounts: Account[];
		sourceDocs: Record<string, string>;
	} = $props();

	const accountName = accountNameOf(accounts);
	const chart = chartOf(accounts);
	const STEPS = ['Identify', 'Analyze', 'Journalize', 'Post'] as const;

	let txnIndex = $state(0);
	let step = $state(0); // 0..3
	let touched = $state(false);

	const entry = $derived(entries[txnIndex]);
	/** Transactions actually posted to the ledger so far. */
	const postedCount = $derived(txnIndex + (step === 3 ? 1 : 0));

	function next() {
		touched = true;
		if (step < 3) step++;
		else if (txnIndex < entries.length - 1) {
			txnIndex++;
			step = 0;
		}
	}
	function prev() {
		touched = true;
		if (step > 0) step--;
		else if (txnIndex > 0) {
			txnIndex--;
			step = 3;
		}
	}
	function jump(i: number) {
		touched = true;
		txnIndex = i;
		step = 0;
	}

	function direction(l: Line): 'up' | 'down' {
		const acct = chart.get(l.acct)!;
		const normal = normalSide(acct.type);
		return l.dr ? (normal === 'dr' ? 'up' : 'down') : normal === 'cr' ? 'up' : 'down';
	}

	/** Accounts in the order an entry first uses them, up to `postedCount`. */
	const touchedAccounts = $derived.by(() => {
		const seen: string[] = [];
		for (let i = 0; i < postedCount; i++) {
			for (const l of entries[i].lines) if (!seen.includes(l.acct)) seen.push(l.acct);
		}
		return seen;
	});

	function postsFor(num: string) {
		const debits: { amount: number; label?: string; new?: boolean }[] = [];
		const credits: { amount: number; label?: string; new?: boolean }[] = [];
		for (let i = 0; i < postedCount; i++) {
			const isNew = step === 3 && i === txnIndex;
			for (const l of entries[i].lines) {
				if (l.acct !== num) continue;
				if (l.dr) debits.push({ amount: l.dr, label: `(${entries[i].id})`, new: isNew });
				if (l.cr) credits.push({ amount: l.cr, label: `(${entries[i].id})`, new: isNew });
			}
		}
		return { debits, credits };
	}

	const balances = $derived(post(accounts, entries.slice(0, postedCount)));
	const tb = $derived(trialBalance(balances));
	const equation = $derived.by(() => {
		let assets = 0,
			liabilities = 0,
			equity = 0;
		for (const b of balances.values()) {
			if (b.acct.type === 'asset') assets += b.balance;
			else if (b.acct.type === 'contra-asset') assets -= b.balance;
			else if (b.acct.type === 'liability') liabilities += b.balance;
			else if (b.acct.type === 'equity') equity += b.balance;
			else if (b.acct.type === 'contra-equity') equity -= b.balance;
			else if (b.acct.type === 'revenue') equity += b.balance;
			else if (b.acct.type === 'expense') equity -= b.balance;
		}
		return { assets, liabilities, equity };
	});
	/** Scale every bar against the final assets total, so growth reads honestly. */
	const finalAssets = (() => {
		const final = post(
			accounts,
			entries
		);
		let a = 0;
		for (const b of final.values()) {
			if (b.acct.type === 'asset') a += b.balance;
			else if (b.acct.type === 'contra-asset') a -= b.balance;
		}
		return a;
	})();
	const pct = (n: number) => Math.max(0, Math.min(100, (n / finalAssets) * 100));

	const sentence = $derived(
		`Transaction ${entry.id} of ${entries.length}, ${STEPS[step].toLowerCase()} step: ${entry.explanation}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<div class="flex flex-wrap gap-1">
			{#each entries as e, i (e.id)}
				<button
					class="num border px-2 py-0.5 text-xs transition-colors {i === txnIndex
						? 'border-ink bg-ink text-paper'
						: i < postedCount
							? 'border-ok bg-ok-soft text-ok'
							: 'border-rule hover:bg-paper-2'}"
					onclick={() => jump(i)}
					aria-pressed={i === txnIndex}>{e.id}</button
				>
			{/each}
		</div>
		<PinState {chapter} lo="P1" label="Double-entry machine" {href} {sentence} dirty={touched} />
	</div>

	<div class="border-rule bg-paper-2/40 mt-4 border p-4">
		<div class="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
			<div class="flex flex-wrap items-center gap-1 text-xs sm:gap-1.5 sm:text-sm">
				{#each STEPS as s, i (s)}
					<span
						class="border px-1.5 py-0.5 sm:px-2 {i === step
							? 'border-ink bg-ink text-paper'
							: i < step
								? 'border-ok text-ok'
								: 'border-rule text-ink-3'}">{i + 1}<span class="hidden sm:inline">. {s}</span></span
					>
					{#if i < 3}<span class="text-ink-3">→</span>{/if}
				{/each}
			</div>
			<div class="num text-ink-2 text-xs">Dec {entry.date.slice(-2)} · ({entry.id}) of {entries.length}</div>
		</div>

		<div class="mt-4 min-h-[7rem]">
			{#if step === 0}
				<div class="eyebrow">Identify</div>
				<p class="mt-1 text-[1.05rem] leading-snug">{entry.explanation}.</p>
				<p class="text-ink-2 mt-2 text-sm">Source document: {sourceDocs[entry.id] ?? '—'}</p>
			{:else if step === 1}
				<div class="eyebrow">Analyze</div>
				<ul class="mt-2 space-y-1.5 text-sm">
					{#each entry.lines as l (l.acct)}
						{@const acct = chart.get(l.acct)!}
						<li>
							<span class="font-medium">{acct.name}</span>
							<span class="text-ink-2">({elementLabel(acct.type)})</span>
							{direction(l) === 'up' ? '↑ up' : '↓ down'}
							<span class="num">{fmt(l.dr ?? l.cr ?? 0, { dollar: true })}</span>
						</li>
					{/each}
				</ul>
			{:else if step === 2}
				<div class="eyebrow">Journalize</div>
				<table class="ledger mt-2 text-sm">
					<thead>
						<tr>
							<th></th>
							<th class="dr text-left">DEBT — Expenses, Assets, Dividends</th>
							<th class="cr text-left">CLOR — Liabilities, Equity, Revenue</th>
						</tr>
					</thead>
					<tbody>
						{#each entry.lines.filter((l) => l.dr) as l (l.acct)}
							<tr>
								<td class="text-ink-3 w-14">{entry.date.slice(-2)}</td>
								<td class="dr">{accountName(l.acct)} <span class="num">{fmt(l.dr!)}</span></td>
								<td></td>
							</tr>
						{/each}
						{#each entry.lines.filter((l) => l.cr) as l (l.acct)}
							<tr>
								<td></td>
								<td></td>
								<td class="indent cr">{accountName(l.acct)} <span class="num">{fmt(l.cr!)}</span></td>
							</tr>
						{/each}
					</tbody>
				</table>
				{#if entry.lines.length > 2}
					<p class="text-ink-2 mt-2 text-xs">
						A compound entry: {entry.lines.filter((l) => l.dr).length} debit line{entry.lines.filter(
							(l) => l.dr
						).length === 1
							? ''
							: 's'}, {entry.lines.filter((l) => l.cr).length} credit lines.
					</p>
				{/if}
			{:else}
				<div class="eyebrow">Post</div>
				<p class="mt-1 text-sm">
					{#each entry.lines as l, i (l.acct)}{i > 0 ? ' and ' : ''}<span class="font-medium"
							>{accountName(l.acct)}</span
						>{/each} now show this transaction in the ledger below.
				</p>
			{/if}
		</div>

		<div class="mt-4 flex items-center gap-2">
			<button class="btn btn-quiet text-sm" onclick={prev} disabled={txnIndex === 0 && step === 0}
				>← Back</button
			>
			<button
				class="btn text-sm"
				onclick={next}
				disabled={txnIndex === entries.length - 1 && step === 3}>Next →</button
			>
		</div>
	</div>

	<!-- Equation bars -->
	<div class="mt-8">
		<div class="kicker mb-2">Assets = Liabilities + Equity</div>
		<div class="space-y-2">
			<div class="flex items-center gap-2">
				<span class="w-20 shrink-0 text-sm">Assets</span>
				<div class="bg-paper-3 h-5 flex-1">
					<div class="bg-debit h-5 transition-[width] duration-200" style="width:{pct(equation.assets)}%"></div>
				</div>
				<span class="num w-24 shrink-0 text-right text-sm">{fmt(equation.assets, { dollar: true })}</span>
			</div>
			<div class="flex items-center gap-2">
				<span class="w-20 shrink-0 text-sm">Liab. + Eq.</span>
				<div class="bg-paper-3 flex h-5 flex-1 overflow-hidden">
					<div
						class="bg-ink-3 h-5 transition-[width] duration-200"
						style="width:{pct(equation.liabilities)}%"
					></div>
					<div
						class="bg-credit h-5 transition-[width] duration-200"
						style="width:{pct(equation.equity)}%"
					></div>
				</div>
				<span class="num w-24 shrink-0 text-right text-sm"
					>{fmt(equation.liabilities + equation.equity, { dollar: true })}</span
				>
			</div>
		</div>
	</div>

	<!-- Ledger, built account by account -->
	<div class="mt-8">
		<div class="kicker mb-2">Ledger</div>
		{#if touchedAccounts.length === 0}
			<p class="text-ink-2 text-sm">No accounts posted yet.</p>
		{:else}
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each touchedAccounts as num (num)}
					{@const acct = chart.get(num)!}
					{@const p = postsFor(num)}
					<TAccount
						title={acct.name}
						num={acct.num}
						normal={normalSide(acct.type)}
						debits={p.debits}
						credits={p.credits}
					/>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Running trial balance -->
	<div class="mt-8">
		<div class="kicker mb-2">Trial balance</div>
		{#if tb.rows.length === 0}
			<p class="text-ink-2 text-sm">Nothing posted yet.</p>
		{:else}
			<table class="ledger text-sm">
				<tbody>
					{#each tb.rows as r (r.num)}
						<tr>
							<td><span class="num text-ink-3 mr-2 text-xs">{r.num}</span>{r.name}</td>
							<td class="amt num dr">{r.dr ? fmt(r.dr) : ''}</td>
							<td class="amt num cr">{r.cr ? fmt(r.cr) : ''}</td>
						</tr>
					{/each}
					<tr class="total">
						<td>Totals</td>
						<td class="amt num">{fmt(tb.totalDr, { dollar: true })}</td>
						<td class="amt num">{fmt(tb.totalCr, { dollar: true })}</td>
					</tr>
				</tbody>
			</table>
		{/if}
	</div>
</div>
