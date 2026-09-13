<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import { fmt } from '$lib/ledger';
	import { fifoCogs, beginningInvCost, fifoEndingInv, averageInventory, inventoryTurnover, daysSalesInInventory } from '$lib/content/chapters/ch05';

	const href = '/ch/5/learn/turnover';
	setContext('href', href);
</script>

<div class="frame">
	<p class="mb-4 max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		See how fast Trekking’s FIFO inventory moved during August.
	</p>
	<div class="grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Average inventory</div>
			<p class="num mt-1 text-lg">{fmt(averageInventory, { dollar: true })}</p>
			<p class="text-ink-2 text-xs">({fmt(beginningInvCost, { dollar: true })} + {fmt(fifoEndingInv, { dollar: true })}) ÷ 2</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Inventory turnover</div>
			<p class="num mt-1 text-lg">{inventoryTurnover.toFixed(1)} times</p>
			<p class="text-ink-2 text-xs">{fmt(fifoCogs, { dollar: true })} ÷ average inventory</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Days' sales in inventory</div>
			<p class="num mt-1 text-lg">{daysSalesInInventory.toFixed(1)} days</p>
			<p class="text-ink-2 text-xs">ending inventory ÷ cost of goods sold × 365</p>
		</div>
	</div>
</div>

<Reading chapter={5} lo="A2" label="How fast inventory moves">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Inventory turnover">Inventory turnover</TermMark> divides cost of goods sold by
			average inventory: how many times inventory was sold and replaced during the period. A higher
			number means faster movement.
		</p>
		<p>
			<TermMark name="Days' sales in inventory">Days' sales in inventory</TermMark> flips the same idea
			around: roughly how many days it would take, at the current rate, to sell off everything on the
			shelf right now.
		</p>
	</div>
</Reading>
