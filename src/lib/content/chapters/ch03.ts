import { fmt, post, statements, trialBalance } from '$lib/ledger';
import type {
	Anchor,
	ChapterContent,
	Classification,
	EntryCardSpec,
	Formula,
	InstrumentMeta,
	LessonMeta,
	Objective,
	QuickCheck,
	Rule,
	Term
} from '../types';
import {
	accounts,
	adjustments,
	company,
	decemberTransactions,
	januaryFollowUps
} from './fastforward';

export const objectives: Objective[] = [
	{
		code: 'C1',
		kind: 'conceptual',
		short: 'Periodic reporting',
		text: 'Explain the importance of periodic reporting and the role of accrual accounting.'
	},
	{
		code: 'C2',
		kind: 'conceptual',
		short: 'Types of adjustments',
		text: 'Identify the types of adjustments and their purpose.'
	},
	{
		code: 'A1',
		kind: 'analytical',
		short: 'Links to statements',
		text: 'Explain how accounting adjustments link to financial statements.'
	},
	{
		code: 'A2',
		kind: 'analytical',
		short: 'Profit margin',
		text: 'Compute profit margin and describe its use in analyzing company performance.'
	},
	{
		code: 'P1',
		kind: 'procedural',
		short: 'Adjusting entries',
		text: 'Prepare and explain adjusting entries.'
	},
	{
		code: 'P2',
		kind: 'procedural',
		short: 'Adjusted trial balance',
		text: 'Explain and prepare an adjusted trial balance.'
	},
	{
		code: 'P3',
		kind: 'procedural',
		short: 'Financial statements',
		text: 'Prepare financial statements from an adjusted trial balance.'
	},
	{
		code: 'P4',
		kind: 'procedural',
		short: 'Appendix 3A',
		text: 'Appendix 3A: Explain the alternatives in accounting for prepaids.'
	}
];

export const terms: Term[] = [
	{
		term: 'Time period assumption',
		lo: 'C1',
		definition:
			'An organization’s activities can be divided into specific time periods such as a month, a quarter, or a year.'
	},
	{
		term: 'Accounting period',
		lo: 'C1',
		definition: 'The length of time covered by financial statements; a year, quarter, or month.'
	},
	{
		term: 'Fiscal year',
		lo: 'C1',
		definition:
			'Any twelve consecutive months used as an accounting year. It need not be the calendar year.'
	},
	{
		term: 'Natural business year',
		lo: 'C1',
		definition:
			'A fiscal year that ends when sales activity is at its lowest point, so inventory and receivables are easiest to count.'
	},
	{
		term: 'Interim financial statements',
		lo: 'C1',
		definition: 'Statements covering one, three, or six months, prepared inside the annual period.'
	},
	{
		term: 'Accrual basis accounting',
		lo: 'C1',
		definition:
			'Revenues are recorded when services and products are delivered, and expenses when incurred, regardless of when cash moves. Required by GAAP.'
	},
	{
		term: 'Cash basis accounting',
		lo: 'C1',
		definition:
			'Revenues are recorded when cash is received and expenses when cash is paid. Not consistent with GAAP.'
	},
	{
		term: 'Revenue recognition principle',
		lo: 'C1',
		definition:
			'Recognize revenue when goods or services are provided to customers, at the amount expected to be received.'
	},
	{
		term: 'Expense recognition principle',
		lo: 'C1',
		aliases: ['Matching principle'],
		definition:
			'Record the expenses that helped generate revenue in the same period as that revenue (also called the matching principle).'
	},
	{
		term: 'Adjusting entry',
		lo: 'C2',
		definition:
			'A period-end entry that brings an asset or liability account to its proper amount and updates the related expense or revenue. It never touches Cash.'
	},
	{
		term: 'Prepaid expenses',
		lo: 'C2',
		definition:
			'Assets paid for in advance of receiving their benefits. As the benefit is used up, the asset becomes an expense.'
	},
	{
		term: 'Unearned revenues',
		lo: 'C2',
		definition:
			'A liability created when cash is received before services or products are delivered. As work is done, the liability becomes revenue.'
	},
	{
		term: 'Accrued expenses',
		lo: 'C2',
		definition:
			'Costs that are incurred in a period but are both unpaid and unrecorded. The adjustment records the expense and a payable.'
	},
	{
		term: 'Accrued revenues',
		lo: 'C2',
		definition:
			'Revenues earned in a period that are both unrecorded and not yet received in cash. The adjustment records the revenue and a receivable.'
	},
	{
		term: 'Depreciation',
		lo: 'P1',
		definition: 'The process of allocating the cost of a plant asset over its expected useful life.'
	},
	{
		term: 'Straight-line depreciation',
		lo: 'P1',
		definition: '(Cost − Salvage value) ÷ Useful life. The same amount of expense each period.'
	},
	{
		term: 'Plant assets',
		lo: 'P1',
		definition:
			'Long-term tangible assets used to produce and sell products and services, such as equipment and buildings.'
	},
	{
		term: 'Contra account',
		lo: 'P1',
		definition:
			'An account linked with another account whose balance is subtracted from it. Accumulated depreciation is a contra asset with a credit balance.'
	},
	{
		term: 'Accumulated depreciation',
		lo: 'P1',
		definition:
			'The total depreciation recorded on an asset since it was acquired. A contra asset account.'
	},
	{
		term: 'Book value',
		lo: 'P1',
		definition: 'An asset’s cost less its accumulated depreciation.'
	},
	{
		term: 'Unadjusted trial balance',
		lo: 'P2',
		definition: 'A list of accounts and balances prepared before adjusting entries are recorded.'
	},
	{
		term: 'Adjusted trial balance',
		lo: 'P2',
		definition:
			'A list of accounts and balances prepared after adjusting entries are recorded and posted. Statements are prepared from it.'
	},
	{
		term: 'Profit margin',
		lo: 'A2',
		definition: 'Net income ÷ Net sales. The portion of each sales dollar that ends up as profit.'
	}
];

