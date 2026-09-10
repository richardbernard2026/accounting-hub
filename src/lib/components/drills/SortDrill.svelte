<script lang="ts">
	/** Classify each situation. The takeaway is offered only after every one is right. */
	import type { Classification } from '$lib/content/types';
	import Takeaway from '../notes/Takeaway.svelte';
	let {
		chapter,
		lo = 'C2',
		items,
		takeaway,
		subtitles = {}
	}: {
		chapter: number;
		lo?: string;
		items: Classification[];
		takeaway: string;
		subtitles?: Record<string, string>;
	} = $props();
	// svelte-ignore state_referenced_locally
	let answers = $state<(string | null)[]>(items.map(() => null));
	let attempts = $state(0);
	const correct = $derived(answers.filter((a, i) => a === items[i].answer).length);
	const done = $derived(correct === items.length);
	function pick(i: number, k: string) {
		if (answers[i] === items[i].answer) return;
		answers[i] = k;
		attempts++;
	}
	function reset() {
		answers = items.map(() => null);
		attempts = 0;
	}
</script>

<div class="num text-ink-2 text-sm">
	{correct} of {items.length} · {attempts} tr{attempts === 1 ? 'y' : 'ies'}
</div>
<ol class="divide-rule-2 mt-3 divide-y">
	{#each items as it, i (it.text)}
		{@const a = answers[i]}
		{@const right = a === it.answer}
		<li class="py-4">
			<p class="text-[1.05rem]"><span class="num text-ink-3 mr-2">{i + 1}.</span>{it.text}</p>
			<div class="mt-2 flex flex-wrap gap-1.5">
				{#each it.options as k (k.id)}
					<button
						class="border px-2.5 py-1 text-sm transition-colors {a === k.id
							? right
								? 'border-ok bg-ok-soft text-ok'
								: 'border-warn bg-warn-soft text-warn'
							: 'border-rule hover:bg-paper-2'}"
						onclick={() => pick(i, k.id)}
						disabled={right}
						title={subtitles[k.id]}>{k.label}</button
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
<Takeaway {chapter} {lo} label="Sorting drill" show={done} text={takeaway} />
