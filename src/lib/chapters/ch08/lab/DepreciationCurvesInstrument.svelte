<script lang="ts">
	import DepreciationCurves from '$lib/components/instruments/DepreciationCurves.svelte';
	import { METHODS, machineCost, machineSalvage, scheduleFor, bookValueSchedule } from '$lib/content/chapters/ch08';
	let { href }: { href?: string } = $props();
</script>

<DepreciationCurves chapter={8} {href} methods={METHODS} {machineCost} {machineSalvage} {scheduleFor} {bookValueSchedule} />
