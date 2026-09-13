import { fmt, post, round } from '$lib/ledger';
import type { Entry } from '$lib/ledger';
import type {
	Anchor,
	ChapterContent,
	Classification,
	Formula,
	InstrumentMeta,
	LessonMeta,
	Objective,
	QuickCheck,
	Term
} from '../types';
import { accounts, company, decemberTransactions } from './fastforward';

/**
 * Objective codes are mine — the brief doesn't give them (Chapter 1's
 * doesn't cite LOs at all, unlike Chapter 3's). Grouped from the brief's
 * own section structure, not lifted from Wild's printed list.
 */
export const objectives: Objective[] = [
	{
		code: 'C1',
		kind: 'conceptual',
		short: 'Purpose & users',
		text: 'Explain the purpose of accounting and identify its internal and external users.'
	},
	{
		code: 'C2',
		kind: 'conceptual',
		short: 'GAAP',
		text: 'Explain the principles, assumptions, and constraints that shape financial statements.'
	},
	{
		code: 'C3',
		kind: 'conceptual',
		short: 'Business forms',
		text: 'Describe the forms of business organization and how each affects liability and taxation.'
	},
	{
		code: 'A1',
		kind: 'analytical',
		short: 'The equation',
		text: 'Analyze business transactions using the accounting equation.'
	},
	{
		code: 'A2',
		kind: 'analytical',
		short: 'Return on assets',
		text: 'Compute return on assets and explain what it measures.'
	},
	{
		code: 'P1',
		kind: 'procedural',
		short: 'Four statements',
		text: 'Identify and prepare the four financial statements, in the order they are prepared.'
	}
];

