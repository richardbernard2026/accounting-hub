<script lang="ts">
	import ChangeInEstimate from '$lib/components/instruments/ChangeInEstimate.svelte';
	import {
		preRevisionYears,
		slSchedule,
		bookValueAfterYear2,
		defaultRemainingLife,
		defaultRevisedSalvage,
		revisedAnnualDepreciation
	} from '$lib/content/chapters/ch08';
	let { href }: { href?: string } = $props();
</script>

<ChangeInEstimate
	chapter={8}
	{href}
	yearsBefore={preRevisionYears}
	annualBefore={slSchedule[0]}
	{bookValueAfterYear2}
	{defaultRemainingLife}
	{defaultRevisedSalvage}
	revisedAnnualOf={revisedAnnualDepreciation}
/>
