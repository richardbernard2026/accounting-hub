<script lang="ts">
	/**
	 * Switch the lens and every row's numbers recompute from the same two
	 * years of data: dollars as reported, horizontal (dollar and percent
	 * change), or vertical (percent of a common-size base).
	 */
	import { fmt } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	interface StatementLine {
		label: string;
		y2026: number;
		y2025: number;
	}
	type Lens = 'dollars' | 'horizontal' | 'vertical';

	let {
		chapter,
		href,
		incomeStatementLines,
		balanceSheetLines,
		dollarChange,
		percentChange,
		incomeStatementCommonSize,
		balanceSheetCommonSize,
		highlightIncome,
		highlightBalance
	}: {
		chapter: number;
		href?: string;
		incomeStatementLines: StatementLine[];
		balanceSheetLines: StatementLine[];
		dollarChange: (l: StatementLine) => number;
		percentChange: (l: StatementLine) => number | null;
		incomeStatementCommonSize: (l: StatementLine) => { pct2026: number; pct2025: number };
		balanceSheetCommonSize: (l: StatementLine) => { pct2026: number; pct2025: number };
		highlightIncome: Record<Lens, string>;
		highlightBalance: Record<Lens, string>;
	} = $props();

	let lens = $state<Lens>('dollars');
	let touched = $state(false);
	function setLens(l: Lens) {
		lens = l;
		touched = true;
	}

	function col1Header() {
		if (lens === 'dollars') return '2026';
		if (lens === 'horizontal') return '$ change';
		return '% of base, 2026';
	}
	function col2Header() {
		if (lens === 'dollars') return '2025';
		if (lens === 'horizontal') return '% change';
		return '% of base, 2025';
	}
	function cols(l: StatementLine, commonSizeOf: (l: StatementLine) => { pct2026: number; pct2025: number }) {
		if (lens === 'dollars') return [fmt(l.y2026, { dollar: true }), fmt(l.y2025, { dollar: true })];
		if (lens === 'horizontal') {
			const pct = percentChange(l);
			return [fmt(dollarChange(l), { dollar: true }), pct === null ? 'n/a' : `${pct}%`];
		}
		const cs = commonSizeOf(l);
		return [`${cs.pct2026}%`, `${cs.pct2025}%`];
	}

	const sentence = $derived(
		`${lens === 'dollars' ? 'Dollars' : lens === 'horizontal' ? 'Horizontal' : 'Vertical (common-size)'} lens.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<div class="flex flex-wrap gap-1.5">
			<button
				class="border px-2.5 py-1 text-sm transition-colors {lens === 'dollars'
					? 'border-ink bg-ink text-paper'
					: 'border-rule hover:bg-paper-2'}"
				onclick={() => setLens('dollars')}
				aria-pressed={lens === 'dollars'}>Dollars</button
			>
			<button
				class="border px-2.5 py-1 text-sm transition-colors {lens === 'horizontal'
					? 'border-ink bg-ink text-paper'
					: 'border-rule hover:bg-paper-2'}"
				onclick={() => setLens('horizontal')}
				aria-pressed={lens === 'horizontal'}>Horizontal</button
			>
			<button
				class="border px-2.5 py-1 text-sm transition-colors {lens === 'vertical'
					? 'border-ink bg-ink text-paper'
					: 'border-rule hover:bg-paper-2'}"
				onclick={() => setLens('vertical')}
				aria-pressed={lens === 'vertical'}>Vertical</button
			>
		</div>
		<PinState {chapter} lo="P1" label="Three lenses" {href} {sentence} dirty={touched} />
	</div>

	<div class="mt-6 overflow-x-auto">
		<div class="kicker mb-2">Income statement</div>
		<table class="ledger w-full text-sm">
			<thead>
				<tr class="text-ink-2 text-left">
					<th class="pb-1 font-normal">Line</th>
					<th class="pb-1 text-right font-normal">{col1Header()}</th>
					<th class="pb-1 text-right font-normal">{col2Header()}</th>
				</tr>
			</thead>
			<tbody>
				{#each incomeStatementLines as l (l.label)}
					{@const c = cols(l, incomeStatementCommonSize)}
					<tr class={l.label === highlightIncome[lens] ? 'bg-warn-soft font-medium' : ''}>
						<td>{l.label}</td>
						<td class="num text-right">{c[0]}</td>
						<td class="num text-right">{c[1]}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="mt-6 overflow-x-auto">
		<div class="kicker mb-2">Balance sheet</div>
		<table class="ledger w-full text-sm">
			<thead>
				<tr class="text-ink-2 text-left">
					<th class="pb-1 font-normal">Line</th>
					<th class="pb-1 text-right font-normal">{col1Header()}</th>
					<th class="pb-1 text-right font-normal">{col2Header()}</th>
				</tr>
			</thead>
			<tbody>
				{#each balanceSheetLines as l (l.label)}
					{@const c = cols(l, balanceSheetCommonSize)}
					<tr class={l.label === highlightBalance[lens] ? 'bg-warn-soft font-medium' : ''}>
						<td>{l.label}</td>
						<td class="num text-right">{c[0]}</td>
						<td class="num text-right">{c[1]}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
