<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import AgingScheduleInstrument from '../lab/AgingScheduleInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch07';

	const href = '/ch/7/learn/aging';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'aging-schedule')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<AgingScheduleInstrument {href} />
</div>

<Reading chapter={7} lo="A1" label="Aging sets a target, not an expense">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Aging of accounts receivable">Aging</TermMark> sorts every account by how overdue
			it is, and applies a higher uncollectible rate the older it gets. The total is not an expense
			— it is the balance the
			<TermMark name="Allowance for doubtful accounts">allowance</TermMark> must reach.
		</p>
		<p>
			The expense is whatever closes the gap between that target and what the allowance already
			holds. A leftover credit balance shrinks the entry; a leftover debit balance, from writing off
			more than expected, makes it bigger.
		</p>
	</div>
</Reading>
