<script lang="ts">
	/** Practice: classify each event's effect on equity, then journalize the 10 situations yourself. */
	import SortDrill from '$lib/components/drills/SortDrill.svelte';
	import EntryDrill from '$lib/components/drills/EntryDrill.svelte';
	import { classifications, entryCards, entryDrillAccounts, accountName } from '$lib/content/chapters/ch11';
	import { progress } from '$lib/progress/store.svelte';

	const href = '/ch/11/practice';
	const sortTakeaway =
		'Issuing stock and reissuing treasury stock above cost bring assets in. Cash dividends and buying treasury stock send assets out. Everything else — stock dividends, splits, the record date, paying a dividend already declared — only rearranges equity or settles a liability already on the books.';
	const entryTakeaway =
		'Common stock is credited at par no matter what is received for it; the rest is paid-in capital. A small stock dividend is valued at market, never par. Treasury stock transactions never touch the income statement. A stock split gets no entry at all.';
</script>

<div class="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
	<div class="eyebrow">Practice · P1</div>
	<h1 class="display mt-1">Up, down, or no change?</h1>
	<p class="text-ink-2 mt-3 max-w-[60ch] text-sm">Sort each event. Every miss tells you why.</p>
	<div class="mt-8">
		<SortDrill
			chapter={11}
			lo="P1"
			{href}
			items={classifications}
			takeaway={sortTakeaway}
			onDone={() => progress.markDrillDone(11, 'classification')}
		/>
	</div>

	<div class="border-rule-2 mt-16 border-t pt-10">
		<div class="eyebrow">Practice · P1</div>
		<h2 class="display mt-1">Journalize the 10 situations yourself</h2>
		<div class="mt-8">
			<EntryDrill
				chapter={11}
				lo="P1"
				{href}
				specs={entryCards}
				accounts={entryDrillAccounts}
				{accountName}
				takeaway={entryTakeaway}
				onDone={() => progress.markDrillDone(11, 'entry')}
			/>
		</div>
	</div>

	<div class="border-rule-2 mt-16 flex justify-end border-t pt-6">
		<a href="/ch/11/recall" class="btn">Continue to Recall →</a>
	</div>
</div>
