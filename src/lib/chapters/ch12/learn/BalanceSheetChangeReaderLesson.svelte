<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import BalanceSheetChangeReaderInstrument from '../lab/BalanceSheetChangeReaderInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch12';

	const href = '/ch/12/learn/balance-sheet-change-reader';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'balance-sheet-change-reader')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<BalanceSheetChangeReaderInstrument {href} />
</div>

<Reading chapter={12} lo="A1" label="One rule, every account">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Changes in current operating assets and liabilities">Every current asset and
				liability</TermMark
			> follows the same rule. An asset going up means cash went somewhere else instead — subtract
			it. A liability going up means an obligation grew instead of cash going out — add it.
		</p>
		<p>
			The reverse is just as automatic: an asset going down releases cash, and a liability going down
			required cash to pay it off.
		</p>
	</div>
</Reading>
