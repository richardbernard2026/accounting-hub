<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import Mistake from '$lib/components/prose/Mistake.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import EquationBalanceInstrument from '../lab/EquationBalanceInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch01';
	const href = '/ch/1/learn/equation';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'equation-balance')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<EquationBalanceInstrument {href} />
</div>

<Reading chapter={1} lo="A1" label="The accounting equation">
	<div class="prose-col mt-8">
		<p>
			The <TermMark name="Accounting equation">accounting equation</TermMark>, Assets = Liabilities +
			Equity, holds after every single transaction, not just at year end. Buying supplies for cash
			only swaps one asset for another, so both sides stay put.
		</p>
		<p>
			The <TermMark name="Expanded accounting equation">expanded equation</TermMark> breaks Equity
			into its parts: Common Stock and Revenues push it up; Dividends and
			<TermMark name="Expenses">Expenses</TermMark> pull it down. A transaction that touches only Equity's
			parts — like paying rent — still keeps Assets = Liabilities + Equity true.
		</p>
	</div>
	<Mistake>
		Expecting every transaction to touch both sides of the equation. Most of FastForward's first ten
		move two accounts on the same side.
	</Mistake>
</Reading>
