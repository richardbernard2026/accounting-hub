<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import DebitCreditMnemonic from '$lib/components/chapter/DebitCreditMnemonic.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import TimelineInstrument from '../lab/TimelineInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch03';
	const href = '/ch/3/learn/types';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'timeline')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<TimelineInstrument {href} />
</div>

<Reading chapter={3} lo="C2" label="The four types of adjustments">
	<div class="prose-col mt-8">
		<p>
			Every <TermMark name="Adjusting entry">adjusting entry</TermMark> falls into one of two families,
			decided by when cash moves. If cash moved first, it is a deferral: a
			<TermMark name="Prepaid expenses">prepaid expense</TermMark> becomes an expense as it is used up,
			or an <TermMark name="Unearned revenues">unearned revenue</TermMark> becomes revenue as the work
			gets done. If cash moves later, it is an accrual: an
			<TermMark name="Accrued expenses">accrued expense</TermMark> has been incurred but not yet paid,
			or an <TermMark name="Accrued revenues">accrued revenue</TermMark> has been earned but not yet received.
		</p>
		<p>
			Three things hold for all six entries above. Each one touches at least one income statement
			account and one balance sheet account. The credit does not go to Equipment when depreciation
			is recorded — it goes to a <TermMark name="Contra account">contra account</TermMark>. And no
			adjustment ever includes Cash: the cash side of the story already happened, or has not
			happened yet.
		</p>
	</div>
	<div class="border-rule-2 mt-8 max-w-[640px] border-t pt-8">
		<div class="kicker mb-4">Which side, and how to remember it</div>
		<DebitCreditMnemonic />
	</div>
</Reading>