export const terms: Term[] = [
	{ term: 'Accounting', lo: 'C1', definition: 'A system that identifies, records, and communicates the events of an organization to interested users.' },
	{ term: 'Recordkeeping (bookkeeping)', lo: 'C1', definition: 'The recording of transactions and events, either manually or electronically. Part of accounting.' },
	{ term: 'Financial accounting', lo: 'C1', definition: 'The area of accounting aimed at serving external users by providing general-purpose financial statements.' },
	{ term: 'Managerial accounting', lo: 'C1', definition: 'The area of accounting aimed at serving internal users with more detailed, forward-looking information.' },
	{ term: 'External users', lo: 'C1', definition: 'People outside an organization who use its financial reports, such as investors and creditors.' },
	{ term: 'Internal users', lo: 'C1', definition: 'People inside an organization who use its financial reports, such as managers and officers.' },
	{ term: 'Ethics', lo: 'C1', definition: 'A code of conduct that distinguishes right from wrong. A commitment to ethics is the foundation of accounting.' },
	{ term: 'Fraud triangle', lo: 'C1', definition: 'The three factors that typically must exist for fraud to occur: opportunity, pressure, and rationalization.' },
	{ term: 'Generally accepted accounting principles (GAAP)', lo: 'C2', definition: 'The rules that specify acceptable accounting practice, so financial statements are comparable across companies.' },
	{ term: 'Financial Accounting Standards Board (FASB)', lo: 'C2', definition: 'The private group that sets both broad and specific accounting principles in the United States.' },
	{ term: 'Securities and Exchange Commission (SEC)', lo: 'C2', definition: 'The government agency with the legal authority to set GAAP and regulate financial markets in the United States.' },
	{ term: 'International Accounting Standards Board (IASB)', lo: 'C2', definition: 'The independent group that sets accounting standards used by many countries outside the United States.' },
	{ term: 'International Financial Reporting Standards (IFRS)', lo: 'C2', definition: 'The accounting standards issued by the IASB, used by more than 100 countries.' },
	{ term: 'Conceptual framework', lo: 'C2', definition: 'The underlying concepts that form the basis for developing accounting principles and standards.' },
	{ term: 'Measurement (cost) principle', lo: 'C2', definition: 'Accounting information is based on actual cost, which is considered objective and verifiable.' },
	{ term: 'Revenue recognition principle', lo: 'C2', definition: 'Recognize revenue when goods or services are provided to customers, at the amount expected to be received.' },
	{ term: 'Expense recognition principle', lo: 'C2', aliases: ['Matching principle'], definition: 'Record the expenses that helped generate revenue in the same period as that revenue.' },
	{ term: 'Full disclosure principle', lo: 'C2', definition: 'A company reports the details behind financial statements that would impact a user’s decisions.' },
	{ term: 'Going-concern assumption', lo: 'C2', definition: 'Accounting information reflects the assumption that a business will continue operating, not liquidate.' },
	{ term: 'Monetary unit assumption', lo: 'C2', definition: 'Transactions and events are expressed in monetary, or money, units.' },
	{ term: 'Time period assumption', lo: 'C2', definition: 'An organization’s activities can be divided into specific time periods such as a month, a quarter, or a year.' },
	{ term: 'Business entity assumption', lo: 'C2', definition: 'A business is accounted for separately from its owner or owners and from any other entity.' },
	{ term: 'Materiality constraint', lo: 'C2', definition: 'Financial information is material if it would influence the decision of a reasonable user.' },
	{ term: 'Benefit exceeds cost constraint', lo: 'C2', definition: 'Information disclosed only if the benefit of doing so exceeds the cost of providing it.' },
	{ term: 'Sole proprietorship', lo: 'C3', definition: 'A business owned by one person that has unlimited liability and is not taxed separately.' },
	{ term: 'Partnership', lo: 'C3', definition: 'A business owned by two or more people that has unlimited liability and is not taxed separately.' },
	{ term: 'Corporation', lo: 'C3', definition: 'A business owned by one or more shareholders and legally separate from them, with limited liability.' },
	{ term: 'Assets', lo: 'A1', definition: 'Resources a company owns or controls that are expected to provide future benefits.' },
	{ term: 'Liabilities', lo: 'A1', definition: 'Obligations to transfer assets or provide products or services to others in the future.' },
	{ term: 'Equity', lo: 'A1', definition: 'The owners’ claim on assets, after subtracting liabilities. Equity = Assets − Liabilities.' },
	{ term: 'Common stock', lo: 'A1', definition: 'The equity account recording amounts received from investors in exchange for shares of ownership.' },
	{ term: 'Dividends', lo: 'A1', definition: 'Distributions of a corporation’s earnings to its shareholders, which reduce equity.' },
	{ term: 'Revenues', lo: 'A1', definition: 'The increase in equity from a company’s earning activities, such as selling products or services.' },
	{ term: 'Expenses', lo: 'A1', definition: 'The cost of assets or services used to earn revenues, which decreases equity.' },
	{ term: 'Accounting equation', lo: 'A1', definition: 'Assets = Liabilities + Equity. It always stays in balance, transaction by transaction.' },
	{ term: 'Expanded accounting equation', lo: 'A1', definition: 'Assets = Liabilities + Common Stock − Dividends + Revenues − Expenses.' },
	{ term: 'Net income', lo: 'P1', definition: 'The amount earned after subtracting all expenses from all revenues for a period.' },
	{ term: 'Net loss', lo: 'P1', definition: 'The amount by which expenses exceed revenues for a period.' },
	{ term: 'Income statement', lo: 'P1', definition: 'The financial statement that reports revenues less expenses, equaling net income, for a period.' },
	{ term: 'Statement of retained earnings', lo: 'P1', definition: 'The financial statement that reports how retained earnings changed from net income and dividends over a period.' },
	{ term: 'Balance sheet', lo: 'P1', definition: 'The financial statement that reports a company’s assets, liabilities, and equity as of a point in time.' },
	{ term: 'Statement of cash flows', lo: 'P1', definition: 'The financial statement that reports cash inflows and outflows for a period, by operating, investing, and financing activity.' },
	{ term: 'Return on assets', lo: 'A2', definition: 'Net income divided by average total assets; a measure of how efficiently a company uses its assets to generate income.' }
];

