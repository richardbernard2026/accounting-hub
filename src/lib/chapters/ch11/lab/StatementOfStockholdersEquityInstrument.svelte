<script lang="ts">
	import StatementOfStockholdersEquity from '$lib/components/instruments/StatementOfStockholdersEquity.svelte';
	import { statementRows } from '$lib/content/chapters/ch11';
	let { href }: { href?: string } = $props();
</script>

<StatementOfStockholdersEquity chapter={11} {href} rows={statementRows} />
