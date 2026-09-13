<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import JournalEntry from '$lib/components/ledger/JournalEntry.svelte';
	import { zMart, accountName } from '$lib/content/chapters/ch04';

	const href = '/ch/4/learn/purchases';
	setContext('href', href);
	const invoice = zMart.entries.find((e) => e.id === '2')!;
	const paid = zMart.entries.find((e) => e.id === '3')!;
	const freight = zMart.entries.find((e) => e.id === '6')!;
</script>

<div class="frame">
	<p class="max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		Z-Mart buys $500 of merchandise on credit, terms 2/10, n/30, then pays within the discount
		period.
	</p>
	<div class="mt-5 grid gap-4 sm:grid-cols-2">
		<div class="border-rule-2 bg-paper border px-3 py-2">
			<div class="text-ink-2 text-xs">The purchase</div>
			<JournalEntry entry={invoice} {accountName} compact date={false} />
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2">
			<div class="text-ink-2 text-xs">Paid within 10 days</div>
			<JournalEntry entry={paid} {accountName} compact date={false} />
		</div>
	</div>
	<div class="border-rule-2 bg-paper mt-4 border px-3 py-2 sm:max-w-[46ch]">
		<div class="text-ink-2 text-xs">Freight, FOB shipping point</div>
		<JournalEntry entry={freight} {accountName} compact date={false} />
	</div>
</div>

<Reading chapter={4} lo="C2" label="Discounts, returns, and freight all move Merchandise inventory">
	<div class="prose-col mt-8">
		<p>
			Under the <TermMark name="Perpetual inventory system">perpetual system</TermMark> there is no
			separate discounts account. A <TermMark name="Purchases discount">purchases discount</TermMark> for
			paying early, a <TermMark name="Purchases returns">return</TermMark>, or a
			<TermMark name="Purchases allowances">allowance</TermMark> for keeping damaged goods all reduce
			<TermMark name="Merchandise inventory">Merchandise inventory</TermMark> directly.
		</p>
		<p>
			<TermMark name="FOB shipping point">FOB shipping point</TermMark> means the buyer owns the goods
			once they leave the seller's dock, and pays the freight — which is added to inventory, not
			expensed. <TermMark name="FOB destination">FOB destination</TermMark> flips both: the seller owns
			the goods in transit and expenses the freight instead.
		</p>
	</div>
</Reading>
