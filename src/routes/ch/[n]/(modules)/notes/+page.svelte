<script lang="ts">
	import { chapterModules } from '$lib/chapters/registry';
	let { data } = $props();
	const Notes = $derived(chapterModules[data.n]?.notes);
</script>

<svelte:head><title>Notes · Chapter {data.n}</title></svelte:head>

{#if Notes}<Notes />{/if}
