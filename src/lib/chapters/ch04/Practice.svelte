<script lang="ts">
	/** Practice: classify income-statement items, then journalize the 11 situations yourself. */
	import SortDrill from '$lib/components/drills/SortDrill.svelte';
	import EntryDrill from '$lib/components/drills/EntryDrill.svelte';
	import { classifications, entryCards, entryDrillAccounts, accountName } from '$lib/content/chapters/ch04';
	import { progress } from '$lib/progress/store.svelte';

	const href = '/ch/4/practice';
	const sortTakeaway =
		'Sales discounts and sales returns and allowances are contra revenue, subtracted to get net sales. Freight-in and shrinkage are cost of goods sold. Freight-out and salaries to sell are selling expenses; running the office is general and administrative. Interest and gains from outside the main business sit below operating income; dividends never appear on the income statement.';
	const entryTakeaway =
		'A purchase discount, return, or allowance reduces Merchandise inventory directly. A sale needs two entries — revenue at price, cost of goods sold at cost — and a resalable return reverses both. Freight-in is inventory cost; freight-out is a selling expense. Shrinkage is debited to Cost of goods sold.';
</script>

<div class="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
	<div class="eyebrow">Practice · P2</div>
	<h1 class="display mt-1">Where does it belong on the income statement?</h1>
	<p class="text-ink-2 mt-3 max-w-[60ch] text-sm">
		Sort each item into its place on the income statement. Every miss tells you why.
	</p>
	<div class="mt-8">
		<SortDrill
			chapter={4}
			lo="P2"
			{href}
			items={classifications}
			takeaway={sortTakeaway}
			onDone={() => progress.markDrillDone(4, 'classification')}
		/>
	</div>

	<div class="border-rule-2 mt-16 border-t pt-10">
		<div class="eyebrow">Practice · P1</div>
		<h2 class="display mt-1">Journalize the 11 situations yourself</h2>
		<p class="text-ink-2 mt-3 max-w-[60ch] text-sm">
			Two of them fire twice — a price entry and a cost entry — so there are 13 cards.
		</p>
		<div class="mt-8">
			<EntryDrill
				chapter={4}
				lo="P1"
				{href}
				specs={entryCards}
				accounts={entryDrillAccounts}
				{accountName}
				takeaway={entryTakeaway}
				onDone={() => progress.markDrillDone(4, 'entry')}
			/>
		</div>
	</div>

	<div class="border-rule-2 mt-16 flex justify-end border-t pt-6">
		<a href="/ch/4/recall" class="btn">Continue to Recall →</a>
	</div>
</div>
