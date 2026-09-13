<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import LowerOfCostOrMarketInstrument from '../lab/LowerOfCostOrMarketInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch05';

	const href = '/ch/5/learn/lower-of-cost-or-market';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'lower-of-cost-or-market')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<LowerOfCostOrMarketInstrument {href} />
</div>

<Reading chapter={5} lo="C3" label="Never carried above what it is worth">
	<div class="prose-col mt-8">
		<p>
			The <TermMark name="Conservatism constraint">conservatism constraint</TermMark> says: when in
			doubt, do not overstate assets or income. <TermMark name="Lower of cost or market (LCM)"
				>Lower of cost or market</TermMark
			> applies that directly to inventory — it is reported at cost, or at its lower replacement
			cost, whichever is smaller.
		</p>
		<p>
			The write-down hits cost of goods sold immediately, before the units ever sell. Damaged or
			obsolete goods follow the same idea, reported at
			<TermMark name="Net realizable value">net realizable value</TermMark> — what they could actually
			fetch, minus the cost of selling them.
		</p>
	</div>
</Reading>
