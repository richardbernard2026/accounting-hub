<script lang="ts">
	/** Step through establishing, replenishing, and increasing a petty cash fund. */
	import type { Account, Entry } from '$lib/ledger';
	import { fmt, post } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';
	import JournalEntry from '../ledger/JournalEntry.svelte';

	interface Step {
		id: string;
		label: string;
		entryIds: string[];
	}

	let {
		chapter,
		href,
		steps,
		entries,
		accounts,
		accountName
	}: {
		chapter: number;
		href?: string;
		steps: Step[];
		entries: Entry[];
		accounts: Account[];
		accountName: (n: string) => string;
	} = $props();

	let stepIndex = $state(0);
	let currentApplied = $state(false);
	let touched = $state(false);

	function next() {
		touched = true;
		if (!currentApplied) currentApplied = true;
		else if (stepIndex < steps.length - 1) {
			stepIndex++;
			currentApplied = false;
		}
	}
	function back() {
		if (currentApplied) currentApplied = false;
		else if (stepIndex > 0) {
			stepIndex--;
			currentApplied = true;
		}
	}
	function jump(i: number) {
		touched = true;
		stepIndex = i;
		currentApplied = false;
	}

	const applied = $derived(stepIndex + (currentApplied ? 1 : 0));
	const appliedEntryIds = $derived(
		steps.slice(0, stepIndex).flatMap((s) => s.entryIds).concat(currentApplied ? steps[stepIndex].entryIds : [])
	);
	const stepEntryIds = new Set(steps.flatMap((s) => s.entryIds));
	const backgroundIds = entries.filter((e) => !stepEntryIds.has(e.id)).map((e) => e.id);
	const balances = $derived(
		post(accounts, entries.filter((e) => backgroundIds.includes(e.id) || appliedEntryIds.includes(e.id)))
	);
	const pettyCash = $derived(balances.get('102')?.balance ?? 0);
	const cash = $derived(balances.get('101')?.balance ?? 0);
	const expenses = $derived(
		round2(
			(balances.get('601')?.balance ?? 0) +
				(balances.get('602')?.balance ?? 0) +
				(balances.get('603')?.balance ?? 0) +
				(balances.get('605')?.balance ?? 0)
		)
	);
	function round2(n: number) {
		return Math.round(n * 100) / 100;
	}
	const currentEntries = $derived(entries.filter((e) => steps[stepIndex].entryIds.includes(e.id)));
	const done = $derived(applied === steps.length);

	const sentence = $derived(
		`After ${applied} of ${steps.length} steps: Petty cash ${fmt(pettyCash, { dollar: true })}, cash ${fmt(cash, { dollar: true })}, expenses recorded ${fmt(expenses, { dollar: true })}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<div class="flex flex-wrap gap-1">
			{#each steps as s, i (s.id)}
				<button
					class="border px-2 py-0.5 text-xs transition-colors {i === stepIndex
						? 'border-ink bg-ink text-paper'
						: i < applied
							? 'border-ok bg-ok-soft text-ok'
							: 'border-rule hover:bg-paper-2'}"
					onclick={() => jump(i)}
					aria-pressed={i === stepIndex}>{i + 1}</button
				>
			{/each}
		</div>
		<PinState {chapter} lo="P1" label="Petty cash cycle" {href} {sentence} dirty={touched} />
	</div>

	<div class="border-rule bg-paper-2/40 mt-4 border p-4">
		<div class="text-ink-3 text-xs">Step {stepIndex + 1} of {steps.length}</div>
		<p class="mt-1 text-[1.05rem] leading-snug">{steps[stepIndex].label}</p>
		<div class="mt-4 flex items-center gap-2">
			<button class="btn btn-quiet text-sm" onclick={back} disabled={stepIndex === 0 && !currentApplied}
				>← Back</button
			>
			<button class="btn text-sm" onclick={next} disabled={stepIndex === steps.length - 1 && currentApplied}>
				{currentApplied ? 'Next →' : 'Apply this step'}
			</button>
		</div>
	</div>

	{#if currentApplied}
		<div class="mt-4">
			{#each currentEntries as e (e.id)}
				<div class="border-rule-2 bg-paper border px-3 py-2">
					<div class="text-ink-2 text-xs">{e.explanation}</div>
					<JournalEntry entry={e} {accountName} compact date={false} />
				</div>
			{/each}
		</div>
	{/if}

	<div class="mt-8 grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Petty cash</div>
			<p class="num mt-1 text-lg">{fmt(pettyCash, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Cash</div>
			<p class="num mt-1 text-lg">{fmt(cash, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Expenses recorded</div>
			<p class="num mt-1 text-lg">{fmt(expenses, { dollar: true })}</p>
		</div>
	</div>

	{#if done}
		<div class="border-rule-2 mt-6 border-t pt-3 text-sm">
			Receipts and shortage, once replenished, always equal what left the fund — the count never has to be
			exact for the books to be right.
		</div>
	{/if}
</div>