export const quickChecks: QuickCheck[] = [
	{
		lo: 'C1',
		q: 'FastForward pays $2,400 on December 26 for insurance covering December 1, 2025 through November 30, 2027. Under the accrual basis, 2025 insurance expense is:',
		options: ['$2,400', '$1,200', '$100', '$0'],
		answer: 2,
		why: 'One month of the 24-month policy expired in 2025: $2,400 ÷ 24 = $100. The cash basis would expense all $2,400 in 2025.'
	},
	{
		lo: 'C2',
		q: 'Which pair are deferrals, where cash moves before the revenue or expense is recognized?',
		options: [
			'Accrued expenses and accrued revenues',
			'Prepaid expenses and unearned revenues',
			'Prepaid expenses and accrued revenues',
			'Unearned revenues and accrued expenses'
		],
		answer: 1,
		why: 'Deferral = cash first, recognition later. Prepaid expenses (paid, not yet used) and unearned revenues (received, not yet earned).'
	},
	{
		lo: 'C2',
		q: 'Every adjusting entry affects:',
		options: [
			'Two balance sheet accounts',
			'Cash and one other account',
			'At least one income statement account and at least one balance sheet account',
			'Only temporary accounts'
		],
		answer: 2,
		why: 'That is the defining feature of an adjustment: it fixes a balance sheet account and the matching revenue or expense. Cash is never in an adjusting entry.'
	},
	{
		lo: 'P1',
		q: 'Equipment cost $26,000, salvage value $8,000, useful life 48 months. Monthly straight-line depreciation is:',
		options: ['$541.67', '$375', '$166.67', '$708.33'],
		answer: 1,
		why: '($26,000 − $8,000) ÷ 48 = $375. The credit goes to Accumulated Depreciation, not Equipment.'
	},
	{
		lo: 'P1',
		q: 'An employee earns $70 per day and was last paid on Friday, December 26. The adjustment on Wednesday, December 31 is:',
		options: [
			'Salaries Expense 350 / Salaries Payable 350',
			'Salaries Expense 210 / Cash 210',
			'Salaries Expense 210 / Salaries Payable 210',
			'No entry until payday'
		],
		answer: 2,
		why: 'Three workdays (Dec 29, 30, 31) × $70 = $210, owed but unpaid, so credit a payable, not Cash.'
	},
	{
		lo: 'A1',
		q: 'If the $250 of unearned consulting revenue that was earned in December is not adjusted, then at December 31:',
		options: [
			'Liabilities are understated and revenues overstated',
			'Liabilities are overstated and revenues understated',
			'Assets are overstated and expenses understated',
			'Nothing is misstated until cash is received'
		],
		answer: 1,
		why: 'The liability still shows $3,000 instead of $2,750, and revenue is missing $250. Net income and equity are understated by $250.'
	},
	{
		lo: 'A2',
		q: 'FastForward reports net income of $3,785 on net sales of $8,150. Its profit margin is:',
		options: ['46.4%', '215.3%', '53.6%', '4.6%'],
		answer: 0,
		why: '$3,785 ÷ $8,150 = 0.464, so 46.4 cents of each sales dollar became profit.'
	}
];

/* ---------- The six adjustments as time-based lanes (drives the timeline instrument) ---------- */

export type LaneKind = 'prepaid' | 'unearned' | 'accrued-expense' | 'accrued-revenue';

export interface LaneState {
	/** Amount that should be recognized (expense or revenue) as of this day. */
	recognized: number;
	/** Amount already sitting in the expense/revenue account before the adjustment. */
	recorded: number;
	/** Adjustment needed = recognized − recorded, or null when the rule doesn’t fire yet. */
	adjustment: number | null;
	/** One sentence the instrument shows for this day. */
	explain: string;
	/** Progress 0–1 through the recognition window (for drawing). */
	progress: number;
}

