<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import RatioBuilderInstrument from '../lab/RatioBuilderInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch13';

	const href = '/ch/13/learn/ratio-builder';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'ratio-builder')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<RatioBuilderInstrument {href} />
</div>

<Reading chapter={13} lo="A1" label="Two lines, one number">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Ratio analysis">Ratio analysis</TermMark> is always the same two-step move:
			find the right numerator, find the right denominator. The current ratio's
			<TermMark name="Working capital">working capital</TermMark> cousin uses the same two lines,
			subtracted instead of divided.
		</p>
		<p>
			Turnover and return ratios need one more thing an ending-balance ratio does not: an average of
			the beginning and ending balance, since they compare a whole year's activity to a balance that
			changed all year.
		</p>
	</div>
</Reading>
