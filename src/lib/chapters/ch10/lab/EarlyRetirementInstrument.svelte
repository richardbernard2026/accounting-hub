<script lang="ts">
	import EarlyRetirement from '$lib/components/instruments/EarlyRetirement.svelte';
	import { retirementPar, retirementCarryingValue, retirementGainOrLoss } from '$lib/content/chapters/ch10';
	let { href }: { href?: string } = $props();
</script>

<EarlyRetirement
	chapter={10}
	{href}
	par={retirementPar}
	carryingValue={retirementCarryingValue}
	gainOrLossOf={retirementGainOrLoss}
/>
