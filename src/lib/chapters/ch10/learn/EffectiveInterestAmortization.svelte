<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import { fmt } from '$lib/ledger';
	import { discountPrice, effectiveInterestFirstPeriodDiscount, bondCashInterest } from '$lib/content/chapters/ch10';

	const href = '/ch/10/learn/effective-interest-amortization';
	setContext('href', href);
	const amortization = effectiveInterestFirstPeriodDiscount - bondCashInterest;
</script>

<div class="frame">
	<p class="max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		Charge the market rate against the beginning carrying value, period by period.
	</p>
	<div class="mt-5 grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Beginning carrying value</div>
			<p class="num mt-1 text-lg">{fmt(discountPrice, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">× 5% market rate</div>
			<p class="num mt-1 text-lg">{fmt(effectiveInterestFirstPeriodDiscount, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Amortization − cash interest</div>
			<p class="num mt-1 text-lg">{fmt(amortization, { dollar: true })}</p>
		</div>
	</div>
</div>

<Reading chapter={10} lo="P3" label="Interest expense that changes every period">
	<div class="prose-col mt-8">
		<p>
			The <TermMark name="Effective interest method">effective interest method</TermMark> ties interest
			expense to the market rate and whatever carrying value is actually outstanding — as the discount
			amortizes and carrying value rises toward par, interest expense rises with it.
		</p>
		<p>
			Cash interest stays fixed at {fmt(bondCashInterest, { dollar: true })} every period; only the
			expense and the amortization move. This is the method most textbooks treat as the more accurate one.
		</p>
	</div>
</Reading>
