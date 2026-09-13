<script lang="ts">
	import ReturnOnAssetsTakenApart from '$lib/components/instruments/ReturnOnAssetsTakenApart.svelte';
	import { defaultProfitMarginForRoa, defaultTurnoverForRoa, returnOnAssetsFrom } from '$lib/content/chapters/ch13';
	let { href }: { href?: string } = $props();
</script>

<ReturnOnAssetsTakenApart
	chapter={13}
	{href}
	defaultMargin={defaultProfitMarginForRoa}
	defaultTurnover={defaultTurnoverForRoa}
	{returnOnAssetsFrom}
/>
