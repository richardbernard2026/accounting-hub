<script lang="ts">
	import DirectVsIndirect from '$lib/components/instruments/DirectVsIndirect.svelte';
	import { netIncome, waterfallSteps, operatingCashFlow, directLines, directMethodTotal } from '$lib/content/chapters/ch12';
	let { href }: { href?: string } = $props();
</script>

<DirectVsIndirect
	chapter={12}
	{href}
	{netIncome}
	indirectSteps={waterfallSteps}
	indirectTotal={operatingCashFlow}
	{directLines}
	directTotal={directMethodTotal}
/>
