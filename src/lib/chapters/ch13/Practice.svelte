<script lang="ts">
	/**
	 * Practice: classify each ratio's building block, then compute the
	 * chapter's 22 numbers yourself. This chapter has no journal entries at
	 * all, so the second drill is a computation drill rather than a
	 * debit/credit journalizer.
	 */
	import SortDrill from '$lib/components/drills/SortDrill.svelte';
	import ComputationDrill from '$lib/components/drills/ComputationDrill.svelte';
	import { classifications, computationItems } from '$lib/content/chapters/ch13';
	import { progress } from '$lib/progress/store.svelte';

	const href = '/ch/13/practice';
	const classifyTakeaway =
		'Liquidity and efficiency ratios ask whether current assets cover current liabilities and how hard assets work. Solvency ratios compare creditor financing to owner financing. Profitability ratios all divide some measure of profit by some measure of size. Market prospects compare the stock price to earnings, equity, and dividends.';
	const computationTakeaway =
		'Point-in-time ratios (current ratio, debt ratio) use year-end balances. Turnover and return ratios use an average of the beginning and ending balance, since they compare a whole year\'s flow to a balance that changed all year. Return on total assets is always profit margin times total asset turnover.';
</script>

<div class="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
	<div class="eyebrow">Practice · C1</div>
	<h1 class="display mt-1">Which building block?</h1>
	<p class="text-ink-2 mt-3 max-w-[60ch] text-sm">Sort each ratio. Every miss tells you why.</p>
	<div class="mt-8">
		<SortDrill
			chapter={13}
			lo="C1"
			{href}
			items={classifications}
			takeaway={classifyTakeaway}
			onDone={() => progress.markDrillDone(13, 'classification')}
		/>
	</div>

	<div class="border-rule-2 mt-16 border-t pt-10">
		<div class="eyebrow">Practice · A1</div>
		<h2 class="display mt-1">Compute the chapter's 22 numbers yourself</h2>
		<div class="mt-8">
			<ComputationDrill
				chapter={13}
				lo="A1"
				{href}
				items={computationItems}
				takeaway={computationTakeaway}
				onDone={() => progress.markDrillDone(13, 'entry')}
			/>
		</div>
	</div>

	<div class="border-rule-2 mt-16 flex justify-end border-t pt-6">
		<a href="/ch/13/recall" class="btn">Continue to Recall →</a>
	</div>
</div>
