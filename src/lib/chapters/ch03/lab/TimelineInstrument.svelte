<script lang="ts">
	import AdjustmentTimeline from '$lib/components/instruments/AdjustmentTimeline.svelte';
	import { lanes, unadjusted } from '$lib/content/chapters/ch03';
	import { adjustments, accountName } from '$lib/content/chapters/fastforward';
	let { href }: { href?: string } = $props();
</script>

<AdjustmentTimeline
	chapter={3}
	{href}
	{lanes}
	entries={adjustments}
	balances={unadjusted}
	{accountName}
/>
