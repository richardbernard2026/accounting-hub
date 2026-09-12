<script lang="ts">
	import { chapterModules } from '$lib/chapters/registry';
	let { data } = $props();
	const Recall = $derived(chapterModules[data.n]?.recall);
</script>

<svelte:head><title>Recall · Chapter {data.n}</title></svelte:head>

{#if Recall}<Recall />{/if}
