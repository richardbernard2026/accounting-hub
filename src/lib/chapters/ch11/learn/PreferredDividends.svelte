<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import PreferredDividendAllocatorInstrument from '../lab/PreferredDividendAllocatorInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch11';

	const href = '/ch/11/learn/preferred-dividends';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'preferred-dividend-allocator')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<PreferredDividendAllocatorInstrument {href} />
</div>

<Reading chapter={11} lo="A1" label="First in line, but only when declared">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Preferred stock">Preferred stock</TermMark> claims its stated dividend before common
			sees a cent.
			<TermMark name="Cumulative preferred stock">Cumulative preferred</TermMark> carries any missed year
			forward as a <TermMark name="Dividend in arrears">dividend in arrears</TermMark> — disclosed, not
			recorded, until the board actually declares a dividend to pay it.
		</p>
		<p>
			<TermMark name="Noncumulative preferred stock">Noncumulative preferred</TermMark> has no such
			memory: a year with no declaration is a year that preferred simply loses, with nothing carried
			forward to claim later.
		</p>
	</div>
</Reading>
