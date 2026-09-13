<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import Deeper from '$lib/components/prose/Deeper.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import TAccountTrainerInstrument from '../lab/TAccountTrainerInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch02';
	const href = '/ch/2/learn/accounts';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 't-account-trainer')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<TAccountTrainerInstrument {href} />
</div>

<Reading chapter={2} lo="C1" label="What an account is">
	<div class="prose-col mt-8">
		<p>
			Every transaction starts with a <TermMark name="Source documents">source document</TermMark
			> — a check, an invoice, a receipt. Each of FastForward's accounts tracks one thing: how much
			cash it has, how much it owes, how much revenue it has earned.
		</p>
		<p>
			An <TermMark name="Account">account</TermMark> is a record of the increases and decreases in one
			item. A company's accounts together make up its
			<TermMark name="Ledger (general ledger)">ledger</TermMark>. The
			<TermMark name="Chart of accounts">chart of accounts</TermMark> lists them by number: 100s for
			assets, 200s for liabilities, 300s for equity, 400s for revenue, 600s for expenses.
		</p>
	</div>
	<Deeper label="Go deeper · the T-account">
		<p>
			A <TermMark name="T-account">T-account</TermMark> is a scratch-paper shortcut: a title on top,
			a vertical line splitting debit (left) from credit (right). It leaves out dates and
			explanations to make posting fast to see.
		</p>
	</Deeper>
</Reading>
