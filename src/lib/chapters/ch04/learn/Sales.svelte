<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import MerchandiseFlowInstrument from '../lab/MerchandiseFlowInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch04';

	const href = '/ch/4/learn/sales';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'merchandise-flow')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<MerchandiseFlowInstrument {href} />
</div>

<Reading chapter={4} lo="C3" label="Two entries, every time">
	<div class="prose-col mt-8">
		<p>
			A sale on credit needs two entries. One records revenue at the price the customer owes:
			debit Accounts receivable, credit Sales. The other moves the goods' cost out of inventory into
			<TermMark name="Cost of goods sold">cost of goods sold</TermMark>. Miss the second entry and
			inventory is overstated for as long as the goods stay on the books.
		</p>
		<p>
			A resalable return reverses both. <TermMark name="Sales returns">Sales returns and allowances</TermMark>
			and <TermMark name="Sales discount">sales discounts</TermMark> are contra-revenue accounts, subtracted
			from Sales to get net sales — neither one touches inventory.
		</p>
	</div>
</Reading>
