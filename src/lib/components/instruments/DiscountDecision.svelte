<script lang="ts">
	/**
	 * Move the payment day past the discount deadline and watch the implied
	 * annual rate of skipping the discount. At the invoice's own terms (paid
	 * on the last day of the credit period) this reproduces the brief's
	 * 37.2% exactly; paying sooner after the deadline makes it worse.
	 */
	import { fmt, round } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	let {
		chapter,
		href,
		invoiceAmount,
		earlyPaymentCash,
		discountTaken,
		discountDays,
		creditDays
	}: {
		chapter: number;
		href?: string;
		invoiceAmount: number;
		earlyPaymentCash: number;
		discountTaken: number;
		discountDays: number;
		creditDays: number;
	} = $props();

	let payDay = $state(discountDays);
	let touched = $state(false);

	function setDay(v: number) {
		payDay = v;
		touched = true;
	}

	const skipsDiscount = $derived(payDay > discountDays);
	const cashPaid = $derived(skipsDiscount ? invoiceAmount : earlyPaymentCash);
	const daysGained = $derived(Math.max(1, payDay - discountDays));
	const impliedAnnualRate = $derived(
		skipsDiscount ? round((discountTaken / earlyPaymentCash) * (365 / daysGained) * 10000) / 10000 : 0
	);

	const sentence = $derived(
		skipsDiscount
			? `Pay on day ${payDay}: ${fmt(cashPaid, { dollar: true })}, skipping the discount to keep ${fmt(earlyPaymentCash, { dollar: true })} for ${daysGained} more day${daysGained === 1 ? '' : 's'} — ${(impliedAnnualRate * 100).toFixed(1)}% a year.`
			: `Pay on day ${payDay}, inside the discount period: ${fmt(cashPaid, { dollar: true })}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<label class="flex items-center gap-2 text-sm" for="pay-day-slider">
			<span>Pay on day</span>
			<span class="num font-medium">{payDay}</span>
		</label>
		<PinState {chapter} lo="A1" label="Discount decision" {href} {sentence} dirty={touched} />
	</div>
	<input
		id="pay-day-slider"
		type="range"
		min={discountDays}
		max={creditDays}
		step="1"
		value={payDay}
		oninput={(e) => setDay(Number((e.target as HTMLInputElement).value))}
		class="mt-2 w-full"
	/>
	<div class="text-ink-2 mt-1 flex justify-between text-xs">
		<span>Day {discountDays}: take the {fmt(discountTaken, { dollar: true })} discount</span>
		<span>Day {creditDays}: full amount due</span>
	</div>

	<div class="mt-6 grid gap-3 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Invoice</div>
			<p class="num mt-1 text-lg">{fmt(invoiceAmount, { dollar: true })}</p>
			<p class="text-ink-2 text-xs">terms 2/{discountDays}, n/{creditDays}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm {skipsDiscount ? 'border-warn' : 'border-ok'}">
			<div class="eyebrow">Cash paid</div>
			<p class="num mt-1 text-lg">{fmt(cashPaid, { dollar: true })}</p>
			<p class="text-ink-2 text-xs">{skipsDiscount ? 'Discount skipped' : 'Discount taken'}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Implied annual rate</div>
			<p class="num mt-1 text-lg">{skipsDiscount ? `${(impliedAnnualRate * 100).toFixed(1)}%` : '—'}</p>
			<p class="text-ink-2 text-xs">{skipsDiscount ? `of borrowing for ${daysGained} days` : 'not skipping'}</p>
		</div>
	</div>
</div>
