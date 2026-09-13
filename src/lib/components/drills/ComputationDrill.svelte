<script lang="ts">
	/** Compute each of the chapter's numbers yourself; one ComputationCard per prompt. */
	import ComputationCard from '../recall/ComputationCard.svelte';
	import Takeaway from '../notes/Takeaway.svelte';
	import type { ComputationItem } from '$lib/content/types';

	let {
		chapter,
		lo = 'A1',
		href,
		items,
		takeaway,
		onDone
	}: {
		chapter: number;
		lo?: string;
		href?: string;
		items: ComputationItem[];
		takeaway: string;
		onDone?: () => void;
	} = $props();
	let idx = $state(0);
	// svelte-ignore state_referenced_locally
	let solved = $state<boolean[]>(items.map(() => false));
	const allDone = $derived(solved.every(Boolean));
	const item = $derived(items[idx]);
	let announced = false;
	$effect(() => {
		if (allDone && !announced) {
			announced = true;
			onDone?.();
		}
	});
</script>

<div class="flex flex-wrap items-baseline justify-between gap-3">
	<div class="text-ink-2 text-sm">{solved.filter(Boolean).length} of {items.length} solved</div>
	<div class="flex flex-wrap gap-1">
		{#each items as it, i (it.prompt)}
			<button
				class="num border px-2 py-0.5 text-sm transition-colors {idx === i
					? 'border-ink bg-ink text-paper'
					: solved[i]
						? 'border-ok bg-ok-soft text-ok'
						: 'border-rule hover:bg-paper-2'}"
				onclick={() => (idx = i)}>{i + 1}</button
			>
		{/each}
	</div>
</div>

{#key idx}
	<div class="mt-4">
		<ComputationCard
			prompt={item.prompt}
			answer={item.answer}
			unit={item.unit}
			tolerance={item.tolerance}
			why={item.why}
			onresult={({ correct }) => {
				if (correct) solved[idx] = true;
				if (idx < items.length - 1 && correct) idx++;
			}}
		/>
	</div>
{/key}

<div class="mt-6">
	<Takeaway {chapter} {lo} {href} label="Computation drill" show={allDone} text={takeaway} />
</div>
