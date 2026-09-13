<script lang="ts">
	/**
	 * One T-account at a time, its real December postings already on it. Guess
	 * which side the ending balance lands on before it is revealed.
	 */
	import type { Account, Entry } from '$lib/ledger';
	import { fmt, normalSide } from '$lib/ledger';
	import TAccount from '../ledger/TAccount.svelte';
	import PinState from '../notes/PinState.svelte';

	let {
		chapter,
		href,
		entries,
		accounts
	}: { chapter: number; href?: string; entries: Entry[]; accounts: Account[] } = $props();

	function postsFor(num: string) {
		const debits: { amount: number; label?: string }[] = [];
		const credits: { amount: number; label?: string }[] = [];
		for (const e of entries) {
			for (const l of e.lines) {
				if (l.acct !== num) continue;
				if (l.dr) debits.push({ amount: l.dr, label: `(${e.id})` });
				if (l.cr) credits.push({ amount: l.cr, label: `(${e.id})` });
			}
		}
		return { debits, credits };
	}
	const roster = accounts
		.map((a) => ({ acct: a, ...postsFor(a.num) }))
		.filter((a) => a.debits.length + a.credits.length > 0);

	let idx = $state(0);
	let guess = $state<'dr' | 'cr' | null>(null);
	let touched = $state(false);
	const current = $derived(roster[idx]);
	const normal = $derived(normalSide(current.acct.type));
	const totalDr = $derived(current.debits.reduce((s, p) => s + p.amount, 0));
	const totalCr = $derived(current.credits.reduce((s, p) => s + p.amount, 0));
	const balance = $derived(normal === 'dr' ? totalDr - totalCr : totalCr - totalDr);
	const correct = $derived(guess === normal);

	function pick(side: 'dr' | 'cr') {
		guess = side;
		touched = true;
	}
	function select(i: number) {
		idx = i;
		guess = null;
	}
	const sentence = $derived(
		`${current.acct.name} — ${fmt(balance, { dollar: true })} ${normal === 'dr' ? 'debit' : 'credit'} balance.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<div class="flex flex-wrap gap-1.5">
			{#each roster as r, i (r.acct.num)}
				<button
					class="border px-2.5 py-1 text-sm transition-colors {i === idx
						? 'border-ink bg-ink text-paper'
						: 'border-rule hover:bg-paper-2'}"
					onclick={() => select(i)}
					aria-pressed={i === idx}>{r.acct.name}</button
				>
			{/each}
		</div>
		<PinState {chapter} lo="C1" label="T-account trainer" {href} {sentence} dirty={touched} />
	</div>

	<div class="mt-5 grid gap-6 sm:grid-cols-[minmax(0,320px)_1fr]">
		<TAccount
			title={current.acct.name}
			num={current.acct.num}
			normal={guess ? normal : normal}
			debits={current.debits}
			credits={current.credits}
			showBalance={guess !== null}
		/>
		<div>
			<p class="text-[1.05rem] leading-snug">
				Which side is <span class="font-medium">{current.acct.name}</span>’s normal balance — the side
				where increases are recorded?
			</p>
			<div class="mt-3 flex gap-2" role="group" aria-label="Guess the normal side">
				<button
					class="border px-4 py-1.5 text-sm transition-colors {guess === 'dr'
						? correct
							? 'border-ok bg-ok-soft text-ok'
							: 'border-warn bg-warn-soft text-warn'
						: 'border-rule hover:bg-paper-2'}"
					onclick={() => pick('dr')}
					disabled={guess !== null}>Debit</button
				>
				<button
					class="border px-4 py-1.5 text-sm transition-colors {guess === 'cr'
						? correct
							? 'border-ok bg-ok-soft text-ok'
							: 'border-warn bg-warn-soft text-warn'
						: 'border-rule hover:bg-paper-2'}"
					onclick={() => pick('cr')}
					disabled={guess !== null}>Credit</button
				>
			</div>
			{#if guess !== null}
				<p class="mt-3 max-w-[46ch] text-sm {correct ? 'text-ok' : 'text-warn'}">
					{current.acct.name} is {normal === 'dr' ? 'debit' : 'credit'}-normal. Debit means left, not
					decrease: whether posting to the left raises the balance depends on the account. Its
					December postings — {current.debits.map((d) => fmt(d.amount, { dollar: true })).join(', ') ||
						'none'} on the debit side, {current.credits
						.map((c) => fmt(c.amount, { dollar: true }))
						.join(', ') || 'none'} on the credit side — leave a
					<span class="font-medium">{fmt(balance, { dollar: true })} {normal === 'dr' ? 'debit' : 'credit'}</span
					> balance.
				</p>
			{/if}
		</div>
	</div>
</div>
