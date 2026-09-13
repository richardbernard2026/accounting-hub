<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import BondPriceAndCarryingValueInstrument from '../lab/BondPriceAndCarryingValueInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch10';

	const href = '/ch/10/learn/pricing-a-bond';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'bond-price-and-carrying-value')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<BondPriceAndCarryingValueInstrument {href} />
</div>

<Reading chapter={10} lo="P1" label="Two payments, one present value">
	<div class="prose-col mt-8">
		<p>
			A bond promises two things: the <TermMark name="Par value (face amount)">par value</TermMark> at
			maturity, and a series of equal interest payments — an <TermMark name="Annuity">annuity</TermMark
			>. <TermMark name="Present value">Present value</TermMark> discounts both back to today at the
			market rate, and their sum is the price.
		</p>
		<p>
			Semiannual bonds halve the annual rate and double the number of periods before pricing —
			the 8% contract rate becomes 4% every six months, and 4 years becomes 8 periods.
		</p>
	</div>
</Reading>
