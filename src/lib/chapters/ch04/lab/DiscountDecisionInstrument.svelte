<script lang="ts">
	import DiscountDecision from '$lib/components/instruments/DiscountDecision.svelte';
	import { discountDecision } from '$lib/content/chapters/ch04';
	let { href }: { href?: string } = $props();
</script>

<DiscountDecision
	chapter={4}
	{href}
	invoiceAmount={discountDecision.invoiceAmount}
	earlyPaymentCash={discountDecision.earlyPaymentCash}
	discountTaken={discountDecision.discountTaken}
	discountDays={discountDecision.discountDays}
	creditDays={discountDecision.creditDays}
/>
