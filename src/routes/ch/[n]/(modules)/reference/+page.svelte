<script lang="ts">
	import ChapterReference from '$lib/components/chapter/ChapterReference.svelte';
	let { data } = $props();
</script>

<svelte:head><title>Reference · Chapter {data.n}</title></svelte:head>

<ChapterReference chapter={data.chapter} />
