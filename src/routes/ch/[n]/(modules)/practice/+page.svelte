<script lang="ts">
	import { chapterModules } from '$lib/chapters/registry';
	let { data } = $props();
	const Practice = $derived(chapterModules[data.n]?.practice);
</script>

<svelte:head><title>Practice · Chapter {data.n}</title></svelte:head>

{#if Practice}<Practice />{/if}
