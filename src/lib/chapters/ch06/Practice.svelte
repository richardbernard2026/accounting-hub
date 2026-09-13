<script lang="ts">
	/** Practice: classify each reconciling item, then journalize the 9 situations yourself. */
	import SortDrill from '$lib/components/drills/SortDrill.svelte';
	import EntryDrill from '$lib/components/drills/EntryDrill.svelte';
	import { classifications, entryCards, entryDrillAccounts, accountName } from '$lib/content/chapters/ch06';
	import { progress } from '$lib/progress/store.svelte';

	const href = '/ch/6/practice';
	const sortTakeaway =
		'Deposits in transit and outstanding checks are already in the books — they only adjust the bank side, no entry. Everything the bank knew first — a collection, interest, a fee, an NSF check, a recording error — adjusts the book side, and each one needs its own entry.';
	const entryTakeaway =
		'Petty cash is debited only to establish or increase the fund; replenishing debits the expenses the receipts show. Cash over and short is debited when the drawer is short, credited when it is over. A reconciling item that adjusts the books always needs its own entry, in whichever direction restores the true balance.';
</script>

<div class="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
	<div class="eyebrow">Practice · P2</div>
	<h1 class="display mt-1">Which side of the reconciliation?</h1>
	<p class="text-ink-2 mt-3 max-w-[60ch] text-sm">
		Sort each item onto the bank side or the book side. Every miss tells you why.
	</p>
	<div class="mt-8">
		<SortDrill
			chapter={6}
			lo="P2"
			{href}
			items={classifications}
			takeaway={sortTakeaway}
			onDone={() => progress.markDrillDone(6, 'classification')}
		/>
	</div>

	<div class="border-rule-2 mt-16 border-t pt-10">
		<div class="eyebrow">Practice · P1</div>
		<h2 class="display mt-1">Journalize the 9 situations yourself</h2>
		<div class="mt-8">
			<EntryDrill
				chapter={6}
				lo="P1"
				{href}
				specs={entryCards}
				accounts={entryDrillAccounts}
				{accountName}
				takeaway={entryTakeaway}
				onDone={() => progress.markDrillDone(6, 'entry')}
			/>
		</div>
	</div>

	<div class="border-rule-2 mt-16 flex justify-end border-t pt-6">
		<a href="/ch/6/recall" class="btn">Continue to Recall →</a>
	</div>
</div>
