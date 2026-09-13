<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import Deeper from '$lib/components/prose/Deeper.svelte';
	const href = '/ch/1/learn/principles';
	setContext('href', href);
</script>

<div class="frame">
	<p class="mb-4 max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		GAAP is built from three kinds of rules. See which kind each one is.
	</p>
	<div class="grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2">
			<div class="eyebrow">Principles</div>
			<ul class="mt-1 space-y-0.5 text-sm">
				<li>Measurement (cost)</li>
				<li>Revenue recognition</li>
				<li>Expense recognition</li>
				<li>Full disclosure</li>
			</ul>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2">
			<div class="eyebrow">Assumptions</div>
			<ul class="mt-1 space-y-0.5 text-sm">
				<li>Going-concern</li>
				<li>Monetary unit</li>
				<li>Time period</li>
				<li>Business entity</li>
			</ul>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2">
			<div class="eyebrow">Constraints</div>
			<ul class="mt-1 space-y-0.5 text-sm">
				<li>Materiality</li>
				<li>Benefit exceeds cost</li>
			</ul>
		</div>
	</div>
</div>

<Reading chapter={1} lo="C2" label="The rules behind the numbers">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Generally accepted accounting principles (GAAP)">GAAP</TermMark> makes one company's
			statements comparable to another's. In the United States, the
			<TermMark name="Financial Accounting Standards Board (FASB)">FASB</TermMark> sets it, under authority
			from the <TermMark name="Securities and Exchange Commission (SEC)">SEC</TermMark>. Most other
			countries use <TermMark name="International Financial Reporting Standards (IFRS)">IFRS</TermMark
			>, set by the <TermMark name="International Accounting Standards Board (IASB)">IASB</TermMark>.
		</p>
		<p>
			The <TermMark name="Business entity assumption">business entity assumption</TermMark> keeps FastForward's
			books separate from its owner's personal finances. The
			<TermMark name="Going-concern assumption">going-concern assumption</TermMark> assumes the business
			will keep operating, not liquidate tomorrow.
		</p>
	</div>
	<Deeper label="Go deeper · the conceptual framework">
		<p>
			The <TermMark name="Conceptual framework">conceptual framework</TermMark> is the reasoning underneath
			GAAP — why these principles exist, not just what they say. It is what standard-setters use when
			a new kind of transaction does not fit an existing rule.
		</p>
	</Deeper>
</Reading>
