<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';

	const href = '/ch/5/learn/what-counts';
	setContext('href', href);
</script>

<div class="frame">
	<p class="max-w-[68ch] text-[1.15rem] leading-snug font-medium">
		Ownership decides what belongs in ending inventory — not who is holding it, or where it happens to
		be sitting.
	</p>
	<div class="mt-5 grid gap-4 sm:grid-cols-2">
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Count it</div>
			<p class="text-ink-2 mt-1">
				Goods we bought FOB shipping point, still in transit. Goods we sold FOB destination, still in
				transit. Our own goods out on consignment.
			</p>
		</div>
		<div class="border-rule-2 bg-paper border px-3 py-2 text-sm">
			<div class="eyebrow">Leave it out</div>
			<p class="text-ink-2 mt-1">
				Goods we bought FOB destination, still in transit. Goods we sold FOB shipping point, still in
				transit. Another company's goods we are holding on consignment.
			</p>
		</div>
	</div>
</div>

<Reading chapter={5} lo="C2" label="FOB terms and consignment">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Goods in transit">Goods in transit</TermMark> belong to whoever holds title under
			the shipping terms: FOB shipping point means the buyer owns them the moment they leave the
			seller's dock; FOB destination means the seller owns them until they arrive.
		</p>
		<p>
			<TermMark name="Consigned goods">Consigned goods</TermMark> never change hands in ownership terms.
			The <TermMark name="Consignor">consignor</TermMark> counts them no matter who is displaying them;
			the <TermMark name="Consignee">consignee</TermMark> never counts goods that are not its own.
		</p>
	</div>
</Reading>
