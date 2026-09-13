<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import InstallmentNoteScheduleInstrument from '../lab/InstallmentNoteScheduleInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch10';

	const href = '/ch/10/learn/installment-notes';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'installment-note-schedule')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<InstallmentNoteScheduleInstrument {href} />
</div>

<Reading chapter={10} lo="P4" label="One payment, a shifting split">
	<div class="prose-col mt-8">
		<p>
			An <TermMark name="Installment note">installment note</TermMark> is paid off in equal
			installments, but the split between interest and principal is not equal. Each payment's interest
			is the rate times whatever balance is still owed.
		</p>
		<p>
			As the balance falls, so does the interest charged on it — so more of each later payment goes to
			principal, even though every payment is the same size.
		</p>
	</div>
</Reading>
