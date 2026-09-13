<script lang="ts">
	/**
	 * Practice: classify each cash flow, then sort the statement's own facts
	 * into section and direction. A cash flow statement reclassifies facts
	 * already recorded elsewhere rather than journalizing new ones, so both
	 * drills here are sorts rather than a debit/credit journalizer.
	 */
	import SortDrill from '$lib/components/drills/SortDrill.svelte';
	import { classifications, statementLineItems } from '$lib/content/chapters/ch12';
	import { progress } from '$lib/progress/store.svelte';

	const href = '/ch/12/practice';
	const classifyTakeaway =
		'Interest paid, interest received, and dividends received are operating under U.S. GAAP — only dividends paid are financing. A noncash investing and financing activity never touches any of the three totals; it is disclosed, not included.';
	const statementLineTakeaway =
		'Add back noncash expenses and losses, subtract gains — the cash for a gain or loss shows up in its own section, not operating. Asset up subtracts, liability up adds. A compound transaction splits: only the cash portion enters investing or financing, the rest goes to the noncash schedule.';
</script>

<div class="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
	<div class="eyebrow">Practice · C1</div>
	<h1 class="display mt-1">Operating, investing, financing, or noncash?</h1>
	<p class="text-ink-2 mt-3 max-w-[60ch] text-sm">Sort each item. Every miss tells you why.</p>
	<div class="mt-8">
		<SortDrill
			chapter={12}
			lo="C1"
			{href}
			items={classifications}
			takeaway={classifyTakeaway}
			onDone={() => progress.markDrillDone(12, 'classification')}
		/>
	</div>

	<div class="border-rule-2 mt-16 border-t pt-10">
		<div class="eyebrow">Practice · P1</div>
		<h2 class="display mt-1">Put the statement's own facts in place</h2>
		<p class="text-ink-2 mt-3 max-w-[60ch] text-sm">Sort each fact into its section and direction.</p>
		<div class="mt-8">
			<SortDrill
				chapter={12}
				lo="P1"
				{href}
				items={statementLineItems}
				takeaway={statementLineTakeaway}
				onDone={() => progress.markDrillDone(12, 'entry')}
			/>
		</div>
	</div>

	<div class="border-rule-2 mt-16 flex justify-end border-t pt-6">
		<a href="/ch/12/recall" class="btn">Continue to Recall →</a>
	</div>
</div>
