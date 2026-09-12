<script lang="ts">
	/**
	 * Lab's shell: one instrument per screen, a thumbnail strip to switch, the
	 * imperative instruction above the frame, the result line and the "noticed"
	 * line below it. Noticed is revealed only once the student has touched the
	 * instrument — any click, drag, or keystroke inside the frame counts.
	 */
	import type { Snippet } from 'svelte';
	import type { InstrumentMeta } from '$lib/content/types';
	import { progress } from '$lib/progress/store.svelte';

	let {
		chapter,
		instruments,
		activeId,
		children
	}: { chapter: number; instruments: InstrumentMeta[]; activeId: string; children: Snippet } =
		$props();

	const base = `/ch/${chapter}/lab`;
	const active = $derived(instruments.find((i) => i.id === activeId));
	let interacted = $state(false);

	$effect(() => {
		// Reset per instrument; a prior chapter of interaction is already saved.
		void activeId;
		interacted = progress.instrumentTouched(chapter, activeId);
	});

	function onInteract() {
		if (interacted) return;
		interacted = true;
		progress.markInstrument(chapter, activeId);
	}
</script>

<div class="mx-auto max-w-[1280px] px-4 py-10 sm:px-6">
	<nav aria-label="Instruments" class="mb-8 flex flex-wrap gap-1.5">
		{#each instruments as inst (inst.id)}
			<a
				href="{base}/{inst.id}"
				class="border px-3 py-1.5 text-sm underline-offset-4 {inst.id === activeId
					? 'border-ink bg-ink text-paper'
					: progress.instrumentTouched(chapter, inst.id)
						? 'border-rule text-ink hover:underline'
						: 'border-rule text-ink-2 hover:text-ink hover:underline'}"
				aria-current={inst.id === activeId ? 'page' : undefined}>{inst.title}</a
			>
		{/each}
	</nav>

	{#if active}
		<div class="eyebrow">{active.lo}</div>
		<p class="mt-2 max-w-[68ch] text-[1.15rem] leading-snug font-medium">{active.instruction}</p>

		<div
			class="frame mt-6"
			onclick={onInteract}
			oninput={onInteract}
			onchange={onInteract}
			onpointerdown={onInteract}
			onkeydown={onInteract}
			role="presentation"
		>
			{#key activeId}
				{@render children()}
			{/key}
		</div>

		<div class="mt-4 max-w-[68ch] text-sm">
			<p class="num text-ink font-medium">{active.resultLine}</p>
			{#if interacted}
				<p class="text-ink-2 mt-2">{active.noticed}</p>
			{:else}
				<p class="text-ink-2 mt-2 italic">Touch the instrument to see what to notice.</p>
			{/if}
		</div>

		<div class="border-rule-2 mt-16 flex items-center justify-between border-t pt-6 text-sm">
			<span></span>
			<a href="/ch/{chapter}/practice" class="btn">Continue to Practice →</a>
		</div>
	{/if}
</div>
