<script lang="ts">
	import WarrantyAccrual from '$lib/components/instruments/WarrantyAccrual.svelte';
	import { defaultSales, defaultWarrantyRate, defaultRepairsUsed, warrantyExpense, warrantyLiabilityAfterRepairs } from '$lib/content/chapters/ch09';
	let { href }: { href?: string } = $props();
</script>

<WarrantyAccrual
	chapter={9}
	{href}
	{defaultSales}
	defaultRate={defaultWarrantyRate}
	{defaultRepairsUsed}
	expenseOf={warrantyExpense}
	liabilityAfterRepairsOf={warrantyLiabilityAfterRepairs}
/>
