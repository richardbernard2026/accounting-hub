<script lang="ts">
	import LabShell from '$lib/components/chapter/LabShell.svelte';
	import { chapterModules } from '$lib/chapters/registry';
	let { data } = $props();
	const instruments = $derived(data.chapter.instruments ?? []);
	const Instrument = $derived(chapterModules[data.n]?.instrumentComponents[data.instrumentId]);
	const href = $derived(`/ch/${data.n}/lab/${data.instrumentId}`);
	const activeTitle = $derived(instruments.find((i) => i.id === data.instrumentId)?.title ?? '');
</script>

<svelte:head>
	<title>{activeTitle} · Lab · Chapter {data.n}</title>
</svelte:head>

<LabShell chapter={data.n} {instruments} activeId={data.instrumentId}>
	{#if Instrument}<Instrument {href} />{/if}
</LabShell>