export interface Lane {
	id: 'a' | 'b' | 'c' | 'd' | 'e' | 'f';
	kind: LaneKind;
	title: string;
	facts: string;
	/** Balance sheet account changed by the adjustment. */
	bsAcct: string;
	/** Income statement account changed by the adjustment. */
	isAcct: string;
	/** Cash events on the timeline (day offsets from Dec 1 = 0; can extend into January/February). */
	cash: Array<{ day: number; amount: number; label: string }>;
	/** Recognition window (day offsets). */
	window: { start: number; end: number; openEnded?: boolean };
	/** How the recognized amount is computed. */
	rule: 'monthly' | 'daily' | 'workdays' | 'count';
	rate?: number; // per day or per month
	stateAt: (day: number) => LaneState; // day = Dec 1 … Dec 31 → 1 … 31
}

const DEC = (d: number) => d - 1; // Dec 1 → 0
const JAN = (d: number) => 30 + d; // Jan 1 → 31
const FEB = (d: number) => 61 + d; // Feb 1 → 62

export const lanes: Lane[] = [
	{
		id: 'a',
		kind: 'prepaid',
		title: 'Prepaid insurance',
		facts:
			'Paid $2,400 on Dec 26 for a 24-month policy whose coverage began Dec 1. $2,400 ÷ 24 = $100 a month.',
		bsAcct: '128',
		isAcct: '637',
		cash: [{ day: DEC(26), amount: 2400, label: 'Paid $2,400' }],
		window: { start: DEC(1), end: DEC(1) + 730, openEnded: true },
		rule: 'monthly',
		rate: 100,
		stateAt: (day) => {
			const months = day >= 31 ? 1 : 0;
			return {
				recognized: 100 * months,
				recorded: 0,
				adjustment: day >= 31 ? 100 : null,
				explain:
					day >= 31
						? 'One full month of coverage has expired. Move $100 out of the asset and into Insurance Expense.'
						: `Coverage is being used up day by day (${day} of 730 days), but Wild records insurance expense at month end. Nothing is recorded yet.`,
				progress: Math.min(1, day / 730)
			};
		}
	},
	{
		id: 'b',
		kind: 'prepaid',
		title: 'Supplies',
		facts:
			'Bought $9,720 of supplies during December ($2,500 + $7,100 + $120). A count on Dec 31 finds $8,670 still on hand.',
		bsAcct: '126',
		isAcct: '652',
		cash: [
			{ day: DEC(2), amount: 2500, label: '$2,500' },
			{ day: DEC(4), amount: 7100, label: '$7,100 on credit' },
			{ day: DEC(26), amount: 120, label: '$120' }
		],
		window: { start: DEC(1), end: DEC(31) },
		rule: 'count',
		stateAt: (day) => ({
			recognized: day >= 31 ? 1050 : 0,
			recorded: 0,
			adjustment: day >= 31 ? 1050 : null,
			explain:
				day >= 31
					? 'The count says $8,670 remain, so $9,720 − $8,670 = $1,050 were used. Supplies Expense is the plug.'
					: 'Supplies are used a little every day, but nobody tracks each pencil. The amount used is found by counting what is left at period end.',
			progress: day / 31
		})
	},
	{
		id: 'c',
		kind: 'prepaid',
		title: 'Depreciation of equipment',
		facts:
			'Equipment cost $26,000 (bought Dec 3), expected to last 48 months with an $8,000 salvage value. ($26,000 − $8,000) ÷ 48 = $375 a month.',
		bsAcct: '168',
		isAcct: '612',
		cash: [{ day: DEC(3), amount: 26000, label: 'Paid $26,000' }],
		window: { start: DEC(1), end: DEC(1) + 1461, openEnded: true },
		rule: 'monthly',
		rate: 375,
		stateAt: (day) => ({
			recognized: day >= 31 ? 375 : 0,
			recorded: 0,
			adjustment: day >= 31 ? 375 : null,
			explain:
				day >= 31
					? 'A month of the equipment’s life is gone. Record $375 of Depreciation Expense and credit the contra account Accumulated Depreciation, not Equipment.'
					: 'Depreciation is a prepaid expense in slow motion: the cost was paid up front and is allocated one month at a time. Nothing is recorded until month end.',
			progress: Math.min(1, day / 1461)
		})
	},
	{
		id: 'd',
		kind: 'unearned',
		title: 'Unearned consulting revenue',
		facts:
			'Received $3,000 on Dec 26 for 60 days of consulting starting Dec 27. $3,000 ÷ 60 = $50 a day.',
		bsAcct: '236',
		isAcct: '403',
		cash: [{ day: DEC(26), amount: 3000, label: 'Received $3,000' }],
		window: { start: DEC(27), end: FEB(24) },
		rule: 'daily',
		rate: 50,
		stateAt: (day) => {
			const days = Math.max(0, day - 26);
			return {
				recognized: 50 * days,
				recorded: 0,
				adjustment: day >= 31 ? 50 * days : null,
				explain:
					days === 0
						? 'Cash is in the bank but no work has been done. The whole $3,000 is a liability: FastForward owes 60 days of service.'
						: `${days} day${days === 1 ? '' : 's'} of the 60 have been worked: ${days} × $50 = $${50 * days} earned. That much of the liability has become revenue.`,
				progress: Math.min(1, days / 60)
			};
		}
	},
	{
		id: 'e',
		kind: 'accrued-expense',
		title: 'Accrued salaries',
		facts:
			'The employee earns $70 a day, Monday–Friday, and is paid every two weeks on Friday (Dec 12 and Dec 26). Dec 29, 30, and 31 are worked but unpaid at year end.',
		bsAcct: '209',
		isAcct: '622',
		cash: [
			{ day: DEC(12), amount: 700, label: 'Payday $700' },
			{ day: DEC(26), amount: 700, label: 'Payday $700' },
			{ day: JAN(9), amount: 700, label: 'Next payday $700' }
		],
		window: { start: DEC(29), end: DEC(31) },
		rule: 'workdays',
		rate: 70,
		stateAt: (day) => {
			// Dec 1, 2025 is a Monday; paydays are Fridays Dec 12 and Dec 26.
			const lastPayday = day >= 26 ? 26 : day >= 12 ? 12 : 0;
			const isWeekday = (d: number) => (d - 1) % 7 < 5;
			let workdays = 0;
			for (let d = lastPayday + 1; d <= day; d++) if (isWeekday(d)) workdays++;
			const paidThrough = lastPayday
				? `Paid through Friday the ${lastPayday}th.`
				: 'No payday yet this month.';
			return {
				recognized: 70 * workdays,
				recorded: 0,
				adjustment: day >= 31 ? 70 * workdays : null,
				explain:
					workdays === 0
						? day === 12 || day === 26
							? `Payday. The $700 paid today covers ten workdays, so nothing is owed tonight.`
							: `${paidThrough} The weekend is not worked, so nothing has accrued yet.`
						: `${paidThrough} ${workdays} workday${workdays === 1 ? '' : 's'} since × $70 = $${70 * workdays} earned by the employee but not paid or recorded. That is an expense and a liability.`,
				progress: Math.min(1, workdays / 3)
			};
		}
	},
	{
		id: 'f',
		kind: 'accrued-revenue',
		title: 'Accrued consulting revenue',
		facts:
			'On Dec 12 FastForward agreed to 30 days of consulting for $2,700, payable when the work is done on Jan 10. $2,700 ÷ 30 = $90 a day.',
		bsAcct: '106',
		isAcct: '403',
		cash: [{ day: JAN(10), amount: 2700, label: 'Collect $2,700' }],
		window: { start: DEC(12), end: JAN(10) },
		rule: 'daily',
		rate: 90,
		stateAt: (day) => {
			const days = Math.max(0, day - 11);
			return {
				recognized: 90 * days,
				recorded: 0,
				adjustment: day >= 31 ? 90 * days : null,
				explain:
					days === 0
						? 'The contract has not started. Nothing to record.'
						: `${days} of 30 days delivered: ${days} × $90 = $${90 * days} earned but unbilled. Recognize the revenue now and set up a receivable.`,
				progress: Math.min(1, days / 30)
			};
		}
	}
];

