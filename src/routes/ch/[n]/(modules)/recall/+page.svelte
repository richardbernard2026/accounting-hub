<script lang="ts">
	import { onMount } from 'svelte';
	import ChapterRecall from '$lib/components/chapter/ChapterRecall.svelte';
	import { progress } from '$lib/progress/store.svelte';
	let { data } = $props();
	onMount(() => progress.visitRecall(data.n));
</script>

<svelte:head><title>Recall · Chapter {data.n}</title></svelte:head>

<ChapterRecall chapter={data.chapter} />
