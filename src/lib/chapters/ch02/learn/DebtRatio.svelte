<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import PinState from '$lib/components/notes/PinState.svelte';
	import { unadjusted } from '$lib/content/chapters/ch02';
	import { fmt } from '$lib/ledger';

	const href = '/ch/2/learn/debt-ratio';
	setContext('href', href);

	const totalAssets = ['101', '106', '126', '128', '167'].reduce(
		(s, n) => s + unadjusted.get(n)!.balance,
		0
	);
	const totalLiabilities = ['201', '236'].reduce((s, n) => s + unadjusted.get(n)!.balance, 0);
	const ratio = totalLiabilities / totalAssets;
	let touched = $state(false);
</script>

<div class="frame">
	<p class="mb-4 max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		See how much of FastForward's assets its creditors financed, versus its owners.
	</p>
	<div class="flex items-baseline justify-between gap-2">
		<div class="kicker">Total assets, Dec 31</div>
		<PinState
			chapter={2}
			lo="A2"
			label="Debt ratio"
			{href}
			sentence={`Debt ratio: ${fmt(totalLiabilities, { dollar: true })} ÷ ${fmt(totalAssets, { dollar: true })} = ${(ratio * 100).toFixed(1)}%.`}
			dirty={touched}
		/>
	</div>
	<button
		class="bg-paper-3 mt-2 flex h-9 w-full overflow-hidden text-left"
		onclick={() => (touched = true)}
	>
		<span class="bg-ink-3 flex h-9 items-center pl-2 text-xs text-paper" style="width:{ratio * 100}%"
			>Liabilities {fmt(totalLiabilities, { dollar: true })}</span
		>
		<span class="flex h-9 flex-1 items-center pl-2 text-xs">Equity {fmt(totalAssets - totalLiabilities, { dollar: true })}</span
		>
	</button>
	<p class="num mt-2 text-sm">
		Debt ratio = {fmt(totalLiabilities, { dollar: true })} ÷ {fmt(totalAssets, { dollar: true })} = {(
			ratio * 100
		).toFixed(1)}%
	</p>
</div>

<Reading chapter={2} lo="A2" label="The debt ratio">
	<div class="prose-col mt-8">
		<p>
			The <TermMark name="Debt ratio">debt ratio</TermMark> divides total liabilities by total assets.
			It answers one question: how much of what a company owns came from creditors instead of owners?
		</p>
		<p>
			FastForward's ratio is 21.7% — about 22 cents of every dollar of assets is financed by debt, the
			rest by the owners. A higher ratio means more of the company is financed by creditors, which
			means more risk if revenue slows.
		</p>
	</div>
</Reading>
