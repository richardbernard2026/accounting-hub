<script lang="ts">
	import SalesVsReceivablesMethod from '$lib/components/instruments/SalesVsReceivablesMethod.svelte';
	import { creditSales, salesMethodRate, existingAllowanceCredit, salesMethod, receivablesMethod } from '$lib/content/chapters/ch07';
	let { href }: { href?: string } = $props();
</script>

<SalesVsReceivablesMethod
	chapter={7}
	{href}
	{creditSales}
	{salesMethodRate}
	{existingAllowanceCredit}
	{salesMethod}
	{receivablesMethod}
/>
