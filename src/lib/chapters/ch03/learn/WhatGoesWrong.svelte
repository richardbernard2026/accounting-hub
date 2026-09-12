<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import PinState from '$lib/components/notes/PinState.svelte';
	import { unadjusted, adjusted, ADJUSTMENT_KINDS } from '$lib/content/chapters/ch03';
	import { fmt } from '$lib/ledger';
	const href = '/ch/3/learn/skipped';
	setContext('href', href);

	const u = (n: string) => fmt(unadjusted.get(n)!.balance);
	const j = (n: string) => fmt(adjusted.get(n)!.balance);
	const LINKS = {
		prepaid: {
			name: 'Prepaid expenses',
			bs: 'Asset overstated',
			is: 'Expense understated',
			entry: 'Dr. Expense · Cr. Asset (or contra asset)',
			ex: `Skip (a): Prepaid Insurance stays at ${u('128')} instead of ${j('128')}; Insurance Expense shows ${u('637')} instead of ${j('637')}.`
		},
		unearned: {
			name: 'Unearned revenues',
			bs: 'Liability overstated',
			is: 'Revenue understated',
			entry: 'Dr. Liability · Cr. Revenue',
			ex: `Skip (d): Unearned Consulting Revenue stays at ${u('236')} instead of ${j('236')}; Consulting Revenue is short by ${fmt(unadjusted.get('236')!.balance - adjusted.get('236')!.balance)}.`
		},
		'accrued-expense': {
			name: 'Accrued expenses',
			bs: 'Liability understated',
			is: 'Expense understated',
			entry: 'Dr. Expense · Cr. Liability',
			ex: `Skip (e): Salaries Payable shows ${u('209')} instead of ${j('209')}; Salaries Expense shows ${u('622')} instead of ${j('622')}.`
		},
		'accrued-revenue': {
			name: 'Accrued revenues',
			bs: 'Asset understated',
			is: 'Revenue understated',
			entry: 'Dr. Asset · Cr. Revenue',
			ex: `Skip (f): Accounts Receivable shows ${u('106')} instead of ${j('106')}; Consulting Revenue is short by ${j('106')}.`
		}
	} as const;
	let kind = $state<keyof typeof LINKS>('prepaid');
	let touched = $state(false);
	const sentence = $derived(`${LINKS[kind].name} left unadjusted: ${LINKS[kind].ex}`);
</script>

<div class="frame">
	<p class="mb-4 max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		Pick a type and read what happens if December 31 comes and goes without it.
	</p>
	<div class="flex flex-wrap items-center justify-between gap-3">
		<div class="flex flex-wrap gap-1.5">
			{#each ADJUSTMENT_KINDS as k (k.id)}
				<button
					class="border px-2.5 py-1 text-xs transition-colors {kind === k.id
						? 'border-ink bg-ink text-paper'
						: 'border-rule hover:bg-paper-2'}"
					onclick={() => {
						kind = k.id;
						touched = true;
					}}
					aria-pressed={kind === k.id}>{k.label}</button
				>
			{/each}
		</div>
		<PinState
			chapter={3}
			lo="A1"
			label="What goes wrong when you skip one"
			{href}
			{sentence}
			dirty={touched}
		/>
	</div>
	<table class="ledger mt-4">
		<tbody>
			<tr
				><th class="w-36">Before adjusting</th><td
					>{LINKS[kind].bs}; {LINKS[kind].is.toLowerCase()}</td
				></tr
			>
			<tr><th>Adjusting entry</th><td>{LINKS[kind].entry}</td></tr>
		</tbody>
	</table>
	<p class="text-ink-2 border-rule-2 mt-3 border-t pt-3 text-sm">{LINKS[kind].ex}</p>
</div>

<Reading chapter={3} lo="A1" label="What goes wrong when you skip one">
	<div class="prose-col mt-8">
		<p>
			Each adjustment fixes one balance sheet account and one income statement account, so skipping
			it leaves both wrong in a fixed direction. Deferrals left alone overstate an asset or a
			liability. Accruals left alone understate one. Either way, the miss runs straight through net
			income and into equity — the fast check on an exam is to ask which side of the equation is
			wrong before adjusting, and which way.
		</p>
	</div>
</Reading>
