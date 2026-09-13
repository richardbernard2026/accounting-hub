<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import { fmt } from '$lib/ledger';

	const href = '/ch/11/learn/stock-dividends-and-splits';
	setContext('href', href);
</script>

<div class="frame">
	<p class="max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		A 10% stock dividend on 11,000 shares, valued at the market price.
	</p>
	<div class="mt-5 grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">1,100 shares distributed</div>
			<p class="num mt-1 text-lg">× {fmt(30, { dollar: true })} market</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Moved out of retained earnings</div>
			<p class="num mt-1 text-lg">{fmt(33000, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Change in total equity</div>
			<p class="num mt-1 text-lg">$0</p>
		</div>
	</div>
</div>

<Reading chapter={11} lo="P3" label="A dividend that moves no cash, a split that moves no dollars">
	<div class="prose-col mt-8">
		<p>
			A <TermMark name="Stock dividend">stock dividend</TermMark> distributes more shares instead of
			cash. A <TermMark name="Small stock dividend">small one</TermMark> is valued at market price:
			that value leaves retained earnings and lands in par value plus paid-in capital in excess of
			par — nothing leaves the corporation, and total equity is unchanged.
		</p>
		<p>
			A <TermMark name="Stock split">stock split</TermMark> is different again: it changes only share
			count and par value per share, in inverse proportion, with no journal entry at all. A 2-for-1
			split doubles shares and halves par, and every dollar figure on the books stays exactly where it
			was.
		</p>
	</div>
</Reading>
