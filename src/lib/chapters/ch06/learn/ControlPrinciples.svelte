<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import ControlFailureDiagnosticInstrument from '../lab/ControlFailureDiagnosticInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch06';

	const href = '/ch/6/learn/control-principles';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'control-failure-diagnostic')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<ControlFailureDiagnosticInstrument {href} />
</div>

<Reading chapter={6} lo="C1" label="Seven guardrails">
	<div class="prose-col mt-8">
		<p>
			The <TermMark name="Principles of internal control">principles of internal control</TermMark> come
			down to a few habits: assign one task to one person, write everything down, insure what can be
			lost and <TermMark name="Bond">bond</TermMark> the people who handle cash, and review the work
			independently.
		</p>
		<p>
			<TermMark name="Separation of duties">Separation of duties</TermMark> is the one that shows up most
			often — splitting custody of an asset from the record of it, so no single person can take
			something and hide the evidence alone. It fails only through
			<TermMark name="Collusion">collusion</TermMark>, which is exactly why it works as well as it does.
		</p>
	</div>
</Reading>
