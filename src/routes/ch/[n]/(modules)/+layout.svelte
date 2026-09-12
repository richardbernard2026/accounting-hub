<script lang="ts">
	import SiteHeader from '$lib/components/ui/SiteHeader.svelte';
	import ModuleNav from '$lib/components/chapter/ModuleNav.svelte';
	let { data, children } = $props();
</script>

<SiteHeader chapter={data.n} />
<ModuleNav chapter={data.n} />
{@render children()}
