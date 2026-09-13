<script lang="ts">
	import BalanceSheetChangeReader from '$lib/components/instruments/BalanceSheetChangeReader.svelte';
	import { changeAccounts, cashEffectOfChange } from '$lib/content/chapters/ch12';
	let { href }: { href?: string } = $props();
</script>

<BalanceSheetChangeReader chapter={12} {href} accounts={changeAccounts} {cashEffectOfChange} />
