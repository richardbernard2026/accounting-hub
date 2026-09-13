<script lang="ts">
	/** Read the scenario, pick the control principle it violates. */
	import PinState from '../notes/PinState.svelte';

	interface Scenario {
		id: string;
		scenario: string;
		principle: string;
	}

	let {
		chapter,
		href,
		scenarios,
		principles
	}: {
		chapter: number;
		href?: string;
		scenarios: Scenario[];
		principles: string[];
	} = $props();

	let index = $state(0);
	let picked = $state<string | null>(null);
	let correctCount = $state(0);
	let touched = $state(false);

	const current = $derived(scenarios[index]);
	const isCorrect = $derived(picked === current.principle);

	function pick(principle: string) {
		touched = true;
		if (picked) return;
		picked = principle;
		if (principle === current.principle) correctCount++;
	}
	function next() {
		if (index < scenarios.length - 1) {
			index++;
			picked = null;
		}
	}
	const done = $derived(index === scenarios.length - 1 && picked !== null);
	const sentence = $derived(`${correctCount} of ${index + (picked ? 1 : 0)} identified so far.`);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<div class="text-ink-2 text-sm">Scenario {index + 1} of {scenarios.length} · {correctCount} correct</div>
		<PinState {chapter} lo="C1" label="Control failure diagnostic" {href} {sentence} dirty={touched} />
	</div>

	<div class="border-rule bg-paper-2/40 mt-4 border p-4">
		<p class="text-[1.05rem] leading-snug">{current.scenario}</p>
	</div>

	<div class="mt-4 grid gap-1.5">
		{#each principles as p (p)}
			{@const chosen = picked === p}
			{@const right = p === current.principle}
			<button
				class="border px-3 py-2 text-left text-sm transition-colors {picked
					? right
						? 'border-ok bg-ok-soft text-ok'
						: chosen
							? 'border-warn bg-warn-soft text-warn'
							: 'border-rule'
					: 'border-rule hover:bg-paper-2'}"
				onclick={() => pick(p)}
				disabled={!!picked}>{p}</button
			>
		{/each}
	</div>

	{#if picked}
		<p class="mt-3 text-sm {isCorrect ? 'text-ok' : 'text-warn'}">
			{isCorrect ? 'Right.' : `Not quite — this one is "${current.principle}."`}
		</p>
		{#if index < scenarios.length - 1}
			<button class="btn mt-3 text-sm" onclick={next}>Next scenario →</button>
		{/if}
	{/if}

	{#if done}
		<div class="border-rule-2 mt-6 border-t pt-3 text-sm font-medium">
			{correctCount} of {scenarios.length} principles identified
		</div>
	{/if}
</div>