export const quickChecks: QuickCheck[] = [
	{
		lo: 'C1',
		q: 'A bank deciding whether to lend FastForward money is an example of:',
		options: ['An internal user', 'An external user', 'Managerial accounting', 'A source document'],
		answer: 1,
		why: 'The bank is outside the organization, using its financial reports to decide — an external user.'
	},
	{
		lo: 'C2',
		q: 'Reporting a $30,000 truck at what it cost, not what it might sell for, follows:',
		options: ['The going-concern assumption', 'The measurement (cost) principle', 'The materiality constraint', 'The business entity assumption'],
		answer: 1,
		why: 'The measurement principle bases accounting information on actual cost, which is objective and verifiable.'
	},
	{
		lo: 'C3',
		q: 'Which business form exposes its owner to unlimited personal liability?',
		options: ['Corporation', 'Sole proprietorship', 'S corporation', 'None of these'],
		answer: 1,
		why: 'A sole proprietorship has no legal separation between the owner and the business, so the owner is personally liable.'
	},
	{
		lo: 'A1',
		q: 'FastForward buys $2,500 of supplies for cash. The effect on the accounting equation is:',
		options: [
			'Assets increase, liabilities increase',
			'One asset increases, another decreases; no change to liabilities or equity',
			'Assets increase, equity increases',
			'No effect until the supplies are used'
		],
		answer: 1,
		why: 'Supplies (an asset) goes up by $2,500 and Cash (an asset) goes down by $2,500. Total assets do not change.'
	},
	{
		lo: 'A1',
		q: 'Which transaction pulls equity down?',
		options: [
			'Providing consulting services for cash',
			'Collecting cash from a client on account',
			'Paying a cash dividend',
			'Buying equipment for cash'
		],
		answer: 2,
		why: 'Dividends reduce equity directly. Revenues push equity up; collecting a receivable and buying equipment only swap assets.'
	},
	{
		lo: 'P1',
		q: 'The four financial statements are prepared in which order?',
		options: [
			'Balance sheet, income statement, statement of retained earnings, statement of cash flows',
			'Income statement, statement of retained earnings, balance sheet, statement of cash flows',
			'Statement of cash flows, income statement, balance sheet, statement of retained earnings',
			'They can be prepared in any order'
		],
		answer: 1,
		why: 'Net income flows into the statement of retained earnings, whose ending balance flows into the balance sheet, whose cash balance is confirmed by the statement of cash flows.'
	}
];

/* ---------- The ten transactions, as equation-level steps (no debits/credits yet) ---------- */

export interface EquationStep {
	entryIds: string[];
	label: string;
}
/** Chapter 2's entries 1–11, with the rent and salary payments (6 and 7) shown as
 * one combined transaction here — same ledger entries, same numbers, just one
 * fewer line on screen, per the brief. */
export const equationSteps: EquationStep[] = [
	{ entryIds: ['1'], label: 'Chas Taylor invests $30,000 cash in exchange for common stock.' },
	{ entryIds: ['2'], label: 'Buys supplies for $2,500 cash.' },
	{ entryIds: ['3'], label: 'Buys equipment for $26,000 cash.' },
	{ entryIds: ['4'], label: 'Buys $7,100 of supplies on credit.' },
	{ entryIds: ['5'], label: 'Provides consulting services for $4,200 cash.' },
	{ entryIds: ['6', '7'], label: 'Pays $1,000 rent and $700 salary.' },
	{ entryIds: ['8'], label: 'Provides $1,600 of consulting and $300 of rental on credit.' },
	{ entryIds: ['9'], label: 'Collects $1,900 from the client in the transaction above.' },
	{ entryIds: ['10'], label: 'Pays $900 of the account payable.' },
	{ entryIds: ['11'], label: 'Pays a $200 cash dividend.' }
];
export const equationEntries: Entry[] = decemberTransactions.filter((e) =>
	equationSteps.some((s) => s.entryIds.includes(e.id))
);

/** How each of the ten transactions' cash effect is classified on the statement
 * of cash flows. A modeling decision (which section a transaction belongs in),
 * not a number — the dollar figures are still summed from the real entries. */
