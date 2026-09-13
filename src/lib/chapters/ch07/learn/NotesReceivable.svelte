<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import NoteCalculatorInstrument from '../lab/NoteCalculatorInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch07';

	const href = '/ch/7/learn/notes-receivable';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'note-calculator')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<NoteCalculatorInstrument {href} />
</div>

<Reading chapter={7} lo="P2" label="A promise, dated and priced">
	<div class="prose-col mt-8">
		<p>
			A <TermMark name="Promissory note">promissory note</TermMark> names a
			<TermMark name="Principal">principal</TermMark>, a <TermMark name="Maker">maker</TermMark> who
			promises to pay, and a <TermMark name="Payee">payee</TermMark> who receives it. Interest accrues
			every day of the <TermMark name="Period of a note">note's term</TermMark>, whether or not any cash
			has changed hands yet.
		</p>
		<p>
			If the <TermMark name="Maturity date">maturity date</TermMark> falls after year end, the interest
			earned so far still belongs on this year's income statement — an adjusting entry, the same
			idea as any other accrual. If the maker fails to pay, the note is
			<TermMark name="Dishonored note">dishonored</TermMark>, but the interest earned is still real: the
			holder records it and moves the whole balance into accounts receivable.
		</p>
	</div>
</Reading>
