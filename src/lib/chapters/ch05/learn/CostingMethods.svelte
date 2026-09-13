<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import { fmt } from '$lib/ledger';
	import { goodsAvailableCost, goodsAvailableUnits, salesTotal, fifoCogs, lifoCogs, wavgCogs, specificId } from '$lib/content/chapters/ch05';

	const href = '/ch/5/learn/costing-methods';
	setContext('href', href);
</script>

<div class="frame">
	<p class="max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		Trekking Company has {goodsAvailableUnits} identical units available, bought at four different
		prices, for {fmt(goodsAvailableCost, { dollar: true })} total.
	</p>
	<div class="mt-5 grid gap-3 sm:grid-cols-4">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">FIFO</div>
			<p class="num mt-1 text-lg">{fmt(fifoCogs, { dollar: true })}</p>
			<p class="text-ink-2 text-xs">cost of goods sold</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">LIFO</div>
			<p class="num mt-1 text-lg">{fmt(lifoCogs, { dollar: true })}</p>
			<p class="text-ink-2 text-xs">cost of goods sold</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Weighted avg.</div>
			<p class="num mt-1 text-lg">{fmt(wavgCogs, { dollar: true })}</p>
			<p class="text-ink-2 text-xs">cost of goods sold</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Specific ID</div>
			<p class="num mt-1 text-lg">{fmt(specificId.cogs, { dollar: true })}</p>
			<p class="text-ink-2 text-xs">cost of goods sold</p>
		</div>
	</div>
	<p class="text-ink-3 mt-3 text-xs">Sales were {fmt(salesTotal, { dollar: true })} in every case — only the cost side moves.</p>
</div>

<Reading chapter={5} lo="C1" label="Four methods, one pool of cost">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Specific identification">Specific identification</TermMark> tracks the actual
			cost of each unit sold. <TermMark name="First-in, first-out (FIFO)">FIFO</TermMark> assumes the
			oldest units leave first. <TermMark name="Last-in, first-out (LIFO)">LIFO</TermMark> assumes the
			newest units leave first. <TermMark name="Weighted average">Weighted average</TermMark> blends
			every unit on hand into one cost.
		</p>
		<p>
			None of them change the <TermMark name="Cost of goods available for sale"
				>cost of goods available for sale</TermMark
			>. Each one only decides how that fixed total splits between cost of goods sold and ending
			inventory — which is why gross profit differs by method even though the units and prices do
			not.
		</p>
	</div>
</Reading>
