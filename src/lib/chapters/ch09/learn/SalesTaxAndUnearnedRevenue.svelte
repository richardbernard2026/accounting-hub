<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import JournalEntry from '$lib/components/ledger/JournalEntry.svelte';
	import { harborFields, arena, accountName } from '$lib/content/chapters/ch09';

	const href = '/ch/9/learn/sales-tax-and-unearned-revenue';
	setContext('href', href);
	const saleWithTax = harborFields.entries.find((e) => e.id === '1')!;
	const ticketsSold = arena.entries.find((e) => e.id === '2')!;
</script>

<div class="frame">
	<p class="max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		Cash coming in does not always mean revenue going up.
	</p>
	<div class="mt-5 grid gap-4 sm:grid-cols-2">
		<div class="border-rule-2 bg-paper border px-3 py-2">
			<div class="text-ink-2 text-xs">A $1,000 sale with 5% sales tax</div>
			<JournalEntry entry={saleWithTax} {accountName} compact date={false} />
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2">
			<div class="text-ink-2 text-xs">$120,000 of season tickets, sold in advance</div>
			<JournalEntry entry={ticketsSold} {accountName} compact date={false} />
		</div>
	</div>
</div>

<Reading chapter={9} lo="C2" label="Two kinds of cash that are not yours yet">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Sales taxes payable">Sales tax</TermMark> collected from a customer was never the
			seller's to keep — it is a liability the whole time, owed to the government until remitted.
		</p>
		<p>
			<TermMark name="Unearned revenues">Unearned revenue</TermMark> works the same way from a different
			angle: cash for tickets, subscriptions, or gift cards arrives before the seller has actually
			delivered anything. Revenue is recognized only as each game is played, each issue ships, each
			card is redeemed.
		</p>
	</div>
</Reading>
