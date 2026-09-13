<script lang="ts">
	import RatioBuilder from '$lib/components/instruments/RatioBuilder.svelte';
	import { ratioBuilderItems } from '$lib/content/chapters/ch13';
	let { href }: { href?: string } = $props();
</script>

<RatioBuilder chapter={13} {href} ratios={ratioBuilderItems} />
