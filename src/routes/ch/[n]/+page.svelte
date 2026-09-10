<script lang="ts">
	import Ch03 from '$lib/chapters/Ch03.svelte';
	let { data } = $props();
	const pages: Record<number, typeof Ch03> = { 3: Ch03 };
	const Page = $derived(pages[data.n]);
</script>

<Page />
