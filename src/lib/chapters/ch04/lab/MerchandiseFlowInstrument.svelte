<script lang="ts">
	import MerchandiseFlow from '$lib/components/instruments/MerchandiseFlow.svelte';
	import {
		hero,
		heroSteps,
		heroUnitDeltas,
		heroUnitsBought,
		netSales,
		costOfGoodsSold,
		grossProfit,
		grossMarginRatio,
		accountName
	} from '$lib/content/chapters/ch04';
	let { href }: { href?: string } = $props();
</script>

<MerchandiseFlow
	chapter={4}
	{href}
	steps={heroSteps}
	entries={hero.entries}
	accounts={hero.company.accounts}
	{accountName}
	unitDeltas={heroUnitDeltas}
	unitsBought={heroUnitsBought}
	{netSales}
	{costOfGoodsSold}
	{grossProfit}
	{grossMarginRatio}
/>
