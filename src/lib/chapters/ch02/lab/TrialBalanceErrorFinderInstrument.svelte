<script lang="ts">
	import TrialBalanceErrorFinder from '$lib/components/instruments/TrialBalanceErrorFinder.svelte';
	import { decemberTransactions } from '$lib/content/chapters/fastforward';
	let { href }: { href?: string } = $props();
</script>

<TrialBalanceErrorFinder chapter={2} {href} entries={decemberTransactions} />
