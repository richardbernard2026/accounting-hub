<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import Deeper from '$lib/components/prose/Deeper.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import AccrualVsCashInstrument from '../lab/AccrualVsCashInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch03';
	const href = '/ch/3/learn/periods';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'accrual-vs-cash')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<AccrualVsCashInstrument {href} />
</div>

<Reading chapter={3} lo="C1" label="Why books need adjusting">
	<div class="prose-col mt-8">
		<p>
			FastForward paid $2,400 on December 26 for two years of insurance. By December 31, one month
			of coverage is gone — but the check was written for the whole 24 months. Reporting the entire
			$2,400 as December's expense would overstate December's cost and understate every month after.
		</p>
		<p>
			That is why accounting cuts a business's life into <TermMark name="Accounting period"
				>accounting periods</TermMark
			> — usually a <TermMark name="Fiscal year">fiscal year</TermMark> of twelve months, sometimes a
			shorter <TermMark name="Interim financial statements">interim</TermMark> period — and requires
			<TermMark name="Accrual basis accounting">accrual accounting</TermMark>: record revenue when
			it is earned and expense when it is used up, not when cash happens to move. December's
			insurance expense is $100, one month's share, regardless of when the check was written.
		</p>
	</div>
	<Deeper label="Go deeper · the time period assumption and the two recognition principles">
		<p>
			The <TermMark name="Time period assumption">time period assumption</TermMark> is what makes any
			of this necessary: a company's life can be cut into periods and reported on before the company is
			done operating. Two principles then decide the timing. The
			<TermMark name="Revenue recognition principle">revenue recognition principle</TermMark> says record
			revenue when the work is delivered, at what you expect to collect. The
			<TermMark name="Expense recognition principle">expense recognition principle</TermMark> (the matching
			principle) says record an expense in the same period as the revenue it helped produce. A
			<TermMark name="Natural business year">natural business year</TermMark> is one variation on the
			fiscal year: it ends when a company's sales are lowest, so counting inventory is easiest.
		</p>
	</Deeper>
</Reading>