/* ---------- Recall content: classifications, entry cards, rules ---------- */

export const ADJUSTMENT_KINDS: { id: LaneKind; label: string; sub: string }[] = [
	{ id: 'prepaid', label: 'Prepaid expense', sub: 'Deferral · paid, not yet used' },
	{ id: 'unearned', label: 'Unearned revenue', sub: 'Deferral · received, not yet earned' },
	{ id: 'accrued-expense', label: 'Accrued expense', sub: 'Accrual · incurred, not yet paid' },
	{ id: 'accrued-revenue', label: 'Accrued revenue', sub: 'Accrual · earned, not yet received' }
];
const kindOptions = ADJUSTMENT_KINDS.map((k) => ({ id: k.id, label: k.label }));

export const classifications: Classification[] = [
	{
		lo: 'C2',
		text: 'A year of office rent was paid in October and three months have passed.',
		answer: 'prepaid',
		why: 'Cash went out first; the benefit is used month by month.',
		options: kindOptions
	},
	{
		lo: 'C2',
		text: 'Employees worked Dec 29–31. Payday is January 9.',
		answer: 'accrued-expense',
		why: 'The cost is incurred now, the cash leaves later.',
		options: kindOptions
	},
	{
		lo: 'C2',
		text: 'A client paid $3,000 for 60 days of consulting to be delivered starting tomorrow.',
		answer: 'unearned',
		why: 'Cash came in before the work: a liability until earned.',
		options: kindOptions
	},
	{
		lo: 'C2',
		text: 'Twenty days of a 30-day contract are done; the bill goes out when the job ends.',
		answer: 'accrued-revenue',
		why: 'Earned already, cash later. Record revenue and a receivable.',
		options: kindOptions
	},
	{
		lo: 'C2',
		text: 'Equipment bought on December 3 has now been used for a month.',
		answer: 'prepaid',
		why: 'Depreciation is a prepaid expense in slow motion: cost first, use over time.',
		options: kindOptions
	},
	{
		lo: 'C2',
		text: 'Interest on a bank loan has accumulated but is not due until March.',
		answer: 'accrued-expense',
		why: 'Interest expense is incurred with time even though no cash has moved.',
		options: kindOptions
	},
	{
		lo: 'C2',
		text: 'A magazine collected subscriptions in advance for next year’s issues.',
		answer: 'unearned',
		why: 'Cash first, delivery later: a liability until each issue ships.',
		options: kindOptions
	},
	{
		lo: 'C2',
		text: 'Interest has been earned on a note receivable but will be collected at maturity.',
		answer: 'accrued-revenue',
		why: 'Earned with time, not yet received: revenue and a receivable.',
		options: kindOptions
	}
];

