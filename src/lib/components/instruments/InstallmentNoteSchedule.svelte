<script lang="ts">
	/** Step through the three payments and watch interest shrink as principal grows. */
	import { fmt } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	interface Row {
		payment: number;
		interest: number;
		principal: number;
		balance: number;
	}

	let {
		chapter,
		href,
		principal,
		payment,
		schedule
	}: {
		chapter: number;
		href?: string;
		principal: number;
		payment: number;
		schedule: Row[];
	} = $props();

	let paymentIndex = $state(1);
	let touched = $state(false);

	function setPaymentIndex(v: number) {
		paymentIndex = v;
		touched = true;
	}

	const current = $derived(schedule[paymentIndex - 1]);
	const sentence = $derived(
		`Payment ${paymentIndex} of ${schedule.length}: interest ${fmt(current.interest, { dollar: true })}, principal ${fmt(current.principal, { dollar: true })}, balance after ${fmt(current.balance, { dollar: true })}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<label class="flex items-center gap-2 text-sm" for="payment-slider">
			<span>Payment</span>
			<span class="num font-medium">{paymentIndex} of {schedule.length}</span>
		</label>
		<PinState {chapter} lo="P4" label="Installment note schedule" {href} {sentence} dirty={touched} />
	</div>
	<input
		id="payment-slider"
		type="range"
		min="1"
		max={schedule.length}
		step="1"
		value={paymentIndex}
		oninput={(e) => setPaymentIndex(Number((e.target as HTMLInputElement).value))}
		class="mt-2 w-full"
	/>

	<div class="mt-6 grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Interest, this payment</div>
			<p class="num mt-1 text-lg">{fmt(current.interest, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Principal, this payment</div>
			<p class="num mt-1 text-lg">{fmt(current.principal, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Balance after</div>
			<p class="num mt-1 text-lg">{fmt(current.balance, { dollar: true })}</p>
		</div>
	</div>

	<div class="mt-6">
		<div class="kicker mb-2">Full schedule</div>
		<table class="ledger w-full text-sm">
			<thead>
				<tr class="text-ink-2 text-left">
					<th class="pb-1 font-normal">Payment</th>
					<th class="pb-1 text-right font-normal">Interest</th>
					<th class="pb-1 text-right font-normal">Principal</th>
					<th class="pb-1 text-right font-normal">Balance</th>
				</tr>
			</thead>
			<tbody>
				<tr class="text-ink-2">
					<td>—</td>
					<td class="num text-right"></td>
					<td class="num text-right"></td>
					<td class="num text-right">{fmt(principal, { dollar: true })}</td>
				</tr>
				{#each schedule as row (row.payment)}
					<tr class={row.payment === paymentIndex ? 'font-medium' : ''}>
						<td>{row.payment}{row.payment === paymentIndex ? ' ←' : ''}</td>
						<td class="num text-right">{fmt(row.interest, { dollar: true })}</td>
						<td class="num text-right">{fmt(row.principal, { dollar: true })}</td>
						<td class="num text-right">{fmt(row.balance, { dollar: true })}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<p class="text-ink-2 mt-2 text-xs">Every payment is {fmt(payment, { dollar: true })}. Only the split changes.</p>
	</div>
</div>
