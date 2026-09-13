<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';

	const href = '/ch/4/learn/merchandisers';
	setContext('href', href);
</script>

<div class="frame">
	<p class="max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		A service company sells what it does. A <TermMark name="Merchandiser">merchandiser</TermMark> sells
		what it buys — usually for more than it paid.
	</p>
	<div class="mt-5 grid gap-4 sm:grid-cols-2">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Wholesaler</div>
			<p class="text-ink-2 mt-1">Buys from a manufacturer, sells to another merchandiser.</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Retailer</div>
			<p class="text-ink-2 mt-1">Buys from a wholesaler or manufacturer, sells to the final customer.</p>
		</div>
	</div>
</div>

<Reading chapter={4} lo="C1" label="The operating cycle and two ways to track inventory">
	<div class="prose-col mt-8">
		<p>
			A merchandiser's <TermMark name="Operating cycle">operating cycle</TermMark> runs from cash, to
			<TermMark name="Merchandise inventory">merchandise inventory</TermMark> on the shelf, to a sale, back
			to cash. Every sale needs two entries: revenue at the price charged, and
			<TermMark name="Cost of goods sold">cost of goods sold</TermMark> at what the goods cost.
		</p>
		<p>
			A <TermMark name="Perpetual inventory system">perpetual system</TermMark> updates inventory with
			every purchase and every sale, so the books always show what should be on the shelf. A
			<TermMark name="Periodic inventory system">periodic system</TermMark> only finds out at period end,
			by counting. This chapter uses the perpetual system throughout.
		</p>
	</div>
</Reading>