const laneHint: Record<LaneKind, string> = {
	prepaid:
		'The debit is the expense (or depreciation expense); the credit takes value out of the asset or into its contra account.',
	unearned: 'The liability goes down, revenue goes up. No Cash.',
	'accrued-expense': 'Expense up, payable up. Cash has not moved yet.',
	'accrued-revenue': 'Receivable up, revenue up. Cash comes later.'
};
export const entryCards: EntryCardSpec[] = lanes.map((lane) => ({
	lo: 'P1',
	prompt: lane.facts,
	entry: adjustments.find((e) => e.id === lane.id)!,
	hint: laneHint[lane.kind]
}));

const side = [
	{ id: 'dr', label: 'Debit' },
	{ id: 'cr', label: 'Credit' }
];
/** The retrieval deck tests the rule, never the acronym. */
export const rules: Rule[] = [
	{
		lo: 'P1',
		prompt: 'Which side increases Dividends?',
		options: side,
		answer: 'dr',
		why: 'Dividends pull equity down, so they grow on the debit side. Debits increase expenses, assets, and dividends.'
	},
	{
		lo: 'P1',
		prompt: 'Which side increases Salaries Expense?',
		options: side,
		answer: 'dr',
		why: 'Expenses pull equity down: debit. Debits increase expenses, assets, and dividends.'
	},
	{
		lo: 'P1',
		prompt: 'Which side increases Accounts Receivable?',
		options: side,
		answer: 'dr',
		why: 'Assets are the mirror image of the equity side: they grow with debits.'
	},
	{
		lo: 'P1',
		prompt: 'Which side increases Salaries Payable?',
		options: side,
		answer: 'cr',
		why: 'Liabilities grow with credits. Credits increase liabilities, equity, and revenue.'
	},
	{
		lo: 'P1',
		prompt: 'Which side increases Common Stock?',
		options: side,
		answer: 'cr',
		why: 'Anything that pushes equity up is a credit.'
	},
	{
		lo: 'P1',
		prompt: 'Which side increases Consulting Revenue?',
		options: side,
		answer: 'cr',
		why: 'Revenue pushes equity up: credit. Credits increase liabilities, equity, and revenue.'
	},
	{
		lo: 'P1',
		prompt: 'Which side increases Accumulated Depreciation—Equipment?',
		options: side,
		answer: 'cr',
		why: 'A contra asset carries a credit balance; it grows with credits and is subtracted from the asset.'
	},
	{
		lo: 'C2',
		prompt: 'Cash was received before the revenue was earned. Deferral or accrual?',
		options: [
			{ id: 'deferral', label: 'Deferral' },
			{ id: 'accrual', label: 'Accrual' }
		],
		answer: 'deferral',
		why: 'Deferral = cash first, recognition later.'
	},
	{
		lo: 'C2',
		prompt: 'The expense was incurred; cash will be paid next period. Deferral or accrual?',
		options: [
			{ id: 'deferral', label: 'Deferral' },
			{ id: 'accrual', label: 'Accrual' }
		],
		answer: 'accrual',
		why: 'Accrual = recognition first, cash later.'
	}
];

/* ---------- Derived ledgers and anchors ---------- */

