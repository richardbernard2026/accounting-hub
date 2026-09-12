<script lang="ts">
	/**
	 * Wraps explanatory prose. Nothing is pre-marked: select any run of text and a
	 * capture popover appears once the pointer is up. If the selection is a key
	 * term, the popover offers to save it as a term (your words first, the book's
	 * on request). The popover stays until you save, press Escape, or click outside.
	 */
	import { onMount, type Snippet } from 'svelte';
	import type { Term } from '$lib/content/types';
	import CapturePopover from './CapturePopover.svelte';

	let {
		chapter,
		lo,
		label,
		href,
		terms = [],
		children
	}: {
		chapter: number;
		lo?: string;
		label?: string;
		/** The path back to this screen, saved with any note taken here. */
		href?: string;
		terms?: Term[];
		children: Snippet;
	} = $props();

	let root: HTMLElement;
	let popover: HTMLElement | undefined = $state();
	let sel = $state<{
		text: string;
		rect: { top: number; left: number; bottom: number; width: number };
		term?: Term;
	} | null>(null);
	let pointerDown = false;

	function norm(s: string) {
		return s
			.toLowerCase()
			.replace(/[“”"'’.,;:()]/g, '')
			.replace(/\s+/g, ' ')
			.trim();
	}
	function matchTerm(text: string): Term | undefined {
		const n = norm(text);
		const variants = [n, n.replace(/s$/, ''), n.replace(/es$/, '')];
		return terms.find((t) =>
			[t.term, ...(t.aliases ?? [])].some((name) => variants.includes(norm(name)))
		);
	}

	/** Read the current selection; only ever *sets* the popover. Clearing is explicit. */
	function read() {
		const s = window.getSelection();
		if (
			!s ||
			s.isCollapsed ||
			!s.anchorNode ||
			!root.contains(s.anchorNode) ||
			!s.focusNode ||
			!root.contains(s.focusNode)
		)
			return;
		const text = s.toString().replace(/\s+/g, ' ').trim();
		if (text.length < 3 || text.length > 600) return;
		const r = s.getRangeAt(0).getBoundingClientRect();
		sel = {
			text,
			rect: { top: r.top, left: r.left, bottom: r.bottom, width: r.width },
			term: matchTerm(text)
		};
	}

	let timer: ReturnType<typeof setTimeout> | undefined;
	function schedule() {
		clearTimeout(timer);
		timer = setTimeout(() => {
			if (!pointerDown) read();
		}, 120);
	}
	function onPointerDown(e: PointerEvent) {
		pointerDown = true;
		const t = e.target as Node | null;
		if (sel && popover && t && !popover.contains(t)) sel = null; // outside: dismiss
	}
	function onPointerUp() {
		pointerDown = false;
		schedule();
	}
	function onKeyUp(e: KeyboardEvent) {
		if (e.shiftKey || e.key === 'Shift') schedule(); // keyboard selection
	}
	function onKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') dismiss();
	}
	function onScroll() {
		if (sel && !(popover && document.activeElement && popover.contains(document.activeElement)))
			sel = null;
	}
	function dismiss() {
		sel = null;
		window.getSelection()?.removeAllRanges();
	}

	onMount(() => {
		document.addEventListener('selectionchange', schedule);
		document.addEventListener('pointerdown', onPointerDown, true);
		document.addEventListener('pointerup', onPointerUp);
		document.addEventListener('keyup', onKeyUp);
		document.addEventListener('keydown', onKeyDown);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => {
			document.removeEventListener('selectionchange', schedule);
			document.removeEventListener('pointerdown', onPointerDown, true);
			document.removeEventListener('pointerup', onPointerUp);
			document.removeEventListener('keyup', onKeyUp);
			document.removeEventListener('keydown', onKeyDown);
			window.removeEventListener('scroll', onScroll);
			clearTimeout(timer);
		};
	});
</script>

<div bind:this={root} class="reading" data-reading>
	{@render children()}
</div>

{#if sel}
	{#key sel.text}
		<CapturePopover
			bind:el={popover}
			{chapter}
			{lo}
			{label}
			{href}
			text={sel.text}
			term={sel.term}
			rect={sel.rect}
			onclose={dismiss}
		/>
	{/key}
{/if}
