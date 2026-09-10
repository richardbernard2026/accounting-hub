<script lang="ts">
	import '../app.css';
	import { afterNavigate } from '$app/navigation';
	import { notes } from '$lib/notes/store.svelte';
	let { children } = $props();
	afterNavigate(() => (notes.drawerOpen = false));
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" />
	<script>
		try {
			const t = localStorage.getItem('accounting-hub:theme');
			if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
		} catch {}
	</script>
</svelte:head>

{@render children()}
