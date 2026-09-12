<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import PrepaidAlternativesInstrument from '../lab/PrepaidAlternativesInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch03';
	const href = '/ch/3/learn/appendix';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'prepaid-alternatives')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<PrepaidAlternativesInstrument {href} />
</div>

<Reading chapter={3} lo="P4" label="Appendix 3A: alternatives for prepaids">
	<div class="prose-col mt-8">
		<p>
			Some companies record a prepayment as an expense the day it is paid, and cash received in
			advance as revenue the day it arrives, instead of recording an asset or a liability first.
			That is allowed — as long as the December 31 adjustment moves the unexpired or unearned share
			back onto the balance sheet. The adjusting entry looks different from the asset-first or
			liability-first version; the ending balances land in the same place either way.
		</p>
	</div>
</Reading>