export const unadjusted = post(accounts, decemberTransactions);
export const adjusted = post(accounts, [...decemberTransactions, ...adjustments]);
export const unadjustedTB = trialBalance(unadjusted);
export const adjustedTB = trialBalance(adjusted);
export const fs = statements(adjusted, company);
export const profitMargin = fs.income.netIncome / fs.income.totalRevenues;
/** Wild Exhibit 3.2: the $2,400 policy by year (1, 12, and 11 months of coverage). */
export const insuranceByYear = [
	{ year: 2025, cash: 2400, accrual: 100 * 1 },
	{ year: 2026, cash: 0, accrual: 100 * 12 },
	{ year: 2027, cash: 0, accrual: 100 * 11 }
];

/* ---------- Lessons (Learn) and instruments (Lab) ---------- */

export const lessons: LessonMeta[] = [
	{ id: 'periods', title: 'Why books need adjusting', lo: 'C1' },
	{ id: 'types', title: 'The four types of adjustments', lo: 'C2' },
	{ id: 'entries', title: 'The six entries', lo: 'P1' },
	{ id: 'skipped', title: 'What goes wrong when you skip one', lo: 'A1' },
	{ id: 'statements', title: 'From unadjusted to statements', lo: 'P2' },
	{ id: 'margin', title: 'Profit margin', lo: 'A2' },
	{ id: 'appendix', title: 'Two roads to the same balance', lo: 'P4' }
];

const revenueEffect = lanes
	.filter((l) => l.kind === 'unearned' || l.kind === 'accrued-revenue')
	.reduce((s, l) => s + (l.stateAt(31).adjustment ?? 0), 0);
const expenseEffect = lanes
	.filter((l) => l.kind === 'prepaid' || l.kind === 'accrued-expense')
	.reduce((s, l) => s + (l.stateAt(31).adjustment ?? 0), 0);

export const instruments: InstrumentMeta[] = [
	{
		id: 'timeline',
		title: 'Adjustment timeline',
		lo: 'P1',
		instruction: 'Drag the period end across December and watch each adjustment grow.',
		resultLine: `Dec 31 — six adjustments, total income effect +${fmt(revenueEffect)} revenue, −${fmt(expenseEffect)} expense`,
		noticed:
			'None of the six entries touched Cash. Each one moved one balance sheet account and one income statement account.'
	},
	{
		id: 'worksheet',
		title: 'Adjusted trial balance worksheet',
		lo: 'P2',
		instruction:
			'Switch each adjustment on and trace it from the unadjusted column to the adjusted column.',
		resultLine: `Adjusted trial balance — Debits ${fmt(adjustedTB.totalDr, { dollar: true })} = Credits ${fmt(adjustedTB.totalCr, { dollar: true })}`,
		noticed: `The unadjusted total was ${fmt(unadjustedTB.totalDr, { dollar: true })}. Adjustments added ${fmt(adjustedTB.totalDr - unadjustedTB.totalDr)} to each side, and net income rose from ${fmt(3470)} to ${fmt(fs.income.netIncome)}.`
	},
	{
		id: 'statement-links',
		title: 'Statement links',
		lo: 'P3',
		instruction: 'Hover or focus any line and follow it to the statement it lands on.',
		resultLine: 'Net income → Retained earnings → Balance sheet, one line at a time.',
		noticed:
			'Every account has exactly one destination. Revenues and expenses land on the income statement; everything else lands on the balance sheet.'
	},
	{
		id: 'accrual-vs-cash',
		title: 'Cash versus accrual',
		lo: 'C1',
		instruction: 'Select 2025, 2026, and 2027 and compare the $2,400 policy under each basis.',
		resultLine: `2025 insurance expense — cash ${fmt(2400, { dollar: true })}, accrual ${fmt(100, { dollar: true })}`,
		noticed:
			'Both bases expense $2,400 in total. Accrual spreads it across the 24 months the coverage actually runs.'
	},
	{
		id: 'profit-margin',
		title: 'Profit margin',
		lo: 'A2',
		instruction: 'Move net income or net sales and watch the margin recompute.',
		resultLine: `Profit margin ${(profitMargin * 100).toFixed(1)}% — net income ${fmt(fs.income.netIncome, { dollar: true })} ÷ net sales ${fmt(fs.income.totalRevenues, { dollar: true })}`,
		noticed:
			'Each sales dollar splits into what became profit and what expenses consumed. Move either number and the split redraws.'
	},
	{
		id: 'prepaid-alternatives',
		title: 'Two roads to the same balance',
		lo: 'P4',
		instruction: 'Switch between recording the policy as an asset first and as an expense first.',
		resultLine: `Either way: Prepaid insurance ${fmt(2300, { dollar: true })}, Insurance expense ${fmt(100, { dollar: true })}`,
		noticed:
			'The Dec 31 adjusting entry looks completely different depending which method you start from, but both land on the same two balances.'
	}
];

/* ---------- Formulas (Recall + Reference), computed so they cannot drift ---------- */

