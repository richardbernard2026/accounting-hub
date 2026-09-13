<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import BankReconciliationInstrument from '../lab/BankReconciliationInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch06';

	const href = '/ch/6/learn/bank-reconciliation';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'bank-reconciliation')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<BankReconciliationInstrument {href} />
</div>

<Reading chapter={6} lo="P2" label="Only one side is missing information">
	<div class="prose-col mt-8">
		<p>
			A <TermMark name="Bank reconciliation">bank reconciliation</TermMark> explains why the
			<TermMark name="Bank statement">bank statement</TermMark> and the books disagree. A
			<TermMark name="Deposit in transit">deposit in transit</TermMark> and
			<TermMark name="Outstanding checks">outstanding checks</TermMark> are already recorded — the bank
			just has not caught up, so they adjust the bank side only.
		</p>
		<p>
			Everything the bank knew before the company did — a collected note, interest, a fee, an
			<TermMark name="Nonsufficient funds (NSF) check">NSF check</TermMark>, a recording error — adjusts
			the book side, and each one needs its own entry to bring the books current.
		</p>
	</div>
</Reading>
