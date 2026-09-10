<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import SiteHeader from '$lib/components/ui/SiteHeader.svelte';
	import Stop from '$lib/components/stops/Stop.svelte';
	import ProgressRail from '$lib/components/stops/ProgressRail.svelte';
	import Deeper from '$lib/components/stops/Deeper.svelte';
	import Mistake from '$lib/components/stops/Mistake.svelte';
	import TermMark from '$lib/components/stops/TermMark.svelte';
	import DebitCreditMnemonic from '$lib/components/stops/DebitCreditMnemonic.svelte';
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
	import RetrievalDeck from '$lib/components/recall/RetrievalDeck.svelte';
	import JournalEntry from '$lib/components/ledger/JournalEntry.svelte';
	import {
		chapter,
		lanes,
		objectives,
		terms,
		quickChecks,
		classifications,
		entryCards,
		ADJUSTMENT_KINDS,
		unadjusted,
		adjusted,
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
	import { cardsFor } from '$lib/recall/cards';
	import { recall } from '$lib/recall/store.svelte';
	import { fmt } from '$lib/ledger';

	const N = chapter.meta.number;
	setContext('chapter', N);
	setContext('terms', terms);
	const cards = cardsFor(chapter);
	onMount(() => recall.visit(N));

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
			ex: `Skip (d): Unearned Consulting Revenue stays at ${u('236')} instead of ${j('236')}; Consulting Revenue is short by ${fmt(unadjusted.get('236')!.balance - adjusted.get('236')!.balance)}.`
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
	const subtitles = Object.fromEntries(ADJUSTMENT_KINDS.map((k) => [k.id, k.sub]));
	const entryTakeaway = `FastForward’s six adjustments at Dec 31: ${adjustments
		.map((e) => {
			const d = e.lines.find((l) => l.dr)!;
			const c = e.lines.find((l) => l.cr)!;
			return `(${e.id}) ${accountName(d.acct)} ${fmt(d.dr!)} / ${accountName(c.acct)} ${fmt(c.cr!)}`;
		})
		.join(
			'; '
		)}. Trial balance totals move from ${fmt(unadjustedTB.totalDr)} to ${fmt(adjustedTB.totalDr)}.`;

	const stops = [
		{ id: 's01', lo: 'C2', kind: 'instrument', title: 'The adjustment timeline' },
		{ id: 's02', lo: 'C1', kind: 'prose', title: 'Periods, and why the books stop being right' },
		{ id: 's03', lo: 'C1', kind: 'instrument', title: 'Same $2,400, three different years' },
		{ id: 's04', lo: 'C2', kind: 'prose', title: 'Cash first, or cash later' },
		{ id: 's05', lo: 'C2', kind: 'mnemonic', title: 'Two hooks to hang it on' },
		{ id: 's06', lo: 'C2', kind: 'drill', title: 'Which kind of adjustment?' },
		{ id: 's07', lo: 'P1', kind: 'prose', title: 'Depreciation, and the contra account' },
		{ id: 's08', lo: 'P1', kind: 'prose', title: 'Accruals reverse the order' },
		{ id: 's09', lo: 'P1', kind: 'drill', title: 'Journalize the six yourself' },
		{ id: 's10', lo: 'A1', kind: 'instrument', title: 'What goes wrong when you skip one' },
		{ id: 's11', lo: 'P2', kind: 'instrument', title: 'From unadjusted to adjusted' },
		{ id: 's12', lo: 'P3', kind: 'instrument', title: 'Where every balance lands' },
		{ id: 's13', lo: 'A2', kind: 'instrument', title: 'Profit margin' },
		{ id: 's14', lo: 'P4', kind: 'instrument', title: 'Two roads to the same balance' },
		{ id: 's15', lo: 'Check', kind: 'audit', title: 'Seven questions, one pass' },
		{ id: 's16', lo: 'Recall', kind: 'retrieval', title: 'The recall pass' },
		{ id: 's17', lo: 'Notes', kind: 'audit', title: 'Terms you have not written down' }
	] as const;
	const railObjectives = [
		...objectives,
		{ code: 'Check', kind: 'analytical', text: 'Quick check', short: 'Quick check' },
		{ code: 'Recall', kind: 'analytical', text: 'Retrieval deck', short: 'Retrieval deck' },
		{ code: 'Notes', kind: 'analytical', text: 'Notes audit', short: 'Notes audit' }
	] as typeof objectives;
</script>

<svelte:head>
	<title>Chapter 3 · Adjusting Accounts for Financial Statements</title>
	<meta
		name="description"
		content="Wild, Financial and Managerial Accounting, Chapter 3: an interactive adjustment timeline, the six FastForward adjusting entries, adjusted trial balance, statements, and a recall pass."
	/>
</svelte:head>

<SiteHeader chapter={N} />
<ProgressRail stops={[...stops]} objectives={railObjectives} />

<main class="pb-24 min-[900px]:pl-[188px]">
	<!-- ============ s01 · hero ============ -->
	<Stop id="s01" lo="C2" kind="instrument">
		<div class="mb-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
			<div>
				<div class="stop-kicker">Chapter {N} · Financial · 17 stops</div>
				<h1 class="stop-head mt-1 text-[clamp(1.6rem,1.1rem+1.6vw,2.4rem)]">
					{chapter.meta.title}
				</h1>
			</div>
			<p class="text-ink-2 max-w-md text-[0.95rem] leading-snug sm:text-right">
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
	</Stop>

	<!-- ============ s02 · C1 ============ -->
	<Stop
		id="s02"
		lo="C1"
		kind="prose"
		kicker="C1 · Conceptual"
		title="Periods, and why the books stop being right"
	>
		<Reading chapter={N} lo="C1" label="Reading" {terms}>
			<div class="prose-col">
				<p>
					Businesses run continuously, but statements have to stop the clock. The <TermMark
						name="Time period assumption"><em>time period assumption</em></TermMark
					> says a company’s life can be cut into <TermMark name="Accounting period"
						>accounting periods</TermMark
					>, a month, a quarter, a year, and reported on. Annual statements cover a <TermMark
						name="Fiscal year">fiscal year</TermMark
					>, which is any twelve consecutive months; many companies use the calendar year, and
					retailers often pick a <TermMark name="Natural business year"
						>natural business year</TermMark
					> that ends after the holiday rush when inventories are lowest. Statements inside the year are
					<TermMark name="Interim financial statements">interim statements</TermMark>.
				</p>
				<p>
					Cutting time into periods creates the whole problem of this chapter. Under <TermMark
						name="Cash basis accounting">cash basis accounting</TermMark
					>, revenue is recorded when cash is received and expense when cash is paid, which tells
					you about the checkbook, not about what the business did that period. GAAP requires <TermMark
						name="Accrual basis accounting">accrual basis accounting</TermMark
					>: revenue is recorded when goods or services are delivered, and expenses are recorded
					when they are incurred, whether or not cash has moved yet.
				</p>
			</div>
			<Deeper label="Go deeper · the two principles behind the timing">
				<p>
					Two principles govern the timing. The <TermMark name="Revenue recognition principle"
						>revenue recognition principle</TermMark
					>: record revenue when services or products are provided to customers, at the amount
					expected to be received. The <TermMark name="Expense recognition principle"
						>expense recognition (matching) principle</TermMark
					>: record in the same period the expenses that helped produce that revenue. Adjusting
					entries exist to enforce these two rules at every period end.
				</p>
			</Deeper>
		</Reading>
	</Stop>

	<!-- ============ s03 · C1 figure ============ -->
	<Stop
		id="s03"
		lo="C1"
		kind="drill"
		kicker="C1 · Wild Exhibit 3.2"
		title="Same $2,400, three different years"
	>
		<Reading chapter={N} lo="C1" label="Exhibit 3.2" {terms}><AccrualVsCash /></Reading>
	</Stop>

	<!-- ============ s04 · C2 ============ -->
	<Stop id="s04" lo="C2" kind="prose" kicker="C2 · Conceptual" title="Cash first, or cash later">
		<Reading chapter={N} lo="C2" label="Reading" {terms}>
			<div class="prose-col">
				<p>
					An <TermMark name="Adjusting entry">adjusting entry</TermMark> is needed whenever cash moves
					in a different period from the revenue or expense it belongs to. Wild sorts every case into
					a two-by-two grid (Exhibit 3.3). If cash moved <em>first</em>, the entry is a deferral: a <TermMark
						name="Prepaid expenses">prepaid expense</TermMark
					> that must become expense as it is used up, or an <TermMark name="Unearned revenues"
						>unearned revenue</TermMark
					> that must become revenue as it is earned. If cash moves <em>later</em>, the entry is an
					accrual: an <TermMark name="Accrued expenses">accrued expense</TermMark> that has been incurred
					but not paid or recorded, or an <TermMark name="Accrued revenues"
						>accrued revenue</TermMark
					> that has been earned but not received or recorded.
				</p>
				<p>
					Three things are true of every adjusting entry. It affects at least one income statement
					account and at least one balance sheet account. It never touches Cash, because the cash
					part of the story either already happened or has not happened yet. And it is dated the
					last day of the period.
				</p>
			</div>
		</Reading>
		<div class="mt-8 max-w-[560px] text-sm">
			<div class="stop-kicker">Wild Exhibit 3.3 · framework</div>
			<div class="bg-rule mt-2 grid grid-cols-[auto_1fr_1fr] gap-px">
				<div class="bg-paper p-2"></div>
				<div class="bg-paper p-2 text-center text-xs font-medium">Expense side</div>
				<div class="bg-paper p-2 text-center text-xs font-medium">Revenue side</div>
				<div class="bg-paper p-2 text-xs">
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
				<div class="bg-paper p-2 text-xs">
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
	</Stop>

	<!-- ============ s05 · mnemonic ============ -->
	<Stop
		id="s05"
		lo="C2"
		kind="mnemonic"
		kicker="Mnemonics · C2, P1"
		title="Two hooks to hang it on"
	>
		<Reading chapter={N} lo="C2" label="Mnemonics" {terms}>
			<div class="max-w-[68ch]">
				<p class="text-[1.35rem] leading-snug">
					<span class="font-medium"
						>Deferral = cash <em>first</em>. Accrual = cash <em>later</em>.</span
					>
				</p>
				<p class="text-ink-2 mt-2">
					That one line sorts every adjustment in the chapter. Prepaid expenses and unearned
					revenues are deferrals. Accrued expenses and accrued revenues are accruals.
				</p>
			</div>
			<div class="border-rule-2 mt-10 border-t pt-8">
				<div class="stop-kicker mb-4">Which side? The rule, and two ways to remember it</div>
				<DebitCreditMnemonic />
			</div>
		</Reading>
	</Stop>

	<!-- ============ s06 · drill ============ -->
	<Stop id="s06" lo="C2" kind="drill" kicker="Drill · C2" title="Which kind of adjustment?">
		<SortDrill
			chapter={N}
			lo="C2"
			items={classifications}
			{subtitles}
			takeaway="Deferrals: cash first, recognition later (prepaid expenses, unearned revenues). Accruals: recognition first, cash later (accrued expenses, accrued revenues). Every adjustment touches one income statement account and one balance sheet account, never Cash."
		/>
	</Stop>

	<!-- ============ s07 · P1 depreciation ============ -->
	<Stop
		id="s07"
		lo="P1"
		kind="prose"
		kicker="P1 · Procedural"
		title="Depreciation, and the contra account"
	>
		<Reading chapter={N} lo="P1" label="Reading" {terms}>
			<div class="prose-col">
				<p>
					The timeline at the top walks all six. Two of them deserve a second look because students
					lose points on them.
				</p>
				<p>
					<TermMark name="Depreciation"><em>Depreciation</em></TermMark> is a prepaid expense that lasts
					years. FastForward’s equipment cost $26,000, should serve 48 months, and should sell for $8,000
					afterward, so <TermMark name="Straight-line depreciation"
						>straight-line depreciation</TermMark
					> is ($26,000 − $8,000) ÷ 48 = $375 a month. The credit does not reduce Equipment. It goes to
					<TermMark name="Accumulated depreciation">Accumulated Depreciation—Equipment</TermMark>, a <TermMark
						name="Contra account">contra account</TermMark
					> with a credit balance that is subtracted from Equipment on the balance sheet. Cost stays visible;
					<TermMark name="Book value">book value</TermMark> is cost less accumulated depreciation, $25,625
					after one month.
				</p>
			</div>
			<Mistake
				>Crediting Equipment for the $375. The asset’s cost stays on the books; the wear goes to
				Accumulated Depreciation, and the balance sheet shows both.</Mistake
			>
			<Deeper label="Go deeper · plant assets and the useful-life estimate">
				<p>
					Equipment, buildings, and vehicles are <TermMark name="Plant assets"
						>plant assets</TermMark
					>: long-term tangible assets used to produce and sell products and services. Land is a
					plant asset that is not depreciated. Useful life and salvage value are estimates made when
					the asset is bought; if they later change, the remaining cost is spread over the remaining
					life rather than restating past periods.
				</p>
			</Deeper>
		</Reading>
	</Stop>

	<!-- ============ s08 · P1 accruals ============ -->
	<Stop id="s08" lo="P1" kind="prose" kicker="P1 · Procedural" title="Accruals reverse the order">
		<Reading chapter={N} lo="P1" label="Reading" {terms}>
			<div class="prose-col">
				<p>
					The employee earned $210 in the last three workdays of December and was paid nothing, so
					the entry is Salaries Expense and Salaries Payable. When the next paycheck goes out on
					January 9 for $700, part of it pays off December’s liability and only the rest is January
					expense. The accrued consulting revenue closes the same way on January 10: the $2,700
					collected clears the $1,800 receivable and the remaining $900 is January revenue.
				</p>
			</div>
		</Reading>
		<div class="mt-6 grid max-w-[900px] gap-4 md:grid-cols-2">
			{#each januaryFollowUps as e (e.id)}
				<div class="border-rule-2 bg-paper border px-3 py-2">
					<JournalEntry entry={e} {accountName} />
				</div>
			{/each}
		</div>
		<Mistake
			>Crediting Cash in the December entry. Nothing was paid on Dec 31; the credit is a payable.
			Cash only moves on payday.</Mistake
		>
	</Stop>

	<!-- ============ s09 · entry drill ============ -->
	<Stop id="s09" lo="P1" kind="drill" kicker="Drill · P1" title="Journalize the six yourself">
		<EntryDrill
			chapter={N}
			lo="P1"
			specs={entryCards}
			{accounts}
			{accountName}
			takeaway={entryTakeaway}
		/>
	</Stop>

	<!-- ============ s10 · A1 ============ -->
	<Stop
		id="s10"
		lo="A1"
		kind="instrument"
		kicker="A1 · Analytical"
		title="What goes wrong when you skip one"
	>
		<div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,440px)]">
			<Reading chapter={N} lo="A1" label="Reading" {terms}>
				<div class="prose-col">
					<p>
						Each adjustment corrects one balance sheet account and one income statement account, so
						skipping it leaves both wrong in a predictable direction. Deferrals left unadjusted
						overstate an asset or a liability. Accruals left unadjusted understate an asset or a
						liability. And because every adjustment carries revenue or expense, each miss flows
						straight into net income and, from there, into equity.
					</p>
					<p>
						Pick a type and read the pattern. On an exam, the fast route is to ask which side of the
						equation is wrong before adjusting, and in which direction.
					</p>
				</div>
			</Reading>
			<div class="text-sm">
				<div class="flex flex-wrap gap-1.5">
					{#each Object.entries(LINKS) as [k, v] (k)}
						<button
							class="border px-2.5 py-1 text-xs transition-colors {linkKind === k
								? 'border-ink bg-ink text-paper'
								: 'border-rule hover:bg-paper-2'}"
							onclick={() => (linkKind = k as typeof linkKind)}
							aria-pressed={linkKind === k}>{v.name}</button
						>
					{/each}
				</div>
				<table class="ledger mt-4">
					<tbody>
						<tr
							><th class="w-36" scope="row">Before adjusting</th><td
								>{LINKS[linkKind].bs}; {LINKS[linkKind].is.toLowerCase()}</td
							></tr
						>
						<tr><th scope="row">Adjusting entry</th><td>{LINKS[linkKind].entry}</td></tr>
						<tr><th scope="row">If skipped</th><td>{LINKS[linkKind].ni}, equity likewise</td></tr>
					</tbody>
				</table>
				<Reading chapter={N} lo="A1" label="Skip a step" {terms}
					><p class="border-rule-2 text-ink-2 mt-3 border-t pt-3">{LINKS[linkKind].ex}</p></Reading
				>
			</div>
		</div>
	</Stop>

	<!-- ============ s11 · P2 ============ -->
	<Stop
		id="s11"
		lo="P2"
		kind="instrument"
		kicker="P2 · Procedural"
		title="From unadjusted to adjusted"
	>
		<Reading chapter={N} lo="P2" label="Reading" {terms}>
			<div class="prose-col">
				<p>
					An <TermMark name="Unadjusted trial balance">unadjusted trial balance</TermMark> is the list
					of accounts and balances before adjustments. Post the six entries and list the accounts again:
					that is the <TermMark name="Adjusted trial balance">adjusted trial balance</TermMark>, the
					sheet the statements are prepared from. Wild shows the two side by side with the
					adjustments between them, keyed by letter, and that layout is worth copying on scratch
					paper during an exam.
				</p>
			</div>
		</Reading>
		<div class="mt-8">
			<Worksheet
				unadjusted={unadjustedTB}
				adjusted={adjustedTB}
				{adjustments}
				{accounts}
				{accountName}
			/>
		</div>
	</Stop>

	<!-- ============ s12 · P3 ============ -->
	<Stop
		id="s12"
		lo="P3"
		kind="instrument"
		kicker="P3 · Procedural"
		title="Where every balance lands"
	>
		<Reading chapter={N} lo="P3" label="Reading" {terms}>
			<div class="prose-col">
				<p>
					Prepare them in order, because each one feeds the next. The income statement takes the
					revenue and expense accounts and produces net income. The statement of retained earnings
					takes that net income, subtracts dividends, and produces ending retained earnings. The
					balance sheet takes the asset and liability accounts plus common stock and that ending
					retained earnings, and it must balance: assets equal liabilities plus equity.
				</p>
			</div>
			<Deeper label="Go deeper · presentation rules">
				<p>
					Presentation rules from Chapter 2 still apply: dollar signs on the first and last amount
					of a column, a single rule above a subtotal, a double rule under a final total.
				</p>
			</Deeper>
		</Reading>
		<div class="mt-8"><StatementLinks tb={adjustedTB} {fs} /></div>
	</Stop>

	<!-- ============ s13 · A2 ============ -->
	<Stop id="s13" lo="A2" kind="instrument" kicker="A2 · Analytical" title="Profit margin">
		<div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,480px)] lg:items-start">
			<Reading chapter={N} lo="A2" label="Reading" {terms}>
				<div class="prose-col">
					<p>
						<TermMark name="Profit margin">Profit margin</TermMark> is net income divided by net sales:
						the share of each sales dollar that survives all expenses. FastForward earned {fmt(
							fs.income.netIncome,
							{ dollar: true }
						)} on {fmt(fs.income.totalRevenues, { dollar: true })} of revenue, a margin of {(
							(fs.income.netIncome / fs.income.totalRevenues) *
							100
						).toFixed(1)}%, which is high because a one-person consulting startup has almost no cost
						of goods. Compare margins within an industry and over time, not across unrelated
						businesses.
					</p>
				</div>
			</Reading>
			<ProfitMargin
				chapter={N}
				netIncome={fs.income.netIncome}
				netSales={fs.income.totalRevenues}
			/>
		</div>
	</Stop>

	<!-- ============ s14 · P4 ============ -->
	<Stop
		id="s14"
		lo="P4"
		kind="instrument"
		kicker="P4 · Appendix 3A"
		title="Two roads to the same balance"
	>
		<Reading chapter={N} lo="P4" label="Reading" {terms}>
			<div class="prose-col">
				<p>
					Some companies record a prepayment as an expense the day it is paid, and cash received in
					advance as revenue the day it arrives. That is allowed, as long as the year-end adjustment
					moves the unexpired or unearned portion back onto the balance sheet. The adjusting entry
					looks different; the ending balances are identical.
				</p>
			</div>
		</Reading>
		<div class="mt-8"><PrepaidAlternatives chapter={N} {accountName} /></div>
	</Stop>

	<!-- ============ s15 · quick check ============ -->
	<Stop
		id="s15"
		lo="Check"
		kind="audit"
		kicker="Quick check · all objectives"
		title="Seven questions, one pass"
	>
		<QuickCheck chapter={N} items={quickChecks} />
	</Stop>

	<!-- ============ s16 · retrieval ============ -->
	<Stop
		id="s16"
		lo="Recall"
		kind="retrieval"
		kicker="Retrieval · produce the answer"
		title="The recall pass"
	>
		<p class="text-ink-2 mb-8 max-w-[60ch]">
			Generated from this chapter: every entry, every situation, the debit/credit rule, and every
			key term. You produce the answer first; a correct answer moves the card up a box and pushes it
			further out.
		</p>
		<RetrievalDeck {cards} {accounts} {accountName} />
	</Stop>

	<!-- ============ s17 · audit ============ -->
	<Stop
		id="s17"
		lo="Notes"
		kind="audit"
		kicker="Before you leave"
		title="Terms you have not written down"
	>
		<TermAudit chapter={N} {terms} />
		<footer class="text-ink-3 mt-16 max-w-[68ch] text-xs">
			<p>
				Aligned to Wild, <em>Financial and Managerial Accounting</em>, 2025 release, Chapter 3 (C1,
				C2, A1, A2, P1–P4). FastForward figures reproduce the textbook: unadjusted trial balance {fmt(
					unadjustedTB.totalDr,
					{ dollar: true }
				)}, adjusted {fmt(adjustedTB.totalDr, { dollar: true })}, net income {fmt(
					fs.income.netIncome,
					{ dollar: true }
				)}. Independent study aid, not affiliated with McGraw Hill.
			</p>
		</footer>
	</Stop>
</main>

<NotesDrawer chapter={N} title={chapter.meta.title} />