export const CASH_FLOW_CATEGORY: Record<string, 'operating' | 'investing' | 'financing'> = {
	'1': 'financing',
	'2': 'operating',
	'3': 'investing',
	'5': 'operating',
	'6': 'operating',
	'7': 'operating',
	'9': 'operating',
	'10': 'operating',
	'11': 'financing'
};

/* ---------- Business form switcher (Wild's exhibit; unconfirmed [book?]) ---------- */

export interface BusinessForm {
	id: string;
	name: string;
	ownerLiability: 'Unlimited' | 'Limited';
	taxedSeparately: boolean;
	sharesTransferFreely: boolean;
}
/** `[book?]` — from Wild's exhibit comparing business forms, reconstructed
 * without the book open. Confirm against Richard's copy before relying on it
 * further; the site does not change these without that check. */
export const businessForms: BusinessForm[] = [
	{ id: 'sole-prop', name: 'Sole proprietorship', ownerLiability: 'Unlimited', taxedSeparately: false, sharesTransferFreely: false },
	{ id: 'partnership', name: 'Partnership', ownerLiability: 'Unlimited', taxedSeparately: false, sharesTransferFreely: false },
	{ id: 'llc', name: 'LLC', ownerLiability: 'Limited', taxedSeparately: false, sharesTransferFreely: false },
	{ id: 's-corp', name: 'S corporation', ownerLiability: 'Limited', taxedSeparately: false, sharesTransferFreely: true },
	{ id: 'corporation', name: 'Corporation', ownerLiability: 'Limited', taxedSeparately: true, sharesTransferFreely: true }
];

/* ---------- Classification drill: ten transactions, equation-effect multiple choice ---------- */

const eqOptions = (correct: string, distractors: string[]) => [
	{ id: 'a', label: correct },
	...distractors.map((d, i) => ({ id: String.fromCharCode(98 + i), label: d }))
];
export const classifications: Classification[] = [
	{
		lo: 'A1',
		text: 'Chas Taylor invests $30,000 cash in exchange for common stock.',
		answer: 'a',
		why: 'Cash (an asset) goes up. Common stock (equity) goes up by the same amount.',
		options: eqOptions('Cash +30,000 · Common stock +30,000', ['Cash +30,000 · Revenue +30,000', 'Common stock +30,000 · Liabilities +30,000'])
	},
	{
		lo: 'A1',
		text: 'Buys supplies for $2,500 cash.',
		answer: 'a',
		why: 'One asset (Supplies) replaces another (Cash). Total assets do not change.',
		options: eqOptions('Supplies +2,500 · Cash −2,500', ['Supplies +2,500 · Accounts payable +2,500', 'Cash +2,500 · Supplies −2,500'])
	},
	{
		lo: 'A1',
		text: 'Buys equipment for $26,000 cash.',
		answer: 'a',
		why: 'One asset (Equipment) replaces another (Cash).',
		options: eqOptions('Equipment +26,000 · Cash −26,000', ['Equipment +26,000 · Liabilities +26,000', 'Cash +26,000 · Equipment −26,000'])
	},
	{
		lo: 'A1',
		text: 'Buys $7,100 of supplies on credit.',
		answer: 'a',
		why: 'Supplies (an asset) goes up, and so does Accounts payable (a liability) — cash has not moved.',
		options: eqOptions('Supplies +7,100 · Accounts payable +7,100', ['Supplies +7,100 · Cash −7,100', 'Accounts payable +7,100 · Equity −7,100'])
	},
	{
		lo: 'A1',
		text: 'Provides consulting services for $4,200 cash.',
		answer: 'a',
		why: 'Cash goes up, and Revenues (which push equity up) go up by the same amount.',
		options: eqOptions('Cash +4,200 · Revenues +4,200', ['Cash +4,200 · Common stock +4,200', 'Revenues +4,200 · Accounts receivable +4,200'])
	},
	{
		lo: 'A1',
		text: 'Pays $1,000 rent and $700 salary.',
		answer: 'a',
		why: 'Cash goes down $1,700. Expenses, which pull equity down, go up $1,700.',
		options: eqOptions('Cash −1,700 · Expenses +1,700', ['Cash −1,700 · Liabilities +1,700', 'Expenses +1,700 · Equity +1,700'])
	},
	{
		lo: 'A1',
		text: 'Provides $1,600 of consulting and $300 of rental on credit.',
		answer: 'a',
		why: 'Accounts receivable (an asset) goes up, and Revenues go up — the work is done, even though cash has not arrived.',
		options: eqOptions('Accounts receivable +1,900 · Revenues +1,900', ['Cash +1,900 · Revenues +1,900', 'Accounts receivable +1,900 · Unearned revenue +1,900'])
	},
	{
		lo: 'A1',
		text: 'Collects $1,900 from the client in the transaction above.',
		answer: 'a',
		why: 'One asset (Cash) replaces another (Accounts receivable). This is not revenue — it was already recorded.',
		options: eqOptions('Cash +1,900 · Accounts receivable −1,900', ['Cash +1,900 · Revenues +1,900', 'Accounts receivable +1,900 · Cash −1,900'])
	},
	{
		lo: 'A1',
		text: 'Pays $900 of the account payable.',
		answer: 'a',
		why: 'Cash (an asset) and Accounts payable (a liability) both go down by the same amount.',
		options: eqOptions('Cash −900 · Accounts payable −900', ['Cash −900 · Expenses +900', 'Accounts payable −900 · Equity +900'])
	},
	{
		lo: 'A1',
		text: 'Pays a $200 cash dividend.',
		answer: 'a',
		why: 'Cash goes down. Dividends, which pull equity down, go up — but dividends are never an expense.',
		options: eqOptions('Cash −200 · Dividends +200', ['Cash −200 · Expenses +200', 'Dividends +200 · Liabilities +200'])
	}
];

