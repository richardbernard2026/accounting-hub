<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import DisposalInstrument from '../lab/DisposalInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch08';

	const href = '/ch/8/learn/disposals';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'disposal')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<DisposalInstrument {href} />
</div>

<Reading chapter={8} lo="A1" label="Book value, brought current first">
	<div class="prose-col mt-8">
		<p>
			Selling a plant asset means removing both its cost and its accumulated depreciation from the
			books — but only after depreciation is recorded up to the sale date. What is left,
			<TermMark name="Book value">book value</TermMark>, is what the sale price is measured against.
		</p>
		<p>
			A price above book value is a gain; below it, a loss. Neither has anything to do with the
			asset's original cost — by the time it sells, most of that cost is already expensed.
		</p>
	</div>
</Reading>
