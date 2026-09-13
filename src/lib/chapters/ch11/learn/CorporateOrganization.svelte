<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';

	const href = '/ch/11/learn/corporate-organization';
	setContext('href', href);
</script>

<div class="frame">
	<p class="max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		Three counts of the same stock, each answering a different question.
	</p>
	<div class="mt-5 grid gap-4 sm:grid-cols-3">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Authorized</div>
			<p class="text-ink-2 mt-1">The most the charter allows the corporation to ever issue.</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Issued</div>
			<p class="text-ink-2 mt-1">Shares actually sold or distributed so far, treasury shares included.</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Outstanding</div>
			<p class="text-ink-2 mt-1">Issued shares still in stockholders' hands — issued minus treasury.</p>
		</div>
	</div>
</div>

<Reading chapter={11} lo="C1" label="A separate legal life">
	<div class="prose-col mt-8">
		<p>
			A <TermMark name="Corporation">corporation</TermMark> exists apart from its owners: it can own
			property, sue and be sued, and continue after any single
			<TermMark name="Stockholders (shareholders)">stockholder</TermMark> sells out or dies. Owners hold
			a <TermMark name="Stock certificate">stock certificate</TermMark> and can vote in person or by
			<TermMark name="Proxy">proxy</TermMark>.
		</p>
		<p>
			A <TermMark name="Preemptive right">preemptive right</TermMark>, where granted, lets an existing
			stockholder buy enough of a new issue to keep their percentage ownership from shrinking.
		</p>
	</div>
</Reading>
