<script lang="ts">
	import IncomeStatementFormats from '$lib/components/instruments/IncomeStatementFormats.svelte';
	import { multipleStep, singleStep } from '$lib/content/chapters/ch04';
	let { href }: { href?: string } = $props();
</script>

<IncomeStatementFormats chapter={4} {href} {multipleStep} {singleStep} />
