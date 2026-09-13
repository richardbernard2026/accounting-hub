<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';

	const href = '/ch/12/learn/three-activities';
	setContext('href', href);
</script>

<div class="frame">
	<p class="max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		Every cash movement sorts into one of three sections — or gets disclosed separately, never moving cash at all.
	</p>
	<div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Operating</div>
			<p class="text-ink-2 mt-1">The main business — sales, purchases, wages, interest, taxes.</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Investing</div>
			<p class="text-ink-2 mt-1">Buying and selling long-term assets and other investments.</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Financing</div>
			<p class="text-ink-2 mt-1">Transactions with owners and lenders — stock, debt, dividends.</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Noncash</div>
			<p class="text-ink-2 mt-1">Significant, but no cash moved — disclosed, not included.</p>
		</div>
	</div>
</div>

<Reading chapter={12} lo="C1" label="Sorted by why, not by how much">
	<div class="prose-col mt-8">
		<p>
			A <TermMark name="Statement of cash flows">statement of cash flows</TermMark> reports every
			change in <TermMark name="Cash">cash</TermMark> and
			<TermMark name="Cash equivalents">cash equivalents</TermMark>, sorted by why the cash moved:
			<TermMark name="Operating activities">operating</TermMark>,
			<TermMark name="Investing activities">investing</TermMark>, or
			<TermMark name="Financing activities">financing</TermMark>.
		</p>
		<p>
			A <TermMark name="Noncash investing and financing activities">noncash investing and financing
				activity</TermMark
			> — buying land entirely with a note, say — never touches any of the three totals. It is
			significant enough to disclose, but no cash changed hands.
		</p>
	</div>
</Reading>
