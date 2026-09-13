<script lang="ts">
	import AgingSchedule from '$lib/components/instruments/AgingSchedule.svelte';
	import { totalReceivables, bucketsAt, existingAllowanceCredit } from '$lib/content/chapters/ch07';
	let { href }: { href?: string } = $props();
</script>

<AgingSchedule
	chapter={7}
	{href}
	{totalReceivables}
	{bucketsAt}
	existingCreditDefault={existingAllowanceCredit}
	existingDebitDefault={350}
/>
