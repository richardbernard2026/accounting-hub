<script lang="ts">
	import EquityComposition from '$lib/components/instruments/EquityComposition.svelte';
	import { allEquitySteps } from '$lib/content/chapters/ch11';
	let { href }: { href?: string } = $props();
</script>

<EquityComposition chapter={11} {href} steps={allEquitySteps} />
