<script lang="ts">
	/** The imperative line every instrument gets above it, in Learn as in Lab — SPEC-v3 §2.3. */
	let { text }: { text: string } = $props();
</script>

<p class="mb-4 max-w-[68ch] text-[1.15rem] leading-snug font-medium">{text}</p>
