<script lang="ts">
	import { fmt } from '$lib/ledger';
	import type { Side } from '$lib/ledger';
	interface Post {
		amount: number;
		label?: string;
		new?: boolean;
	}
	let {
		title,
		num,
		normal,
		debits = [],
		credits = [],
		showBalance = true
	}: {
		title: string;
		num?: string;
		normal: Side;
		debits?: Post[];
		credits?: Post[];
		showBalance?: boolean;
	} = $props();
	const totalDr = $derived(debits.reduce((s, p) => s + p.amount, 0));
	const totalCr = $derived(credits.reduce((s, p) => s + p.amount, 0));
	const bal = $derived(normal === 'dr' ? totalDr - totalCr : totalCr - totalDr);
	const rows = $derived(Math.max(debits.length, credits.length, 1));
</script>

<div class="t-account text-sm">
	<div class="border-ink flex items-baseline justify-between border-b pb-1">
		<span class="font-medium">{title}</span>
		{#if num}<span class="num text-ink-3 text-xs">{num}</span>{/if}
	</div>
	<div class="grid grid-cols-2">
		<div class="border-ink border-r px-2 py-1">
			{#each Array(rows) as _, i (i)}
				{@const p = debits[i]}
				<div class="flex justify-between gap-2 leading-6 {p?.new ? 'post-new' : ''}">
					<span class="text-ink-3 text-xs">{p?.label ?? ''}</span>
					<span class="num dr">{p ? fmt(p.amount) : ''}</span>
				</div>
			{/each}
		</div>
		<div class="px-2 py-1">
			{#each Array(rows) as _, i (i)}
				{@const p = credits[i]}
				<div class="flex justify-between gap-2 leading-6 {p?.new ? 'post-new' : ''}">
					<span class="text-ink-3 text-xs">{p?.label ?? ''}</span>
					<span class="num cr">{p ? fmt(p.amount) : ''}</span>
				</div>
			{/each}
		</div>
	</div>
	{#if showBalance}
		<div class="border-rule grid grid-cols-2 border-t">
			<div class="px-2 py-1 text-right {normal === 'dr' ? '' : 'invisible'}">
				<span class="text-ink-3 text-xs">Bal.</span>
				<span class="num dr font-medium">{fmt(bal)}</span>
			</div>
			<div class="px-2 py-1 text-right {normal === 'cr' ? '' : 'invisible'}">
				<span class="text-ink-3 text-xs">Bal.</span>
				<span class="num cr font-medium">{fmt(bal)}</span>
			</div>
		</div>
	{/if}
</div>

<style>
	.post-new {
		animation: post-in 400ms var(--ease-out-quart) both;
	}
	@keyframes post-in {
		from {
			opacity: 0;
			transform: translateY(-4px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}
</style>
