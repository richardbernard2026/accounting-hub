<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import IncomeStatementFormatsInstrument from '../lab/IncomeStatementFormatsInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch04';

	const href = '/ch/4/learn/income-statement';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'income-statement-formats')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<IncomeStatementFormatsInstrument {href} />
</div>

<Reading chapter={4} lo="P2" label="Same numbers, two shapes">
	<div class="prose-col mt-8">
		<p>
			A <TermMark name="Multiple-step income statement">multiple-step income statement</TermMark> stops
			twice on the way down: at gross profit, and at income from operations, before other revenues
			and expenses join in. A <TermMark name="Single-step income statement">single-step</TermMark> format
			skips both stops — one revenue total, one expense total, one subtraction.
		</p>
		<p>
			Net income comes out the same either way, because both formats total the same underlying
			accounts. <TermMark name="Selling expenses">Selling expenses</TermMark> promote sales;
			<TermMark name="General and administrative expenses">general and administrative expenses</TermMark> run
			the business itself.
		</p>
	</div>
</Reading>
