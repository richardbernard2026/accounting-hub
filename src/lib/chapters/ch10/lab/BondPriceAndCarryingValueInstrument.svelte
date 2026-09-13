<script lang="ts">
	import BondPriceAndCarryingValue from '$lib/components/instruments/BondPriceAndCarryingValue.svelte';
	import {
		bondPar,
		bondCashInterest,
		bondPeriods,
		bondPrice,
		straightLineCarryingSchedule,
		effectiveInterestCarryingSchedule
	} from '$lib/content/chapters/ch10';
	let { href }: { href?: string } = $props();
</script>

<BondPriceAndCarryingValue
	chapter={10}
	{href}
	par={bondPar}
	cashInterest={bondCashInterest}
	periods={bondPeriods}
	{bondPrice}
	{straightLineCarryingSchedule}
	{effectiveInterestCarryingSchedule}
/>
