<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';

	const href = '/ch/6/learn/cash-and-equivalents';
	setContext('href', href);
</script>

<div class="frame">
	<p class="max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		Cash is the asset every fraud scheme wants, and the one a cash count can always test directly.
	</p>
	<div class="mt-5 grid gap-4 sm:grid-cols-2">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Counts as cash</div>
			<p class="text-ink-2 mt-1">Currency, coins, checks, and a short-term investment within three months of maturity when bought.</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Cash over and short</div>
			<p class="text-ink-2 mt-1">Debited when the drawer is short, credited when it has too much — an income-statement account either way.</p>
		</div>
	</div>
</div>

<Reading chapter={6} lo="C2" label="Liquidity, and the account that catches the difference">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Liquidity">Liquidity</TermMark> is a company's ability to pay what it owes soon.
			<TermMark name="Cash equivalents">Cash equivalents</TermMark> are the most
			<TermMark name="Liquid assets">liquid assets</TermMark> short of cash itself — short-term,
			easily converted, and close enough to maturity that their value barely moves.
		</p>
		<p>
			A cash count rarely comes out exact. <TermMark name="Cash over and short">Cash over and short</TermMark>
			absorbs the difference immediately, so the drawer always balances to the penny on paper, even when
			the actual count did not.
		</p>
	</div>
</Reading>
