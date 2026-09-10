<script lang="ts">
	import type { TrialBalance } from '$lib/ledger';
	import { fmt } from '$lib/ledger';
	let {
		tb,
		title,
		date,
		company = 'FastForward',
		highlight,
		onhover
	}: {
		tb: TrialBalance;
		title: string;
		date: string;
		company?: string;
		highlight?: string | null;
		onhover?: (num: string | null) => void;
	} = $props();
</script>

<div class="bg-paper-2/60 border-rule-2 border px-3 pt-3 pb-2">
	<div class="text-center leading-tight">
		<div class="font-serif text-base">{company}</div>
		<div class="text-sm">{title}</div>
		<div class="text-ink-3 text-xs">{date}</div>
	</div>
	<table class="ledger mt-3 text-sm">
		<thead><tr><th>Account</th><th class="amt">Debit</th><th class="amt">Credit</th></tr></thead>
		<tbody>
			{#each tb.rows as r, i (r.num)}
				<tr
					class="transition-colors duration-150 {highlight === r.num ? 'bg-mark/40' : ''} {onhover
						? 'hover:bg-paper-3/60 cursor-default'
						: ''}"
					onmouseenter={() => onhover?.(r.num)}
					onmouseleave={() => onhover?.(null)}
				>
					<td><span class="num text-ink-3 mr-2 text-xs">{r.num}</span>{r.name}</td>
					<td class="amt num {r.dr ? 'dr' : ''}">{r.dr ? fmt(r.dr, { dollar: i === 0 }) : ''}</td>
					<td class="amt num {r.cr ? 'cr' : ''}">{r.cr ? fmt(r.cr, { dollar: i === 0 }) : ''}</td>
				</tr>
			{/each}
			<tr class="total">
				<td>Totals</td>
				<td class="amt num">{fmt(tb.totalDr, { dollar: true })}</td>
				<td class="amt num">{fmt(tb.totalCr, { dollar: true })}</td>
			</tr>
		</tbody>
	</table>
</div>
