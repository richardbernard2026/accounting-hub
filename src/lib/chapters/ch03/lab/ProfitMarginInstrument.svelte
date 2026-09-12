<script lang="ts">
	import ProfitMargin from '$lib/components/instruments/ProfitMargin.svelte';
	import { fs } from '$lib/content/chapters/ch03';
	let { href }: { href?: string } = $props();
</script>

<ProfitMargin
	chapter={3}
	{href}
	netIncome={fs.income.netIncome}
	netSales={fs.income.totalRevenues}
/>
