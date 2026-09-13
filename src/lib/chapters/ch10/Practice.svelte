<script lang="ts">
	/** Practice: classify each bond by price, then journalize the 10 situations yourself. */
	import SortDrill from '$lib/components/drills/SortDrill.svelte';
	import EntryDrill from '$lib/components/drills/EntryDrill.svelte';
	import { classifications, entryCards, entryDrillAccounts, accountName } from '$lib/content/chapters/ch10';
	import { progress } from '$lib/progress/store.svelte';

	const href = '/ch/10/practice';
	const sortTakeaway =
		'The market rate prices the bond, not the contract rate. Above the contract rate, the bond sells at a discount; below it, a premium; equal, at par. Effective interest expense above cash interest means a discount is amortizing; below it means a premium is.';
	const entryTakeaway =
		'Discount on bonds payable is a contra liability; premium is an adjunct liability — both adjust Bonds payable toward carrying value. Cash interest is always par × contract rate, whatever the price. A retirement gain or loss compares the call price to carrying value, never par. An installment payment splits between interest on the balance and principal that reduces it.';
</script>

<div class="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
	<div class="eyebrow">Practice · C1</div>
	<h1 class="display mt-1">Discount, par, or premium?</h1>
	<p class="text-ink-2 mt-3 max-w-[60ch] text-sm">Sort each item. Every miss tells you why.</p>
	<div class="mt-8">
		<SortDrill
			chapter={10}
			lo="C1"
			{href}
			items={classifications}
			takeaway={sortTakeaway}
			onDone={() => progress.markDrillDone(10, 'classification')}
		/>
	</div>

	<div class="border-rule-2 mt-16 border-t pt-10">
		<div class="eyebrow">Practice · P1</div>
		<h2 class="display mt-1">Journalize the 10 situations yourself</h2>
		<div class="mt-8">
			<EntryDrill
				chapter={10}
				lo="P1"
				{href}
				specs={entryCards}
				accounts={entryDrillAccounts}
				{accountName}
				takeaway={entryTakeaway}
				onDone={() => progress.markDrillDone(10, 'entry')}
			/>
		</div>
	</div>

	<div class="border-rule-2 mt-16 flex justify-end border-t pt-6">
		<a href="/ch/10/recall" class="btn">Continue to Recall →</a>
	</div>
</div>
