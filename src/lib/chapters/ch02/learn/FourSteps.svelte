<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import Mistake from '$lib/components/prose/Mistake.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import DoubleEntryMachineInstrument from '../lab/DoubleEntryMachineInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch02';
	const href = '/ch/2/learn/four-steps';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'double-entry-machine')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<DoubleEntryMachineInstrument {href} />
</div>

<Reading chapter={2} lo="P1" label="Four steps, sixteen transactions">
	<div class="prose-col mt-8">
		<p>
			Every transaction goes through the same four steps. Identify the source document and the
			event. Analyze which accounts and elements change, and which way. Journalize the debit and
			credit lines, then post the amounts to the ledger. December 15 needs three lines, not two —
			one debit to Accounts Receivable, two credits, one to each revenue account.
		</p>
		<p>
			December 26's cash advance is the trap. Cash comes in before any consulting is done, so the
			credit is Unearned Consulting Revenue — a liability — not revenue. Revenue is only recorded
			once the work is delivered.
		</p>
	</div>
	<Mistake>
		Crediting Consulting Revenue in entry 12 for cash received in advance. The work has not happened
		yet, so the credit belongs to a liability.
	</Mistake>
</Reading>
