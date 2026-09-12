<script lang="ts">
	import SiteHeader from '$lib/components/ui/SiteHeader.svelte';
	import ChapterHome from '$lib/components/chapter/ChapterHome.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>Chapter {data.n} · {data.chapter.meta.title}</title>
	<meta name="description" content={data.chapter.meta.oneLine ?? data.chapter.meta.summary} />
</svelte:head>

<SiteHeader chapter={data.n} />

<main class="mx-auto max-w-[1280px] px-4 pb-24 sm:px-6">
	<ChapterHome chapter={data.chapter} />
</main>
