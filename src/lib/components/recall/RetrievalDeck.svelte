<script lang="ts">
	/**
	 * The recall pass. One card at a time; you produce the answer, then it is
	 * graded and scheduled (box 1–5, due in 1/2/4/8/16 days).
	 */
	import type { Card } from '$lib/recall/types';
	import { recall, INTERVALS } from '$lib/recall/store.svelte';
	import type { Account } from '$lib/ledger';
	import EntryCard from './EntryCard.svelte';
	import { fade } from 'svelte/transition';

	let {
		cards,
		accounts,
		accountName,
		mode = 'due',
		chapterLabel
	}: {
		cards: Card[];
		accounts: Account[];
		accountName: (n: string) => string;
		mode?: 'due' | 'all';
		chapterLabel?: (n: number) => string;
	} = $props();

	// svelte-ignore state_referenced_locally
	let which = $state<'due' | 'all'>(mode);
	const TYPE_ORDER: Card['type'][] = ['entry', 'classification', 'rule', 'term'];
	// Snapshot the queue when the pass starts so grading does not reshuffle it under you.
	let queue = $state<Card[]>([]);
	let i = $state(0);
	let results = $state<{ id: string; correct: boolean }[]>([]);
	let started = $state(false);

	const pool = $derived(which === 'due' ? recall.due(cards) : cards);
	function start() {
		queue = [...pool].sort((a, b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type));
		i = 0;
		results = [];
		started = true;
	}
	const card = $derived(queue[i]);
	const done = $derived(started && i >= queue.length);
	const label = {
		term: 'Term',
		classification: 'Which kind?',
		entry: 'Journalize it',
		rule: 'The rule'
	};

	// per-card state
	let own = $state('');
	let revealed = $state(false);
	let picked = $state<string | null>(null);
	function grade(correct: boolean) {
		if (!card) return;
		recall.grade(card, correct);
		results = [...results, { id: card.id, correct }];
		own = '';
		revealed = false;
		picked = null;
		i++;
	}
	const promoted = $derived(results.filter((r) => r.correct).length);
</script>

<div class="deck">
	{#if !started}
		<div class="flex flex-wrap items-end justify-between gap-4">
			<div>
				<div class="figure text-[3.5rem]">{pool.length}</div>
				<div class="text-ink-2 mt-1">
					{which === 'due' ? 'cards due now' : 'cards in this deck'} · {cards.filter(
						(c) => c.type === 'entry'
					).length} entries, {cards.filter((c) => c.type === 'classification').length} classifications,
					{cards.filter((c) => c.type === 'rule').length} rules, {cards.filter(
						(c) => c.type === 'term'
					).length} terms
				</div>
			</div>
			<div class="flex items-center gap-3">
				<div class="border-rule flex border text-sm" role="group" aria-label="Which cards">
					<button
						class="px-3 py-1 {which === 'due' ? 'bg-ink text-paper' : 'hover:bg-paper-2'}"
						onclick={() => (which = 'due')}
						aria-pressed={which === 'due'}>Due</button
					>
					<button
						class="px-3 py-1 {which === 'all' ? 'bg-ink text-paper' : 'hover:bg-paper-2'}"
						onclick={() => (which = 'all')}
						aria-pressed={which === 'all'}>All</button
					>
				</div>
				<button class="btn" onclick={start} disabled={pool.length === 0}>Start</button>
			</div>
		</div>
		{#if pool.length === 0 && which === 'due'}
			<p class="text-ink-2 mt-4 max-w-[60ch]">
				Nothing due. Cards come back on a 1, 2, 4, 8, 16-day schedule; a miss sends a card back to
				day 1. Switch to All to run the whole deck anyway.
			</p>
		{/if}
	{:else if done}
		<div in:fade={{ duration: 200 }}>
			<div class="figure text-[3.5rem]">
				{promoted}<span class="text-ink-3 text-[1.5rem]"> / {results.length}</span>
			</div>
			<p class="text-ink-2 mt-2 max-w-[60ch]">
				{promoted === results.length
					? 'Every card moved up a box.'
					: `${results.length - promoted} went back to box 1 and will return tomorrow.`} Next due dates
				follow the 1 / 2 / 4 / 8 / 16-day ladder.
			</p>
			<button class="btn btn-quiet mt-4 text-sm" onclick={() => (started = false)}
				>Back to the deck</button
			>
		</div>
	{:else if card}
		{#key card.id}
			<div in:fade={{ duration: 160 }}>
				<div class="flex items-baseline justify-between gap-3">
					<div class="kicker">
						{label[card.type]} · {chapterLabel ? chapterLabel(card.chapter) + ' · ' : ''}{card.lo} · box
						{recall.boxOf(card) || '–'}
					</div>
					<div class="num text-ink-3 text-xs">{i + 1} of {queue.length}</div>
				</div>
				<div class="mt-4">
					{#if card.type === 'entry'}
						<EntryCard
							prompt={card.prompt}
							entry={card.entry}
							{accounts}
							{accountName}
							hint={card.hint}
							onresult={(r) => grade(r.correct)}
						/>
					{:else if card.type === 'classification' || card.type === 'rule'}
						<p class="text-[1.25rem] leading-snug">{card.prompt}</p>
						<div class="mt-4 flex flex-wrap gap-2">
							{#each card.options as o (o.id)}
								<button
									class="border px-3 py-1.5 text-sm transition-colors {picked === null
										? 'border-rule hover:bg-paper-2'
										: o.id === card.answer
											? 'border-ok bg-ok-soft text-ok'
											: picked === o.id
												? 'border-warn bg-warn-soft text-warn'
												: 'border-rule-2 text-ink-3'}"
									onclick={() => {
										if (picked === null) picked = o.id;
									}}
									disabled={picked !== null}>{o.label}</button
								>
							{/each}
						</div>
						{#if picked !== null}
							<p
								class="mt-3 max-w-[60ch] text-sm {picked === card.answer ? 'text-ok' : 'text-warn'}"
							>
								{card.why}
							</p>
							<button class="btn mt-3 text-sm" onclick={() => grade(picked === card.answer)}
								>Next</button
							>
						{/if}
					{:else}
						<p class="font-serif text-[1.75rem] leading-tight">{card.prompt}</p>
						{#if !revealed}
							<label class="text-ink-2 mt-4 block text-xs" for="deck-own"
								>Define it, in your words</label
							>
							<textarea
								id="deck-own"
								class="field mt-1 min-h-20 text-sm"
								bind:value={own}
								placeholder="Produce the answer before you see it."
								onkeydown={(e) => {
									if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && own.trim()) revealed = true;
								}}></textarea>
							<button
								class="btn mt-3 text-sm"
								onclick={() => (revealed = true)}
								disabled={!own.trim()}>Compare</button
							>
						{:else}
							<div class="mt-4 grid gap-4 sm:grid-cols-2">
								<div>
									<div class="kicker">You</div>
									<p class="mt-1">{own}</p>
								</div>
								<div>
									<div class="kicker">The book</div>
									<p class="text-ink-2 mt-1">{card.answer}</p>
								</div>
							</div>
							<div class="mt-4 flex gap-2">
								<button class="btn text-sm" onclick={() => grade(true)}>Got it</button>
								<button class="btn btn-quiet text-sm" onclick={() => grade(false)}>Missed it</button
								>
							</div>
						{/if}
					{/if}
				</div>
			</div>
		{/key}
	{/if}
</div>
