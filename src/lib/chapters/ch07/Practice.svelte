<script lang="ts">
	/** Practice: classify each event's effect on total assets, then journalize the 10 situations yourself. */
	import SortDrill from '$lib/components/drills/SortDrill.svelte';
	import EntryDrill from '$lib/components/drills/EntryDrill.svelte';
	import { classifications, entryCards, entryDrillAccounts, accountName } from '$lib/content/chapters/ch07';
	import { progress } from '$lib/progress/store.svelte';

	const href = '/ch/7/practice';
	const sortTakeaway =
		'Recording the estimate under the allowance method pulls net receivables down; writing off an account, under that same method, changes nothing — receivables and the allowance fall together. Direct write-off has no allowance to fall back on, so it hits assets directly. A note, a reinstatement, or an ordinary collection just swaps one asset for another.';
	const entryTakeaway =
		"Write-offs never touch expense under the allowance method — only the allowance and the specific receivable move. Percent of sales adds to the allowance; percent of receivables adjusts to a target. A note earns interest every day of its term, accrued or not, and a dishonored note still moves its full maturity value into accounts receivable.";
</script>

<div class="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
	<div class="eyebrow">Practice · C2</div>
	<h1 class="display mt-1">What happens to total assets?</h1>
	<p class="text-ink-2 mt-3 max-w-[60ch] text-sm">
		Sort each event by its effect on total assets. Every miss tells you why.
	</p>
	<div class="mt-8">
		<SortDrill
			chapter={7}
			lo="C2"
			{href}
			items={classifications}
			takeaway={sortTakeaway}
			onDone={() => progress.markDrillDone(7, 'classification')}
		/>
	</div>

	<div class="border-rule-2 mt-16 border-t pt-10">
		<div class="eyebrow">Practice · P1</div>
		<h2 class="display mt-1">Journalize the 10 situations yourself</h2>
		<div class="mt-8">
			<EntryDrill
				chapter={7}
				lo="P1"
				{href}
				specs={entryCards}
				accounts={entryDrillAccounts}
				{accountName}
				takeaway={entryTakeaway}
				onDone={() => progress.markDrillDone(7, 'entry')}
			/>
		</div>
	</div>

	<div class="border-rule-2 mt-16 flex justify-end border-t pt-6">
		<a href="/ch/7/recall" class="btn">Continue to Recall →</a>
	</div>
</div>
