<script lang="ts">
	/**
	 * Persistent left rail: one tick per stop, grouped and labelled by learning
	 * objective, current stop filled, click to jump. Collapses to a thin progress
	 * bar under 900px. J/K and the arrow keys move between stops.
	 */
	import { onMount } from 'svelte';
	import type { Objective } from '$lib/content/types';
	export interface StopMeta {
		id: string;
		lo: string;
		title: string;
		kind: string;
	}
	let { stops, objectives }: { stops: StopMeta[]; objectives: Objective[] } = $props();
	let current = $state(0);
	const groups = $derived.by(() => {
		const out: { lo: string; text: string; items: { i: number; s: StopMeta }[] }[] = [];
		stops.forEach((s, i) => {
			const last = out[out.length - 1];
			if (last && last.lo === s.lo) last.items.push({ i, s });
			else {
				const o = objectives.find((x) => x.code === s.lo);
				out.push({ lo: s.lo, text: o?.short ?? o?.text ?? s.lo, items: [{ i, s }] });
			}
		});
		return out;
	});
	const pct = $derived(stops.length > 1 ? (current / (stops.length - 1)) * 100 : 0);

	function go(i: number) {
		const el = document.getElementById(stops[i]?.id);
		if (!el) return;
		el.scrollIntoView({
			behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
			block: 'start'
		});
		current = i;
	}
	function onKey(e: KeyboardEvent) {
		const t = e.target as HTMLElement | null;
		if (t && (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName))) return;
		if (e.metaKey || e.ctrlKey || e.altKey) return;
		if (e.key === 'j' || e.key === 'J' || e.key === 'ArrowDown') {
			e.preventDefault();
			go(Math.min(stops.length - 1, current + 1));
		} else if (e.key === 'k' || e.key === 'K' || e.key === 'ArrowUp') {
			e.preventDefault();
			go(Math.max(0, current - 1));
		}
	}
	onMount(() => {
		const els = stops.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
		const io = new IntersectionObserver(
			(entries) => {
				// the stop whose top edge is closest to the top of the viewport wins
				let best: { i: number; d: number } | null = null;
				for (const e of entries) {
					if (!e.isIntersecting) continue;
					const i = stops.findIndex((s) => s.id === e.target.id);
					const d = Math.abs(e.boundingClientRect.top);
					if (!best || d < best.d) best = { i, d };
				}
				if (best) current = best.i;
			},
			{ rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.1, 0.5] }
		);
		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	});
</script>

<svelte:window onkeydown={onKey} />

<!-- ≥900px: the rail -->
<nav
	class="rail fixed top-12 left-0 z-30 hidden h-[calc(100%-3rem)] w-[188px] flex-col justify-center pl-4 min-[900px]:flex"
	aria-label="Chapter progress"
>
	<ol class="space-y-3">
		{#each groups as g (g.items[0].s.id)}
			<li>
				<div class="flex items-baseline gap-2">
					<span class="num text-ink-3 w-9 shrink-0 text-[0.68rem] font-semibold tracking-wide"
						>{g.lo}</span
					>
					<span class="text-ink-3 line-clamp-1 text-[0.68rem] leading-tight" title={g.text}
						>{g.text.replace(/^Appendix 3A: /, '').replace(/\.$/, '')}</span
					>
				</div>
				<ol class="mt-1 ml-9 space-y-1">
					{#each g.items as { i, s } (s.id)}
						<li>
							<button
								class="group flex w-full items-center gap-2 py-0.5 text-left"
								onclick={() => go(i)}
								aria-current={i === current ? 'step' : undefined}
								title={s.title}
							>
								<span
									class="border-ink block h-2 w-2 shrink-0 rounded-full border transition-colors {i ===
									current
										? 'bg-ink'
										: i < current
											? 'bg-ink/40'
											: 'bg-paper group-hover:bg-ink/25'}"
								></span>
								<span
									class="text-ink-3 group-hover:text-ink line-clamp-1 text-[0.72rem] leading-tight transition-colors {i ===
									current
										? 'text-ink'
										: ''}">{s.title}</span
								>
							</button>
						</li>
					{/each}
				</ol>
			</li>
		{/each}
	</ol>
	<div class="num text-ink-3 mt-5 text-[0.68rem]">{current + 1} of {stops.length} · J / K</div>
</nav>

<!-- <900px: a thin bar -->
<div class="fixed top-12 left-0 z-30 w-full min-[900px]:hidden" aria-hidden="true">
	<div class="bg-rule-2 h-0.5 w-full">
		<div class="bg-ink h-0.5 transition-[width] duration-300" style="width:{pct}%"></div>
	</div>
	<div class="bg-paper/90 text-ink-3 num px-3 py-1 text-[0.68rem] backdrop-blur-sm">
		{stops[current]?.lo} · {current + 1} of {stops.length} · {stops[current]?.title}
	</div>
</div>
