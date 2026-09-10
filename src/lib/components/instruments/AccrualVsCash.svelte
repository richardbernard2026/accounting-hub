<script lang="ts">
	/** Wild Exhibit 3.2: the $2,400 policy under the cash basis and the accrual basis, by year. */
	import { fmt } from '$lib/ledger';
	import { insuranceByYear } from '$lib/content/chapters/ch03';
	const years = insuranceByYear.map((r) => ({ y: r.year, cash: r.cash, accrual: r.accrual }));
	const max = Math.max(...years.map((r) => r.cash));
</script>

<figure class="border-rule bg-paper-2/40 border p-4">
	<figcaption class="eyebrow">
		Wild Exhibit 3.2 · insurance expense for a $2,400, 24-month policy
	</figcaption>
	<div class="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
		{#each years as r (r.y)}
			<div class="num text-ink-2 pt-1">{r.y}</div>
			<div class="space-y-1">
				<div class="flex items-center gap-2">
					<div class="bg-ink-3 h-3" style="width:{(r.cash / max) * 100}%"></div>
					<span class="num text-ink-3 text-xs"
						>{r.cash ? fmt(r.cash, { dollar: true }) : '0'} cash basis</span
					>
				</div>
				<div class="flex items-center gap-2">
					<div class="bg-debit h-3" style="width:{(r.accrual / max) * 100}%"></div>
					<span class="num dr text-xs">{fmt(r.accrual, { dollar: true })} accrual basis</span>
				</div>
			</div>
		{/each}
	</div>
	<p class="text-ink-2 mt-3 text-sm">
		Same $2,400. The cash basis charges it all to 2025, the year the check was written. The accrual
		basis charges each year for the months of coverage it used: 1, 12, and 11.
	</p>
</figure>
