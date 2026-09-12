<script lang="ts">
	import { onMount, setContext, type Snippet } from 'svelte';
	import { recall } from '$lib/recall/store.svelte';
	let {
		data,
		children
	}: {
		data: { n: number; chapter: import('$lib/content/types').ChapterContent };
		children: Snippet;
	} = $props();

	// svelte-ignore state_referenced_locally
	setContext('chapter', data.n);
	setContext('terms', data.chapter.terms);

	onMount(() => recall.visit(data.n));
</script>

{@render children()}