/* ---------- Derived ledger and figures ---------- */

const bal = post(accounts, equationEntries);
export const totalAssets = ['101', '106', '126', '128', '167'].reduce((s, n) => s + bal.get(n)!.balance, 0);
export const totalLiabilities = bal.get('201')!.balance;
export const commonStock = bal.get('307')!.balance;
export const dividends = bal.get('319')!.balance;
export const revenues = bal.get('403')!.balance + bal.get('406')!.balance;
export const expenses = bal.get('640')!.balance + bal.get('622')!.balance;
export const netIncome = revenues - expenses;
export const endingRE = netIncome - dividends;
export const totalEquity = commonStock + endingRE;

function cashEffect(e: Entry): number {
	const line = e.lines.find((l) => l.acct === '101');
	if (!line) return 0;
	return (line.dr ?? 0) - (line.cr ?? 0);
}
function cashFlowTotal(category: 'operating' | 'investing' | 'financing'): number {
	return round(
		equationEntries
			.filter((e) => CASH_FLOW_CATEGORY[e.id] === category)
			.reduce((s, e) => s + cashEffect(e), 0)
	);
}
export const cashFlows = {
	operating: cashFlowTotal('operating'),
	investing: cashFlowTotal('investing'),
	financing: cashFlowTotal('financing')
};
export const netCashIncrease = round(cashFlows.operating + cashFlows.investing + cashFlows.financing);

/** The "change December's rent to $1,500" scenario the statement-chain
 * instrument shows — same entries, one amount changed, recomputed. `[built]`
 * on top of the `[ledger]` data. */
export function statementsWithRent(rent: number) {
	const otherExpenses = expenses - 1000; // subtract the real $1,000 rent, add the hypothetical
	const newExpenses = otherExpenses + rent;
	const newNetIncome = revenues - newExpenses;
	const newEndingRE = newNetIncome - dividends;
	const rentDelta = rent - 1000;
	const newOperatingCash = cashFlows.operating - rentDelta;
	const newCash = round(newOperatingCash + cashFlows.investing + cashFlows.financing);
	const newTotalAssets = round(totalAssets - rentDelta);
	return {
		netIncome: round(newNetIncome),
		endingRE: round(newEndingRE),
		cash: newCash,
		totalAssets: newTotalAssets,
		totalEquity: round(commonStock + newEndingRE)
	};
}

