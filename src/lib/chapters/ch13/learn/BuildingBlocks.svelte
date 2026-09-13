<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';

	const href = '/ch/13/learn/building-blocks';
	setContext('href', href);
</script>

<div class="frame">
	<p class="max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		Every ratio in this chapter answers one of four questions.
	</p>
	<div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Liquidity and efficiency</div>
			<p class="text-ink-2 mt-1">Can it meet short-term obligations, and use its assets well?</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Solvency</div>
			<p class="text-ink-2 mt-1">Can it meet long-term obligations and survive?</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Profitability</div>
			<p class="text-ink-2 mt-1">Can it earn a satisfactory income?</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Market prospects</div>
			<p class="text-ink-2 mt-1">What does the market think its stock is worth?</p>
		</div>
	</div>
</div>

<Reading chapter={13} lo="C1" label="A ratio means nothing alone">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Financial statement analysis">Financial statement analysis</TermMark> always
			needs a <TermMark name="Standards for comparison">standard for comparison</TermMark> — the
			company's own past, a competitor, or an industry guideline. A ratio of 2.0 means nothing until
			you know what 2.0 is being compared against.
		</p>
		<p>
			The <TermMark name="Building blocks of analysis">four building blocks</TermMark> organize every
			ratio this chapter covers — each one exists to answer one of those four questions, never more
			than one.
		</p>
	</div>
</Reading>
