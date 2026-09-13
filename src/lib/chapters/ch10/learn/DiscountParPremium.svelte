<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import { fmt } from '$lib/ledger';
	import { bondPar, discountPrice, parPrice, premiumPrice } from '$lib/content/chapters/ch10';

	const href = '/ch/10/learn/discount-par-premium';
	setContext('href', href);
</script>

<div class="frame">
	<p class="max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		An 8% bond priced against three different markets, same par value, same cash interest.
	</p>
	<div class="mt-5 grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Market 10% — Discount</div>
			<p class="num mt-1 text-lg">{fmt(discountPrice, { dollar: true })}</p>
			<p class="text-ink-2 mt-1">Pays less than the market wants.</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Market 8% — Par</div>
			<p class="num mt-1 text-lg">{fmt(parPrice, { dollar: true })}</p>
			<p class="text-ink-2 mt-1">Rates match exactly.</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Market 6% — Premium</div>
			<p class="num mt-1 text-lg">{fmt(premiumPrice, { dollar: true })}</p>
			<p class="text-ink-2 mt-1">Pays more than the market wants.</p>
		</div>
	</div>
</div>

<Reading chapter={10} lo="C1" label="One bond, three prices">
	<div class="prose-col mt-8">
		<p>
			A <TermMark name="Bond">bond</TermMark>'s <TermMark name="Contract rate (coupon rate)"
				>contract rate</TermMark
			> is fixed when it is printed. The <TermMark name="Market rate">market rate</TermMark> moves with
			the economy, and it is what investors compare the bond against.
		</p>
		<p>
			When the contract rate falls short of the market, investors pay less than
			{fmt(bondPar, { dollar: true })} par — a <TermMark name="Discount on bonds payable"
				>discount</TermMark
			>. When it beats the market, they pay more — a <TermMark name="Premium on bonds payable"
				>premium</TermMark
			>. Either way, the price adjusts so the buyer still earns the going rate.
		</p>
	</div>
</Reading>
