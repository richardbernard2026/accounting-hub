<script lang="ts">
	import NoteAcrossYearEnd from '$lib/components/instruments/NoteAcrossYearEnd.svelte';
	import { notePrincipal, noteRate, noteDays, noteDaysToYearEnd } from '$lib/content/chapters/ch09';
	let { href }: { href?: string } = $props();
</script>

<NoteAcrossYearEnd
	chapter={9}
	{href}
	principal={notePrincipal}
	rate={noteRate}
	totalDays={noteDays}
	defaultDaysToYearEnd={noteDaysToYearEnd}
/>
