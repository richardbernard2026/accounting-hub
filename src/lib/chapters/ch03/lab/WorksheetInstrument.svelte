<script lang="ts">
	import Worksheet from '$lib/components/instruments/Worksheet.svelte';
	import { unadjustedTB, adjustedTB } from '$lib/content/chapters/ch03';
	import { accounts, accountName, adjustments } from '$lib/content/chapters/fastforward';
	let { href }: { href?: string } = $props();
</script>

<Worksheet
	chapter={3}
	{href}
	unadjusted={unadjustedTB}
	adjusted={adjustedTB}
	{adjustments}
	{accounts}
	{accountName}
/>
