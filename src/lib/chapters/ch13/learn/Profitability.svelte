<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import ReturnOnAssetsTakenApartInstrument from '../lab/ReturnOnAssetsTakenApartInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch13';

	const href = '/ch/13/learn/profitability';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'return-on-assets-taken-apart')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<ReturnOnAssetsTakenApartInstrument {href} />
</div>

<Reading chapter={13} lo="A3" label="Two paths to the same return">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Profitability">Profitability</TermMark> ratios all divide some measure of profit
			by some measure of size. Profit margin divides by sales; return on total assets divides by the
			assets that produced those sales.
		</p>
		<p>
			Return on total assets factors cleanly into profit margin times total asset turnover — a
			grocery store survives on thin margins and fast turnover, a jeweler on fat margins and slow
			turnover, and both can land on the same return.
		</p>
	</div>
</Reading>
