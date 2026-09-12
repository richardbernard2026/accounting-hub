<script lang="ts">
	/** Progressive disclosure: textbook-depth treatment, collapsed by default. */
	import type { Snippet } from 'svelte';
	let { label = 'Go deeper', children }: { label?: string; children: Snippet } = $props();
</script>

<details class="deeper group mt-6">
	<summary
		class="text-ink-2 hover:text-ink inline-flex cursor-pointer list-none items-center gap-2 text-sm select-none"
	>
		<span
			class="border-rule inline-block h-4 w-4 border text-center text-[0.7rem] leading-[0.9rem] group-open:hidden"
			>+</span
		>
		<span
			class="border-rule hidden h-4 w-4 border text-center text-[0.7rem] leading-[0.9rem] group-open:inline-block"
			>−</span
		>
		{label}
	</summary>
	<div class="border-rule-2 prose-col text-ink-2 mt-3 border-l pl-4 text-[0.95rem]">
		{@render children()}
	</div>
</details>
