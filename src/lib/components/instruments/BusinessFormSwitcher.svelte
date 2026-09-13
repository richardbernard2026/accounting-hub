<script lang="ts">
	/** Switch the business form and watch owner liability and taxation change. */
	import PinState from '../notes/PinState.svelte';

	interface BusinessForm {
		id: string;
		name: string;
		ownerLiability: 'Unlimited' | 'Limited';
		taxedSeparately: boolean;
		sharesTransferFreely: boolean;
	}
	let {
		chapter,
		href,
		forms
	}: { chapter: number; href?: string; forms: BusinessForm[] } = $props();

	let idx = $state(0);
	let touched = $state(false);
	const form = $derived(forms[idx]);

	function select(i: number) {
		idx = i;
		touched = true;
	}
	const sentence = $derived(
		`${form.name} — ${form.ownerLiability.toLowerCase()} owner liability, ${form.taxedSeparately ? 'taxed as a business' : 'not taxed separately'}, shares ${form.sharesTransferFreely ? 'transfer freely' : 'do not transfer freely'}.`
	);
</script>

<div>
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<div class="flex flex-wrap gap-1.5">
			{#each forms as f, i (f.id)}
				<button
					class="border px-2.5 py-1 text-sm transition-colors {i === idx
						? 'border-ink bg-ink text-paper'
						: 'border-rule hover:bg-paper-2'}"
					onclick={() => select(i)}
					aria-pressed={i === idx}>{f.name}</button
				>
			{/each}
		</div>
		<PinState {chapter} lo="C3" label="Business form switcher" {href} {sentence} dirty={touched} />
	</div>

	<table class="ledger mt-5 text-sm">
		<tbody>
			<tr>
				<th class="w-56">Owner liability</th>
				<td class={form.ownerLiability === 'Unlimited' ? 'text-warn font-medium' : 'text-ok font-medium'}
					>{form.ownerLiability}</td
				>
			</tr>
			<tr>
				<th>Business taxed separately</th>
				<td class={form.taxedSeparately ? 'font-medium' : 'text-ink-2'}
					>{form.taxedSeparately ? 'Yes' : 'No'}</td
				>
			</tr>
			<tr>
				<th>Ownership easily transferred</th>
				<td class={form.sharesTransferFreely ? 'font-medium' : 'text-ink-2'}
					>{form.sharesTransferFreely ? 'Yes' : 'No'}</td
				>
			</tr>
		</tbody>
	</table>
</div>
