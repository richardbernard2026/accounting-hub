<script lang="ts">
	import InstallmentNoteSchedule from '$lib/components/instruments/InstallmentNoteSchedule.svelte';
	import { notePrincipal, notePayment, noteSchedule } from '$lib/content/chapters/ch10';
	let { href }: { href?: string } = $props();
</script>

<InstallmentNoteSchedule
	chapter={10}
	{href}
	principal={notePrincipal}
	payment={notePayment}
	schedule={noteSchedule}
/>
