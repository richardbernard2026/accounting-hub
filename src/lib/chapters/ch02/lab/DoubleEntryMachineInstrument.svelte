<script lang="ts">
	import DoubleEntryMachine from '$lib/components/instruments/DoubleEntryMachine.svelte';
	import { decemberTransactions, accounts } from '$lib/content/chapters/fastforward';
	import { sourceDocs } from '../machineSteps';
	let { href }: { href?: string } = $props();
</script>

<DoubleEntryMachine chapter={2} {href} entries={decemberTransactions} {accounts} {sourceDocs} />
