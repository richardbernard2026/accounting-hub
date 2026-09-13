<script lang="ts">
	import PettyCashCycle from '$lib/components/instruments/PettyCashCycle.svelte';
	import { pettyCashSteps, founders, accountName } from '$lib/content/chapters/ch06';
	let { href }: { href?: string } = $props();
</script>

<PettyCashCycle
	chapter={6}
	{href}
	steps={pettyCashSteps}
	entries={founders.entries}
	accounts={founders.company.accounts}
	{accountName}
/>
