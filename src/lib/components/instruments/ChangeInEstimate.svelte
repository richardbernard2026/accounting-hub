<script lang="ts">
	/** Change the remaining life and revised salvage after year 2 and watch only the future years move. */
	import { fmt } from '$lib/ledger';
	import PinState from '../notes/PinState.svelte';

	let {
		chapter,
		href,
		yearsBefore,
		annualBefore,
		bookValueAfterYear2,
		defaultRemainingLife,
		defaultRevisedSalvage,
		revisedAnnualOf
	}: {
		chapter: number;
		href?: string;
		yearsBefore: number;
		annualBefore: number;
		bookValueAfterYear2: number;
		defaultRemainingLife: number;
		defaultRevisedSalvage: number;
		revisedAnnualOf: (remainingLife: number, revisedSalvage: number) => number;
	} = $props();

	let remainingLife = $state(defaultRemainingLife);
	let revisedSalvage = $state(defaultRevisedSalvage);
	let touched = $state(false);

	function setLife(v: number) {
		remainingLife = v;
		touched = true;
	}
	function setSalvage(v: number) {
		revisedSalvage = v;
		touched = true;
	}
	const revisedAnnual = $derived(revisedAnnualOf(remainingLife, revisedSalvage));
	const futureYears = $derived(Array.from({ length: remainingLife }, (_, i) => yearsBefore + i + 1));

	const sentence = $derived(
		`Revised to ${remainingLife} more years at ${fmt(revisedSalvage, { dollar: true })} salvage: ${fmt(revisedAnnual, { dollar: true })} a year from year ${yearsBefore + 1}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<div class="text-ink-2 text-sm">Book value after year {yearsBefore}: {fmt(bookValueAfterYear2, { dollar: true })}</div>
		<PinState {chapter} lo="A2" label="Change in estimate" {href} {sentence} dirty={touched} />
	</div>

	<div class="mt-4 grid gap-4 sm:grid-cols-2">
		<label class="text-sm">
			<span class="flex justify-between"><span>Remaining life</span><span class="num font-medium">{remainingLife} years</span></span>
			<input
				type="range"
				min="1"
				max="8"
				step="1"
				value={remainingLife}
				oninput={(e) => setLife(Number((e.target as HTMLInputElement).value))}
				class="mt-2 w-full"
			/>
		</label>
		<label class="text-sm">
			<span class="flex justify-between"><span>Revised salvage</span><span class="num font-medium">{fmt(revisedSalvage, { dollar: true })}</span></span>
			<input
				type="range"
				min="0"
				max="2000"
				step="100"
				value={revisedSalvage}
				oninput={(e) => setSalvage(Number((e.target as HTMLInputElement).value))}
				class="mt-2 w-full"
			/>
		</label>
	</div>

	<div class="mt-6 space-y-2">
		{#each Array.from({ length: yearsBefore }) as _, i (i)}
			<div class="flex items-center justify-between text-sm">
				<span>Year {i + 1} <span class="text-ink-3 text-xs">unchanged</span></span>
				<span class="num">{fmt(annualBefore, { dollar: true })}</span>
			</div>
		{/each}
		{#each futureYears as y (y)}
			<div class="flex items-center justify-between text-sm">
				<span>Year {y} <span class="text-ink-3 text-xs">revised</span></span>
				<span class="num font-medium">{fmt(revisedAnnual, { dollar: true })}</span>
			</div>
		{/each}
	</div>
</div>
