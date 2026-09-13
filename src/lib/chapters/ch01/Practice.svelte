<script lang="ts">
	/** Practice: pick each transaction's effect on the accounting equation. No debits or credits yet. */
	import SortDrill from '$lib/components/drills/SortDrill.svelte';
	import { classifications } from '$lib/content/chapters/ch01';
	import { progress } from '$lib/progress/store.svelte';

	const href = '/ch/1/practice';
	const takeaway =
		'Every transaction keeps Assets = Liabilities + Equity in balance. Common stock and revenues push equity up; dividends and expenses pull it down. Collecting a receivable or buying an asset for cash only swaps one asset for another.';
</script>

<div class="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
	<div class="eyebrow">Practice · A1</div>
	<h1 class="display mt-1">What did that transaction do?</h1>
	<p class="text-ink-2 mt-3 max-w-[60ch] text-sm">
		Pick each transaction's effect on the accounting equation — no debits or credits, just which
		accounts moved and which way.
	</p>
	<div class="mt-8">
		<SortDrill
			chapter={1}
			lo="A1"
			{href}
			items={classifications}
			{takeaway}
			onDone={() => progress.markDrillDone(1, 'classification')}
		/>
	</div>

	<div class="border-rule-2 mt-16 flex justify-end border-t pt-6">
		<a href="/ch/1/recall" class="btn">Continue to Recall →</a>
	</div>
</div>
