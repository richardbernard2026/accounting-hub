<script lang="ts">
	import CostLayers from '$lib/components/instruments/CostLayers.svelte';
	import { transactions, replay, goodsAvailableCost } from '$lib/content/chapters/ch05';
	let { href }: { href?: string } = $props();
	const methodSteps = { fifo: replay('fifo'), lifo: replay('lifo'), wavg: replay('wavg') };
</script>

<CostLayers chapter={5} {href} {transactions} {methodSteps} {goodsAvailableCost} />
