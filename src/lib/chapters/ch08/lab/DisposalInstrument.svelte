<script lang="ts">
	import Disposal from '$lib/components/instruments/Disposal.svelte';
	import { machineCost, disposalAccumulatedDepreciation, disposalBookValue, disposalGainOrLoss } from '$lib/content/chapters/ch08';
	let { href }: { href?: string } = $props();
</script>

<Disposal
	chapter={8}
	{href}
	cost={machineCost}
	accumulatedDepreciation={disposalAccumulatedDepreciation}
	bookValue={disposalBookValue}
	gainOrLossOf={disposalGainOrLoss}
/>
