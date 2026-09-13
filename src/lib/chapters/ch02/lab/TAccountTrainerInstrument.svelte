<script lang="ts">
	import TAccountTrainer from '$lib/components/instruments/TAccountTrainer.svelte';
	import { decemberTransactions, accounts } from '$lib/content/chapters/fastforward';
	let { href }: { href?: string } = $props();
</script>

<TAccountTrainer chapter={2} {href} entries={decemberTransactions} {accounts} />
