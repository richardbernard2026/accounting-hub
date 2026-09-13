<script lang="ts">
	/**
	 * Move the slider and watch receivables shift from "not yet due" into
	 * older buckets — at full extension it matches the book's own aging
	 * table exactly. A second control swaps the existing allowance balance
	 * between a credit and a debit, changing how the expense is computed.
	 */
	import { fmt, round } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	interface AgeBucket {
		id: string;
		label: string;
		finalBalance: number;
		rate: number;
	}
	interface BucketState {
		bucket: AgeBucket;
		balance: number;
		uncollectible: number;
	}

	let {
		chapter,
		href,
		totalReceivables,
		bucketsAt,
		existingCreditDefault,
		existingDebitDefault
	}: {
		chapter: number;
		href?: string;
		totalReceivables: number;
		bucketsAt: (t: number) => BucketState[];
		existingCreditDefault: number;
		existingDebitDefault: number;
	} = $props();

	let t = $state(0);
	let existingIsCredit = $state(true);
	let touched = $state(false);

	function setT(v: number) {
		t = v;
		touched = true;
	}
	function setExisting(isCredit: boolean) {
		existingIsCredit = isCredit;
		touched = true;
	}

	const buckets = $derived(bucketsAt(t / 100));
	const requiredAllowance = $derived(round(buckets.reduce((s, b) => s + b.uncollectible, 0)));
	const existingBalance = $derived(existingIsCredit ? existingCreditDefault : existingDebitDefault);
	const badDebtsExpense = $derived(
		round(existingIsCredit ? requiredAllowance - existingBalance : requiredAllowance + existingBalance)
	);

	const sentence = $derived(
		`At ${t}% aged: required allowance ${fmt(requiredAllowance, { dollar: true })}, existing ${fmt(existingBalance, { dollar: true })} ${existingIsCredit ? 'credit' : 'debit'}, bad debts expense ${fmt(badDebtsExpense, { dollar: true })}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<label class="flex items-center gap-2 text-sm" for="aging-slider">
			<span>Aged</span>
			<span class="num font-medium">{t}%</span>
		</label>
		<PinState {chapter} lo="A1" label="Aging schedule" {href} {sentence} dirty={touched} />
	</div>
	<input
		id="aging-slider"
		type="range"
		min="0"
		max="100"
		step="5"
		value={t}
		oninput={(e) => setT(Number((e.target as HTMLInputElement).value))}
		class="mt-2 w-full"
	/>

	<table class="ledger mt-5 text-sm">
		<thead>
			<tr class="text-ink-2 text-left text-xs">
				<th>Age</th>
				<th class="text-right">Balance</th>
				<th class="text-right">Rate</th>
				<th class="text-right">Uncollectible</th>
			</tr>
		</thead>
		<tbody>
			{#each buckets as b (b.bucket.id)}
				<tr>
					<td>{b.bucket.label}</td>
					<td class="num text-right">{fmt(b.balance, { dollar: true })}</td>
					<td class="num text-right">{(b.bucket.rate * 100).toFixed(0)}%</td>
					<td class="num text-right">{fmt(b.uncollectible, { dollar: true })}</td>
				</tr>
			{/each}
			<tr class="border-rule-2 border-t font-medium">
				<td>Total</td>
				<td class="num text-right">{fmt(totalReceivables, { dollar: true })}</td>
				<td></td>
				<td class="num text-right">{fmt(requiredAllowance, { dollar: true })}</td>
			</tr>
		</tbody>
	</table>

	<div class="mt-5 flex flex-wrap items-center gap-3">
		<span class="text-sm">Existing allowance balance:</span>
		<div class="flex gap-1.5">
			<button
				class="border px-2.5 py-1 text-sm transition-colors {existingIsCredit
					? 'border-ink bg-ink text-paper'
					: 'border-rule hover:bg-paper-2'}"
				onclick={() => setExisting(true)}
				aria-pressed={existingIsCredit}>{fmt(existingCreditDefault, { dollar: true })} credit</button
			>
			<button
				class="border px-2.5 py-1 text-sm transition-colors {!existingIsCredit
					? 'border-ink bg-ink text-paper'
					: 'border-rule hover:bg-paper-2'}"
				onclick={() => setExisting(false)}
				aria-pressed={!existingIsCredit}>{fmt(existingDebitDefault, { dollar: true })} debit</button
			>
		</div>
	</div>

	<div class="mt-4 grid gap-4 sm:grid-cols-2">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Required allowance</div>
			<p class="num mt-1 text-lg">{fmt(requiredAllowance, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Bad debts expense</div>
			<p class="num mt-1 text-lg">{fmt(badDebtsExpense, { dollar: true })}</p>
		</div>
	</div>
</div>
