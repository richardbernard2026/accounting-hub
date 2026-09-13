<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import DebitCreditMnemonic from '$lib/components/chapter/DebitCreditMnemonic.svelte';
	const href = '/ch/2/learn/rule';
	setContext('href', href);
</script>

<div class="frame">
	<div class="kicker mb-4">The rule, and how to remember it</div>
	<DebitCreditMnemonic />
</div>

<Reading chapter={2} lo="A1" label="The rule: DEBT and CLOR">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Double-entry accounting">Double-entry accounting</TermMark> means every transaction
			touches at least two accounts, and the total <TermMark name="Debit">debits</TermMark> always equal
			the total <TermMark name="Credit">credits</TermMark>. Debit just means the left side of an account;
			credit means the right. Neither means increase or decrease by itself.
		</p>
		<p>
			Whether a debit raises or lowers a balance depends on the account's
			<TermMark name="Normal balance">normal balance</TermMark>. Debits increase expenses, assets, and
			dividends. Credits increase liabilities, equity, and revenue. A debit to a credit-normal account
			lowers it, and a credit to a debit-normal account lowers it too.
		</p>
	</div>
</Reading>
