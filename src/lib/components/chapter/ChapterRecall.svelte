<script lang="ts">
	/** This chapter's retrieval deck. Cross-chapter due cards live at /review. */
	import RetrievalDeck from '$lib/components/recall/RetrievalDeck.svelte';
	import { accountNameOf } from '$lib/ledger';
	import { cardsFor } from '$lib/recall/cards';
	import type { ChapterContent } from '$lib/content/types';

	let { chapter }: { chapter: ChapterContent } = $props();
	const cards = $derived(cardsFor(chapter));
	const accounts = $derived(chapter.accounts ?? []);
	const accountName = $derived(accountNameOf(accounts));
</script>

<div class="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
	<div class="eyebrow">Recall</div>
	<h1 class="display mt-1">Produce the answer</h1>
	<p class="text-ink-2 mt-3 max-w-[60ch] text-sm">
		Generated from this chapter: every entry, every situation, the debit/credit rule, and every key
		term. A correct answer moves a card up a box and pushes it further out — 1, 2, 4, 8, 16 days.
	</p>
	<div class="mt-10">
		<RetrievalDeck {cards} {accounts} {accountName} />
	</div>
</div>