/* ---------- Return on assets — a standalone worked example, not FastForward's ---------- */

export const returnOnAssetsExample = {
	company: 'A retailer',
	netIncome: 20000,
	beginningAssets: 180000,
	endingAssets: 220000,
	get averageAssets() {
		return (this.beginningAssets + this.endingAssets) / 2;
	},
	get roa() {
		return this.netIncome / this.averageAssets;
	}
};

export const formulas: Formula[] = [
	{
		lo: 'A1',
		formula: 'Assets = Liabilities + Equity',
		worked: `${fmt(totalAssets, { dollar: true })} = ${fmt(totalLiabilities, { dollar: true })} + ${fmt(totalEquity, { dollar: true })}`
	},
	{
		lo: 'A1',
		formula: 'Assets = Liabilities + Common stock − Dividends + Revenues − Expenses',
		worked: `${fmt(totalAssets, { dollar: true })} = ${fmt(totalLiabilities)} + ${fmt(commonStock)} − ${fmt(dividends)} + ${fmt(revenues)} − ${fmt(expenses)}`
	},
	{
		lo: 'P1',
		formula: 'Net income = Revenues − Expenses',
		worked: `${fmt(revenues)} − ${fmt(expenses)} = ${fmt(netIncome)}`
	},
	{
		lo: 'P1',
		formula: 'Ending retained earnings = Beginning retained earnings + Net income − Dividends',
		worked: `0 + ${fmt(netIncome)} − ${fmt(dividends)} = ${fmt(endingRE)}`
	},
	{
		lo: 'A2',
		formula: 'Return on assets = Net income ÷ Average total assets',
		worked: `${fmt(returnOnAssetsExample.netIncome, { dollar: true })} ÷ ${fmt(returnOnAssetsExample.averageAssets, { dollar: true })} = ${(returnOnAssetsExample.roa * 100).toFixed(1)}%`
	}
];

/* ---------- Lessons (Learn) and instruments (Lab) ---------- */

export const lessons: LessonMeta[] = [
	{ id: 'accounting', title: 'What accounting is for', lo: 'C1' },
	{ id: 'principles', title: 'The rules behind the numbers', lo: 'C2' },
	{ id: 'forms', title: 'Choosing a business form', lo: 'C3' },
	{ id: 'equation', title: 'The accounting equation', lo: 'A1' },
	{ id: 'statements', title: 'The four statements', lo: 'P1' },
	{ id: 'return-on-assets', title: 'Return on assets', lo: 'A2' }
];

export const instruments: InstrumentMeta[] = [
	{
		id: 'equation-balance',
		title: 'Equation balance',
		lo: 'A1',
		instruction: "Apply FastForward's first ten transactions one at a time and keep both sides of the equation equal.",
		resultLine: `Assets ${fmt(totalAssets, { dollar: true })} = Liabilities ${fmt(totalLiabilities, { dollar: true })} + Equity ${fmt(totalEquity, { dollar: true })}`,
		noticed:
			'Buying supplies with cash changed nothing on the right side. Paying rent did — expenses come out of equity.'
	},
	{
		id: 'statement-chain',
		title: 'Statement chain',
		lo: 'P1',
		instruction: "Change December's rent and follow it from the income statement to the balance sheet.",
		resultLine: `Net income ${fmt(netIncome, { dollar: true })} → Retained earnings ${fmt(endingRE, { dollar: true })} → Equity ${fmt(totalEquity, { dollar: true })}`,
		noticed: 'One number changed, and it moved through all four statements. That is why they are prepared in this order.'
	},
	{
		id: 'business-form-switcher',
		title: 'Business form switcher',
		lo: 'C3',
		instruction: 'Switch the business form and watch owner liability and taxation change.',
		resultLine: 'Corporation — limited liability · taxed as a business · shares transfer freely',
		noticed: 'Only the corporation pays tax as a business, which is why its owners can be taxed twice.'
	}
];

