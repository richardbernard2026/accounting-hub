<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import ChangeInEstimateInstrument from '../lab/ChangeInEstimateInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch08';

	const href = '/ch/8/learn/change-in-estimate';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'change-in-estimate')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<ChangeInEstimateInstrument {href} />
</div>

<Reading chapter={8} lo="A2" label="A better guess, applied forward only">
	<div class="prose-col mt-8">
		<p>
			Useful life and salvage value are estimates, made before anyone really knows. When new
			information arrives, a <TermMark name="Change in an accounting estimate"
				>change in estimate</TermMark
			> takes the asset's current book value and spreads it over the revised remaining life.
		</p>
		<p>
			Nothing about the past changes. The first years' depreciation already happened, on the best
			information available at the time — only the years still ahead use the new numbers.
		</p>
	</div>
</Reading>
