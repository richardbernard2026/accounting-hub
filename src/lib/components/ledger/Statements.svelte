<script lang="ts">
	import type { Statements } from '$lib/ledger';
	import { fmt } from '$lib/ledger';
	let {
		fs,
		company = 'FastForward',
		period = 'For Month Ended December 31, 2025',
		asOf = 'December 31, 2025',
		highlight,
		onhover
	}: {
		fs: Statements;
		company?: string;
		period?: string;
		asOf?: string;
		highlight?: string | null;
		onhover?: (key: string | null) => void;
	} = $props();
	const hl = (k: string) => (highlight === k ? 'bg-mark/40' : '');
	function enter(k: string) {
		onhover?.(k);
	}
	function leave() {
		onhover?.(null);
	}
</script>

<div class="grid gap-5 md:grid-cols-3">
	<div class="bg-paper-2/60 border-rule-2 border px-3 pt-3 pb-2">
		<div class="text-center leading-tight">
			<div class="font-serif">{company}</div>
			<div class="text-sm">Income Statement</div>
			<div class="text-ink-3 text-xs">{period}</div>
		</div>
		<table class="ledger mt-3 text-sm">
			<tbody>
				<tr><td colspan="2" class="font-medium">Revenues</td></tr>
				{#each fs.income.revenues as r, i (r.num)}
					<tr
						class="transition-colors duration-150 {hl(r.num!)}"
						onmouseenter={() => enter(r.num!)}
						onmouseleave={leave}
						onfocus={() => enter(r.num!)}
						onblur={leave}
						tabindex={onhover ? 0 : undefined}
						><td class="indent">{r.label}</td><td class="amt num"
							>{fmt(r.amount, { dollar: i === 0 })}</td
						></tr
					>
				{/each}
				<tr class="subtotal"
					><td class="indent pl-10">Total revenues</td><td class="amt num"
						>{fmt(fs.income.totalRevenues)}</td
					></tr
				>
				<tr><td colspan="2" class="pt-2 font-medium">Expenses</td></tr>
				{#each fs.income.expenses as e (e.num)}
					<tr
						class="transition-colors duration-150 {hl(e.num!)}"
						onmouseenter={() => enter(e.num!)}
						onmouseleave={leave}
						onfocus={() => enter(e.num!)}
						onblur={leave}
						tabindex={onhover ? 0 : undefined}
						><td class="indent">{e.label}</td><td class="amt num">{fmt(e.amount)}</td></tr
					>
				{/each}
				<tr class="subtotal"
					><td class="indent pl-10">Total expenses</td><td class="amt num"
						>{fmt(fs.income.totalExpenses)}</td
					></tr
				>
				<tr
					class="total {hl('NI')}"
					onmouseenter={() => enter('NI')}
					onmouseleave={leave}
					onfocus={() => enter('NI')}
					onblur={leave}
					tabindex={onhover ? 0 : undefined}
					><td>Net income</td><td class="amt num">{fmt(fs.income.netIncome, { dollar: true })}</td
					></tr
				>
			</tbody>
		</table>
	</div>

	<div class="bg-paper-2/60 border-rule-2 border px-3 pt-3 pb-2">
		<div class="text-center leading-tight">
			<div class="font-serif">{company}</div>
			<div class="text-sm">Statement of Retained Earnings</div>
			<div class="text-ink-3 text-xs">{period}</div>
		</div>
		<table class="ledger mt-3 text-sm">
			<tbody>
				<tr
					><td>Retained earnings, Dec. 1</td><td class="amt num"
						>{fmt(fs.retainedEarnings.beginning, { dollar: true })}</td
					></tr
				>
				<tr
					class="transition-colors duration-150 {hl('NI')}"
					onmouseenter={() => enter('NI')}
					onmouseleave={leave}
					onfocus={() => enter('NI')}
					onblur={leave}
					tabindex={onhover ? 0 : undefined}
					><td>Add: Net income</td><td class="amt num">{fmt(fs.retainedEarnings.netIncome)}</td></tr
				>
				<tr class="subtotal"
					><td></td><td class="amt num"
						>{fmt(fs.retainedEarnings.beginning + fs.retainedEarnings.netIncome)}</td
					></tr
				>
				<tr
					class="transition-colors duration-150 {hl('319')}"
					onmouseenter={() => enter('319')}
					onmouseleave={leave}
					onfocus={() => enter('319')}
					onblur={leave}
					tabindex={onhover ? 0 : undefined}
					><td>Less: Dividends</td><td class="amt num">{fmt(fs.retainedEarnings.dividends)}</td></tr
				>
				<tr
					class="total {hl('RE')}"
					onmouseenter={() => enter('RE')}
					onmouseleave={leave}
					onfocus={() => enter('RE')}
					onblur={leave}
					tabindex={onhover ? 0 : undefined}
					><td>Retained earnings, Dec. 31</td><td class="amt num"
						>{fmt(fs.retainedEarnings.ending, { dollar: true })}</td
					></tr
				>
			</tbody>
		</table>
	</div>

	<div class="bg-paper-2/60 border-rule-2 border px-3 pt-3 pb-2">
		<div class="text-center leading-tight">
			<div class="font-serif">{company}</div>
			<div class="text-sm">Balance Sheet</div>
			<div class="text-ink-3 text-xs">{asOf}</div>
		</div>
		<table class="ledger mt-3 text-sm">
			<tbody>
				<tr><td colspan="2" class="font-medium">Assets</td></tr>
				{#each fs.balanceSheet.assets as a, i (a.num)}
					<tr
						class="transition-colors duration-150 {hl(a.num!)}"
						onmouseenter={() => enter(a.num!)}
						onmouseleave={leave}
						onfocus={() => enter(a.num!)}
						onblur={leave}
						tabindex={onhover ? 0 : undefined}
						><td class={a.amount < 0 ? 'indent text-ink-2 pl-10' : 'indent'}>{a.label}</td><td
							class="amt num">{fmt(a.amount, { dollar: i === 0 })}</td
						></tr
					>
				{/each}
				<tr class="total"
					><td>Total assets</td><td class="amt num"
						>{fmt(fs.balanceSheet.totalAssets, { dollar: true })}</td
					></tr
				>
				<tr><td colspan="2" class="pt-2 font-medium">Liabilities</td></tr>
				{#each fs.balanceSheet.liabilities as l, i (l.num)}
					<tr
						class="transition-colors duration-150 {hl(l.num!)}"
						onmouseenter={() => enter(l.num!)}
						onmouseleave={leave}
						onfocus={() => enter(l.num!)}
						onblur={leave}
						tabindex={onhover ? 0 : undefined}
						><td class="indent">{l.label}</td><td class="amt num"
							>{fmt(l.amount, { dollar: i === 0 })}</td
						></tr
					>
				{/each}
				<tr class="subtotal"
					><td class="indent pl-10">Total liabilities</td><td class="amt num"
						>{fmt(fs.balanceSheet.totalLiabilities)}</td
					></tr
				>
				<tr><td colspan="2" class="pt-2 font-medium">Equity</td></tr>
				{#each fs.balanceSheet.equity as q (q.num)}
					<tr
						class={hl(q.num === '318' ? 'RE' : q.num!)}
						onmouseenter={() => enter(q.num === '318' ? 'RE' : q.num!)}
						onmouseleave={leave}
						><td class="indent">{q.label}</td><td class="amt num">{fmt(q.amount)}</td></tr
					>
				{/each}
				<tr class="subtotal"
					><td class="indent pl-10">Total equity</td><td class="amt num"
						>{fmt(fs.balanceSheet.totalEquity)}</td
					></tr
				>
				<tr class="total"
					><td>Total liabilities and equity</td><td class="amt num"
						>{fmt(fs.balanceSheet.totalLiabilitiesAndEquity, { dollar: true })}</td
					></tr
				>
			</tbody>
		</table>
	</div>
</div>
