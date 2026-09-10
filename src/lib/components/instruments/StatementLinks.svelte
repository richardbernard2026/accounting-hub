<script lang="ts">
	/** Adjusted trial balance beside the three statements. Hover a line to see where it lands. */
	import type { Statements as S, TrialBalance } from '$lib/ledger';
	import TrialBalanceTable from '../ledger/TrialBalanceTable.svelte';
	import Statements from '../ledger/Statements.svelte';
	let { tb, fs }: { tb: TrialBalance; fs: S } = $props();
	let hl = $state<string | null>(null);
	const note = $derived.by(() => {
		if (!hl)
			return 'Hover any line. Revenues and expenses go to the income statement; net income carries to retained earnings; ending retained earnings carries to the balance sheet.';
		if (hl === 'NI')
			return 'Net income is computed on the income statement and carried, as one number, into the statement of retained earnings.';
		if (hl === 'RE')
			return 'Ending retained earnings is computed on the statement of retained earnings and carried into the equity section of the balance sheet.';
		if (hl === '319')
			return 'Dividends are not an expense. They reduce retained earnings directly and never appear on the income statement.';
		const row = tb.rows.find((r) => r.num === hl);
		if (!row) return '';
		const n = Number(hl[0]);
		if (n >= 4 && n < 5) return `${row.name} is a revenue: it lands on the income statement.`;
		if (n >= 6) return `${row.name} is an expense: it lands on the income statement.`;
		if (n === 1) return `${row.name} is an asset: it lands on the balance sheet.`;
		if (n === 2) return `${row.name} is a liability: it lands on the balance sheet.`;
		return `${row.name} is equity: it lands on the balance sheet.`;
	});
</script>

<div>
	<div class="pb-2">
		<p class="text-ink-2 mt-1 min-h-10 text-sm" aria-live="polite">{note}</p>
	</div>
	<div class="grid gap-6 pt-2 2xl:grid-cols-[minmax(340px,1fr)_minmax(0,2.4fr)]">
		<div class="mx-auto w-full max-w-lg 2xl:mx-0 2xl:max-w-none">
			<TrialBalanceTable
				{tb}
				title="Adjusted Trial Balance"
				date="December 31, 2025"
				highlight={hl}
				onhover={(k) => (hl = k)}
			/>
		</div>
		<Statements {fs} highlight={hl} onhover={(k) => (hl = k)} />
	</div>
</div>
