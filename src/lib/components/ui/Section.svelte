<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		id,
		code,
		kind,
		title,
		children
	}: {
		id: string;
		code: string;
		kind: 'conceptual' | 'analytical' | 'procedural';
		title: string;
		children: Snippet;
	} = $props();
	const kindLabel = {
		conceptual: 'Conceptual',
		analytical: 'Analytical',
		procedural: 'Procedural'
	}[kind];
</script>

<section {id} class="border-rule scroll-mt-20 border-t pt-6 pb-10">
	<div class="flex items-baseline gap-3">
		<span class="lo-tag">{code}</span>
		<span class="text-ink-3 text-xs">{kindLabel}</span>
	</div>
	<h2 class="mt-2 text-xl leading-tight sm:text-[1.9rem]">{title}</h2>
	<div class="mt-5">{@render children()}</div>
</section>
