<script lang="ts">
	/** Practice: decide what counts as our inventory, then journalize the 9 situations yourself. */
	import SortDrill from '$lib/components/drills/SortDrill.svelte';
	import EntryDrill from '$lib/components/drills/EntryDrill.svelte';
	import { classifications, entryCards, entryDrillAccounts, accountName } from '$lib/content/chapters/ch05';
	import { progress } from '$lib/progress/store.svelte';

	const href = '/ch/5/practice';
	const sortTakeaway =
		'Ownership decides what counts, not location. Goods in transit belong to whoever holds title under the FOB terms; consigned goods always belong to the consignor, no matter who is holding them; damaged goods still count, at what they are actually worth.';
	const entryTakeaway =
		'Every method starts from the same goods available for sale. FIFO drains the oldest layer, LIFO the newest, weighted average the pooled cost per unit — and a market write-down debits Cost of goods sold directly, the same as a sale’s cost entry.';
</script>

<div class="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
	<div class="eyebrow">Practice · C2</div>
	<h1 class="display mt-1">Is it ours at year end?</h1>
	<p class="text-ink-2 mt-3 max-w-[60ch] text-sm">
		Decide whether each situation belongs in our ending inventory. Every miss tells you why.
	</p>
	<div class="mt-8">
		<SortDrill
			chapter={5}
			lo="C2"
			{href}
			items={classifications}
			takeaway={sortTakeaway}
			onDone={() => progress.markDrillDone(5, 'classification')}
		/>
	</div>

	<div class="border-rule-2 mt-16 border-t pt-10">
		<div class="eyebrow">Practice · P1</div>
		<h2 class="display mt-1">Journalize the 9 situations yourself</h2>
		<p class="text-ink-2 mt-3 max-w-[60ch] text-sm">
			Two of the sales fire twice — a price entry and a cost entry — so there are 11 cards.
		</p>
		<div class="mt-8">
			<EntryDrill
				chapter={5}
				lo="P1"
				{href}
				specs={entryCards}
				accounts={entryDrillAccounts}
				{accountName}
				takeaway={entryTakeaway}
				onDone={() => progress.markDrillDone(5, 'entry')}
			/>
		</div>
	</div>

	<div class="border-rule-2 mt-16 flex justify-end border-t pt-6">
		<a href="/ch/5/recall" class="btn">Continue to Recall →</a>
	</div>
</div>
