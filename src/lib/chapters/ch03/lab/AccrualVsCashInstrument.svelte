<script lang="ts">
	import AccrualVsCash from '$lib/components/instruments/AccrualVsCash.svelte';
	let { href }: { href?: string } = $props();
</script>

<AccrualVsCash chapter={3} {href} />
