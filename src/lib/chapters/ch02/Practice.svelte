<script lang="ts">
	/** Practice: sort accounts debit-normal vs credit-normal, then journalize all sixteen. */
	import SortDrill from '$lib/components/drills/SortDrill.svelte';
	import EntryDrill from '$lib/components/drills/EntryDrill.svelte';
	import { classifications, entryCards, unadjustedTB } from '$lib/content/chapters/ch02';
	import { accounts, accountName } from '$lib/content/chapters/fastforward';
	import { fmt } from '$lib/ledger';
	import { progress } from '$lib/progress/store.svelte';

	const href = '/ch/2/practice';
	const subtitles = { debit: 'Expenses, Assets, Dividends', credit: 'Liabilities, Owner’s equity, Revenue' };
	const sortTakeaway =
		'DEBT — Expenses, Assets, Dividends — are debit-normal. CLOR — Credits: Liabilities, Owner’s equity, Revenue — are credit-normal. Anything that pushes equity up is a credit; anything that pulls it down is a debit; assets are the mirror image.';
	const entryTakeaway = `Sixteen entries, and the trial balance still lands on ${fmt(unadjustedTB.totalDr, { dollar: true })} = ${fmt(unadjustedTB.totalCr, { dollar: true })}. Every one added the same amount to both sides.`;
</script>

<div class="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
	<div class="eyebrow">Practice · A1</div>
	<h1 class="display mt-1">Debit-normal or credit-normal?</h1>
	<p class="text-ink-2 mt-3 max-w-[60ch] text-sm">
		Sort each account, then journalize all sixteen December transactions yourself.
	</p>
	<div class="mt-8">
		<SortDrill
			chapter={2}
			lo="A1"
			{href}
			items={classifications}
			{subtitles}
			takeaway={sortTakeaway}
			onDone={() => progress.markDrillDone(2, 'classification')}
		/>
	</div>

	<div class="border-rule-2 mt-16 border-t pt-10">
		<div class="eyebrow">Practice · P1</div>
		<h2 class="display mt-1">Journalize all sixteen</h2>
		<div class="mt-8">
			<EntryDrill
				chapter={2}
				lo="P1"
				{href}
				specs={entryCards}
				{accounts}
				{accountName}
				takeaway={entryTakeaway}
				onDone={() => progress.markDrillDone(2, 'entry')}
			/>
		</div>
	</div>

	<div class="border-rule-2 mt-16 flex justify-end border-t pt-6">
		<a href="/ch/2/recall" class="btn">Continue to Recall →</a>
	</div>
</div>
