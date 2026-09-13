<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import ThreeLensesInstrument from '../lab/ThreeLensesInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch13';

	const href = '/ch/13/learn/three-lenses';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'three-lenses')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<ThreeLensesInstrument {href} />
</div>

<Reading chapter={13} lo="P1" label="Same numbers, different questions">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Horizontal analysis">Horizontal analysis</TermMark> uses
			<TermMark name="Comparative financial statements">comparative statements</TermMark> to ask how
			much a line changed across years, in dollars and in percent.
			<TermMark name="Vertical analysis">Vertical analysis</TermMark> asks a different question
			entirely: what share of one period's total does this line represent?
		</p>
		<p>
			<TermMark name="Common-size financial statements">Common-size statements</TermMark> put every
			line on the same 0–100% scale — net sales for the income statement, total assets for the
			balance sheet — so a $1 million company and a $10 million company can be compared directly.
		</p>
	</div>
</Reading>
