<script lang="ts">
	import PayrollWaterfall from '$lib/components/instruments/PayrollWaterfall.svelte';
	import { defaultGrossPay, payrollAt } from '$lib/content/chapters/ch09';
	let { href }: { href?: string } = $props();
</script>

<PayrollWaterfall chapter={9} {href} {defaultGrossPay} {payrollAt} />