export const formulas: Formula[] = [
	{
		lo: 'P1',
		formula: 'Straight-line depreciation = (Cost − Salvage value) ÷ Useful life',
		worked: `(26,000 − 8,000) ÷ 48 = ${fmt(lanes.find((l) => l.id === 'c')!.stateAt(31).adjustment!)} a month`
	},
	{
		lo: 'P1',
		formula: 'Book value = Cost − Accumulated depreciation',
		worked: `26,000 − ${fmt(lanes.find((l) => l.id === 'c')!.stateAt(31).adjustment!)} = ${fmt(adjusted.get('167')!.balance - adjusted.get('168')!.balance)}`
	},
	{
		lo: 'P1',
		formula: 'Supplies expense = Supplies available − Supplies on hand',
		worked: `9,720 − 8,670 = ${fmt(lanes.find((l) => l.id === 'b')!.stateAt(31).adjustment!)}`
	},
	{
		lo: 'P1',
		formula: 'Expired prepaid = Cost ÷ Months covered × Months elapsed',
		worked: `2,400 ÷ 24 × 1 = ${fmt(lanes.find((l) => l.id === 'a')!.stateAt(31).adjustment!)}`
	},
	{
		lo: 'P1',
		formula: 'Unearned revenue earned = Daily rate × Days performed',
		worked: `50 × 5 = ${fmt(lanes.find((l) => l.id === 'd')!.stateAt(31).adjustment!)}`
	},
	{
		lo: 'P1',
		formula: 'Accrued salaries = Daily pay × Unpaid days worked',
		worked: `70 × 3 = ${fmt(lanes.find((l) => l.id === 'e')!.stateAt(31).adjustment!)}`
	},
	{
		lo: 'A2',
		formula: 'Profit margin = Net income ÷ Net sales',
		worked: `${fmt(fs.income.netIncome, { dollar: true })} ÷ ${fmt(fs.income.totalRevenues, { dollar: true })} = ${(profitMargin * 100).toFixed(1)}%`
	}
];

