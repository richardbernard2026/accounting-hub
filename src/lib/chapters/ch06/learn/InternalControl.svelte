<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';

	const href = '/ch/6/learn/internal-control';
	setContext('href', href);
</script>

<div class="frame">
	<p class="max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		Fraud almost never happens alone. It usually needs all three sides of one triangle.
	</p>
	<div class="mt-5 grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Opportunity</div>
			<p class="text-ink-2 mt-1">A gap in the controls that makes it possible.</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Pressure</div>
			<p class="text-ink-2 mt-1">A personal or financial reason to do it.</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Rationalization</div>
			<p class="text-ink-2 mt-1">A way to justify it, even temporarily.</p>
		</div>
	</div>
</div>

<Reading chapter={6} lo="C1" label="What internal control is for">
	<div class="prose-col mt-8">
		<p>
			An <TermMark name="Internal control system">internal control system</TermMark> exists to safeguard
			assets, keep the accounting records reliable, and run the business efficiently. It cannot promise
			zero fraud — it can only close off opportunity, which is the one side of the triangle a company
			actually controls.
		</p>
		<p>
			<TermMark name="Sarbanes-Oxley Act (SOX)">Sarbanes-Oxley</TermMark> requires public companies to
			assess and report on their own controls, and requires their auditors to test that assessment
			independently.
		</p>
	</div>
</Reading>
