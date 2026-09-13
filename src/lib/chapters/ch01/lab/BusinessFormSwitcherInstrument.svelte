<script lang="ts">
	import BusinessFormSwitcher from '$lib/components/instruments/BusinessFormSwitcher.svelte';
	import { businessForms } from '$lib/content/chapters/ch01';
	let { href }: { href?: string } = $props();
</script>

<BusinessFormSwitcher chapter={1} {href} forms={businessForms} />
