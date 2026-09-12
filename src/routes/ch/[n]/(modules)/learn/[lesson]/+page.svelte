<script lang="ts">
	import LearnShell from '$lib/components/chapter/LearnShell.svelte';
	import { chapterModules } from '$lib/chapters/registry';
	let { data } = $props();
	const lessons = $derived(data.chapter.lessons ?? []);
	const Lesson = $derived(chapterModules[data.n]?.lessonComponents[data.lessonId]);
	const activeTitle = $derived(lessons.find((l) => l.id === data.lessonId)?.title ?? '');
</script>

<svelte:head>
	<title>{activeTitle} · Learn · Chapter {data.n}</title>
</svelte:head>

<LearnShell chapter={data.n} {lessons} activeId={data.lessonId}>
	{#if Lesson}<Lesson />{/if}
</LearnShell>
