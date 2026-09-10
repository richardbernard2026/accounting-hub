<script lang="ts">
	/** One short callout, only where the error is genuinely high-frequency. */
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

<aside class="border-credit mt-6 max-w-[68ch] border-l-2 pl-4">
	<div class="stop-kicker">Common mistake</div>
	<p class="mt-1 text-[0.95rem] leading-snug">{@render children()}</p>
</aside>
