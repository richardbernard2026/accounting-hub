<script lang="ts">
	/**
	 * A key term, marked where it is taught. Click: write what it means (nothing
	 * revealed), submit, see the book's definition beside yours, both saved as one
	 * paired card. Skipped terms show up in the end-of-chapter audit.
	 */
	import { getContext, tick } from 'svelte';
	import { fly } from 'svelte/transition';
	import type { Term } from '$lib/content/types';
	import { notes } from '$lib/notes/store.svelte';
	let { name, children }: { name: string; children?: import('svelte').Snippet } = $props();
	const terms = getContext<Term[]>('terms') ?? [];
	const stop = getContext<{ id: string; lo: string }>('stop');
	const chapter = getContext<number>('chapter');
	const term = terms.find(
		(t) =>
			t.term.toLowerCase() === name.toLowerCase() ||
			t.aliases?.some((a) => a.toLowerCase() === name.toLowerCase())
	);
	const captured = $derived(term ? notes.hasTerm(chapter, term.term) : false);

	let open = $state(false);
	let own = $state('');
	let submitted = $state(false);
	let btn: HTMLButtonElement | undefined = $state();
	let panel: HTMLElement | undefined = $state();
	let pos = $state({ top: 0, left: 0, flip: false });
	const W = 360;

	async function toggle() {
		open = !open;
		if (!open) return;
		own = '';
		submitted = false;
		await tick();
		place();
		panel?.querySelector('textarea')?.focus();
	}
	function place() {
		if (!btn) return;
		const r = btn.getBoundingClientRect();
		const vw = window.innerWidth;
		const left = Math.max(8, Math.min(r.left, vw - W - 8));
		const flip = r.bottom + 280 > window.innerHeight && r.top > 300;
		pos = { top: flip ? r.top - 8 : r.bottom + 8, left, flip };
	}
	function submit() {
		if (!own.trim()) return;
		submitted = true;
	}
	function save() {
		if (!term) return;
		notes.add({
			chapter,
			kind: 'term',
			text: term.term,
			body: own.trim(),
			book: term.definition,
			origin: 'own',
			source: { lo: term.lo, label: 'Taught here', stop: stop?.id }
		});
		open = false;
		btn?.focus();
	}
	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) {
			open = false;
			btn?.focus();
		}
	}
	function onDown(e: PointerEvent) {
		if (open && panel && !panel.contains(e.target as Node) && e.target !== btn) open = false;
	}
</script>

<svelte:window
	onkeydown={onKey}
	onpointerdown={onDown}
	onresize={() => open && place()}
	onscroll={() => open && place()}
/>

{#if term}<button
		bind:this={btn}
		class="term {captured ? 'captured' : ''}"
		onclick={toggle}
		aria-expanded={open}
		title="Key term{captured ? ', in your notes' : ''}. Click to write what it means"
		>{#if children}{@render children()}{:else}{name}{/if}</button
	>{#if open}
		<div
			bind:this={panel}
			class="border-rule bg-paper shadow-pop fixed z-50 border"
			style="top:{pos.top}px; left:{pos.left}px; width:{W}px; {pos.flip
				? 'transform: translateY(-100%);'
				: ''}"
			role="dialog"
			aria-label="Define {term.term}"
			transition:fly={{ y: 4, duration: 150 }}
		>
			<div class="px-4 pt-3 pb-1">
				<div class="stop-kicker">Key term · {term.lo}{captured ? ' · in your notes' : ''}</div>
				<div class="mt-0.5 font-serif text-lg">{term.term}</div>
			</div>
			<div class="px-4 pb-4">
				{#if !submitted}
					<label class="text-ink-2 text-xs" for="term-{term.lo}-{name.replace(/\s+/g, '-')}"
						>What it means, in your words</label
					>
					<textarea
						id="term-{term.lo}-{name.replace(/\s+/g, '-')}"
						class="field mt-1 min-h-16 text-sm"
						bind:value={own}
						placeholder="Nothing is shown until you try."
						onkeydown={(e) => {
							if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submit();
						}}></textarea>
					<div class="mt-2 flex gap-2">
						<button class="btn text-xs" onclick={submit} disabled={!own.trim()}>Compare</button>
						<button class="btn btn-quiet text-xs" onclick={() => (open = false)}
							>Skip for now</button
						>
					</div>
				{:else}
					<div class="grid gap-3 text-sm">
						<div>
							<div class="stop-kicker">You</div>
							<p class="mt-0.5">{own}</p>
						</div>
						<div>
							<div class="stop-kicker">The book</div>
							<p class="text-ink-2 mt-0.5">{term.definition}</p>
						</div>
					</div>
					<div class="mt-3 flex gap-2">
						<button class="btn text-xs" onclick={save}>Save both</button>
						<button class="btn btn-quiet text-xs" onclick={() => (submitted = false)}
							>Rewrite mine</button
						>
					</div>
				{/if}
			</div>
		</div>
	{/if}{:else}<span class="text-credit">{name}</span>{/if}
