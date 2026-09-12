<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import ProfitMarginInstrument from '../lab/ProfitMarginInstrument.svelte';
	import { fs, profitMargin, instruments } from '$lib/content/chapters/ch03';
	import { fmt } from '$lib/ledger';
	const href = '/ch/3/learn/margin';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'profit-margin')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<ProfitMarginInstrument {href} />
</div>

<Reading chapter={3} lo="A2" label="Profit margin">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Profit margin">Profit margin</TermMark> is net income divided by net sales: the
			share of each sales dollar that survives every expense. FastForward earned
			{fmt(fs.income.netIncome, { dollar: true })} on {fmt(fs.income.totalRevenues, {
				dollar: true
			})} of revenue — a margin of {(profitMargin * 100).toFixed(1)}%, high because a one-person
			consulting business has almost no cost of goods sold. Compare margins within one industry and
			over time, not across unrelated businesses.
		</p>
	</div>
</Reading>
