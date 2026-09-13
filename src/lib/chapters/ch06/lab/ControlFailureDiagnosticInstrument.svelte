<script lang="ts">
	import ControlFailureDiagnostic from '$lib/components/instruments/ControlFailureDiagnostic.svelte';
	import { controlScenarios, controlPrinciples } from '$lib/content/chapters/ch06';
	let { href }: { href?: string } = $props();
</script>

<ControlFailureDiagnostic chapter={6} {href} scenarios={controlScenarios} principles={controlPrinciples} />
