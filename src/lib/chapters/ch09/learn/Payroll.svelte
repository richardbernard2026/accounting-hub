<script lang="ts">
	import { setContext } from 'svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import TermMark from '$lib/components/notes/TermMark.svelte';
	import InstrumentInstruction from '$lib/components/chapter/InstrumentInstruction.svelte';
	import PayrollWaterfallInstrument from '../lab/PayrollWaterfallInstrument.svelte';
	import { instruments } from '$lib/content/chapters/ch09';

	const href = '/ch/9/learn/payroll';
	setContext('href', href);
	const instruction = instruments.find((i) => i.id === 'payroll-waterfall')!.instruction;
</script>

<div class="frame">
	<InstrumentInstruction text={instruction} />
	<PayrollWaterfallInstrument {href} />
</div>

<Reading chapter={9} lo="P1" label="Two payrolls, from the same $10,000">
	<div class="prose-col mt-8">
		<p>
			<TermMark name="Gross pay">Gross pay</TermMark> is what an employee earns.
			<TermMark name="Payroll deductions (withholdings)">Withholdings</TermMark> —
			<TermMark name="Social Security taxes">Social Security</TermMark>,
			<TermMark name="Medicare taxes">Medicare</TermMark>,
			<TermMark name="Federal income taxes withheld">federal income tax</TermMark>, insurance —
			come out of it to leave <TermMark name="Net pay">net pay</TermMark>, the number on the check.
		</p>
		<p>
			The employer pays a matching share of <TermMark name="Federal Insurance Contributions Act (FICA) taxes"
				>FICA</TermMark
			>, plus <TermMark name="Federal Unemployment Tax Act (FUTA)">FUTA</TermMark> and
			<TermMark name="State Unemployment Tax Act (SUTA)">SUTA</TermMark> — taxes the employee never
			sees, because they are never withheld from anyone's pay. The true cost of a $10,000 payroll is
			higher than $10,000.
		</p>
	</div>
</Reading>
