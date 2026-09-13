<script lang="ts">
	/**
	 * Step through issuing stock, dividends, treasury purchases, a reissue,
	 * and a split. Each step's dollar columns come from a real posted
	 * ledger; the split is a seventh, no-entry checkpoint that only changes
	 * share count and par value, never the dollars.
	 */
	import { fmt } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	interface EquityStep {
		label: string;
		instruction: string;
		commonStock: number;
		paidInExcess: number;
		paidInTreasury: number;
		retainedEarnings: number;
		treasuryStock: number;
		totalEquity: number;
		sharesIssued: number;
		parPerShare: number;
	}

	let {
		chapter,
		href,
		steps
	}: {
		chapter: number;
		href?: string;
		steps: EquityStep[];
	} = $props();

	let stepIndex = $state(0);
	let touched = $state(false);

	function jump(i: number) {
		touched = true;
		stepIndex = i;
	}
	function next() {
		touched = true;
		if (stepIndex < steps.length - 1) stepIndex++;
	}
	function back() {
		if (stepIndex > 0) stepIndex--;
	}

	const current = $derived(steps[stepIndex]);
	const prev = $derived(stepIndex > 0 ? steps[stepIndex - 1] : null);
	const totalChanged = $derived(prev !== null && Math.abs(current.totalEquity - prev.totalEquity) > 0.005);

	const sentence = $derived(
		`${current.label}: total equity ${fmt(current.totalEquity, { dollar: true })}, ${current.sharesIssued.toLocaleString()} shares at ${fmt(current.parPerShare, { dollar: true })} par.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<div class="flex flex-wrap gap-1">
			{#each steps as s, i (s.label)}
				<button
					class="border px-2 py-0.5 text-xs transition-colors {i === stepIndex
						? 'border-ink bg-ink text-paper'
						: 'border-rule hover:bg-paper-2'}"
					onclick={() => jump(i)}
					aria-pressed={i === stepIndex}>{i + 1}</button
				>
			{/each}
		</div>
		<PinState {chapter} lo="P1" label="Equity composition" {href} {sentence} dirty={touched} />
	</div>

	<div class="border-rule bg-paper-2/40 mt-4 border p-4">
		<div class="text-ink-3 text-xs">Step {stepIndex + 1} of {steps.length}</div>
		<p class="mt-1 text-[1.05rem] leading-snug font-medium">{current.label}</p>
		<p class="text-ink-2 mt-1 text-sm">{current.instruction}</p>
		<div class="mt-4 flex items-center gap-2">
			<button class="btn btn-quiet text-sm" onclick={back} disabled={stepIndex === 0}>← Back</button>
			<button class="btn text-sm" onclick={next} disabled={stepIndex === steps.length - 1}>Next →</button>
		</div>
	</div>

	<div class="mt-6 overflow-x-auto">
		<table class="ledger w-full text-sm">
			<tbody>
				<tr><td>Common stock</td><td class="num text-right">{fmt(current.commonStock, { dollar: true })}</td></tr>
				<tr><td>Paid-in capital in excess of par</td><td class="num text-right">{fmt(current.paidInExcess, { dollar: true })}</td></tr>
				<tr><td>Paid-in capital, treasury stock</td><td class="num text-right">{fmt(current.paidInTreasury, { dollar: true })}</td></tr>
				<tr><td>Retained earnings</td><td class="num text-right">{fmt(current.retainedEarnings, { dollar: true })}</td></tr>
				<tr class="text-ink-2"><td>Treasury stock</td><td class="num text-right">({fmt(current.treasuryStock, { dollar: true })})</td></tr>
				<tr class="border-rule-2 border-t font-medium {totalChanged ? 'text-ink' : 'text-ink-2'}">
					<td>Total equity</td><td class="num text-right">{fmt(current.totalEquity, { dollar: true })}</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="mt-4 grid gap-4 sm:grid-cols-2">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Shares issued</div>
			<p class="num mt-1 text-lg">{current.sharesIssued.toLocaleString()}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Par value per share</div>
			<p class="num mt-1 text-lg">{fmt(current.parPerShare, { dollar: true })}</p>
		</div>
	</div>
</div>
