<script lang="ts">
	import SiteHeader from '$lib/components/ui/SiteHeader.svelte';
	import LoRail from '$lib/components/ui/LoRail.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import Reading from '$lib/components/notes/Reading.svelte';
	import NotesDrawer from '$lib/components/notes/NotesDrawer.svelte';
	import TermAudit from '$lib/components/notes/TermAudit.svelte';
	import AdjustmentTimeline from '$lib/components/instruments/AdjustmentTimeline.svelte';
	import AccrualVsCash from '$lib/components/instruments/AccrualVsCash.svelte';
	import Worksheet from '$lib/components/instruments/Worksheet.svelte';
	import StatementLinks from '$lib/components/instruments/StatementLinks.svelte';
	import ProfitMargin from '$lib/components/instruments/ProfitMargin.svelte';
	import PrepaidAlternatives from '$lib/components/instruments/PrepaidAlternatives.svelte';
	import SortDrill from '$lib/components/drills/SortDrill.svelte';
	import EntryDrill from '$lib/components/drills/EntryDrill.svelte';
	import QuickCheck from '$lib/components/drills/QuickCheck.svelte';
	import JournalEntry from '$lib/components/ledger/JournalEntry.svelte';
	import {
		adjusted,
		chapter,
		lanes,
		objectives,
		terms,
		quickChecks,
		unadjusted,
		unadjustedTB,
		adjustedTB,
		fs
	} from '$lib/content/chapters/ch03';
	import {
		accounts,
		accountName,
		adjustments,
		januaryFollowUps
	} from '$lib/content/chapters/fastforward';
	import { fmt } from '$lib/ledger';

	const N = chapter.meta.number;
	const bal = (m: Map<string, { balance: number }>, n: string) => fmt(m.get(n)!.balance);
	const u = (n: string) => bal(unadjusted, n);
	const j = (n: string) => bal(adjusted, n);
	let linkKind = $state<'prepaid' | 'unearned' | 'accrued-expense' | 'accrued-revenue'>('prepaid');
	const LINKS = {
		prepaid: {
			name: 'Prepaid expenses',
			bs: 'Asset overstated',
			is: 'Expense understated',
			entry: 'Dr. Expense · Cr. Asset (or contra asset)',
			ni: 'Net income overstated',
			ex: `Skip (a): Prepaid Insurance stays at ${u('128')} instead of ${j('128')}; Insurance Expense shows ${u('637')} instead of ${j('637')}.`
		},
		unearned: {
			name: 'Unearned revenues',
			bs: 'Liability overstated',
			is: 'Revenue understated',
			entry: 'Dr. Liability · Cr. Revenue',
			ni: 'Net income understated',
			ex: `Skip (d): Unearned Consulting Revenue stays at ${u('236')} instead of ${j('236')}; Consulting Revenue is short by ${fmt(adjusted.get('236')!.balance * -1 + unadjusted.get('236')!.balance)}.`
		},
		'accrued-expense': {
			name: 'Accrued expenses',
			bs: 'Liability understated',
			is: 'Expense understated',
			entry: 'Dr. Expense · Cr. Liability',
			ni: 'Net income overstated',
			ex: `Skip (e): Salaries Payable shows ${u('209')} instead of ${j('209')}; Salaries Expense shows ${u('622')} instead of ${j('622')}.`
		},
		'accrued-revenue': {
			name: 'Accrued revenues',
			bs: 'Asset understated',
			is: 'Revenue understated',
			entry: 'Dr. Asset · Cr. Revenue',
			ni: 'Net income understated',
			ex: `Skip (f): Accounts Receivable shows ${u('106')} instead of ${j('106')}; Consulting Revenue is short by ${j('106')}.`
		}
	} as const;
</script>

<svelte:head>
	<title>Chapter 3 · Adjusting Accounts for Financial Statements</title>
	<meta
		name="description"
		content="Wild, Financial and Managerial Accounting, Chapter 3: an interactive adjustment timeline, the six FastForward adjusting entries, adjusted trial balance, and statements."
	/>
</svelte:head>

<SiteHeader chapter={N} />

