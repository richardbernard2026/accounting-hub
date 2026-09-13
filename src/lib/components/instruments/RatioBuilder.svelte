<script lang="ts">
	/** Pick a ratio, then click the two statement lines it is actually built from. */
	import { fmt } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	interface RatioBuilderItem {
		id: string;
		label: string;
		numeratorCorrect: string;
		numeratorOptions: string[];
		numeratorValue: number;
		denominatorCorrect: string;
		denominatorOptions: string[];
		denominatorValue: number;
		result: number;
		resultUnit: '%' | 'times' | '';
	}

	let {
		chapter,
		href,
		ratios
	}: {
		chapter: number;
		href?: string;
		ratios: RatioBuilderItem[];
	} = $props();

	let ratioId = $state(ratios[0].id);
	let numeratorPicked = $state<string | null>(null);
	let denominatorPicked = $state<string | null>(null);
	let touched = $state(false);

	const ratio = $derived(ratios.find((r) => r.id === ratioId)!);
	const numeratorRight = $derived(numeratorPicked === ratio.numeratorCorrect);
	const denominatorRight = $derived(denominatorPicked === ratio.denominatorCorrect);
	const done = $derived(numeratorRight && denominatorRight);

	function pickRatio(id: string) {
		ratioId = id;
		numeratorPicked = null;
		denominatorPicked = null;
		touched = true;
	}
	function pickNumerator(v: string) {
		touched = true;
		if (numeratorRight) return;
		numeratorPicked = v;
	}
	function pickDenominator(v: string) {
		touched = true;
		if (denominatorRight) return;
		denominatorPicked = v;
	}

	function formatResult(n: number, unit: '%' | 'times' | ''): string {
		if (unit === '%') return `${n}%`;
		if (unit === 'times') return `${n} times`;
		return String(n);
	}

	const sentence = $derived(
		done
			? `${ratio.label} = ${fmt(ratio.numeratorValue, { dollar: true })} ÷ ${fmt(ratio.denominatorValue, { dollar: true })} = ${formatResult(ratio.result, ratio.resultUnit)}.`
			: `Building ${ratio.label}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<div class="flex flex-wrap gap-1.5">
			{#each ratios as r (r.id)}
				<button
					class="border px-2.5 py-1 text-sm transition-colors {ratioId === r.id
						? 'border-ink bg-ink text-paper'
						: 'border-rule hover:bg-paper-2'}"
					onclick={() => pickRatio(r.id)}
					aria-pressed={ratioId === r.id}>{r.label}</button
				>
			{/each}
		</div>
		<PinState {chapter} lo="A1" label="Ratio builder" {href} {sentence} dirty={touched} />
	</div>

	<div class="mt-6 grid gap-6 sm:grid-cols-2">
		<div>
			<div class="kicker mb-2">Numerator</div>
			<div class="flex flex-col gap-1.5">
				{#each ratio.numeratorOptions as opt (opt)}
					{@const chosen = numeratorPicked === opt}
					{@const right = opt === ratio.numeratorCorrect}
					<button
						class="border px-3 py-1.5 text-left text-sm transition-colors {numeratorRight
							? right
								? 'border-ok bg-ok-soft text-ok'
								: 'border-rule text-ink-3'
							: chosen
								? 'border-warn bg-warn-soft text-warn'
								: 'border-rule hover:bg-paper-2'}"
						onclick={() => pickNumerator(opt)}
						disabled={numeratorRight}>{opt}</button
					>
				{/each}
			</div>
		</div>
		<div>
			<div class="kicker mb-2">Denominator</div>
			<div class="flex flex-col gap-1.5">
				{#each ratio.denominatorOptions as opt (opt)}
					{@const chosen = denominatorPicked === opt}
					{@const right = opt === ratio.denominatorCorrect}
					<button
						class="border px-3 py-1.5 text-left text-sm transition-colors {denominatorRight
							? right
								? 'border-ok bg-ok-soft text-ok'
								: 'border-rule text-ink-3'
							: chosen
								? 'border-warn bg-warn-soft text-warn'
								: 'border-rule hover:bg-paper-2'}"
						onclick={() => pickDenominator(opt)}
						disabled={denominatorRight}>{opt}</button
					>
				{/each}
			</div>
		</div>
	</div>

	<div class="mt-6 border-rule-2 bg-paper border px-3 py-2 text-sm {done ? 'border-ok' : ''}">
		<div class="eyebrow">{ratio.label}</div>
		{#if done}
			<p class="num mt-1 text-lg">
				{fmt(ratio.numeratorValue, { dollar: true })} ÷ {fmt(ratio.denominatorValue, { dollar: true })} = {formatResult(
					ratio.result,
					ratio.resultUnit
				)}
			</p>
		{:else}
			<p class="text-ink-2 mt-1">Click the correct numerator and denominator to compute it.</p>
		{/if}
	</div>
</div>
