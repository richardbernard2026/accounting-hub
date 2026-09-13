<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import InventoryErrorSeesawInstrument from '../lab/InventoryErrorSeesawInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch05';

	const href = '/ch/5/learn/inventory-errors';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'inventory-error-seesaw')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<InventoryErrorSeesawInstrument {href} />
</div>

<Reading chapter={5} lo="A1" label="This year's ending inventory is next year's beginning">
	<div class="prose-col mt-8">
		<p>
			An overstated ending inventory understates <TermMark name="Cost of goods available for sale"
				>cost of goods sold</TermMark
			>, which overstates gross profit and income — in the same year, by the same amount.
		</p>
		<p>
			The very same overstated number becomes next year's beginning inventory, which overstates next
			year's cost of goods sold and understates its income. Over two years the error washes out
			completely, but each year on its own is wrong.
		</p>
	</div>
</Reading>
