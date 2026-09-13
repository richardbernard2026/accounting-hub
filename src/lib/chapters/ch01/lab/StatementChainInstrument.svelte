<script lang="ts">
	import StatementChain from '$lib/components/instruments/StatementChain.svelte';
	import {
		statementsWithRent,
		netIncome,
		endingRE,
		netCashIncrease,
		totalAssets,
		totalEquity
	} from '$lib/content/chapters/ch01';
	let { href }: { href?: string } = $props();

	const base = { netIncome, endingRE, cash: netCashIncrease, totalAssets, totalEquity };
</script>

<StatementChain chapter={1} {href} {base} withRent={statementsWithRent} />
