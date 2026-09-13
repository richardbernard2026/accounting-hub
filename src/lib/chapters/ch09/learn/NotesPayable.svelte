<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import NoteAcrossYearEndInstrument from '../lab/NoteAcrossYearEndInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch09';

	const href = '/ch/9/learn/notes-payable';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'note-across-year-end')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<NoteAcrossYearEndInstrument {href} />
</div>

<Reading chapter={9} lo="P2" label="Interest accrues on the calendar, not on payday">
	<div class="prose-col mt-8">
		<p>
			A <TermMark name="Short-term note payable">short-term note payable</TermMark> earns interest every
			day it is outstanding, whether or not the fiscal year ends before it matures. If year end falls
			inside the note's term, the days so far belong on this year's income statement.
		</p>
		<p>
			The adjusting entry accrues only what has been earned to date. The rest waits, unrecorded, until
			the note is actually paid — the same accrual logic as any other adjusting entry.
		</p>
	</div>
</Reading>
