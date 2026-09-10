<script lang="ts">
	/**
	 * Chapter-end pass: which key terms did you never capture? Each one asks for
	 * your wording before it shows the book's.
	 */
	import { notes } from '$lib/notes/store.svelte';
	import type { Term } from '$lib/content/types';
	import { slide } from 'svelte/transition';
	let { chapter, terms }: { chapter: number; terms: Term[] } = $props();
	const missing = $derived(terms.filter((t) => !notes.hasTerm(chapter, t.term)));
	const captured = $derived(terms.length - missing.length);
	let open = $state<string | null>(null);
	let own = $state('');
	let revealed = $state(false);
	function start(t: Term) {
		open = t.term;
		own = '';
		revealed = false;
	}
	function save(t: Term, origin: 'own' | 'book') {
		const body = origin === 'own' ? own.trim() : t.definition;
		if (!body) return;
		notes.add({
			chapter,
			kind: 'term',
			text: t.term,
			body,
			origin,
			source: { lo: t.lo, label: 'Term audit' }
		});
		open = null;
	}
</script>

<div class="border-rule bg-paper-2/50 border p-4 sm:p-5">
	<div class="flex flex-wrap items-baseline justify-between gap-2">
		<h3 class="text-lg">Terms you have not written down</h3>
		<span class="num text-ink-2 text-sm">{captured} of {terms.length} captured</span>
	</div>
	<div class="bg-paper-3 mt-2 h-1 w-full">
		<div
			class="bg-ink h-1 transition-[width] duration-300"
			style="width:{terms.length ? (captured / terms.length) * 100 : 0}%"
		></div>
	</div>
	{#if missing.length === 0}
		<p class="text-ink-2 mt-3 text-sm">
			Every key term in this chapter is in your notes. Export them and move on.
		</p>
	{:else}
		<p class="text-ink-2 mt-3 text-sm">
			Write each one in your own words first. The book’s wording is there when you want to check
			yourself.
		</p>
		<ul class="divide-rule-2 mt-3 divide-y">
			{#each missing as t (t.term)}
				<li class="py-2">
					<div class="flex items-center justify-between gap-3">
						<span><span class="lo-tag mr-2">{t.lo}</span>{t.term}</span>
						{#if open !== t.term}
							<button class="btn btn-quiet text-xs" onclick={() => start(t)}>Write it</button>
						{/if}
					</div>
					{#if open === t.term}
						<div class="mt-2" transition:slide={{ duration: 180 }}>
							<!-- svelte-ignore a11y_autofocus -->
							<textarea
								class="field min-h-16 text-sm"
								bind:value={own}
								autofocus
								aria-label="{t.term}, in your words"
								placeholder="{t.term} means…"></textarea>
							{#if revealed}
								<p class="border-rule text-ink-2 mt-2 border-l-2 pl-2 text-sm">{t.definition}</p>
							{/if}
							<div class="mt-2 flex flex-wrap gap-2">
								<button class="btn text-xs" onclick={() => save(t, 'own')} disabled={!own.trim()}
									>Save my wording</button
								>
								{#if !revealed}
									<button class="btn btn-quiet text-xs" onclick={() => (revealed = true)}
										>Compare with the book</button
									>
								{:else}
									<button class="btn btn-quiet text-xs" onclick={() => save(t, 'book')}
										>Save the book’s</button
									>
								{/if}
								<button class="btn btn-quiet text-xs" onclick={() => (open = null)}>Skip</button>
							</div>
						</div>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
</div>
