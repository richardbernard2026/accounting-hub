<script lang="ts">
	import IndirectMethodWaterfall from '$lib/components/instruments/IndirectMethodWaterfall.svelte';
	import { netIncome, waterfallSteps, operatingCashFlow } from '$lib/content/chapters/ch12';
	let { href }: { href?: string } = $props();
</script>

<IndirectMethodWaterfall chapter={12} {href} {netIncome} steps={waterfallSteps} target={operatingCashFlow} />
