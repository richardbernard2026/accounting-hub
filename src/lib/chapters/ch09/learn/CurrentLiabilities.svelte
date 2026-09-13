<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';

	const href = '/ch/9/learn/current-liabilities';
	setContext('href', href);
</script>

<div class="frame">
	<p class="max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		Not every obligation is known with certainty. How sure you are decides how it is reported.
	</p>
	<div class="mt-5 grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Known</div>
			<p class="text-ink-2 mt-1">Amount and payee are certain — record it.</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Estimated</div>
			<p class="text-ink-2 mt-1">Certain to exist, amount is a best estimate — record it.</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Contingent</div>
			<p class="text-ink-2 mt-1">Depends on a future event — record, disclose, or nothing, by likelihood.</p>
		</div>
	</div>
</div>

<Reading chapter={9} lo="C1" label="Probable, possible, or remote">
	<div class="prose-col mt-8">
		<p>
			A <TermMark name="Contingent liability">contingent liability</TermMark> is judged by how likely
			it is to become real. Probable and estimable: record it as a liability. Reasonably possible but
			not probable: disclose it in the notes. Remote: nothing at all.
		</p>
		<p>
			The <TermMark name="Current portion of long-term debt">current portion of long-term debt</TermMark>
			is a reminder that classification is about timing, not just certainty — a loan due next year
			moves into <TermMark name="Current liabilities">current liabilities</TermMark>, even though the
			rest of it stays long-term.
		</p>
	</div>
</Reading>
