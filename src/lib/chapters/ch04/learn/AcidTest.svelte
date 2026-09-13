<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import { meridian, quickAssets, currentLiabilities, acidTestRatio } from '$lib/content/chapters/ch04';
	import { fmt } from '$lib/ledger';

	const href = '/ch/4/learn/acid-test';
	setContext('href', href);
</script>

<div class="frame">
	<p class="mb-4 max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		See how much of Meridian Retail's current position is already cash or one step from it.
	</p>
	<div class="grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Quick assets</div>
			<p class="num mt-1 text-lg">{fmt(quickAssets, { dollar: true })}</p>
			<p class="text-ink-2 text-xs">
				Cash {fmt(meridian.balances.get('101')!.balance, { dollar: true })} + short-term investments
				{fmt(meridian.balances.get('102')!.balance, { dollar: true })} + receivables
				{fmt(meridian.balances.get('106')!.balance, { dollar: true })}
			</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Current liabilities</div>
			<p class="num mt-1 text-lg">{fmt(currentLiabilities, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Acid-test ratio</div>
			<p class="num mt-1 text-lg">{acidTestRatio.toFixed(2)}</p>
		</div>
	</div>
	<p class="text-ink-3 mt-3 text-xs">
		Merchandise inventory of {fmt(meridian.balances.get('119')!.balance, { dollar: true })} is left out
		entirely — it still has to sell before it is cash.
	</p>
</div>

<Reading chapter={4} lo="A2" label="Why inventory is left out">
	<div class="prose-col mt-8">
		<p>
			The <TermMark name="Acid-test (quick) ratio">acid-test ratio</TermMark> only counts assets already
			cash or one step from it: cash itself, short-term investments, and current receivables.
			Merchandise inventory has to sell, and then the receivable has to be collected, before it is cash.
		</p>
		<p>
			A company can carry a healthy current ratio built mostly on slow-moving inventory and still
			struggle to pay this month's bills. The acid-test ratio catches that; the current ratio does not.
		</p>
	</div>
</Reading>
