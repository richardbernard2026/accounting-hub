<script lang="ts">
	import SiteHeader from '$lib/components/ui/SiteHeader.svelte';
	import RetrievalDeck from '$lib/components/recall/RetrievalDeck.svelte';
	import { chapters, chapterIndex } from '$lib/content';
	import { cardsFor } from '$lib/recall/cards';
	import { recall } from '$lib/recall/store.svelte';
	import { accounts, accountName } from '$lib/content/chapters/fastforward';
	// Cards across every chapter the student has visited.
	const visited = $derived(
		Object.values(chapters).filter((c) => recall.visited.includes(c.meta.number))
	);
	const cards = $derived(visited.flatMap((c) => cardsFor(c)));
	const due = $derived(recall.due(cards).length);
	const label = (n: number) => `Ch ${n}`;
</script>

<svelte:head><title>Review · Accounting Hub</title></svelte:head>
<SiteHeader notesButton={false} />

<main class="mx-auto max-w-[900px] px-5 pt-16 pb-24 sm:px-8">
	<div class="stop-kicker">Review · every chapter you have opened</div>
	<h1 class="stop-head mt-2">{due} card{due === 1 ? '' : 's'} due</h1>
	{#if visited.length === 0}
		<p class="text-ink-2 mt-6 max-w-[60ch]">
			Open a chapter first. Its deck is generated from the terms, situations, entries, and rules it
			teaches, and shows up here as cards come due.
		</p>
		<p class="mt-4 text-sm">
			{#each chapterIndex.filter((c) => c.status === 'live') as c (c.number)}<a
					class="underline underline-offset-4"
					href="/ch/{c.number}">Chapter {c.number} · {c.title}</a
				>{/each}
		</p>
	{:else}
		<p class="text-ink-2 mt-3 max-w-[60ch] text-sm">
			Decks from {visited.map((c) => `Chapter ${c.meta.number}`).join(', ')}. Grading lives in this
			browser only.
		</p>
		<div class="mt-10"><RetrievalDeck {cards} {accounts} {accountName} chapterLabel={label} /></div>
	{/if}
</main>
