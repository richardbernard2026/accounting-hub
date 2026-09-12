<script lang="ts">
	import { notes } from '$lib/notes/store.svelte';
	import type { Term } from '$lib/content/types';
	import { fly } from 'svelte/transition';
	import { getContext } from 'svelte';

	let {
		el = $bindable(),
		chapter,
		lo,
		label,
		href,
		text,
		term,
		rect,
		onclose
	}: {
		el?: HTMLElement;
		chapter: number;
		lo?: string;
		label?: string;
		/** The path back to this screen, saved with the note. */
		href?: string;
		text: string;
		term?: Term;
		rect: { top: number; left: number; bottom: number; width: number };
		onclose: () => void;
	} = $props();

	let own = $state('');
	// svelte-ignore state_referenced_locally
	const resolvedHref = href ?? getContext<string | undefined>('href');
	let revealed = $state(false);
	let saved = $state(false);
	const W = 340;
	const pos = $derived.by(() => {
		const vw = window.innerWidth;
		const vh = window.innerHeight;
		const left = Math.max(8, Math.min(rect.left, vw - W - 8));
		const below = rect.bottom + 10;
		const flip = below + 220 > vh;
		return { left, top: flip ? Math.max(8, rect.top - 10) : below, flip };
	});

	function saveLine() {
		notes.add({
			chapter,
			kind: 'line',
			text,
			body: own.trim() || undefined,
			source: { lo, label, href: resolvedHref }
		});
		done();
	}
	function saveTerm(origin: 'own' | 'book') {
		if (!term) return;
		const body = origin === 'own' ? own.trim() : term.definition;
		if (!body) return;
		notes.add({
			chapter,
			kind: 'term',
			text: term.term,
			body,
			book: term.definition,
			origin,
			source: { lo: term.lo, label, href: resolvedHref }
		});
		done();
	}
	function done() {
		saved = true;
		setTimeout(onclose, 650);
	}
</script>

<div
	bind:this={el}
	class="border-rule bg-paper shadow-pop fixed z-50 border"
	style="left:{pos.left}px; top:{pos.top}px; width:{W}px; {pos.flip
		? 'transform: translateY(-100%);'
		: ''}"
	role="dialog"
	aria-label="Save a note"
	transition:fly={{ y: 4, duration: 150 }}
>
	{#if saved}
		<div class="px-3 py-3 text-sm">Saved to your notes.</div>
	{:else if term}
		<div class="px-3 pt-2.5 pb-1">
			<div class="eyebrow">Key term · {term.lo}</div>
			<div class="mt-0.5 font-serif text-lg">{term.term}</div>
		</div>
		<div class="px-3 pb-3">
			<label class="text-ink-2 text-xs" for="own-{chapter}">What it means, in your words</label>
			<!-- svelte-ignore a11y_autofocus -->
			<textarea
				id="own-{chapter}"
				class="field mt-1 min-h-16 text-sm"
				bind:value={own}
				autofocus
				placeholder="Try it before you peek."></textarea>
			{#if revealed}
				<p class="border-rule text-ink-2 mt-2 border-l-2 pl-2 text-sm">{term.definition}</p>
			{/if}
			<div class="mt-2 flex flex-wrap items-center gap-2">
				<button class="btn" onclick={() => saveTerm('own')} disabled={!own.trim()}
					>Save my wording</button
				>
				{#if !revealed}
					<button class="btn btn-quiet" onclick={() => (revealed = true)}
						>Compare with the book</button
					>
				{:else}
					<button class="btn btn-quiet" onclick={() => saveTerm('book')}>Save the book’s</button>
				{/if}
			</div>
		</div>
	{:else}
		<div class="px-3 pt-2.5 pb-1">
			<div class="eyebrow">Keep this line{lo ? ` · ${lo}` : ''}</div>
			<blockquote class="border-ink mt-1 border-l-2 pl-2 text-sm leading-snug">{text}</blockquote>
		</div>
		<div class="px-3 pb-3">
			<textarea
				class="field mt-1 min-h-14 text-sm"
				bind:value={own}
				aria-label="Your words about this line"
				placeholder="Add why it matters (optional)"></textarea>
			<div class="mt-2 flex items-center gap-2">
				<button class="btn" onclick={saveLine}>Save note</button>
				<button class="btn btn-quiet" onclick={onclose}>Cancel</button>
			</div>
		</div>
	{/if}
</div>
