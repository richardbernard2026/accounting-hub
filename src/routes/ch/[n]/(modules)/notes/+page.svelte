<script lang="ts">
	import ChapterNotes from '$lib/components/chapter/ChapterNotes.svelte';
	let { data } = $props();
</script>

<svelte:head><title>Notes · Chapter {data.n}</title></svelte:head>

<ChapterNotes chapter={data.chapter} />
