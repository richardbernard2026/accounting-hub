<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import Deeper from '$lib/components/prose/Deeper.svelte';
	import WorksheetInstrument from '../lab/WorksheetInstrument.svelte';
	import StatementLinksInstrument from '../lab/StatementLinksInstrument.svelte';
	const href = '/ch/3/learn/statements';
	setContext('href', href);
</script>

<div class="frame">
	<WorksheetInstrument {href} />
</div>

<Reading chapter={3} lo="P2" label="The adjusted trial balance">
	<div class="prose-col mt-8">
		<p>
			An <TermMark name="Unadjusted trial balance">unadjusted trial balance</TermMark> is the list of
			accounts and balances before the six entries post. Post them and list the accounts again — that
			is the <TermMark name="Adjusted trial balance">adjusted trial balance</TermMark>, the sheet
			every statement below is built from. Wild lays the two out side by side with the adjustments
			between them, keyed by letter; copying that layout onto scratch paper is worth doing on an
			exam.
		</p>
	</div>
	<Deeper label="Go deeper · presentation rules">
		<p>
			Dollar signs appear only on the first and last amount in a column of a trial balance or
			statement — never in a journal or ledger. A single rule sits above a subtotal; a double rule
			sits under a final total.
		</p>
	</Deeper>
</Reading>

<div class="frame mt-16">
	<StatementLinksInstrument {href} />
</div>

<Reading chapter={3} lo="P3" label="Financial statements">
	<div class="prose-col mt-8">
		<p>
			Prepare the three statements in order, because each feeds the next. The income statement turns
			revenues and expenses into net income. The statement of retained earnings takes that net
			income, subtracts dividends, and produces ending retained earnings. The balance sheet takes
			assets and liabilities plus that ending retained earnings — and it has to balance: assets
			equal liabilities plus equity.
		</p>
	</div>
</Reading>
