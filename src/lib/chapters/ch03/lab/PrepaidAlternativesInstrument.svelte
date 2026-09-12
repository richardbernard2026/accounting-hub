<script lang="ts">
	import PrepaidAlternatives from '$lib/components/instruments/PrepaidAlternatives.svelte';
	import { accountName } from '$lib/content/chapters/fastforward';
	let { href }: { href?: string } = $props();
</script>

<PrepaidAlternatives chapter={3} {href} {accountName} />
