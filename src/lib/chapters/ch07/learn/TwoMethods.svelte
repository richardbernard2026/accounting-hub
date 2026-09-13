<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import JournalEntry from '$lib/components/ledger/JournalEntry.svelte';
	import { bridgepoint, meridian, accountName } from '$lib/content/chapters/ch07';

	const href = '/ch/7/learn/two-methods';
	setContext('href', href);
	const writeOff = bridgepoint.entries.find((e) => e.id === '3')!;
	const directWriteOff = meridian.entries.find((e) => e.id === '6')!;
</script>

<div class="frame">
	<p class="max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		The same $800 loss, recorded two different ways.
	</p>
	<div class="mt-5 grid gap-4 sm:grid-cols-2">
		<div class="border-rule-2 bg-paper border px-3 py-2">
			<div class="text-ink-2 text-xs">Allowance method: write off $800</div>
			<JournalEntry entry={writeOff} {accountName} compact date={false} />
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2">
			<div class="text-ink-2 text-xs">Direct write-off: write off $400</div>
			<JournalEntry entry={directWriteOff} {accountName} compact date={false} />
		</div>
	</div>
</div>

<Reading chapter={7} lo="C2" label="Estimate first, or wait and see">
	<div class="prose-col mt-8">
		<p>
			The <TermMark name="Direct write-off method">direct write-off method</TermMark> records
			<TermMark name="Bad debts">bad debts</TermMark> expense only when a specific account is finally
			judged uncollectible. It is simple, but it books the loss in the wrong period and is allowed only
			under the <TermMark name="Materiality constraint">materiality constraint</TermMark>.
		</p>
		<p>
			The <TermMark name="Allowance method">allowance method</TermMark> estimates the loss up front,
			building an <TermMark name="Allowance for doubtful accounts">allowance</TermMark>. A write-off
			later never touches expense again — it just clears a specific account against the estimate
			already on the books.
		</p>
	</div>
</Reading>
