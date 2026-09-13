<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import Mistake from '$lib/components/prose/Mistake.svelte';
	const href = '/ch/1/learn/accounting';
	setContext('href', href);
</script>

<div class="frame">
	<p class="mb-4 max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		Sort who is asking the question — someone inside FastForward, or someone outside it.
	</p>
	<div class="grid gap-4 sm:grid-cols-2">
		<div class="border-rule-2 bg-paper border px-3 py-2">
			<div class="eyebrow">External users</div>
			<ul class="mt-1 space-y-0.5 text-sm">
				<li>A bank deciding whether to lend money</li>
				<li>An investor deciding whether to buy shares</li>
				<li>A supplier deciding whether to extend credit</li>
				<li>The IRS, checking taxes owed</li>
			</ul>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2">
			<div class="eyebrow">Internal users</div>
			<ul class="mt-1 space-y-0.5 text-sm">
				<li>A manager deciding whether to hire</li>
				<li>An officer setting next year's prices</li>
				<li>A department head tracking a budget</li>
			</ul>
		</div>
	</div>
</div>

<Reading chapter={1} lo="C1" label="What accounting is for">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Accounting">Accounting</TermMark> identifies, records, and communicates an organization's
			activities to the people who rely on that information. <TermMark name="Financial accounting"
				>Financial accounting</TermMark
			> serves outsiders with general-purpose statements.
			<TermMark name="Managerial accounting">Managerial accounting</TermMark> serves the people running
			the business, with more detail.
		</p>
		<p>
			Every accountant works under an ethical obligation to report honestly. Fraud tends to need all
			three legs of the <TermMark name="Fraud triangle">fraud triangle</TermMark>: an opportunity to
			commit it, pressure to do so, and a way to rationalize it as acceptable.
		</p>
	</div>
	<Mistake>
		Treating "internal" and "external" as about location, not audience. A manager reading a report at
		home is still an internal user; a bank reading it at FastForward's office is still external.
	</Mistake>
</Reading>
