<script lang="ts">
	/** Pick an account and a direction; the sign of its cash effect always follows the same rule. */
	import { fmt } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	type ChangeAccountKind = 'asset' | 'liability';
	interface ChangeAccount {
		id: string;
		label: string;
		kind: ChangeAccountKind;
	}

	let {
		chapter,
		href,
		accounts,
		cashEffectOfChange
	}: {
		chapter: number;
		href?: string;
		accounts: ChangeAccount[];
		cashEffectOfChange: (kind: ChangeAccountKind, direction: 'increase' | 'decrease', amount?: number) => number;
	} = $props();

	let accountId = $state(accounts[0].id);
	let direction = $state<'increase' | 'decrease'>('increase');
	let touched = $state(false);

	function setAccount(id: string) {
		accountId = id;
		touched = true;
	}
	function setDirection(d: 'increase' | 'decrease') {
		direction = d;
		touched = true;
	}

	const account = $derived(accounts.find((a) => a.id === accountId)!);
	const effect = $derived(cashEffectOfChange(account.kind, direction));
	const sentence = $derived(
		`${account.label} ${direction === 'increase' ? 'up' : 'down'} $1,000: cash effect ${effect > 0 ? '+' : ''}${fmt(effect, { dollar: true })}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<span class="text-sm">Change $1,000</span>
		<PinState {chapter} lo="A1" label="Balance sheet change reader" {href} {sentence} dirty={touched} />
	</div>

	<div class="mt-4 flex flex-wrap gap-1.5">
		{#each accounts as a (a.id)}
			<button
				class="border px-2.5 py-1 text-sm transition-colors {accountId === a.id
					? 'border-ink bg-ink text-paper'
					: 'border-rule hover:bg-paper-2'}"
				onclick={() => setAccount(a.id)}
				aria-pressed={accountId === a.id}>{a.label}</button
			>
		{/each}
	</div>

	<div class="mt-3 flex gap-1.5">
		<button
			class="border px-2.5 py-1 text-sm transition-colors {direction === 'increase'
				? 'border-ink bg-ink text-paper'
				: 'border-rule hover:bg-paper-2'}"
			onclick={() => setDirection('increase')}
			aria-pressed={direction === 'increase'}>Increase</button
		>
		<button
			class="border px-2.5 py-1 text-sm transition-colors {direction === 'decrease'
				? 'border-ink bg-ink text-paper'
				: 'border-rule hover:bg-paper-2'}"
			onclick={() => setDirection('decrease')}
			aria-pressed={direction === 'decrease'}>Decrease</button
		>
	</div>

	<div class="mt-6 grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Account</div>
			<p class="mt-1 text-lg">{account.label}</p>
			<p class="text-ink-2 text-xs">{account.kind === 'asset' ? 'Current asset' : 'Current liability'}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Change</div>
			<p class="num mt-1 text-lg">{direction === 'increase' ? '+' : '−'}{fmt(1000, { dollar: true })}</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm {effect >= 0 ? 'border-ok' : 'border-warn'}">
			<div class="eyebrow">Cash effect</div>
			<p class="num mt-1 text-lg">{effect > 0 ? '+' : ''}{fmt(effect, { dollar: true })}</p>
		</div>
	</div>
</div>
