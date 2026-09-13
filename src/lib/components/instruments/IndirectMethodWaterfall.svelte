<script lang="ts">
	/**
	 * Every adjustment starts on, matching the real statement. Switching one
	 * off shows how far the running total drifts from $20,000 without it —
	 * that gap is what the line was worth.
	 */
	import { fmt } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	interface WaterfallStep {
		id: string;
		label: string;
		amount: number;
		reason: string;
	}

	let {
		chapter,
		href,
		netIncome,
		steps,
		target
	}: {
		chapter: number;
		href?: string;
		netIncome: number;
		steps: WaterfallStep[];
		target: number;
	} = $props();

	let on = $state<Record<string, boolean>>(Object.fromEntries(steps.map((s) => [s.id, true])));
	let touched = $state(false);

	function toggle(id: string) {
		on[id] = !on[id];
		touched = true;
	}

	const running = $derived.by(() => {
		let total = netIncome;
		const totals: number[] = [];
		for (const s of steps) {
			if (on[s.id]) total += s.amount;
			totals.push(total);
		}
		return totals;
	});
	const final = $derived(running[running.length - 1] ?? netIncome);
	const gap = $derived(final - target);

	const sentence = $derived(
		`Operating cash flow ${fmt(final, { dollar: true })}${gap === 0 ? ', matching the statement' : `, ${fmt(Math.abs(gap), { dollar: true })} ${gap > 0 ? 'above' : 'below'} the real $${target.toLocaleString()}`}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<span class="text-sm">Net income <span class="num font-medium">{fmt(netIncome, { dollar: true })}</span></span>
		<PinState {chapter} lo="P1" label="Indirect-method waterfall" {href} {sentence} dirty={touched} />
	</div>

	<div class="mt-4 overflow-x-auto">
		<table class="ledger w-full text-sm">
			<tbody>
				<tr class="border-rule-2 border-b font-medium">
					<td>Net income</td>
					<td></td>
					<td class="num text-right">{fmt(netIncome, { dollar: true })}</td>
				</tr>
				{#each steps as s, i (s.id)}
					<tr class={on[s.id] ? '' : 'text-ink-3 line-through'}>
						<td class="py-1.5">
							<button
								class="border px-2 py-0.5 text-xs transition-colors {on[s.id]
									? 'border-ink bg-ink text-paper'
									: 'border-rule hover:bg-paper-2'}"
								onclick={() => toggle(s.id)}
								aria-pressed={on[s.id]}>{on[s.id] ? 'On' : 'Off'}</button
							>
							<span class="ml-2">{s.label}</span>
							{#if on[s.id]}
								<div class="text-ink-2 mt-0.5 ml-[3.25rem] text-xs">{s.reason}</div>
							{/if}
						</td>
						<td class="num text-right">{s.amount > 0 ? '+' : '−'}{fmt(Math.abs(s.amount), { dollar: true })}</td>
						<td class="num text-right">{fmt(running[i], { dollar: true })}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="mt-4 grid gap-4 sm:grid-cols-2">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Running total</div>
			<p class="num mt-1 text-lg">{fmt(final, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm {gap === 0 ? '' : 'border-warn'}">
			<div class="eyebrow">{gap === 0 ? 'Matches the statement' : 'Gap from $' + target.toLocaleString()}</div>
			<p class="num mt-1 text-lg">{gap === 0 ? '$0' : fmt(Math.abs(gap), { dollar: true })}</p>
		</div>
	</div>
</div>
