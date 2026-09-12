<script lang="ts">
	/** Practice: classify the situations, then journalize the six entries. Immediate feedback, a reason for every miss. */
	import SortDrill from '$lib/components/drills/SortDrill.svelte';
	import EntryDrill from '$lib/components/drills/EntryDrill.svelte';
	import {
		classifications,
		entryCards,
		ADJUSTMENT_KINDS,
		unadjustedTB,
		adjustedTB
	} from '$lib/content/chapters/ch03';
	import { accounts, accountName, adjustments } from '$lib/content/chapters/fastforward';
	import type { Entry } from '$lib/ledger';
	import { fmt } from '$lib/ledger';
	import { progress } from '$lib/progress/store.svelte';

	const href = '/ch/3/practice';
	const subtitles = Object.fromEntries(ADJUSTMENT_KINDS.map((k) => [k.id, k.sub]));
	const sortTakeaway =
		'Deferrals: cash first, recognition later (prepaid expenses, unearned revenues). Accruals: recognition first, cash later (accrued expenses, accrued revenues). Every adjustment touches one income statement account and one balance sheet account, never Cash.';
	const entryTakeaway = `FastForward’s six adjustments at Dec 31: ${adjustments
		.map((e: Entry) => {
			const d = e.lines.find((l) => l.dr)!;
			const c = e.lines.find((l) => l.cr)!;
			return `(${e.id}) ${accountName(d.acct)} ${fmt(d.dr!)} / ${accountName(c.acct)} ${fmt(c.cr!)}`;
		})
		.join(
			'; '
		)}. Trial balance totals move from ${fmt(unadjustedTB.totalDr)} to ${fmt(adjustedTB.totalDr)}.`;
</script>

<div class="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
	<div class="eyebrow">Practice · C2</div>
	<h1 class="display mt-1">Which kind of adjustment?</h1>
	<p class="text-ink-2 mt-3 max-w-[60ch] text-sm">
		Classify each situation, then journalize the six entries yourself. Every miss tells you why.
	</p>
	<div class="mt-8">
		<SortDrill
			chapter={3}
			lo="C2"
			{href}
			items={classifications}
			{subtitles}
			takeaway={sortTakeaway}
			onDone={() => progress.markDrillDone(3, 'classification')}
		/>
	</div>

	<div class="border-rule-2 mt-16 border-t pt-10">
		<div class="eyebrow">Practice · P1</div>
		<h2 class="display mt-1">Journalize the six yourself</h2>
		<div class="mt-8">
			<EntryDrill
				chapter={3}
				lo="P1"
				{href}
				specs={entryCards}
				{accounts}
				{accountName}
				takeaway={entryTakeaway}
				onDone={() => progress.markDrillDone(3, 'entry')}
			/>
		</div>
	</div>

	<div class="border-rule-2 mt-16 flex justify-end border-t pt-6">
		<a href="/ch/3/recall" class="btn">Continue to Recall →</a>
	</div>
</div>
