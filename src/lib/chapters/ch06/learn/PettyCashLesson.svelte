<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import PettyCashCycleInstrument from '../lab/PettyCashCycleInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch06';

	const href = '/ch/6/learn/petty-cash';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'petty-cash-cycle')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<PettyCashCycleInstrument {href} />
</div>

<Reading chapter={6} lo="P1" label="An imprest fund only moves at two moments">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Petty cash">Petty cash</TermMark> is set up under an imprest system: the fund is
			fixed at one amount, and the <TermMark name="Petty cashier">petty cashier</TermMark> keeps receipts
			for everything spent from it. The Petty cash account itself only moves when the fund is created or
			its size changes.
		</p>
		<p>
			Replenishing the fund debits whatever the receipts were actually for — postage, delivery,
			supplies — and any shortfall, never Petty cash. That is the detail almost everyone gets wrong
			the first time.
		</p>
	</div>
</Reading>
