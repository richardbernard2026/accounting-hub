<script lang="ts">
	/**
	 * The flagship card: read the facts, choose the debit account, the credit
	 * account, and the amount; check. Generalized from the Chapter 3 journalize
	 * drill so every chapter can reuse it.
	 */
	import type { Account, Entry } from '$lib/ledger';
	import JournalEntry from '../ledger/JournalEntry.svelte';
	let {
		prompt,
		entry,
		accounts,
		accountName,
		hint,
		revealAfter = 2,
		onresult
	}: {
		prompt: string;
		entry: Entry;
		accounts: Account[];
		accountName: (n: string) => string;
		hint?: string;
		revealAfter?: number;
		onresult?: (r: { correct: boolean; tries: number; revealed: boolean }) => void;
	} = $props();

	const targetDr = $derived(entry.lines.find((l) => l.dr)!);
	const targetCr = $derived(entry.lines.find((l) => l.cr)!);
	let dr = $state('');
	let cr = $state('');
	let amount = $state('');
	let tries = $state(0);
	let feedback = $state<string | null>(null);
	let solved = $state(false);
	let revealed = $state(false);
	const canCheck = $derived(!!dr && !!cr && !!amount.trim());

	function typeOf(num: string) {
		return accounts.find((a) => a.num === num)?.type;
	}
	function check() {
		if (!canCheck || solved || revealed) return;
		const amt = Number(amount.replace(/[^0-9.]/g, ''));
		tries++;
		const okDr = dr === targetDr.acct;
		const okCr = cr === targetCr.acct;
		const okAmt = Math.abs(amt - targetDr.dr!) < 0.5;
		if (okDr && okCr && okAmt) {
			solved = true;
			feedback = `Right. ${entry.explanation}.`;
			onresult?.({ correct: true, tries, revealed: false });
			return;
		}
		const hints: string[] = [];
		if (!okDr)
			hints.push(
				dr === targetCr.acct
					? 'That account is on the credit side of this entry.'
					: typeOf(dr) === 'asset' && typeOf(targetDr.acct) === 'expense'
						? 'The debit is the expense, not the asset.'
						: 'Which account grows on the debit side here?'
			);
		if (!okCr)
			hints.push(
				cr === '101'
					? 'Cash is never in an adjusting entry.'
					: typeOf(targetCr.acct) === 'contra-asset' && typeOf(cr) === 'asset'
						? 'Credit the contra account, not the asset itself.'
						: 'Which balance sheet account is being corrected?'
			);
		if (!okAmt) hints.push('Re-read the facts and compute the amount.');
		feedback = hints.join(' ');
	}
	function reveal() {
		dr = targetDr.acct;
		cr = targetCr.acct;
		amount = String(targetDr.dr);
		revealed = true;
		feedback = null;
		onresult?.({ correct: false, tries, revealed: true });
	}
</script>

<div class="entry-card">
	<p class="text-[1.05rem] leading-relaxed">{prompt}</p>
	{#if solved || revealed}
		<div class="border-rule-2 bg-paper mt-4 border px-3 py-2">
			<JournalEntry {entry} {accountName} compact date={false} />
		</div>
		{#if revealed && !solved}<p class="text-ink-3 mt-2 text-sm">
				Shown, not solved. It will come back sooner.
			</p>{/if}
	{:else}
		<div class="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_150px]">
			<label class="text-sm"
				><span class="dr text-xs font-medium">Debit</span>
				<select class="field mt-1" bind:value={dr}
					><option value="" disabled>Choose account</option>{#each accounts as a (a.num)}<option
							value={a.num}>{a.num} {a.name}</option
						>{/each}</select
				></label
			>
			<label class="text-sm"
				><span class="cr text-xs font-medium">Credit</span>
				<select class="field mt-1" bind:value={cr}
					><option value="" disabled>Choose account</option>{#each accounts as a (a.num)}<option
							value={a.num}>{a.num} {a.name}</option
						>{/each}</select
				></label
			>
			<label class="text-sm"
				><span class="text-xs font-medium">Amount</span>
				<input
					class="field num mt-1"
					inputmode="decimal"
					bind:value={amount}
					placeholder="0"
					onkeydown={(e) => e.key === 'Enter' && check()}
				/></label
			>
		</div>
		<div class="mt-3 flex flex-wrap items-center gap-2">
			<button class="btn text-sm" onclick={check} disabled={!canCheck}>Check entry</button>
			{#if tries >= revealAfter}<button class="btn btn-quiet text-sm" onclick={reveal}
					>Show me</button
				>{/if}
			{#if hint && tries >= 1}<span class="text-ink-3 text-sm">{hint}</span>{/if}
		</div>
	{/if}
	{#if feedback}
		<p class="mt-2 text-sm {solved ? 'text-ok' : 'text-warn'}" aria-live="polite">{feedback}</p>
	{/if}
</div>
