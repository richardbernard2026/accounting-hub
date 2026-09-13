<script lang="ts">
	import EquationBalance from '$lib/components/instruments/EquationBalance.svelte';
	import { accounts } from '$lib/content/chapters/fastforward';
	import { equationSteps, equationEntries, cashFlows } from '$lib/content/chapters/ch01';
	let { href }: { href?: string } = $props();
</script>

<EquationBalance chapter={1} {href} steps={equationSteps} entries={equationEntries} {accounts} {cashFlows} />
