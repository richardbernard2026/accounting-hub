<script lang="ts">
	import type { QuickCheck } from '$lib/content/types';
	import Takeaway from '../notes/Takeaway.svelte';
	let { chapter, items }: { chapter: number; items: QuickCheck[] } = $props();
	let picked = $state<(number | null)[]>(items.map(() => null));
	const answered = $derived(picked.filter((p) => p !== null).length);
	const score = $derived(picked.filter((p, i) => p === items[i].answer).length);
	const missed = $derived(
		items.filter((q, i) => picked[i] !== null && picked[i] !== q.answer).map((q) => q.lo)
	);
	const done = $derived(answered === items.length);
</script>

<div class="border-rule bg-paper-2/40 border p-4 sm:p-5">
	<div class="flex flex-wrap items-baseline justify-between gap-2">
		<div>
			<div class="eyebrow">Quick check · all objectives</div>
			<h3 class="mt-0.5 text-lg">Seven questions, one pass</h3>
		</div>
		<div class="num text-ink-2 text-sm">{score} of {answered} right</div>
	</div>
	<ol class="divide-rule-2 mt-4 divide-y">
		{#each items as q, i (q.q)}
			{@const p = picked[i]}
			<li class="py-3">
				<p class="text-[0.95rem]"><span class="lo-tag mr-2">{q.lo}</span>{q.q}</p>
				<div class="mt-2 grid gap-1.5 sm:grid-cols-2">
					{#each q.options as o, j (o)}
						<button
							class="border px-3 py-1.5 text-left text-sm transition-colors {p === null
								? 'border-rule hover:bg-paper-3'
								: j === q.answer
									? 'border-ok bg-ok-soft'
									: p === j
										? 'border-warn bg-warn-soft'
										: 'border-rule-2 text-ink-3'}"
							onclick={() => {
								if (p === null) picked[i] = j;
							}}
							disabled={p !== null}>{o}</button
						>
					{/each}
				</div>
				{#if p !== null}<p class="text-ink-2 mt-2 text-sm">{q.why}</p>{/if}
			</li>
		{/each}
	</ol>
	<Takeaway
		{chapter}
		label="Quick check"
		show={done}
		text={score === items.length
			? `Quick check: ${score}/${items.length}. Every objective held.`
			: `Quick check: ${score}/${items.length}. Revisit ${[...new Set(missed)].join(', ')} before the exam.`}
	/>
</div>
