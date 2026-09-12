<script lang="ts">
	import { onMount } from 'svelte';
	import { chapterModules } from '$lib/chapters/registry';
	import { progress } from '$lib/progress/store.svelte';
	let { data } = $props();
	const Recall = $derived(chapterModules[data.n]?.recall);
	onMount(() => progress.visitRecall(data.n));
</script>

<svelte:head><title>Recall · Chapter {data.n}</title></svelte:head>

{#if Recall}<Recall />{/if}
