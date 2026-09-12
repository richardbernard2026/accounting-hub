<script lang="ts">
	/** Build each of the chapter's entries yourself; one EntryCard per entry. */
	import type { Account } from '$lib/ledger';
	import type { EntryCardSpec } from '$lib/content/types';
	import EntryCard from '../recall/EntryCard.svelte';
	import Takeaway from '../notes/Takeaway.svelte';
	let {
		chapter,
		lo = 'P1',
		href,
		specs,
		accounts,
		accountName,
		takeaway,
		onDone
	}: {
		chapter: number;
		lo?: string;
		href?: string;
		specs: EntryCardSpec[];
		accounts: Account[];
		accountName: (n: string) => string;
		takeaway: string;
		onDone?: () => void;
	} = $props();
	let idx = $state(0);
	// svelte-ignore state_referenced_locally
	let solved = $state<boolean[]>(specs.map(() => false));
	const allDone = $derived(solved.every(Boolean));
	const spec = $derived(specs[idx]);
	let announced = false;
	$effect(() => {
		if (allDone && !announced) {
			announced = true;
			onDone?.();
		}
	});
</script>

<div class="flex flex-wrap items-baseline justify-between gap-3">
	<div class="text-ink-2 text-sm">{solved.filter(Boolean).length} of {specs.length} solved</div>
	<div class="flex gap-1">
		{#each specs as s, i (s.entry.id)}
			<button
				class="num border px-2 py-0.5 text-sm transition-colors {idx === i
					? 'border-ink bg-ink text-paper'
					: solved[i]
						? 'border-ok bg-ok-soft text-ok'
						: 'border-rule hover:bg-paper-2'}"
				onclick={() => (idx = i)}
				aria-pressed={idx === i}>({s.entry.id})</button
			>
		{/each}
	</div>
</div>
<div class="mt-5">
	{#key spec.entry.id}
		<EntryCard
			prompt={spec.prompt}
			entry={spec.entry}
			{accounts}
			{accountName}
			hint={spec.hint}
			onresult={(r) => {
				if (r.correct) solved[idx] = true;
			}}
		/>
	{/key}
	{#if solved[idx] && idx < specs.length - 1}
		<button class="btn btn-quiet mt-4 text-xs" onclick={() => (idx = idx + 1)}>Next entry</button>
	{/if}
</div>
<Takeaway {chapter} {lo} {href} label="Entry drill" show={allDone} text={takeaway} />
