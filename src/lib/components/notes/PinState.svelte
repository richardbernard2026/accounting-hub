<script lang="ts">
	/**
	 * Appears only after an instrument has been moved off its default. Saves a
	 * "state" note carrying the sentence and the numbers on screen.
	 */
	import { notes } from '$lib/notes/store.svelte';
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	let {
		chapter,
		lo,
		label,
		sentence,
		data,
		dirty,
		hint = 'Pin this state'
	}: {
		chapter: number;
		lo?: string;
		label: string;
		sentence: string;
		data?: Record<string, string | number>;
		dirty: boolean;
		hint?: string;
	} = $props();
	let pinned = $state(false);
	const stop = getContext<{ id: string } | undefined>('stop');
	function pin() {
		notes.add({
			chapter,
			kind: 'state',
			text: sentence,
			data,
			source: { lo, label, stop: stop?.id }
		});
		pinned = true;
		setTimeout(() => (pinned = false), 1600);
	}
</script>

{#if dirty}
	<button
		class="btn btn-quiet text-xs"
		onclick={pin}
		transition:fade={{ duration: 150 }}
		title="Save what you are looking at as a note"
	>
		<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"
			><path d="M7.5 1.5l3 3-2 1-1.5 4-1-1L3.5 6.5l-1-1 4-1.5z" fill="currentColor" /><path
				d="M4.5 7.5L1.5 10.5"
				stroke="currentColor"
				stroke-width="1.2"
			/></svg
		>
		{pinned ? 'Pinned' : hint}
	</button>
{/if}
