<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import EarlyRetirementInstrument from '../lab/EarlyRetirementInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch10';

	const href = '/ch/10/learn/early-retirement';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'early-retirement')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<EarlyRetirementInstrument {href} />
</div>

<Reading chapter={10} lo="A1" label="Against carrying value, not par">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Callable bonds">Callable bonds</TermMark> let the issuer retire them before
			maturity at a stated call price. What is removed from the books is the
			<TermMark name="Carrying (book) value of bonds">carrying value</TermMark> — par net of whatever
			discount or premium is still unamortized — not par itself.
		</p>
		<p>
			Pay more than carrying value to retire early, and the difference is a loss. Pay less, and it is
			a gain. Par value never enters the comparison directly.
		</p>
	</div>
</Reading>
