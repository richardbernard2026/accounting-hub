<script lang="ts">
	import PreferredDividendAllocator from '$lib/components/instruments/PreferredDividendAllocator.svelte';
	import {
		preferredShares,
		preferredParValue,
		preferredRate,
		preferredAnnualEntitlement,
		arrearsFromYear1,
		defaultDividendDeclared,
		allocateDividend
	} from '$lib/content/chapters/ch11';
	let { href }: { href?: string } = $props();
</script>

<PreferredDividendAllocator
	chapter={11}
	{href}
	{preferredShares}
	{preferredParValue}
	{preferredRate}
	{preferredAnnualEntitlement}
	{arrearsFromYear1}
	defaultDeclared={defaultDividendDeclared}
	{allocateDividend}
/>
