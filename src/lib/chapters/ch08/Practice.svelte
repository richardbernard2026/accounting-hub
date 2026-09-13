<script lang="ts">
	/** Practice: classify each cost, then journalize the 10 situations yourself. */
	import SortDrill from '$lib/components/drills/SortDrill.svelte';
	import EntryDrill from '$lib/components/drills/EntryDrill.svelte';
	import { classifications, entryCards, entryDrillAccounts, accountName } from '$lib/content/chapters/ch08';
	import { progress } from '$lib/progress/store.svelte';

	const href = '/ch/8/practice';
	const sortTakeaway =
		'Costs to get an asset ready for its intended use are added to its cost — freight, installation, transit insurance, clearing land. Costs to keep it running once it is in service are expensed — insurance, ordinary repairs, routine maintenance, later property taxes. A betterment that extends useful life is capitalized, the same as buying the asset in the first place.';
	const entryTakeaway =
		"A lump-sum purchase splits by relative appraised value, not evenly. Depreciation credits accumulated depreciation, never the asset directly. Selling a plant asset removes both the asset and its accumulated depreciation, and the difference against what came in is the gain or loss — measured against book value. Depletion and amortization both work like units-of-production: cost divided by what's used up.";
</script>

<div class="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
	<div class="eyebrow">Practice · C2</div>
	<h1 class="display mt-1">Add to the asset, or expense it?</h1>
	<p class="text-ink-2 mt-3 max-w-[60ch] text-sm">
		Sort each cost. Every miss tells you why.
	</p>
	<div class="mt-8">
		<SortDrill
			chapter={8}
			lo="C2"
			{href}
			items={classifications}
			takeaway={sortTakeaway}
			onDone={() => progress.markDrillDone(8, 'classification')}
		/>
	</div>

	<div class="border-rule-2 mt-16 border-t pt-10">
		<div class="eyebrow">Practice · P1</div>
		<h2 class="display mt-1">Journalize the 10 situations yourself</h2>
		<div class="mt-8">
			<EntryDrill
				chapter={8}
				lo="P1"
				{href}
				specs={entryCards}
				accounts={entryDrillAccounts}
				{accountName}
				takeaway={entryTakeaway}
				onDone={() => progress.markDrillDone(8, 'entry')}
			/>
		</div>
	</div>

	<div class="border-rule-2 mt-16 flex justify-end border-t pt-6">
		<a href="/ch/8/recall" class="btn">Continue to Recall →</a>
	</div>
</div>
