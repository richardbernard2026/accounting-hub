<script lang="ts">
	/** Offered after a drill is finished, not before. */
	import { notes } from '$lib/notes/store.svelte';
	import { getContext } from 'svelte';
	import { slide } from 'svelte/transition';
	let {
		chapter,
		lo,
		label,
		href,
		text,
		show
	}: {
		chapter: number;
		lo?: string;
		label: string;
		/** The path back to this drill, saved with the note. */
		href?: string;
		text: string;
		show: boolean;
	} = $props();
	// svelte-ignore state_referenced_locally
	const resolvedHref = href ?? getContext<string | undefined>('href');
	let kept = $state(false);
	function keep() {
		notes.add({ chapter, kind: 'line', text, source: { lo, label, href: resolvedHref } });
		kept = true;
	}
</script>

{#if show}
	<div class="border-ink mt-4 border-l-2 pl-3" transition:slide={{ duration: 220 }}>
		<div class="eyebrow">What you just proved</div>
		<p class="mt-1 text-[0.95rem] leading-snug">{text}</p>
		<button class="btn btn-quiet mt-2 text-xs" onclick={keep} disabled={kept}
			>{kept ? 'Kept in your notes' : 'Keep this'}</button
		>
	</div>
{/if}
