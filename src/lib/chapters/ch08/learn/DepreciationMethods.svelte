<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import DepreciationCurvesInstrument from '../lab/DepreciationCurvesInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch08';

	const href = '/ch/8/learn/depreciation-methods';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'depreciation-curves')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<DepreciationCurvesInstrument {href} />
</div>

<Reading chapter={8} lo="P1" label="Three ways to split the same $9,000">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Straight-line method">Straight-line</TermMark> spreads
			<TermMark name="Depreciation">depreciation</TermMark> evenly. The
			<TermMark name="Units-of-production method">units-of-production method</TermMark> ties it to
			actual output. Both start from the same fact: <TermMark name="Cost">cost</TermMark> minus
			<TermMark name="Salvage value">salvage value</TermMark>, divided across the asset's
			<TermMark name="Useful life">useful life</TermMark>.
		</p>
		<p>
			<TermMark name="Double-declining-balance method">Double-declining-balance</TermMark>, an
			<TermMark name="Accelerated depreciation">accelerated</TermMark> method, applies twice the
			straight-line rate to <TermMark name="Book value">book value</TermMark> each year — ignoring
			salvage until book value reaches it, then stopping exactly there.
		</p>
	</div>
</Reading>
