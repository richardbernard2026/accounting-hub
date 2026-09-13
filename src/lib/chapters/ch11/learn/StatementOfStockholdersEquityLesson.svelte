<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import StatementOfStockholdersEquityInstrument from '../lab/StatementOfStockholdersEquityInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch11';

	const href = '/ch/11/learn/statement-of-stockholders-equity';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'statement-of-stockholders-equity')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<StatementOfStockholdersEquityInstrument {href} />
</div>

<Reading chapter={11} lo="P4" label="Every column, its own walk">
	<div class="prose-col mt-8">
		<p>
			A <TermMark name="Statement of stockholders' equity">statement of stockholders' equity</TermMark>
			reconciles every equity account from its beginning balance to its ending one, column by column
			— common stock, paid-in capital, retained earnings, treasury stock, all in the same table.
		</p>
		<p>
			Net income is just one row among many. It raises retained earnings the same way any of the
			year's other equity events raised or lowered their own column.
		</p>
	</div>
</Reading>