export const journalPatterns: Entry[] = equationEntries;

export const chapter: ChapterContent = {
	meta: {
		number: 1,
		slug: 'accounting-in-business',
		title: 'Accounting in Business',
		part: 'financial',
		status: 'live',
		summary: 'What accounting is for, who uses it, and the equation everything rests on.',
		instrument: 'Equation balance',
		oneLine:
			'What accounting is for, who relies on it, and the one equation every transaction has to keep in balance.',
		headline: `After ten transactions, FastForward's **${fmt(totalAssets, { dollar: true })} of assets = ${fmt(totalLiabilities, { dollar: true })} of liabilities + ${fmt(totalEquity, { dollar: true })} of equity.**`
	},
	objectives,
	terms,
	quickChecks,
	accounts,
	classifications,
	formulas,
	lessons,
	instruments,
	journalPatterns,
	ledgers: [{ label: 'FastForward, first ten transactions (equation form)', company, entries: equationEntries }],
	anchors: () => {
		const a: Anchor[] = [
			{ label: 'Cash', expected: 4800, actual: bal.get('101')!.balance },
			{ label: 'Supplies', expected: 9600, actual: bal.get('126')!.balance },
			{ label: 'Equipment', expected: 26000, actual: bal.get('167')!.balance },
			{ label: 'Total assets', expected: 40400, actual: totalAssets },
			{ label: 'Accounts payable (total liabilities)', expected: 6200, actual: totalLiabilities },
			{ label: 'Total equity', expected: 34200, actual: totalEquity },
			{ label: 'Revenues', expected: 6100, actual: revenues },
			{ label: 'Expenses', expected: 1700, actual: expenses },
			{ label: 'Net income', expected: 4400, actual: netIncome },
			{ label: 'Ending retained earnings', expected: 4200, actual: endingRE },
			{ label: 'Net cash from operating activities', expected: 1000, actual: cashFlows.operating },
			{ label: 'Net cash used by investing activities', expected: -26000, actual: cashFlows.investing },
			{ label: 'Net cash from financing activities', expected: 29800, actual: cashFlows.financing },
			{ label: 'Net increase in cash', expected: 4800, actual: netCashIncrease },
			{
				label: 'Return on assets worked example',
				expected: 0.1,
				actual: returnOnAssetsExample.roa
			}
		];
		const withRent = statementsWithRent(1500);
		a.push({ label: 'Statement chain: net income at $1,500 rent', expected: 3900, actual: withRent.netIncome });
		a.push({ label: 'Statement chain: ending RE at $1,500 rent', expected: 3700, actual: withRent.endingRE });
		a.push({ label: 'Statement chain: cash at $1,500 rent', expected: 4300, actual: withRent.cash });
		a.push({ label: 'Statement chain: total assets at $1,500 rent', expected: 39900, actual: withRent.totalAssets });
		return a;
	},
	invariants: () => {
		if (equationEntries.length !== 11)
			throw new Error(`Chapter 1 should use 11 real entries across 10 steps, has ${equationEntries.length}`);
		if (equationSteps.length !== 10)
			throw new Error(`Chapter 1 should have 10 equation steps, has ${equationSteps.length}`);
		for (const c of classifications) {
			if (!c.options.some((o) => o.id === c.answer))
				throw new Error(`Classification answer not in options: ${c.text}`);
		}
		for (const q of quickChecks) {
			if (q.answer < 0 || q.answer >= q.options.length)
				throw new Error(`Quick check answer out of range: ${q.q}`);
		}
		const seen = new Set<string>();
		for (const t of terms) {
			const k = t.term.toLowerCase();
			if (seen.has(k)) throw new Error(`Duplicate term ${t.term}`);
			seen.add(k);
			if (!objectives.some((o) => o.code === t.lo))
				throw new Error(`Term ${t.term} cites unknown objective ${t.lo}`);
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
		if (businessForms.length !== 5)
			throw new Error(`Business form switcher should have 5 forms, has ${businessForms.length}`);
	}
};