export const chapter: ChapterContent = {
	meta: {
		number: 3,
		slug: 'adjusting-accounts',
		title: 'Adjusting Accounts for Financial Statements',
		part: 'financial',
		status: 'live',
		summary:
			'Why December’s books are wrong until you fix them, and the six entries that fix them.',
		instrument: 'Adjustment timeline',
		oneLine:
			'December’s books are not finished until six entries on December 31 put each revenue and expense in the month it belongs to.',
		headline: `Six entries at Dec 31 turn a **${fmt(unadjustedTB.totalDr, { dollar: true })}** trial balance into a **${fmt(adjustedTB.totalDr, { dollar: true })}** one.`
	},
	objectives,
	terms,
	quickChecks,
	accounts,
	classifications,
	entryCards,
	rules,
	formulas,
	lessons,
	instruments,
	journalPatterns: [...adjustments, ...januaryFollowUps],
	ledgers: [
		{
			label: 'FastForward, December transactions (unadjusted)',
			company,
			entries: decemberTransactions
		},
		{ label: 'FastForward, adjusted', company, entries: [...decemberTransactions, ...adjustments] },
		{
			label: 'FastForward, with January follow-ups',
			company,
			entries: [...decemberTransactions, ...adjustments, ...januaryFollowUps]
		}
	],
	anchors: () => {
		const a: Anchor[] = [
			{
				label: 'Unadjusted trial balance total (Wild)',
				expected: 45300,
				actual: unadjustedTB.totalDr
			},
			{ label: 'Adjusted trial balance total (Wild)', expected: 47685, actual: adjustedTB.totalDr },
			{ label: 'Net income', expected: 3785, actual: fs.income.netIncome },
			{ label: 'Total revenues', expected: 8150, actual: fs.income.totalRevenues },
			{ label: 'Total expenses', expected: 4365, actual: fs.income.totalExpenses },
			{ label: 'Ending retained earnings', expected: 3585, actual: fs.retainedEarnings.ending },
			{ label: 'Total assets', expected: 42745, actual: fs.balanceSheet.totalAssets },
			{ label: 'Total liabilities', expected: 9160, actual: fs.balanceSheet.totalLiabilities },
			{ label: 'Total equity', expected: 33585, actual: fs.balanceSheet.totalEquity },
			{
				label: 'Prepaid insurance after adjustment',
				expected: 2300,
				actual: adjusted.get('128')!.balance
			},
			{ label: 'Supplies after adjustment', expected: 8670, actual: adjusted.get('126')!.balance },
			{
				label: 'Equipment book value',
				expected: 25625,
				actual: adjusted.get('167')!.balance - adjusted.get('168')!.balance
			},
			{
				label: 'Unearned consulting revenue after adjustment',
				expected: 2750,
				actual: adjusted.get('236')!.balance
			},
			{
				label: 'Consulting revenue after adjustment',
				expected: 7850,
				actual: adjusted.get('403')!.balance
			},
			{
				label: 'Salaries expense after adjustment',
				expected: 1610,
				actual: adjusted.get('622')!.balance
			}
		];
		a.push({
			label: 'Exhibit 3.2 accrual-basis expense sums to the premium',
			expected: 2400,
			actual: insuranceByYear.reduce((s, y) => s + y.accrual, 0)
		});
		a.push({
			label: 'Lane (e) on Dec 19 (5 workdays since Dec 12 payday)',
			expected: 350,
			actual: lanes.find((l) => l.id === 'e')!.stateAt(19).recognized
		});
		a.push({
			label: 'Lane (e) on Dec 28 (weekend after payday)',
			expected: 0,
			actual: lanes.find((l) => l.id === 'e')!.stateAt(28).recognized
		});
		for (const lane of lanes) {
			const entry = adjustments.find((e) => e.id === lane.id)!;
			const amount = entry.lines.reduce((s, l) => s + (l.dr ?? 0), 0);
			a.push({
				label: `Lane (${lane.id}) at Dec 31 equals entry (${lane.id})`,
				expected: amount,
				actual: lane.stateAt(31).adjustment ?? NaN
			});
		}
		return a;
	},
	invariants: () => {
		for (const e of adjustments) {
			if (e.lines.some((l) => l.acct === '101'))
				throw new Error(`Adjusting entry (${e.id}) touches Cash`);
			const types = e.lines.map((l) => accounts.find((a) => a.num === l.acct)!.type);
			const hasIS = types.some((t) => t === 'revenue' || t === 'expense');
			const hasBS = types.some((t) => t !== 'revenue' && t !== 'expense');
			if (!hasIS || !hasBS)
				throw new Error(
					`Adjusting entry (${e.id}) must touch one income statement and one balance sheet account`
				);
		}
		for (const lane of lanes) {
			const entry = adjustments.find((e) => e.id === lane.id)!;
			const drAcct = entry.lines.find((l) => l.dr)!.acct;
			const crAcct = entry.lines.find((l) => l.cr)!.acct;
			if (![drAcct, crAcct].includes(lane.bsAcct) || ![drAcct, crAcct].includes(lane.isAcct))
				throw new Error(`Lane (${lane.id}) accounts do not match entry (${lane.id})`);
			// Recognized amounts only grow, except that an accrual resets on a cash (payday) day.
			let prev = -1;
			for (let d = 1; d <= 31; d++) {
				const s = lane.stateAt(d);
				const cashDay = lane.cash.some((c) => c.day === d - 1);
				if (s.recognized < prev && !cashDay)
					throw new Error(`Lane (${lane.id}) recognized amount decreases on Dec ${d}`);
				prev = s.recognized;
			}
		}
		const seen = new Set<string>();
		for (const t of terms) {
			const k = t.term.toLowerCase();
			if (seen.has(k)) throw new Error(`Duplicate term ${t.term}`);
			seen.add(k);
			if (!objectives.some((o) => o.code === t.lo))
				throw new Error(`Term ${t.term} cites unknown objective ${t.lo}`);
		}
		for (const c of classifications) {
			if (!c.options.some((o) => o.id === c.answer))
				throw new Error(`Classification answer not in options: ${c.text}`);
		}
		for (const r of rules) {
			if (!r.options.some((o) => o.id === r.answer))
				throw new Error(`Rule answer not in options: ${r.prompt}`);
			if (/what does the|stand for/i.test(r.prompt))
				throw new Error(`Rule card tests the acronym, not the rule: ${r.prompt}`);
		}
		for (const q of quickChecks) {
			if (q.answer < 0 || q.answer >= q.options.length)
				throw new Error(`Quick check answer out of range: ${q.q}`);
		}
		const lessonIds = new Set<string>();
		for (const l of lessons) {
			if (lessonIds.has(l.id)) throw new Error(`Duplicate lesson id ${l.id}`);
			lessonIds.add(l.id);
			if (!objectives.some((o) => o.code === l.lo))
				throw new Error(`Lesson ${l.id} cites unknown objective ${l.lo}`);
		}
		if (lessons.length < 4 || lessons.length > 7)
			throw new Error(`Chapter should have 4–7 lessons, has ${lessons.length}`);
		const instrumentIds = new Set<string>();
		for (const inst of instruments) {
			if (instrumentIds.has(inst.id)) throw new Error(`Duplicate instrument id ${inst.id}`);
			instrumentIds.add(inst.id);
			if (!objectives.some((o) => o.code === inst.lo))
				throw new Error(`Instrument ${inst.id} cites unknown objective ${inst.lo}`);
			if (!inst.instruction.trim()) throw new Error(`Instrument ${inst.id} has no instruction`);
		}
		for (const f of formulas) {
			if (!objectives.some((o) => o.code === f.lo))
				throw new Error(`Formula "${f.formula}" cites unknown objective ${f.lo}`);
		}
	}
};
