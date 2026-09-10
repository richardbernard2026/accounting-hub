<script lang="ts">
	import type { Entry } from '$lib/ledger';
	import { fmt } from '$lib/ledger';
	let {
		entry,
		accountName,
		date = true,
		compact = false,
		highlight
	}: {
		entry: Entry;
		accountName: (num: string) => string;
		date?: boolean;
		compact?: boolean;
		highlight?: string;
	} = $props();
	const debits = $derived(entry.lines.filter((l) => (l.dr ?? 0) > 0));
	const credits = $derived(entry.lines.filter((l) => (l.cr ?? 0) > 0));
	function dateLabel(iso: string) {
		const d = new Date(iso + 'T00:00:00');
		return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}
</script>

<table class="ledger {compact ? 'text-sm' : ''}" aria-label="Journal entry {entry.id}">
	<tbody>
		{#each debits as l (l.acct)}
			<tr class={highlight === l.acct ? 'bg-debit-soft/60' : ''}>
				<td class="text-ink-3 w-14 whitespace-nowrap">{date ? dateLabel(entry.date) : ''}</td>
				<td class="dr">{accountName(l.acct)}</td>
				<td class="amt dr">{fmt(l.dr!)}</td>
				<td class="amt"></td>
			</tr>
		{/each}
		{#each credits as l (l.acct)}
			<tr class={highlight === l.acct ? 'bg-credit-soft/60' : ''}>
				<td></td>
				<td class="indent cr">{accountName(l.acct)}</td>
				<td class="amt"></td>
				<td class="amt cr">{fmt(l.cr!)}</td>
			</tr>
		{/each}
		{#if !compact}
			<tr>
				<td></td>
				<td class="text-ink-3 italic" colspan="3">{entry.explanation}.</td>
			</tr>
		{/if}
	</tbody>
</table>
