<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import TrialBalanceErrorFinderInstrument from '../lab/TrialBalanceErrorFinderInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch02';
	const href = '/ch/2/learn/trial-balance';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'trial-balance-error-finder')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<TrialBalanceErrorFinderInstrument {href} />
</div>

<Reading chapter={2} lo="P2" label="The trial balance">
	<div class="prose-col mt-8">
		<p>
			A <TermMark name="Trial balance">trial balance</TermMark> lists every account and its balance,
			debits in one column and credits in the other. If posting was done correctly, the two columns
			total the same amount: $45,300 for FastForward at December 31.
		</p>
		<p>
			Equal totals only prove that debits and credits match in the aggregate. A transaction that was
			never recorded, one recorded twice, or the right amount in the wrong account on the same side —
			none of these unbalance a trial balance. Only an error that hits one side and not the other
			shows up as a difference.
		</p>
	</div>
</Reading>
