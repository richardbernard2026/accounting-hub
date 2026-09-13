<script lang="ts">
	import NoteCalculator from '$lib/components/instruments/NoteCalculator.svelte';
	import { notePrincipal, noteRate, noteDays, noteDaysToYearEnd, noteInterest, noteMaturityValue, noteAccruedAt } from '$lib/content/chapters/ch07';
	let { href }: { href?: string } = $props();
</script>

<NoteCalculator
	chapter={7}
	{href}
	defaultPrincipal={notePrincipal}
	defaultRate={noteRate}
	defaultDays={noteDays}
	daysToYearEnd={noteDaysToYearEnd}
	interestOf={noteInterest}
	maturityValueOf={noteMaturityValue}
	accruedOf={noteAccruedAt}
/>
