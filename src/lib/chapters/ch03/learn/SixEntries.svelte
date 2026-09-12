<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import Mistake from '$lib/components/prose/Mistake.svelte';
	import Deeper from '$lib/components/prose/Deeper.svelte';
	import JournalEntry from '$lib/components/ledger/JournalEntry.svelte';
	import { januaryFollowUps, accountName } from '$lib/content/chapters/fastforward';
	const href = '/ch/3/learn/entries';
	setContext('href', href);
</script>

<div class="frame">
	<div class="kicker mb-4">Jan 9–10 · the two accruals close out</div>
	<div class="grid gap-4 sm:grid-cols-2">
		{#each januaryFollowUps as e (e.id)}
			<div class="border-rule-2 bg-paper border px-3 py-2">
				<JournalEntry entry={e} {accountName} />
			</div>
		{/each}
	</div>
</div>

<Reading chapter={3} lo="P1" label="The six entries">
	<div class="prose-col mt-8">
		<p>
			On January 9, FastForward pays the employee $700. Three of those days were already recorded as
			a payable on December 31 — the entry above splits the check: $210 clears the payable, $490 is
			January's own expense. January 10 works the same way in reverse: the $2,700 collected clears
			the $1,800 receivable, and the remaining $900 is January's revenue. Accruals are deferrals run
			backward — recorded first, settled in cash later.
		</p>
		<p>
			<TermMark name="Depreciation">Depreciation</TermMark> deserves a second look. Equipment cost $26,000
			and should last 48 months with an $8,000 salvage value, so
			<TermMark name="Straight-line depreciation">straight-line depreciation</TermMark> is $375 a month.
			The credit never reduces Equipment — it goes to
			<TermMark name="Accumulated depreciation">Accumulated Depreciation</TermMark>, a contra
			account, so the original cost stays visible and
			<TermMark name="Book value">book value</TermMark> is cost minus what has accumulated.
		</p>
	</div>
	<Mistake>
		Crediting Equipment for the $375. The asset's cost stays on the books for its whole life; the
		wear goes to Accumulated Depreciation, and the balance sheet shows both.
	</Mistake>
	<Deeper label="Go deeper · plant assets and estimates">
		<p>
			Equipment, buildings, and vehicles are <TermMark name="Plant assets">plant assets</TermMark>:
			long-term tangible assets used to produce and sell. Land is a plant asset that is never
			depreciated. Useful life and salvage value are estimates made at purchase; if they turn out
			wrong, the remaining cost is spread over the remaining life going forward, not corrected
			retroactively.
		</p>
	</Deeper>
</Reading>
