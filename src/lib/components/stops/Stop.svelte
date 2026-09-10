<script lang="ts">
	/**
	 * One stop: one idea, occupying the viewport. Kinds set the width the content
	 * may use. The headline is large and quiet; most stops need no container.
	 */
	import { setContext, type Snippet } from 'svelte';
	let {
		id,
		lo,
		kind = 'prose',
		kicker,
		title,
		children
	}: {
		id: string;
		lo: string;
		kind?: 'instrument' | 'prose' | 'drill' | 'retrieval' | 'audit' | 'mnemonic';
		kicker?: string;
		title?: string;
		children: Snippet;
	} = $props();
	// svelte-ignore state_referenced_locally
	setContext('stop', { id, lo });
	const width = $derived(
		{
			instrument: 'max-w-[1280px]',
			prose: 'max-w-[68ch]',
			drill: 'max-w-[900px]',
			retrieval: 'max-w-[900px]',
			audit: 'max-w-[1100px]',
			mnemonic: 'max-w-[900px]'
		}[kind]
	);
</script>

<section {id} class="stop" data-stop={id} data-lo={lo} aria-label={title ?? id}>
	<div class="mx-auto w-full min-w-0 {width} px-5 sm:px-8">
		{#if title}
			<div class="mb-8 sm:mb-10">
				<div class="stop-kicker">{kicker ?? lo}</div>
				<h2 class="stop-head mt-2">{title}</h2>
			</div>
		{/if}
		{@render children()}
	</div>
</section>
