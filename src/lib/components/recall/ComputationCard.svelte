<script lang="ts">
	/**
	 * A card for a chapter with no journal entries: read the facts, compute
	 * the number yourself, check it. Generalized from EntryCard's reveal
	 * pattern for a chapter whose skill is computation, not journalizing.
	 */
	let {
		prompt,
		answer,
		unit,
		tolerance,
		why,
		revealAfter = 2,
		onresult
	}: {
		prompt: string;
		answer: number;
		unit: '%' | '$' | 'times' | 'days' | '';
		tolerance: number;
		why: string;
		revealAfter?: number;
		onresult?: (r: { correct: boolean; tries: number; revealed: boolean }) => void;
	} = $props();

	let value = $state('');
	let tries = $state(0);
	let feedback = $state<string | null>(null);
	let solved = $state(false);
	let revealed = $state(false);
	const canCheck = $derived(value.trim() !== '');

	function format(n: number): string {
		if (unit === '%') return `${n}%`;
		if (unit === '$') return n < 0 ? `($${Math.abs(n).toLocaleString()})` : `$${n.toLocaleString()}`;
		if (unit === 'times') return `${n} times`;
		if (unit === 'days') return `${n} days`;
		return String(n);
	}

	function check() {
		if (!canCheck || solved || revealed) return;
		tries++;
		const parsed = Number(value.replace(/[^0-9.-]/g, ''));
		if (!Number.isNaN(parsed) && Math.abs(parsed - answer) <= tolerance) {
			solved = true;
			feedback = `Right. ${why}`;
			onresult?.({ correct: true, tries, revealed: false });
			return;
		}
		feedback = 'Not quite. Re-check the formula and try again.';
	}
	function reveal() {
		value = String(answer);
		revealed = true;
		feedback = null;
		onresult?.({ correct: false, tries, revealed: true });
	}
</script>

<div class="entry-card">
	<p class="text-[1.05rem] leading-relaxed">{prompt}</p>
	{#if solved || revealed}
		<div class="border-rule-2 bg-paper mt-4 border px-3 py-2">
			<p class="num text-lg font-medium">{format(answer)}</p>
		</div>
		{#if revealed && !solved}<p class="text-ink-3 mt-2 text-sm">
				Shown, not solved. It will come back sooner.
			</p>{/if}
	{:else}
		<div class="mt-4 flex flex-wrap items-end gap-3">
			<label class="text-sm"
				><span class="text-xs font-medium">Your answer{unit ? ` (${unit === '$' ? 'dollars' : unit})` : ''}</span>
				<input
					class="field num mt-1"
					inputmode="decimal"
					bind:value
					placeholder="0"
					onkeydown={(e) => e.key === 'Enter' && check()}
				/></label
			>
			<button class="btn text-sm" onclick={check} disabled={!canCheck}>Check</button>
			{#if tries >= revealAfter}<button class="btn btn-quiet text-sm" onclick={reveal}
					>Show me</button
				>{/if}
		</div>
	{/if}
	{#if feedback}
		<p class="mt-2 text-sm {solved ? 'text-ok' : 'text-warn'}" aria-live="polite">{feedback}</p>
	{/if}
</div>
