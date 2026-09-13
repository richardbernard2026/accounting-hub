<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import WarrantyAccrualInstrument from '../lab/WarrantyAccrualInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch09';

	const href = '/ch/9/learn/warranty';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'warranty-accrual')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<WarrantyAccrualInstrument {href} />
</div>

<Reading chapter={9} lo="A1" label="The expense is estimated before any repair exists">
	<div class="prose-col mt-8">
		<p>
			A <TermMark name="Warranty">warranty</TermMark> promise creates an
			<TermMark name="Estimated liabilities">estimated liability</TermMark> the moment products sell
			— not when a customer eventually brings one back. The expense is matched against that
			year's sales, using history to estimate the rate.
		</p>
		<p>
			When a repair actually happens, it reduces the liability already on the books. It never creates
			a new expense of its own — the expense was already recorded when the product was sold.
		</p>
	</div>
</Reading>
