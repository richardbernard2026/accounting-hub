<script lang="ts">
	/** Classify eight situations into Wild's four adjustment types. The takeaway is offered only after all eight are right. */
	import Takeaway from '../notes/Takeaway.svelte';
	let { chapter }: { chapter: number } = $props();
	type Kind = 'prepaid' | 'unearned' | 'accrued-expense' | 'accrued-revenue';
	const KINDS: { id: Kind; label: string; sub: string }[] = [
		{ id: 'prepaid', label: 'Prepaid expense', sub: 'Deferral · paid, not yet used' },
		{ id: 'unearned', label: 'Unearned revenue', sub: 'Deferral · received, not yet earned' },
		{ id: 'accrued-expense', label: 'Accrued expense', sub: 'Accrual · incurred, not yet paid' },
		{ id: 'accrued-revenue', label: 'Accrued revenue', sub: 'Accrual · earned, not yet received' }
	];
	const items: { text: string; kind: Kind; why: string }[] = [
		{
			text: 'A year of office rent was paid in October and three months have passed.',
			kind: 'prepaid',
			why: 'Cash went out first; the benefit is used month by month.'
		},
		{
			text: 'Employees worked Dec 29–31. Payday is January 9.',
			kind: 'accrued-expense',
			why: 'The cost is incurred now, the cash leaves later.'
		},
		{
			text: 'A client paid $3,000 for 60 days of consulting to be delivered starting tomorrow.',
			kind: 'unearned',
			why: 'Cash came in before the work: a liability until earned.'
		},
		{
			text: 'Twenty days of a 30-day contract are done; the bill goes out when the job ends.',
			kind: 'accrued-revenue',
			why: 'Earned already, cash later. Record revenue and a receivable.'
		},
		{
			text: 'Equipment bought on December 3 has now been used for a month.',
			kind: 'prepaid',
			why: 'Depreciation is a prepaid expense in slow motion: cost first, use over time.'
		},
		{
			text: 'Interest on a bank loan has accumulated but is not due until March.',
			kind: 'accrued-expense',
			why: 'Interest expense is incurred with time even though no cash has moved.'
		},
		{
			text: 'A magazine collected subscriptions in advance for next year’s issues.',
			kind: 'unearned',
			why: 'Cash first, delivery later: a liability until each issue ships.'
		},
		{
			text: 'Interest has been earned on a note receivable but will be collected at maturity.',
			kind: 'accrued-revenue',
			why: 'Earned with time, not yet received: revenue and a receivable.'
		}
	];
	let answers = $state<(Kind | null)[]>(items.map(() => null));
	let attempts = $state(0);
	const correct = $derived(answers.filter((a, i) => a === items[i].kind).length);
	const done = $derived(correct === items.length);
	function pick(i: number, k: Kind) {
		if (answers[i] === items[i].kind) return;
		answers[i] = k;
		attempts++;
	}
	function reset() {
		answers = items.map(() => null);
		attempts = 0;
	}
</script>

<div class="border-rule bg-paper-2/40 border p-4 sm:p-5">
	<div class="flex flex-wrap items-baseline justify-between gap-2">
		<div>
			<div class="eyebrow">Drill · Wild C2</div>
			<h3 class="mt-0.5 text-lg">Which kind of adjustment?</h3>
		</div>
		<div class="num text-ink-2 text-sm">
			{correct} of {items.length} · {attempts} tr{attempts === 1 ? 'y' : 'ies'}
		</div>
	</div>
	<ol class="divide-rule-2 mt-4 divide-y">
		{#each items as it, i (it.text)}
			{@const a = answers[i]}
			{@const right = a === it.kind}
			<li class="py-3">
				<p class="text-[0.95rem]"><span class="num text-ink-3 mr-2">{i + 1}.</span>{it.text}</p>
				<div class="mt-2 flex flex-wrap gap-1.5">
					{#each KINDS as k (k.id)}
						<button
							class="border px-2.5 py-1 text-xs transition-colors {a === k.id
								? right
									? 'border-ok bg-ok-soft text-ok'
									: 'border-warn bg-warn-soft text-warn'
								: 'border-rule hover:bg-paper-3'}"
							onclick={() => pick(i, k.id)}
							disabled={right}
							title={k.sub}>{k.label}</button
						>
					{/each}
				</div>
				{#if a}
					<p class="mt-1.5 text-sm {right ? 'text-ok' : 'text-warn'}">
						{right
							? it.why
							: 'Not that one. Ask: did cash move before or after the work? Is it a cost or a revenue?'}
					</p>
				{/if}
			</li>
		{/each}
	</ol>
	{#if done}<button class="btn btn-quiet mt-3 text-xs" onclick={reset}>Start over</button>{/if}
	<Takeaway
		{chapter}
		lo="C2"
		label="Sorting drill"
		show={done}
		text="Deferrals: cash first, recognition later (prepaid expenses, unearned revenues). Accruals: recognition first, cash later (accrued expenses, accrued revenues). Every adjustment touches one income statement account and one balance sheet account, never Cash."
	/>
</div>
