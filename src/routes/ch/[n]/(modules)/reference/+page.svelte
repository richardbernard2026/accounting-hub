<script lang="ts">
	import { chapterModules } from '$lib/chapters/registry';
	let { data } = $props();
	const Reference = $derived(chapterModules[data.n]?.reference);
</script>

<svelte:head><title>Reference · Chapter {data.n}</title></svelte:head>

{#if Reference}<Reference />{/if}
