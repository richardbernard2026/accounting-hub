<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import { fmt } from '$lib/ledger';
	import {
		proceedsFromSalePlantAssets,
		cashPaidForPlantAssets,
		netCashFromInvesting,
		cashFromStockIssuance,
		cashPaidToRetireNotes,
		cashDividendsPaid,
		netCashFromFinancing
	} from '$lib/content/chapters/ch12';

	const href = '/ch/12/learn/investing-and-financing';
	setContext('href', href);
</script>

<div class="frame">
	<p class="mb-4 max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		Every investing and financing line, at the actual cash amount.
	</p>
	<div class="grid gap-4 sm:grid-cols-2">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Investing</div>
			<table class="ledger mt-2 w-full text-sm">
				<tbody>
					<tr><td>Sold plant assets</td><td class="num text-right">{fmt(proceedsFromSalePlantAssets, { dollar: true })}</td></tr>
					<tr><td>Bought plant assets (cash portion)</td><td class="num text-right">({fmt(cashPaidForPlantAssets, { dollar: true })})</td></tr>
					<tr class="border-rule-2 border-t font-medium"><td>Net cash from investing</td><td class="num text-right">{fmt(netCashFromInvesting, { dollar: true })}</td></tr>
				</tbody>
			</table>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Financing</div>
			<table class="ledger mt-2 w-full text-sm">
				<tbody>
					<tr><td>Issued common stock</td><td class="num text-right">{fmt(cashFromStockIssuance, { dollar: true })}</td></tr>
					<tr><td>Retired notes</td><td class="num text-right">({fmt(cashPaidToRetireNotes, { dollar: true })})</td></tr>
					<tr><td>Paid dividends</td><td class="num text-right">({fmt(cashDividendsPaid, { dollar: true })})</td></tr>
					<tr class="border-rule-2 border-t font-medium"><td>Net cash used by financing</td><td class="num text-right">({fmt(Math.abs(netCashFromFinancing), { dollar: true })})</td></tr>
				</tbody>
			</table>
		</div>
	</div>
</div>

<Reading chapter={12} lo="P3" label="The other two sections">
	<div class="prose-col mt-8">
		<p>
			Investing and financing never adjust anything — they simply list the real cash that moved.
			Selling plant assets shows the <TermMark name="Investing activities">$12,000 received</TermMark
			>, never the loss; the loss already left through the operating section.
		</p>
		<p>
			The 60,000 note that financed part of the plant asset purchase never appears in investing at
			all — only the 10,000 actually paid in cash does. The note itself is a
			<TermMark name="Noncash investing and financing activities">noncash</TermMark> disclosure.
		</p>
	</div>
</Reading>