<main class="mx-auto max-w-[1280px] px-4 pb-24 sm:px-6">
	<!-- Masthead: compact so the instrument is the first thing on screen -->
	<div class="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 pt-6 pb-4">
		<div>
			<div class="eyebrow">Chapter {N} · Financial</div>
			<h1 class="mt-1 text-2xl leading-[1.05] sm:text-[2.75rem]">{chapter.meta.title}</h1>
		</div>
		<p class="text-ink-2 max-w-md text-sm sm:text-right">
			FastForward’s December books are complete and still wrong. Six entries at Dec 31 fix them.
			Move the period end and watch each one come due.
		</p>
	</div>

	<AdjustmentTimeline
		chapter={N}
		{lanes}
		entries={adjustments}
		balances={unadjusted}
		{accountName}
	/>

	<div class="mt-8 grid gap-8 lg:grid-cols-[200px_minmax(0,1fr)]">
		<div class="lg:sticky lg:top-4 lg:self-start">
			<LoRail {objectives} />
		</div>

		<div class="min-w-0">
			<!-- ================= C1 ================= -->
			<Section id="C1" code="C1" kind="conceptual" title="Periodic reporting and the accrual basis">
				<div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(300px,380px)]">
					<Reading chapter={N} lo="C1" label="Reading" {terms}>
						<div class="prose-col">
							<p>
								Businesses run continuously, but statements have to stop the clock. The <em
									>time period assumption</em
								> says a company’s life can be cut into accounting periods, a month, a quarter, a year,
								and reported on. Annual statements cover a fiscal year, which is any twelve consecutive
								months; many companies use the calendar year, and retailers often pick a natural business
								year that ends after the holiday rush when inventories are lowest. Statements inside the
								year are interim statements.
							</p>
							<p>
								Cutting time into periods creates the whole problem of this chapter. Under cash
								basis accounting, revenue is recorded when cash is received and expense when cash is
								paid, which tells you about the checkbook, not about what the business did that
								period. GAAP requires accrual basis accounting: revenue is recorded when goods or
								services are delivered, and expenses are recorded when they are incurred, whether or
								not cash has moved yet.
							</p>
							<p>
								Two principles govern the timing. The revenue recognition principle: record revenue
								when services or products are provided to customers, at the amount expected to be
								received. The expense recognition (matching) principle: record in the same period
								the expenses that helped produce that revenue. Adjusting entries exist to enforce
								these two rules at every period end.
							</p>
						</div>
					</Reading>
					<AccrualVsCash />
				</div>
			</Section>

			<!-- ================= C2 ================= -->
			<Section id="C2" code="C2" kind="conceptual" title="The framework for adjustments">
				<div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(300px,380px)]">
					<Reading chapter={N} lo="C2" label="Reading" {terms}>
						<div class="prose-col">
							<p>
								An adjusting entry is needed whenever cash moves in a different period from the
								revenue or expense it belongs to. Wild sorts every case into a two-by-two grid
								(Exhibit 3.3). If cash moved <em>first</em>, the entry is a deferral: a prepaid
								expense that must become expense as it is used up, or an unearned revenue that must
								become revenue as it is earned. If cash moves <em>later</em>, the entry is an
								accrual: an accrued expense that has been incurred but not paid or recorded, or an
								accrued revenue that has been earned but not received or recorded.
							</p>
							<p>
								Three things are true of every adjusting entry. It affects at least one income
								statement account and at least one balance sheet account. It never touches Cash,
								because the cash part of the story either already happened or has not happened yet.
								And it is dated the last day of the period.
							</p>
						</div>
					</Reading>
					<div class="border-rule bg-paper-2/40 border p-4 text-sm">
						<div class="eyebrow">Wild Exhibit 3.3 · framework</div>
						<div class="bg-rule mt-3 grid grid-cols-[auto_1fr_1fr] gap-px">
							<div class="bg-paper-2 p-2"></div>
							<div class="bg-paper-2 p-2 text-center text-xs font-medium">Expense side</div>
							<div class="bg-paper-2 p-2 text-center text-xs font-medium">Revenue side</div>
							<div class="bg-paper-2 p-2 text-xs">
								<div class="font-medium">Deferral</div>
								<div class="text-ink-3">cash first</div>
							</div>
							<div class="bg-paper p-2">
								<div class="dr font-medium">Prepaid expenses</div>
								<div class="text-ink-2 text-xs">incl. depreciation · (a) (b) (c)</div>
							</div>
							<div class="bg-paper p-2">
								<div class="cr font-medium">Unearned revenues</div>
								<div class="text-ink-2 text-xs">(d)</div>
							</div>
							<div class="bg-paper-2 p-2 text-xs">
								<div class="font-medium">Accrual</div>
								<div class="text-ink-3">cash later</div>
							</div>
							<div class="bg-paper p-2">
								<div class="dr font-medium">Accrued expenses</div>
								<div class="text-ink-2 text-xs">(e), accrued interest</div>
							</div>
							<div class="bg-paper p-2">
								<div class="cr font-medium">Accrued revenues</div>
								<div class="text-ink-2 text-xs">(f), accrued interest earned</div>
							</div>
						</div>
					</div>
				</div>
				<div class="mt-6"><SortDrill chapter={N} /></div>
			</Section>

			<!-- ================= P1 ================= -->
			<Section id="P1" code="P1" kind="procedural" title="The six adjusting entries">
				<Reading chapter={N} lo="P1" label="Reading" {terms}>
					<div class="prose-col">
						<p>
							The timeline at the top walks all six. Two of them deserve a second look because
							students lose points on them.
						</p>
						<p>
							<em>Depreciation</em> is a prepaid expense that lasts years. FastForward’s equipment cost
							$26,000, should serve 48 months, and should sell for $8,000 afterward, so straight-line
							depreciation is ($26,000 − $8,000) ÷ 48 = $375 a month. The credit does not reduce Equipment.
							It goes to Accumulated Depreciation—Equipment, a contra account with a credit balance that
							is subtracted from Equipment on the balance sheet. Cost stays visible; book value is cost
							less accumulated depreciation, $25,625 after one month.
						</p>
						<p>
							<em>Accruals reverse the order</em>. The employee earned $210 in the last three
							workdays of December and was paid nothing, so the entry is Salaries Expense and
							Salaries Payable. When the next paycheck goes out on January 9 for $700, part of it
							pays off December’s liability and only the rest is January expense:
						</p>
					</div>
				</Reading>
				<div class="mt-3 grid gap-4 md:grid-cols-2">
					{#each januaryFollowUps as e (e.id)}
						<div class="border-rule-2 bg-paper-2/40 border px-3 py-2">
							<JournalEntry entry={e} {accountName} />
						</div>
					{/each}
				</div>
				<div class="mt-6">
					<EntryDrill
						chapter={N}
						{lanes}
						entries={adjustments}
						{accounts}
						{accountName}
						lift={{ from: unadjustedTB.totalDr, to: adjustedTB.totalDr }}
					/>
				</div>
			</Section>

			<!-- ================= A1 ================= -->
			<Section id="A1" code="A1" kind="analytical" title="What goes wrong when you skip one">
				<div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
					<Reading chapter={N} lo="A1" label="Reading" {terms}>
						<div class="prose-col">
							<p>
								Each adjustment corrects one balance sheet account and one income statement account,
								so skipping it leaves both wrong in a predictable direction. Deferrals left
								unadjusted overstate an asset or a liability. Accruals left unadjusted understate an
								asset or a liability. And because every adjustment carries revenue or expense, each
								miss flows straight into net income and, from there, into equity.
							</p>
							<p>
								Pick a type on the right and read the pattern. On an exam, the fast route is to ask
								which side of the equation is wrong before adjusting, and in which direction.
							</p>
						</div>
					</Reading>
					<div class="border-rule bg-paper-2/40 border p-4 text-sm">
						<div class="flex flex-wrap gap-1.5">
							{#each Object.entries(LINKS) as [k, v] (k)}
								<button
									class="border px-2.5 py-1 text-xs transition-colors {linkKind === k
										? 'border-ink bg-ink text-paper'
										: 'border-rule hover:bg-paper-3'}"
									onclick={() => (linkKind = k as typeof linkKind)}
									aria-pressed={linkKind === k}>{v.name}</button
								>
							{/each}
						</div>
						<table class="ledger mt-3">
							<tbody>
								<tr><th class="w-36">Before adjusting</th><td>{LINKS[linkKind].bs}</td></tr>
								<tr><th></th><td>{LINKS[linkKind].is}</td></tr>
								<tr><th>Adjusting entry</th><td>{LINKS[linkKind].entry}</td></tr>
								<tr><th>If skipped</th><td>{LINKS[linkKind].ni}, equity likewise</td></tr>
							</tbody>
						</table>
						<Reading chapter={N} lo="A1" label="Skip a step" {terms}
							><p class="border-rule-2 text-ink-2 mt-3 border-t pt-3">
								{LINKS[linkKind].ex}
							</p></Reading
						>
					</div>
				</div>
			</Section>

			<!-- ================= P2 ================= -->
			<Section id="P2" code="P2" kind="procedural" title="The adjusted trial balance">
				<Reading chapter={N} lo="P2" label="Reading" {terms}>
					<div class="prose-col">
						<p>
							An unadjusted trial balance is the list of accounts and balances before adjustments.
							Post the six entries and list the accounts again: that is the adjusted trial balance,
							the sheet the statements are prepared from. Wild shows the two side by side with the
							adjustments between them, keyed by letter, and that layout is worth copying on scratch
							paper during an exam.
						</p>
					</div>
				</Reading>
				<div class="mt-5">
					<Worksheet
						unadjusted={unadjustedTB}
						adjusted={adjustedTB}
						{adjustments}
						{accounts}
						{accountName}
					/>
				</div>
			</Section>

			<!-- ================= P3 ================= -->
			<Section
				id="P3"
				code="P3"
				kind="procedural"
				title="Statements from the adjusted trial balance"
			>
				<Reading chapter={N} lo="P3" label="Reading" {terms}>
					<div class="prose-col">
						<p>
							Prepare them in order, because each one feeds the next. The income statement takes the
							revenue and expense accounts and produces net income. The statement of retained
							earnings takes that net income, subtracts dividends, and produces ending retained
							earnings. The balance sheet takes the asset and liability accounts plus common stock
							and that ending retained earnings, and it must balance: assets equal liabilities plus
							equity.
						</p>
						<p>
							Presentation rules from Chapter 2 still apply: dollar signs on the first and last
							amount of a column, a single rule above a subtotal, a double rule under a final total.
						</p>
					</div>
				</Reading>
				<div class="mt-5"><StatementLinks tb={adjustedTB} {fs} /></div>
			</Section>

			<!-- ================= A2 ================= -->
			<Section id="A2" code="A2" kind="analytical" title="Profit margin">
				<div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,460px)]">
					<Reading chapter={N} lo="A2" label="Reading" {terms}>
						<div class="prose-col">
							<p>
								Profit margin is net income divided by net sales: the share of each sales dollar
								that survives all expenses. FastForward earned {fmt(fs.income.netIncome, {
									dollar: true
								})} on {fmt(fs.income.totalRevenues, { dollar: true })} of revenue, a margin of {(
									(fs.income.netIncome / fs.income.totalRevenues) *
									100
								).toFixed(1)}%, which is high because a one-person consulting startup has almost no
								cost of goods. Compare margins within an industry and over time, not across
								unrelated businesses.
							</p>
						</div>
					</Reading>
					<ProfitMargin
						chapter={N}
						netIncome={fs.income.netIncome}
						netSales={fs.income.totalRevenues}
					/>
				</div>
			</Section>

			<!-- ================= P4 ================= -->
			<Section id="P4" code="P4" kind="procedural" title="Appendix 3A: Alternatives for prepaids">
				<Reading chapter={N} lo="P4" label="Reading" {terms}>
					<div class="prose-col">
						<p>
							Some companies record a prepayment as an expense the day it is paid, and cash received
							in advance as revenue the day it arrives. That is allowed, as long as the year-end
							adjustment moves the unexpired or unearned portion back onto the balance sheet. The
							adjusting entry looks different; the ending balances are identical.
						</p>
					</div>
				</Reading>
				<div class="mt-5"><PrepaidAlternatives chapter={N} {accountName} /></div>
			</Section>

			<!-- ================= Close ================= -->
			<section id="check" class="border-rule scroll-mt-20 border-t pt-6 pb-10">
				<div class="eyebrow">Before you leave</div>
				<h2 class="mt-2 text-xl sm:text-[1.9rem]">Check yourself, then check your notes</h2>
				<div class="mt-5 grid gap-6 xl:grid-cols-2">
					<QuickCheck chapter={N} items={quickChecks} />
					<TermAudit chapter={N} {terms} />
				</div>
			</section>

			<footer class="border-rule text-ink-3 border-t pt-4 text-xs">
				<p>
					Aligned to Wild, <em>Financial and Managerial Accounting</em>, 2025 release, Chapter 3
					(C1, C2, A1, A2, P1–P4). FastForward figures reproduce the textbook: unadjusted trial
					balance {fmt(unadjustedTB.totalDr, { dollar: true })}, adjusted {fmt(adjustedTB.totalDr, {
						dollar: true
					})}, net income {fmt(fs.income.netIncome, { dollar: true })}. Independent study aid, not
					affiliated with McGraw Hill.
				</p>
			</footer>
		</div>
	</div>
</main>

<NotesDrawer chapter={N} title={chapter.meta.title} />
