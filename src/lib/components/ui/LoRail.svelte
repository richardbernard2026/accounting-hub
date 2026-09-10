<script lang="ts">
	import { onMount } from 'svelte';
	import type { Objective } from '$lib/content/types';
	let { objectives }: { objectives: Objective[] } = $props();
	// svelte-ignore state_referenced_locally
	let active = $state<string>(objectives[0]?.code ?? '');
	onMount(() => {
		const els = objectives
			.map((o) => document.getElementById(o.code))
			.filter(Boolean) as HTMLElement[];
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) active = e.target.id;
			},
			{ rootMargin: '-20% 0px -70% 0px', threshold: 0 }
		);
		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	});
</script>

<nav aria-label="Learning objectives" class="lo-rail">
	<div class="eyebrow mb-2 hidden lg:block">Learning objectives</div>
	<ol class="flex gap-1 overflow-x-auto lg:flex-col lg:gap-0">
		{#each objectives as o (o.code)}
			<li>
				<a
					href="#{o.code}"
					class="block border-l-2 py-1.5 pr-2 pl-3 text-sm leading-snug transition-colors duration-150 lg:pr-0 {active ===
					o.code
						? 'border-ink text-ink'
						: 'text-ink-3 hover:text-ink border-transparent'} whitespace-nowrap lg:whitespace-normal"
				>
					<span class="num font-medium">{o.code}</span>
					<span class="hidden lg:inline"> · {o.text.replace(/^Appendix 3A: /, '')}</span>
				</a>
			</li>
		{/each}
	</ol>
</nav>
