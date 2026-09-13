<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import SalesVsReceivablesMethodInstrument from '../lab/SalesVsReceivablesMethodInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch07';

	const href = '/ch/7/learn/sales-vs-receivables';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'sales-vs-receivables-method')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<SalesVsReceivablesMethodInstrument {href} />
</div>

<Reading chapter={7} lo="A1" label="Add to it, or adjust to it">
	<div class="prose-col mt-8">
		<p>
			The <TermMark name="Percent of sales method">percent of sales method</TermMark> starts from the
			income statement: a fixed rate times credit sales, added to whatever the allowance already
			holds. It never looks at the old balance.
		</p>
		<p>
			The <TermMark name="Percent of receivables method">percent of receivables method</TermMark> starts
			from the balance sheet: it sets the ending allowance directly, and works backward to whatever
			expense gets there. The same facts can produce two different numbers, and both are correct under
			their own method.
		</p>
	</div>
</Reading>
