<script lang="ts">
	import StatementLinks from '$lib/components/instruments/StatementLinks.svelte';
	import { adjustedTB, fs } from '$lib/content/chapters/ch03';
	let { href }: { href?: string } = $props();
</script>

<StatementLinks chapter={3} {href} tb={adjustedTB} {fs} />
