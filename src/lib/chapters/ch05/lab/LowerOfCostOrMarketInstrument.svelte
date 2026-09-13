<script lang="ts">
	import LowerOfCostOrMarket from '$lib/components/instruments/LowerOfCostOrMarket.svelte';
	import { lcm } from '$lib/content/chapters/ch05';
	let { href }: { href?: string } = $props();
</script>

<LowerOfCostOrMarket chapter={5} {href} units={lcm.units} cost={lcm.cost} />
