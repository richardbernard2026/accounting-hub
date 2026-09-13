<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import BusinessFormSwitcherInstrument from '../lab/BusinessFormSwitcherInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch01';
	const href = '/ch/1/learn/forms';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'business-form-switcher')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<BusinessFormSwitcherInstrument {href} />
</div>

<Reading chapter={1} lo="C3" label="Choosing a business form">
	<div class="prose-col mt-8">
		<p>
			A <TermMark name="Sole proprietorship">sole proprietorship</TermMark> and a
			<TermMark name="Partnership">partnership</TermMark> are the simplest forms to start, but their owners
			carry unlimited personal liability for the business's debts. A
			<TermMark name="Corporation">corporation</TermMark> is legally separate from its owners, so its
			shareholders risk only what they invested.
		</p>
		<p>
			FastForward is a corporation: Chas Taylor's $30,000 buys common stock, not personal ownership
			of the business's assets. That separation is also why a corporation's income can be taxed
			twice — once at the business, once again when profits reach shareholders as dividends.
		</p>
	</div>
</Reading>
