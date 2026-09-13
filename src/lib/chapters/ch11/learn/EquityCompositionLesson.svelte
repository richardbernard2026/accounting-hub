<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import EquityCompositionInstrument from '../lab/EquityCompositionInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch11';

	const href = '/ch/11/learn/equity-composition';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'equity-composition')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<EquityCompositionInstrument {href} />
</div>

<Reading chapter={11} lo="P1" label="Rearranged, or actually smaller">
	<div class="prose-col mt-8">
		<p>
			Issuing stock brings in new assets — equity grows. A cash dividend and buying
			<TermMark name="Treasury stock">treasury stock</TermMark> send assets back out — equity shrinks.
			Everything else in this walk just moves dollars between equity accounts, or changes share count,
			without touching the total.
		</p>
		<p>
			<TermMark name="Paid-in capital">Paid-in capital</TermMark> above
			<TermMark name="Par value">par value</TermMark> is credited to
			<TermMark name="Paid-in capital in excess of par value">paid-in capital in excess of par</TermMark
			>, never to Common stock itself. Reissuing treasury stock above its cost adds to a paid-in
			capital account too — never to income.
		</p>
	</div>
</Reading>
