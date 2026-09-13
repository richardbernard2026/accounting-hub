<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import CostLayersInstrument from '../lab/CostLayersInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch05';

	const href = '/ch/5/learn/cost-layers';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'cost-layers')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<CostLayersInstrument {href} />
</div>

<Reading chapter={5} lo="C1" label="A perpetual sale can only drain what has arrived">
	<div class="prose-col mt-8">
		<p>
			Under a <TermMark name="Perpetual inventory system">perpetual system</TermMark>, a sale drains
			whatever layers exist on its date — nothing that arrives later. The Aug 14 sale never touches
			the Aug 17 purchase; the Aug 31 sale can reach every layer bought all month.
		</p>
		<p>
			With costs rising all month, <TermMark name="First-in, first-out (FIFO)">FIFO</TermMark> leaves
			the newest, priciest units on the shelf, so it reports the highest income.
			<TermMark name="Last-in, first-out (LIFO)">LIFO</TermMark> does the reverse, and reports the lowest
			tax bill.
		</p>
	</div>
</Reading>
