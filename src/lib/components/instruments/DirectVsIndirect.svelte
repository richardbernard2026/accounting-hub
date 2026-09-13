<script lang="ts">
	/** Flip between the direct and indirect methods and watch both land on the same total. */
	import { fmt } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	interface WaterfallStep {
		id: string;
		label: string;
		amount: number;
	}
	interface DirectLine {
		label: string;
		builtFrom: string;
		amount: number;
	}

	let {
		chapter,
		href,
		netIncome,
		indirectSteps,
		indirectTotal,
		directLines,
		directTotal
	}: {
		chapter: number;
		href?: string;
		netIncome: number;
		indirectSteps: WaterfallStep[];
		indirectTotal: number;
		directLines: DirectLine[];
		directTotal: number;
	} = $props();

	let method = $state<'direct' | 'indirect'>('indirect');
	let touched = $state(false);

	function setMethod(m: 'direct' | 'indirect') {
		method = m;
		touched = true;
	}

	const sentence = $derived(
		`${method === 'direct' ? 'Direct' : 'Indirect'} method: net cash from operating activities ${fmt(method === 'direct' ? directTotal : indirectTotal, { dollar: true })}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<div class="flex flex-wrap gap-1.5">
			<button
				class="border px-2.5 py-1 text-sm transition-colors {method === 'indirect'
					? 'border-ink bg-ink text-paper'
					: 'border-rule hover:bg-paper-2'}"
				onclick={() => setMethod('indirect')}
				aria-pressed={method === 'indirect'}>Indirect</button
			>
			<button
				class="border px-2.5 py-1 text-sm transition-colors {method === 'direct'
					? 'border-ink bg-ink text-paper'
					: 'border-rule hover:bg-paper-2'}"
				onclick={() => setMethod('direct')}
				aria-pressed={method === 'direct'}>Direct</button
			>
		</div>
		<PinState {chapter} lo="P2" label="Direct versus indirect" {href} {sentence} dirty={touched} />
	</div>

	<div class="mt-4 overflow-x-auto">
		<table class="ledger w-full text-sm">
			<tbody>
				{#if method === 'indirect'}
					<tr class="font-medium"><td>Net income</td><td></td><td class="num text-right">{fmt(netIncome, { dollar: true })}</td></tr>
					{#each indirectSteps as s (s.id)}
						<tr class="text-ink-2">
							<td>{s.label}</td>
							<td></td>
							<td class="num text-right">{s.amount > 0 ? '+' : '−'}{fmt(Math.abs(s.amount), { dollar: true })}</td>
						</tr>
					{/each}
					<tr class="border-rule-2 border-t font-medium">
						<td>Net cash from operating activities</td><td></td>
						<td class="num text-right">{fmt(indirectTotal, { dollar: true })}</td>
					</tr>
				{:else}
					{#each directLines as l (l.label)}
						<tr>
							<td>{l.label}</td>
							<td class="text-ink-2 text-xs">{l.builtFrom}</td>
							<td class="num text-right">{l.amount < 0 ? `(${fmt(Math.abs(l.amount), { dollar: true })})` : fmt(l.amount, { dollar: true })}</td>
						</tr>
					{/each}
					<tr class="border-rule-2 border-t font-medium">
						<td>Net cash from operating activities</td><td></td>
						<td class="num text-right">{fmt(directTotal, { dollar: true })}</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>

	<div class="mt-4 grid grid-cols-2 gap-4">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Direct</div>
			<p class="num mt-1 text-lg">{fmt(directTotal, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Indirect</div>
			<p class="num mt-1 text-lg">{fmt(indirectTotal, { dollar: true })}</p>
		</div>
	</div>
</div>
