import { post, statements, trialBalance } from '$lib/ledger';
import type { Anchor, ChapterContent, Objective, QuickCheck, Term } from '../types';
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
		text: 'Explain the importance of periodic reporting and the role of accrual accounting.'
	},
	{ code: 'C2', kind: 'conceptual', text: 'Identify the types of adjustments and their purpose.' },
	{
		code: 'A1',
		kind: 'analytical',
		text: 'Explain how accounting adjustments link to financial statements.'
	},
	{
		code: 'A2',
		kind: 'analytical',
		text: 'Compute profit margin and describe its use in analyzing company performance.'
	},
	{ code: 'P1', kind: 'procedural', text: 'Prepare and explain adjusting entries.' },
	{ code: 'P2', kind: 'procedural', text: 'Explain and prepare an adjusted trial balance.' },
	{
		code: 'P3',
		kind: 'procedural',
		text: 'Prepare financial statements from an adjusted trial balance.'
	},
	{
		code: 'P4',
		kind: 'procedural',
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
			'The employee earns $70 a day, Monday–Friday, and is paid every two weeks on Friday. The last payday was Friday, Dec 26.',
		bsAcct: '209',
		isAcct: '622',
		cash: [
			{ day: DEC(26), amount: 700, label: 'Payday $700' },
			{ day: JAN(9), amount: 700, label: 'Next payday $700' }
		],
		window: { start: DEC(29), end: DEC(31) },
		rule: 'workdays',
		rate: 70,
		stateAt: (day) => {
			const workdays = [29, 30, 31].filter((d) => d <= day).length;
			return {
				recognized: 70 * workdays,
				recorded: 0,
				adjustment: day >= 31 ? 70 * workdays : null,
				explain:
					workdays === 0
						? day < 26
							? 'Salaries are up to date through the last payday.'
							: 'Paid through Friday the 26th. The weekend is not worked, so nothing has accrued yet.'
						: `${workdays} workday${workdays === 1 ? '' : 's'} since payday × $70 = $${70 * workdays} earned by the employee but not paid or recorded. That is an expense and a liability.`,
				progress: workdays / 3
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

/* ---------- Derived ledgers and anchors ---------- */

export const unadjusted = post(accounts, decemberTransactions);
export const adjusted = post(accounts, [...decemberTransactions, ...adjustments]);
export const unadjustedTB = trialBalance(unadjusted);
export const adjustedTB = trialBalance(adjusted);
export const fs = statements(adjusted, company);
export const profitMargin = fs.income.netIncome / fs.income.totalRevenues;

export const chapter: ChapterContent = {
	meta: {
		number: 3,
		slug: 'adjusting-accounts',
		title: 'Adjusting Accounts for Financial Statements',
		part: 'financial',
		status: 'live',
		summary:
			'Why December’s books are wrong until you fix them, and the six entries that fix them.',
		instrument: 'Adjustment timeline'
	},
	objectives,
	terms,
	quickChecks,
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
			let prev = -1;
			for (let d = 1; d <= 31; d++) {
				const s = lane.stateAt(d);
				if (s.recognized < prev)
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
		for (const q of quickChecks) {
			if (q.answer < 0 || q.answer >= q.options.length)
				throw new Error(`Quick check answer out of range: ${q.q}`);
		}
	}
};
