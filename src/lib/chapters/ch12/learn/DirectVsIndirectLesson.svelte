<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import DirectVsIndirectInstrument from '../lab/DirectVsIndirectInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch12';

	const href = '/ch/12/learn/direct-vs-indirect';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'direct-vs-indirect')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<DirectVsIndirectInstrument {href} />
</div>

<Reading chapter={12} lo="P2" label="Two starting points, the same destination">
	<div class="prose-col mt-8">
		<p>
			The <TermMark name="Direct method">direct method</TermMark> lists each major class of actual
			cash receipt and cash payment — cash from customers, cash paid for merchandise, and so on —
			built straight from sales, cost of goods sold, and the same balance sheet changes the indirect
			method adjusts for.
		</p>
		<p>
			Both methods only ever change how the operating section is presented. Investing and financing
			are identical either way, and the total net cash flow from operations always agrees.
		</p>
	</div>
</Reading>
