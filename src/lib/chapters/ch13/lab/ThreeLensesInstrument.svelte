<script lang="ts">
	import ThreeLenses from '$lib/components/instruments/ThreeLenses.svelte';
	import {
		incomeStatementLines,
		balanceSheetLines,
		dollarChange,
		percentChange,
		incomeStatementCommonSize,
		balanceSheetCommonSize,
		highlightIncome,
		highlightBalance
	} from '$lib/content/chapters/ch13';
	let { href }: { href?: string } = $props();
</script>

<ThreeLenses
	chapter={13}
	{href}
	{incomeStatementLines}
	{balanceSheetLines}
	{dollarChange}
	{percentChange}
	{incomeStatementCommonSize}
	{balanceSheetCommonSize}
	{highlightIncome}
	{highlightBalance}
/>
