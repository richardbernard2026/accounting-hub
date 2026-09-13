<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import StatementChainInstrument from '../lab/StatementChainInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch01';
	const href = '/ch/1/learn/statements';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'statement-chain')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<StatementChainInstrument {href} />
</div>

<Reading chapter={1} lo="P1" label="The four statements">
	<div class="prose-col mt-8">
		<p>
			The <TermMark name="Income statement">income statement</TermMark> comes first: revenues minus
			expenses equals <TermMark name="Net income">net income</TermMark>. That net income is the first
			line of the <TermMark name="Statement of retained earnings">statement of retained earnings</TermMark
			>, which subtracts dividends to get an ending balance.
		</p>
		<p>
			Ending retained earnings then lands on the <TermMark name="Balance sheet">balance sheet</TermMark
			>, inside equity. The <TermMark name="Statement of cash flows">statement of cash flows</TermMark>
			comes last and checks the balance sheet's cash figure against operating, investing, and
			financing activity.
		</p>
	</div>
</Reading>
