<script lang="ts">
	/**
	 * One gross-pay slider drives two parallel waterfalls: the employee side
	 * stepping down to net pay, and the employer side stepping up to the
	 * total cost of payroll — a separate number building on top of gross pay,
	 * not out of it.
	 */
	import { fmt } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	interface PayrollFigures {
		grossPay: number;
		socialSecurity: number;
		medicare: number;
		federalIncomeTax: number;
		medicalInsurance: number;
		netPay: number;
		employerSocialSecurity: number;
		employerMedicare: number;
		futa: number;
		suta: number;
		employerTaxes: number;
		totalCost: number;
	}

	let {
		chapter,
		href,
		defaultGrossPay,
		payrollAt
	}: {
		chapter: number;
		href?: string;
		defaultGrossPay: number;
		payrollAt: (grossPay: number) => PayrollFigures;
	} = $props();

	let grossPay = $state(defaultGrossPay);
	let touched = $state(false);

	function setGrossPay(v: number) {
		grossPay = v;
		touched = true;
	}
	const p = $derived(payrollAt(grossPay));
	const sentence = $derived(
		`Gross pay ${fmt(grossPay, { dollar: true })}: net pay ${fmt(p.netPay, { dollar: true })}, employer payroll taxes ${fmt(p.employerTaxes, { dollar: true })}, total cost ${fmt(p.totalCost, { dollar: true })}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<label class="flex items-center gap-2 text-sm" for="gross-pay-slider">
			<span>Gross pay</span>
			<span class="num font-medium">{fmt(grossPay, { dollar: true })}</span>
		</label>
		<PinState {chapter} lo="P1" label="Payroll waterfall" {href} {sentence} dirty={touched} />
	</div>
	<input
		id="gross-pay-slider"
		type="range"
		min="1000"
		max="20000"
		step="500"
		value={grossPay}
		oninput={(e) => setGrossPay(Number((e.target as HTMLInputElement).value))}
		class="mt-2 w-full"
	/>

	<div class="mt-6 grid gap-6 sm:grid-cols-2">
		<div>
			<div class="kicker mb-2">Employee side</div>
			<table class="ledger text-sm">
				<tbody>
					<tr><td>Gross pay</td><td class="num text-right">{fmt(p.grossPay, { dollar: true })}</td></tr>
					<tr class="text-ink-2"><td>Social Security (6.2%)</td><td class="num text-right">({fmt(p.socialSecurity, { dollar: true })})</td></tr>
					<tr class="text-ink-2"><td>Medicare (1.45%)</td><td class="num text-right">({fmt(p.medicare, { dollar: true })})</td></tr>
					<tr class="text-ink-2"><td>Federal income tax withheld</td><td class="num text-right">({fmt(p.federalIncomeTax, { dollar: true })})</td></tr>
					<tr class="text-ink-2"><td>Medical insurance withheld</td><td class="num text-right">({fmt(p.medicalInsurance, { dollar: true })})</td></tr>
					<tr class="border-rule-2 border-t font-medium"><td>Net pay</td><td class="num text-right">{fmt(p.netPay, { dollar: true })}</td></tr>
				</tbody>
			</table>
		</div>
		<div>
			<div class="kicker mb-2">Employer side</div>
			<table class="ledger text-sm">
				<tbody>
					<tr><td>Gross pay</td><td class="num text-right">{fmt(p.grossPay, { dollar: true })}</td></tr>
					<tr class="text-ink-2"><td>Social Security (6.2%)</td><td class="num text-right">{fmt(p.employerSocialSecurity, { dollar: true })}</td></tr>
					<tr class="text-ink-2"><td>Medicare (1.45%)</td><td class="num text-right">{fmt(p.employerMedicare, { dollar: true })}</td></tr>
					<tr class="text-ink-2"><td>FUTA (0.6%)</td><td class="num text-right">{fmt(p.futa, { dollar: true })}</td></tr>
					<tr class="text-ink-2"><td>SUTA (5.4%)</td><td class="num text-right">{fmt(p.suta, { dollar: true })}</td></tr>
					<tr class="border-rule-2 border-t font-medium"><td>Total cost of payroll</td><td class="num text-right">{fmt(p.totalCost, { dollar: true })}</td></tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
