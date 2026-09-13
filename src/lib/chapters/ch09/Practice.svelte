<script lang="ts">
	/** Practice: classify each liability, then journalize the 10 situations yourself. */
	import SortDrill from '$lib/components/drills/SortDrill.svelte';
	import EntryDrill from '$lib/components/drills/EntryDrill.svelte';
	import { classifications, entryCards, entryDrillAccounts, accountName } from '$lib/content/chapters/ch09';
	import { progress } from '$lib/progress/store.svelte';

	const href = '/ch/9/practice';
	const sortTakeaway =
		'Known liabilities have a certain amount and payee. Estimated liabilities are certain to arise but need a best guess at the amount. Contingent liabilities depend on a future event: record the probable and estimable ones, disclose the reasonably possible ones, and say nothing about the remote ones.';
	const entryTakeaway =
		'Sales tax and unearned revenue are liabilities, never revenue, until earned. FUTA and SUTA are employer-only — never withheld. A note accrues interest by the calendar, split across a year end if it falls inside the term. Warranty expense is recorded at the sale; a later repair only reduces the liability.';
</script>

<div class="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
	<div class="eyebrow">Practice · C1</div>
	<h1 class="display mt-1">Known, estimated, or contingent?</h1>
	<p class="text-ink-2 mt-3 max-w-[60ch] text-sm">
		Sort each item. Every miss tells you why.
	</p>
	<div class="mt-8">
		<SortDrill
			chapter={9}
			lo="C1"
			{href}
			items={classifications}
			takeaway={sortTakeaway}
			onDone={() => progress.markDrillDone(9, 'classification')}
		/>
	</div>

	<div class="border-rule-2 mt-16 border-t pt-10">
		<div class="eyebrow">Practice · P1</div>
		<h2 class="display mt-1">Journalize the 10 situations yourself</h2>
		<div class="mt-8">
			<EntryDrill
				chapter={9}
				lo="P1"
				{href}
				specs={entryCards}
				accounts={entryDrillAccounts}
				{accountName}
				takeaway={entryTakeaway}
				onDone={() => progress.markDrillDone(9, 'entry')}
			/>
		</div>
	</div>

	<div class="border-rule-2 mt-16 flex justify-end border-t pt-6">
		<a href="/ch/9/recall" class="btn">Continue to Recall →</a>
	</div>
</div>
