<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';

	const href = '/ch/11/learn/cash-dividends';
	setContext('href', href);
</script>

<div class="frame">
	<p class="max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		Three dates, but only two of them get a journal entry.
	</p>
	<div class="mt-5 grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Declaration</div>
			<p class="text-ink-2 mt-1">Dr. Retained earnings, Cr. Dividend payable — a liability is born.</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Record</div>
			<p class="text-ink-2 mt-1">No entry. Only fixes who is entitled to be paid.</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Payment</div>
			<p class="text-ink-2 mt-1">Dr. Dividend payable, Cr. Cash — the liability and the cash both fall.</p>
		</div>
	</div>
</div>

<Reading chapter={11} lo="P2" label="The liability is born at declaration">
	<div class="prose-col mt-8">
		<p>
			The <TermMark name="Date of declaration">date of declaration</TermMark> is the only date that
			changes anything on the books — the board's vote creates a real liability and reduces retained
			earnings immediately, before a dollar moves.
		</p>
		<p>
			The <TermMark name="Date of record">date of record</TermMark> just draws a line: whoever holds
			shares on that date gets paid, with no accounting effect of its own. The
			<TermMark name="Date of payment">date of payment</TermMark> settles the liability already
			recorded — cash and the payable fall together, so total equity does not move again.
		</p>
	</div>
</Reading>
