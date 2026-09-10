<script lang="ts">
	/**
	 * Wraps explanatory prose. Nothing is pre-marked: select any run of text and a
	 * capture popover appears. If the selection is a key term, the popover offers to
	 * save it as a term (your words first, the book's on request).
	 */
	import { onMount, type Snippet } from 'svelte';
	import type { Term } from '$lib/content/types';
	import CapturePopover from './CapturePopover.svelte';

	let {
		chapter,
		lo,
		label,
		terms = [],
		children
	}: { chapter: number; lo?: string; label?: string; terms?: Term[]; children: Snippet } = $props();

	let root: HTMLElement;
	let popover: HTMLElement | undefined = $state();
	let sel = $state<{
		text: string;
		rect: { top: number; left: number; bottom: number; width: number };
		term?: Term;
	} | null>(null);

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

	function read() {
		const s = window.getSelection();
		const inPopover = popover && document.activeElement && popover.contains(document.activeElement);
		if (
			!s ||
			s.isCollapsed ||
			!s.anchorNode ||
			!root.contains(s.anchorNode) ||
			!s.focusNode ||
			!root.contains(s.focusNode)
		) {
			if (!inPopover) sel = null;
			return;
		}
		const text = s.toString().replace(/\s+/g, ' ').trim();
		if (text.length < 3 || text.length > 600) {
			if (!inPopover) sel = null;
			return;
		}
		const r = s.getRangeAt(0).getBoundingClientRect();
		sel = {
			text,
			rect: { top: r.top, left: r.left, bottom: r.bottom, width: r.width },
			term: matchTerm(text)
		};
	}

	let timer: ReturnType<typeof setTimeout> | undefined;
	function onSelectionChange() {
		clearTimeout(timer);
		timer = setTimeout(read, 120);
	}
	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape') dismiss();
	}
	function dismiss() {
		sel = null;
		window.getSelection()?.removeAllRanges();
	}

	onMount(() => {
		document.addEventListener('selectionchange', onSelectionChange);
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('selectionchange', onSelectionChange);
			document.removeEventListener('keydown', onKey);
			clearTimeout(timer);
		};
	});
</script>

<div bind:this={root} class="reading" data-reading>
	{@render children()}
</div>

{#if sel}
	<CapturePopover
		bind:el={popover}
		{chapter}
		{lo}
		{label}
		text={sel.text}
		term={sel.term}
		rect={sel.rect}
		onclose={dismiss}
	/>
{/if}
