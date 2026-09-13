<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import IndirectMethodWaterfallInstrument from '../lab/IndirectMethodWaterfallInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch12';

	const href = '/ch/12/learn/indirect-method';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'indirect-method-waterfall')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<IndirectMethodWaterfallInstrument {href} />
</div>

<Reading chapter={12} lo="P1" label="Net income was never the cash">
	<div class="prose-col mt-8">
		<p>
			The <TermMark name="Indirect method">indirect method</TermMark> starts from net income and
			corrects it: add back
			<TermMark name="Operating items not providing or using cash">noncash expenses</TermMark> like
			depreciation, remove
			<TermMark name="Nonoperating gains and losses">nonoperating gains and losses</TermMark>, then
			adjust for every
			<TermMark name="Changes in current operating assets and liabilities"
				>change in a current operating account</TermMark
			>.
		</p>
		<p>
			This walk is a
			<TermMark name="Reconciliation (of net income to operating cash flow)">reconciliation</TermMark>
			— it explains the gap between net income and operating cash flow, one line at a time.
		</p>
	</div>
</Reading>
