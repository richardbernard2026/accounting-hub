<script lang="ts">
	import BankReconciliation from '$lib/components/instruments/BankReconciliation.svelte';
	import { bankStatementBalance, reconItems, lakeside, accountName } from '$lib/content/chapters/ch06';
	let { href }: { href?: string } = $props();
</script>

<BankReconciliation
	chapter={6}
	{href}
	{bankStatementBalance}
	bookBalance={1383}
	items={reconItems}
	entries={lakeside.entries}
	{accountName}
/>
