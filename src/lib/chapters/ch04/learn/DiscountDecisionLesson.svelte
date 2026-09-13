<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import DiscountDecisionInstrument from '../lab/DiscountDecisionInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch04';

	const href = '/ch/4/learn/discount-decision';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'discount-decision')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<DiscountDecisionInstrument {href} />
</div>

<Reading chapter={4} lo="A1" label="Skipping a discount is borrowing money">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Credit terms">Terms</TermMark> of 2/10, n/30 mean 2 percent off if paid inside
			10 days, the full amount due inside 30. Skipping the discount to hold onto cash a little longer
			is really just borrowing that cash — at whatever rate the discount implies.
		</p>
		<p>
			Turn a small percentage into an annual rate and it stops looking small. Two percent for 20 extra
			days works out to well over what a bank would charge, so paying early and taking the discount is
			almost always the better trade.
		</p>
	</div>
</Reading>
