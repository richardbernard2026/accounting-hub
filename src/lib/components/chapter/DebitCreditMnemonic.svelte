<script lang="ts">
	/**
	 * The rule, stated exactly, then the memory devices. DEBT is a sound-alike for
	 * "debit" and is never shown without its three accounts printed beside it.
	 * DEAD is the decodable alternative, offered as a toggle.
	 */
	let device = $state<'DEBT' | 'DEAD'>('DEBT');
	const debitAccounts = 'expenses, assets, and dividends';
	const creditAccounts = 'liabilities, equity, and revenue';
</script>

<div class="grid gap-8 md:grid-cols-2">
	<div>
		<div class="kicker">Debits increase</div>
		<div class="mt-2 flex items-baseline gap-3">
			<span class="figure dr text-[3rem] sm:text-[3.5rem]">{device}</span>
			{#if device === 'DEAD'}
				<span class="text-ink-3 text-sm">for debits</span>
			{/if}
		</div>
		<p class="mt-2 text-[1.05rem] leading-snug">
			<span class="dr font-medium">Expenses, Assets, Dividends.</span>
		</p>
		<p class="text-ink-2 mt-1 text-sm">
			{#if device === 'DEBT'}
				DEBT sounds like <em>debit</em>. It is a hook, not an acronym: the B and T do not expand, so
				the three accounts always ride beside it.
			{:else}
				D for debits, then <strong>E</strong>xpenses, <strong>A</strong>ssets,
				<strong>D</strong>ividends. Every letter decodes.
			{/if}
		</p>
	</div>
	<div>
		<div class="kicker">Credits increase</div>
		<div class="mt-2"><span class="figure cr text-[3rem] sm:text-[3.5rem]">CLOR</span></div>
		<p class="mt-2 text-[1.05rem] leading-snug">
			<span class="cr font-medium">Liabilities, Owner’s equity, Revenue.</span>
		</p>
		<p class="text-ink-2 mt-1 text-sm">
			C for credits, then every letter decodes. Coverage is complete.
		</p>
	</div>
</div>

<p class="border-ink mt-8 max-w-[68ch] border-l-2 pl-4 text-[1.05rem] leading-relaxed">
	Debits increase <span class="dr">{debitAccounts}</span>. Credits increase
	<span class="cr">{creditAccounts}</span>. Anything that pushes equity <strong>up</strong> is a
	credit: revenue, common stock. Anything that pulls it <strong>down</strong> is a debit: expenses, dividends.
	Assets are the mirror image.
</p>

<div class="mt-6 flex items-center gap-3 text-sm">
	<span class="text-ink-3">Prefer letters that decode?</span>
	<div class="border-rule flex border" role="group" aria-label="Debit mnemonic">
		<button
			class="px-3 py-1 {device === 'DEBT' ? 'bg-ink text-paper' : 'hover:bg-paper-2'}"
			onclick={() => (device = 'DEBT')}
			aria-pressed={device === 'DEBT'}>DEBT</button
		>
		<button
			class="px-3 py-1 {device === 'DEAD' ? 'bg-ink text-paper' : 'hover:bg-paper-2'}"
			onclick={() => (device = 'DEAD')}
			aria-pressed={device === 'DEAD'}>DEAD</button
		>
	</div>
</div>
