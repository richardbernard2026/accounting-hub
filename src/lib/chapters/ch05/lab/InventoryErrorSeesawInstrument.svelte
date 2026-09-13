<script lang="ts">
	import InventoryErrorSeesaw from '$lib/components/instruments/InventoryErrorSeesaw.svelte';
	import { computeErrorSeesaw } from '$lib/content/chapters/ch05';
	let { href }: { href?: string } = $props();
</script>

<InventoryErrorSeesaw chapter={5} {href} compute={computeErrorSeesaw} />
