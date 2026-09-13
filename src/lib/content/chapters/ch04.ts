import { accountNameOf, fmt, post, round, statements } from '$lib/ledger';
import type { Account, Entry } from '$lib/ledger';
import type {
	Anchor,
	ChapterContent,
	Classification,
	Company,
	EntryCardSpec,
	Formula,
	InstrumentMeta,
	LessonMeta,
	Objective,
	QuickCheck,
	Rule,
	Term
} from '../types';

/**
 * Objective codes are not given in the brief, so this grouping is mine —
 * built to match the brief's own structure, not lifted from Wild's printed
 * list.
 */
export const objectives: Objective[] = [
	{
		code: 'C1',
		kind: 'conceptual',
		short: 'Merchandiser basics',
		text: 'Describe merchandising activities, the operating cycle, and the difference between a perpetual and a periodic inventory system.'
	},
	{
		code: 'C2',
		kind: 'conceptual',
		short: 'Buying merchandise',
		text: 'Analyze and record purchase transactions, including credit terms, purchase discounts, purchase returns and allowances, and transportation costs.'
	},
	{
		code: 'C3',
		kind: 'conceptual',
		short: 'Selling merchandise',
		text: 'Analyze and record sale transactions, including sales discounts and sales returns and allowances, and the two entries every sale needs.'
	},
	{
		code: 'A1',
		kind: 'analytical',
		short: 'Discount decision',
		text: 'Compute the implied annual rate of skipping a purchase discount and use it to decide whether to pay early.'
	},
	{
		code: 'A2',
		kind: 'analytical',
		short: 'Acid-test ratio',
		text: "Compute the acid-test ratio and explain why merchandise inventory is left out of it."
	},
	{
		code: 'P1',
		kind: 'procedural',
		short: 'Journalizing',
		text: 'Record merchandise purchases and sales under the perpetual system, using the gross method.'
	},
	{
		code: 'P2',
		kind: 'procedural',
		short: 'Income statement formats',
		text: 'Prepare multiple-step and single-step income statements from the same underlying figures.'
	}
];

export const terms: Term[] = [
	{ term: 'Merchandise', lo: 'C1', definition: 'Products a company owns and intends to sell to customers.' },
	{ term: 'Merchandiser', lo: 'C1', definition: 'A company that earns revenue by buying and selling products rather than making or performing them.' },
	{ term: 'Wholesaler', lo: 'C1', definition: 'A merchandiser that buys from manufacturers and sells to other merchandisers, not to the final consumer.' },
	{ term: 'Retailer', lo: 'C1', definition: 'A merchandiser that buys from wholesalers or manufacturers and sells to the final consumer.' },
	{ term: 'Merchandise inventory', lo: 'C1', definition: "Products a merchandiser owns and holds for resale, reported as a current asset." },
	{ term: 'Cost of goods sold', lo: 'C1', definition: 'The cost of the merchandise a company sold during a period; an expense matched against the revenue from those sales.' },
	{ term: 'Gross profit (gross margin)', lo: 'C1', definition: 'Net sales minus cost of goods sold — what is left before operating expenses.' },
	{ term: 'Operating cycle', lo: 'C1', definition: 'The time it takes a merchandiser to spend cash on inventory and collect cash from selling it.' },
	{ term: 'Perpetual inventory system', lo: 'C1', definition: 'A system that updates the Merchandise inventory account continuously, with each purchase and each sale.' },
	{ term: 'Periodic inventory system', lo: 'C1', definition: 'A system that updates Merchandise inventory only at period end, by physically counting what remains.' },
	{ term: 'Invoice', lo: 'C2', definition: "An itemized statement of goods sold, listing quantities, prices, and credit terms — the buyer's source document for a purchase." },
	{ term: 'List price', lo: 'C2', definition: 'The price a seller normally asks for an item, before any trade discount.' },
	{ term: 'Trade discount', lo: 'C2', definition: "A reduction from list price used to arrive at the invoice price. It is never recorded — only the discounted price enters the books." },
	{ term: 'Credit terms', lo: 'C2', definition: 'The time allowed for payment, and any discount for paying within part of that time — for example, 2/10, n/30.' },
	{ term: 'Credit period', lo: 'C2', definition: 'The full time allowed before the invoice is due in full — the "n" number in credit terms.' },
	{ term: 'Discount period', lo: 'C2', definition: 'The time period in which a discount is available for early payment — the first number in credit terms.' },
	{ term: 'EOM', lo: 'C2', definition: "\"End of month\" — credit terms measured from the end of the month of sale rather than the invoice date." },
	{ term: 'Purchases discount', lo: 'C2', definition: 'A cash discount taken by a buyer for paying within the discount period; under the perpetual system, it reduces Merchandise inventory.' },
	{ term: 'Purchases returns', lo: 'C2', definition: 'A reduction in a purchase because the buyer sent unwanted or defective goods back to the seller.' },
	{ term: 'Purchases allowances', lo: 'C2', definition: "A reduction in the price a buyer owes because of a problem with a purchase, granted without returning the goods." },
	{ term: 'Sales discount', lo: 'C3', definition: 'A cash discount a seller offers a buyer for early payment; a contra-revenue account, subtracted from Sales.' },
	{ term: 'Sales returns', lo: 'C3', definition: 'Merchandise customers return to the seller after a sale.' },
	{ term: 'Sales allowances', lo: 'C3', definition: 'A reduction in what a customer owes because of a problem with a sale, granted without a return of goods.' },
	{ term: 'FOB shipping point', lo: 'C2', definition: 'Ownership of goods passes to the buyer when the goods leave the seller’s dock; the buyer owns them in transit and pays the freight.' },
	{ term: 'FOB destination', lo: 'C2', definition: 'Ownership of goods passes to the buyer only when the goods arrive; the seller owns them in transit and pays the freight, as a selling expense.' },
	{ term: 'Shrinkage', lo: 'C1', definition: 'Inventory lost to theft, damage, or error, discovered when a physical count comes up short of the records.' },
	{ term: 'Multiple-step income statement', lo: 'P2', definition: 'An income statement format that separates gross profit and income from operations from other revenues, gains, expenses, and losses.' },
	{ term: 'Single-step income statement', lo: 'P2', definition: 'An income statement format that groups all revenues together and all expenses together, in one subtraction.' },
	{ term: 'Selling expenses', lo: 'P2', definition: 'Expenses of promoting sales, such as advertising, sales salaries, and delivery of goods sold.' },
	{ term: 'General and administrative expenses', lo: 'P2', definition: 'Expenses of running the business as a whole rather than selling — office salaries, for example.' },
	{ term: 'Gross margin ratio', lo: 'P2', definition: 'Gross profit divided by net sales; the share of each sales dollar left after covering the cost of the goods sold.' },
	{ term: 'Acid-test (quick) ratio', lo: 'A2', definition: 'Cash, short-term investments, and current receivables, divided by current liabilities — a stricter test than the current ratio because it excludes inventory.' },
	{
		term: 'Sales refund payable',
		lo: 'C3',
		definition:
			'A liability for expected future returns, estimated at period end so revenue is not overstated. [book?] — check whether this edition introduces it in this chapter.'
	}
];

export const quickChecks: QuickCheck[] = [
	{
		lo: 'C1',
		q: 'A company buys finished furniture from a manufacturer and resells it to households. It is:',
		options: ['A wholesaler', 'A retailer', 'A service company', 'A manufacturer'],
		answer: 1,
		why: 'It sells to the final consumer, not to another merchandiser — that makes it a retailer.'
	},
	{
		lo: 'C2',
		q: 'An invoice reads "2/10, n/30." Paid on day 25, the buyer owes:',
		options: ['2% less than the invoice price', 'The full invoice price', 'A late fee', 'Nothing — 30 days have not passed'],
		answer: 1,
		why: 'The discount only applies inside 10 days. By day 25 it is gone, but the full 30-day credit period has not expired either.'
	},
	{
		lo: 'C2',
		q: 'Freight paid on merchandise bought FOB shipping point is:',
		options: ['A selling expense', 'Added to Merchandise inventory', 'Not recorded', 'A reduction of Accounts payable'],
		answer: 1,
		why: 'FOB shipping point: the buyer owns goods in transit and pays the freight, which becomes part of what the inventory cost.'
	},
	{
		lo: 'C3',
		q: 'A sale on credit, under the perpetual system, requires:',
		options: ['One entry, at the selling price', 'One entry, at cost', 'Two entries — price and cost', 'No entry until cash is collected'],
		answer: 2,
		why: 'One entry records revenue at the selling price; a separate entry moves the goods’ cost out of inventory into cost of goods sold.'
	},
	{
		lo: 'P2',
		q: 'Multiple-step and single-step income statements, built from the same year’s figures, differ in:',
		options: ['Net income', 'Total revenues', 'Whether gross profit and operating income are shown separately', 'Total assets'],
		answer: 2,
		why: 'Same bottom line either way. The multiple-step format shows gross profit and income from operations on the way down; single-step does not.'
	},
	{
		lo: 'A2',
		q: 'Merchandise inventory is left out of the acid-test ratio because:',
		options: [
			'It is never worth anything',
			'It still has to be sold and collected before it becomes cash',
			'It is a liability, not an asset',
			'GAAP forbids including it'
		],
		answer: 1,
		why: 'The acid-test ratio only counts assets already cash or one step from it. Inventory has to sell, and then the receivable has to be collected.'
	}
];

/* ---------- Chart of accounts, shared across this chapter's five small companies ---------- */

const ALL_ACCOUNTS: Account[] = [
	{ num: '101', name: 'Cash', type: 'asset' },
	{ num: '102', name: 'Short-term investments', type: 'asset' },
	{ num: '106', name: 'Accounts receivable', type: 'asset' },
	{ num: '119', name: 'Merchandise inventory', type: 'asset' },
	{ num: '201', name: 'Accounts payable', type: 'liability' },
	{ num: '307', name: 'Common stock', type: 'equity' },
	{ num: '318', name: 'Retained earnings', type: 'equity' },
	{ num: '319', name: 'Dividends', type: 'contra-equity' },
	{ num: '413', name: 'Sales', type: 'revenue' },
	{ num: '415', name: 'Sales returns and allowances', type: 'contra-revenue' },
	{ num: '416', name: 'Sales discounts', type: 'contra-revenue' },
	{ num: '502', name: 'Cost of goods sold', type: 'expense' },
	{ num: '601', name: 'Selling expenses', type: 'expense' },
	{ num: '602', name: 'General and administrative expenses', type: 'expense' },
	{ num: '655', name: 'Delivery expense', type: 'expense' },
	{ num: '801', name: 'Interest revenue', type: 'revenue' },
	{ num: '802', name: 'Interest expense', type: 'expense' }
];
function acctsFor(nums: string[]): Account[] {
	return ALL_ACCOUNTS.filter((a) => nums.includes(a.num));
}
export const accounts = ALL_ACCOUNTS;
export const accountName = accountNameOf(ALL_ACCOUNTS);

const CONTRA_REVENUE_OF = { '415': '413', '416': '413' };

/* ---------- Z-Mart: entry drill items 1–6 [book?] — reconstructed without the book open ---------- */

const zMartAccounts = acctsFor(['101', '119', '201', '307', '318', '319']);
const zMartCompany: Company = {
	name: 'Z-Mart',
	accounts: zMartAccounts,
	retainedEarningsAcct: '318',
	dividendsAcct: '319',
	contraOf: {}
};
const zMartEntries: Entry[] = [
	{
		id: 'z0',
		date: '2025-11-01',
		lines: [{ acct: '101', dr: 5000 }, { acct: '307', cr: 5000 }],
		explanation: 'Owner invests $5,000 cash for common stock'
	},
	{
		id: 'z0b',
		date: '2025-11-03',
		lines: [{ acct: '119', dr: 300 }, { acct: '201', cr: 300 }],
		explanation: 'Buys $300 of merchandise on credit, terms 2/10, n/30'
	},
	{
		id: '1',
		date: '2025-11-05',
		lines: [{ acct: '119', dr: 500 }, { acct: '101', cr: 500 }],
		explanation: 'Buys $500 of merchandise for cash'
	},
	{
		id: '2',
		date: '2025-11-08',
		lines: [{ acct: '119', dr: 500 }, { acct: '201', cr: 500 }],
		explanation: 'Buys $500 of merchandise on credit, terms 2/10, n/30'
	},
	{
		id: '3',
		date: '2025-11-17',
		lines: [{ acct: '201', dr: 500 }, { acct: '119', cr: 10 }, { acct: '101', cr: 490 }],
		explanation: 'Pays the invoice from entry 2 within the discount period'
	},
	{
		id: '4',
		date: '2025-11-10',
		lines: [{ acct: '201', dr: 50 }, { acct: '119', cr: 50 }],
		explanation: 'Returns $50 of defective goods bought on credit'
	},
	{
		id: '5',
		date: '2025-11-12',
		lines: [{ acct: '201', dr: 30 }, { acct: '119', cr: 30 }],
		explanation: 'Keeps damaged goods and receives a $30 allowance'
	},
	{
		id: '6',
		date: '2025-11-05',
		lines: [{ acct: '119', dr: 75 }, { acct: '101', cr: 75 }],
		explanation: 'Pays $75 freight on goods bought FOB shipping point'
	}
];
const zMartBalances = post(zMartAccounts, zMartEntries);
export const zMart = { company: zMartCompany, entries: zMartEntries, balances: zMartBalances };

/* ---------- Harborview Trading: entry drill items 7–11 [built] — the book's example doesn't cover these patterns ---------- */

const harborviewAccounts = acctsFor(['101', '106', '119', '307', '318', '319', '413', '415', '416', '502', '655']);
const harborviewCompany: Company = {
	name: 'Harborview Trading',
	accounts: harborviewAccounts,
	retainedEarningsAcct: '318',
	dividendsAcct: '319',
	contraOf: {},
	contraRevenueOf: CONTRA_REVENUE_OF
};
const harborviewEntries: Entry[] = [
	{
		id: 'h0',
		date: '2025-12-01',
		lines: [{ acct: '101', dr: 10000 }, { acct: '307', cr: 10000 }],
		explanation: 'Owner invests $10,000 cash for common stock'
	},
	{
		id: 'h0b',
		date: '2025-12-02',
		lines: [{ acct: '119', dr: 2000 }, { acct: '101', cr: 2000 }],
		explanation: 'Buys $2,000 of merchandise for cash'
	},
	{
		id: '7-price',
		date: '2025-12-05',
		lines: [{ acct: '106', dr: 2400 }, { acct: '413', cr: 2400 }],
		explanation: 'Sells goods on credit for $2,400 — the price entry'
	},
	{
		id: '7-cost',
		date: '2025-12-05',
		lines: [{ acct: '502', dr: 1600 }, { acct: '119', cr: 1600 }],
		explanation: 'The goods sold cost $1,600 — the cost entry'
	},
	{
		id: '8-price',
		date: '2025-12-08',
		lines: [{ acct: '415', dr: 800 }, { acct: '106', cr: 800 }],
		explanation: 'Customer returns $800 of those goods — the price entry'
	},
	{
		id: '8-cost',
		date: '2025-12-08',
		lines: [{ acct: '119', dr: 600 }, { acct: '502', cr: 600 }],
		explanation: 'The returned goods cost $600 and go back to inventory — the cost entry'
	},
	{
		id: '9',
		date: '2025-12-15',
		lines: [{ acct: '101', dr: 980 }, { acct: '416', dr: 20 }, { acct: '106', cr: 1000 }],
		explanation: 'Customer pays a $1,000 invoice within terms 2/10, n/30'
	},
	{
		id: '10',
		date: '2025-12-16',
		lines: [{ acct: '655', dr: 60 }, { acct: '101', cr: 60 }],
		explanation: 'Pays $60 to deliver goods sold FOB destination'
	},
	{
		id: '11',
		date: '2025-12-31',
		lines: [{ acct: '502', dr: 250 }, { acct: '119', cr: 250 }],
		explanation: 'Year-end count: inventory is $250 less than the records show'
	}
];
const harborviewBalances = post(harborviewAccounts, harborviewEntries);
const harborviewFs = statements(harborviewBalances, harborviewCompany);
export const harborview = { company: harborviewCompany, entries: harborviewEntries, balances: harborviewBalances, fs: harborviewFs };

/* ---------- Cobalt Mercantile: the hero — Merchandise flow [built] ---------- */

const heroAccounts = acctsFor(['101', '106', '119', '201', '307', '318', '319', '413', '415', '416', '502']);
const heroCompany: Company = {
	name: 'Cobalt Mercantile',
	accounts: heroAccounts,
	retainedEarningsAcct: '318',
	dividendsAcct: '319',
	contraOf: {},
	contraRevenueOf: CONTRA_REVENUE_OF
};
export interface HeroStep {
	id: string;
	label: string;
	entryIds: string[];
}
export const heroSteps: HeroStep[] = [
	{ id: 'buy', label: 'Buy 10 units at $50 each, on credit, terms 2/10, n/30.', entryIds: ['c1'] },
	{ id: 'pay', label: 'Pay within 10 days, taking the discount.', entryIds: ['c2'] },
	{ id: 'sell', label: 'Sell 6 units at $100 each, on credit, same terms.', entryIds: ['c3-price', 'c3-cost'] },
	{ id: 'return', label: 'Customer returns 1 unit in resalable condition.', entryIds: ['c4-price', 'c4-cost'] },
	{ id: 'collect', label: 'Customer pays within 10 days, taking the discount.', entryIds: ['c5'] }
];
const heroEntries: Entry[] = [
	{
		id: 'c0',
		date: '2025-10-01',
		lines: [{ acct: '101', dr: 500 }, { acct: '307', cr: 500 }],
		explanation: 'Owner invests $500 cash for common stock'
	},
	{
		id: 'c1',
		date: '2025-10-03',
		lines: [{ acct: '119', dr: 500 }, { acct: '201', cr: 500 }],
		explanation: 'Buys 10 units at $50 each, on credit, terms 2/10, n/30'
	},
	{
		id: 'c2',
		date: '2025-10-12',
		lines: [{ acct: '201', dr: 500 }, { acct: '119', cr: 10 }, { acct: '101', cr: 490 }],
		explanation: 'Pays within 10 days, taking the discount — unit cost is now $49'
	},
	{
		id: 'c3-price',
		date: '2025-10-15',
		lines: [{ acct: '106', dr: 600 }, { acct: '413', cr: 600 }],
		explanation: 'Sells 6 units at $100 each, on credit — the price entry'
	},
	{
		id: 'c3-cost',
		date: '2025-10-15',
		lines: [{ acct: '502', dr: 294 }, { acct: '119', cr: 294 }],
		explanation: 'The 6 units sold cost $49 each, $294 total — the cost entry'
	},
	{
		id: 'c4-price',
		date: '2025-10-17',
		lines: [{ acct: '415', dr: 100 }, { acct: '106', cr: 100 }],
		explanation: 'Customer returns 1 unit — the price entry'
	},
	{
		id: 'c4-cost',
		date: '2025-10-17',
		lines: [{ acct: '119', dr: 49 }, { acct: '502', cr: 49 }],
		explanation: 'The returned unit goes back on the shelf at $49 — the cost entry'
	},
	{
		id: 'c5',
		date: '2025-10-24',
		lines: [{ acct: '101', dr: 490 }, { acct: '416', dr: 10 }, { acct: '106', cr: 500 }],
		explanation: 'Customer pays within 10 days, taking the discount'
	}
];
export const hero = { company: heroCompany, entries: heroEntries };

const heroFinalBalances = post(heroAccounts, heroEntries);
const heroFs = statements(heroFinalBalances, heroCompany);
export const netSales = round(heroFs.income.totalRevenues);
export const costOfGoodsSold = round(heroFs.income.totalExpenses);
export const grossProfit = round(heroFs.income.netIncome);
export const grossMarginRatio = round(grossProfit / netSales);
export const heroEndingInventory = round(heroFinalBalances.get('119')!.balance);
export const heroUnitsBought = 10;
export const heroUnitsSold = 6;
export const heroUnitsReturned = 1;
export const heroUnitCostAfterDiscount = round(490 / heroUnitsBought); // discounted cost basis ÷ units bought
/** Net unit change on the shelf after each of heroSteps, in order. */
export const heroUnitDeltas = [heroUnitsBought, 0, -heroUnitsSold, heroUnitsReturned, 0];

/* ---------- The discount decision, drawn straight from Z-Mart's own entries 2 and 3 ---------- */

const invoiceAmount = zMartEntries.find((e) => e.id === '2')!.lines.find((l) => l.acct === '201')!.cr!;
const earlyPaymentEntry = zMartEntries.find((e) => e.id === '3')!;
const discountTaken = earlyPaymentEntry.lines.find((l) => l.acct === '119')!.cr!;
const earlyPaymentCash = earlyPaymentEntry.lines.find((l) => l.acct === '101')!.cr!;
export const discountDecision = {
	invoiceAmount,
	earlyPaymentCash,
	discountTaken,
	discountDays: 10,
	creditDays: 30,
	get daysGained() {
		return this.creditDays - this.discountDays;
	},
	get impliedAnnualRate() {
		return round((discountTaken / earlyPaymentCash) * (365 / this.daysGained) * 10000) / 10000;
	}
};

/* ---------- Ridgeline Traders: income statement formats [built] ---------- */

const ridgelineAccounts = acctsFor(['101', '119', '307', '318', '319', '413', '415', '416', '502', '601', '602', '801', '802']);
const ridgelineCompany: Company = {
	name: 'Ridgeline Traders',
	accounts: ridgelineAccounts,
	retainedEarningsAcct: '318',
	dividendsAcct: '319',
	contraOf: {},
	contraRevenueOf: CONTRA_REVENUE_OF
};
const ridgelineEntries: Entry[] = [
	{
		id: 'r0',
		date: '2025-01-01',
		lines: [{ acct: '119', dr: 130000 }, { acct: '307', cr: 130000 }],
		explanation: 'Opening inventory and capital for the year (illustrative)'
	},
	{
		id: 'r1',
		date: '2025-12-31',
		lines: [{ acct: '101', dr: 200000 }, { acct: '413', cr: 200000 }],
		explanation: 'Aggregate sales for the year'
	},
	{
		id: 'r2',
		date: '2025-12-31',
		lines: [{ acct: '416', dr: 2000 }, { acct: '101', cr: 2000 }],
		explanation: 'Aggregate sales discounts taken by customers'
	},
	{
		id: 'r3',
		date: '2025-12-31',
		lines: [{ acct: '415', dr: 8000 }, { acct: '101', cr: 8000 }],
		explanation: 'Aggregate sales returns and allowances'
	},
	{
		id: 'r4',
		date: '2025-12-31',
		lines: [{ acct: '502', dr: 114000 }, { acct: '119', cr: 114000 }],
		explanation: 'Cost of goods sold for the year'
	},
	{
		id: 'r5',
		date: '2025-12-31',
		lines: [{ acct: '601', dr: 30000 }, { acct: '101', cr: 30000 }],
		explanation: 'Selling expenses for the year'
	},
	{
		id: 'r6',
		date: '2025-12-31',
		lines: [{ acct: '602', dr: 25000 }, { acct: '101', cr: 25000 }],
		explanation: 'General and administrative expenses for the year'
	},
	{
		id: 'r7',
		date: '2025-12-31',
		lines: [{ acct: '101', dr: 1000 }, { acct: '801', cr: 1000 }],
		explanation: 'Interest revenue for the year'
	},
	{
		id: 'r8',
		date: '2025-12-31',
		lines: [{ acct: '802', dr: 2000 }, { acct: '101', cr: 2000 }],
		explanation: 'Interest expense for the year'
	}
];
const ridgelineBalances = post(ridgelineAccounts, ridgelineEntries);
const ridgelineFs = statements(ridgelineBalances, ridgelineCompany);
export const ridgeline = { company: ridgelineCompany, entries: ridgelineEntries, balances: ridgelineBalances, fs: ridgelineFs };

export const multipleStep = {
	sales: ridgelineBalances.get('413')!.balance,
	salesDiscounts: ridgelineBalances.get('416')!.balance,
	salesReturns: ridgelineBalances.get('415')!.balance,
	netSales: round(ridgelineFs.income.totalRevenues - 1000), // net sales excludes interest revenue
	costOfGoodsSold: ridgelineBalances.get('502')!.balance,
	get grossProfit() {
		return round(this.netSales - this.costOfGoodsSold);
	},
	sellingExpenses: ridgelineBalances.get('601')!.balance,
	adminExpenses: ridgelineBalances.get('602')!.balance,
	get incomeFromOperations() {
		return round(this.grossProfit - this.sellingExpenses - this.adminExpenses);
	},
	interestRevenue: ridgelineBalances.get('801')!.balance,
	interestExpense: ridgelineBalances.get('802')!.balance,
	get netIncome() {
		return round(this.incomeFromOperations + this.interestRevenue - this.interestExpense);
	}
};
export const singleStep = {
	totalRevenues: ridgelineFs.income.totalRevenues,
	totalExpenses: ridgelineFs.income.totalExpenses,
	netIncome: ridgelineFs.income.netIncome
};

/* ---------- Meridian Retail: the acid-test ratio [built] ---------- */

const meridianAccounts = acctsFor(['101', '102', '106', '119', '201', '307', '318', '319']);
const meridianCompany: Company = {
	name: 'Meridian Retail',
	accounts: meridianAccounts,
	retainedEarningsAcct: '318',
	dividendsAcct: '319',
	contraOf: {}
};
const meridianEntries: Entry[] = [
	{
		id: 'm0',
		date: '2025-12-31',
		lines: [
			{ acct: '101', dr: 8000 },
			{ acct: '102', dr: 2000 },
			{ acct: '106', dr: 10000 },
			{ acct: '119', dr: 5000 },
			{ acct: '201', cr: 16000 },
			{ acct: '307', cr: 9000 }
		],
		explanation: 'Year-end current position (illustrative snapshot)'
	}
];
const meridianBalances = post(meridianAccounts, meridianEntries);
export const meridian = { company: meridianCompany, entries: meridianEntries, balances: meridianBalances };
export const quickAssets = round(
	meridianBalances.get('101')!.balance + meridianBalances.get('102')!.balance + meridianBalances.get('106')!.balance
);
export const currentLiabilities = meridianBalances.get('201')!.balance;
export const acidTestRatio = round((quickAssets / currentLiabilities) * 10000) / 10000;

/* ---------- Classification drill ---------- */

const IS_CATEGORIES = [
	{ id: 'net-sales', label: 'Net sales' },
	{ id: 'cogs', label: 'Cost of goods sold' },
	{ id: 'selling', label: 'Selling expense' },
	{ id: 'admin', label: 'General and administrative expense' },
	{ id: 'other-rev', label: 'Other revenues and gains' },
	{ id: 'other-exp', label: 'Other expenses and losses' },
	{ id: 'not-is', label: 'Not on the income statement' }
];
export const classifications: Classification[] = [
	{ lo: 'P2', text: 'Sales discounts', options: IS_CATEGORIES, answer: 'net-sales', why: 'A contra revenue, subtracted from Sales.' },
	{ lo: 'P2', text: 'Sales returns and allowances', options: IS_CATEGORIES, answer: 'net-sales', why: 'A contra revenue.' },
	{ lo: 'P2', text: 'Freight paid on goods bought', options: IS_CATEGORIES, answer: 'cogs', why: 'Part of what the inventory cost; it flows out when sold.' },
	{ lo: 'P2', text: 'Inventory shrinkage', options: IS_CATEGORIES, answer: 'cogs', why: 'Goods gone without a sale are still a cost of the goods.' },
	{ lo: 'P2', text: 'Delivery expense on goods sold', options: IS_CATEGORIES, answer: 'selling', why: 'Freight-out is a cost of selling, not of buying.' },
	{ lo: 'P2', text: "Salespeople's salaries", options: IS_CATEGORIES, answer: 'selling', why: 'Paid to make sales.' },
	{ lo: 'P2', text: 'Advertising', options: IS_CATEGORIES, answer: 'selling', why: 'Spent to generate sales.' },
	{ lo: 'P2', text: 'Office salaries', options: IS_CATEGORIES, answer: 'admin', why: 'Running the business, not selling.' },
	{ lo: 'P2', text: 'Depreciation on office equipment', options: IS_CATEGORIES, answer: 'admin', why: 'Office, not store.' },
	{ lo: 'P2', text: 'Interest revenue', options: IS_CATEGORIES, answer: 'other-rev', why: 'Not from the main business of selling goods.' },
	{ lo: 'P2', text: 'Gain on sale of equipment', options: IS_CATEGORIES, answer: 'other-rev', why: 'Not from operations.' },
	{ lo: 'P2', text: 'Interest expense', options: IS_CATEGORIES, answer: 'other-exp', why: 'A financing cost, below operating income.' },
	{ lo: 'P2', text: 'Dividends', options: IS_CATEGORIES, answer: 'not-is', why: 'A distribution of equity, never an expense.' }
];

/* ---------- Entry drill: 11 situations, 13 cards (7 and 8 each split into their two entries) ---------- */

export const entryDrillAccounts = acctsFor(['101', '106', '119', '201', '307', '413', '415', '416', '502', '655']);
function card(id: string, prompt: string, entries: Entry[], hint?: string): EntryCardSpec {
	const entry = entries.find((e) => e.id === id);
	if (!entry) throw new Error(`Entry drill card references unknown entry ${id}`);
	return { lo: 'P1', prompt, entry, hint };
}
export const entryCards: EntryCardSpec[] = [
	card('1', 'Z-Mart buys $500 of merchandise for cash.', zMartEntries),
	card('2', 'Z-Mart buys $500 of merchandise on credit, terms 2/10, n/30.', zMartEntries),
	card('3', 'Z-Mart pays that invoice within the discount period.', zMartEntries, 'The discount reduces Merchandise inventory, not a revenue account.'),
	card('4', 'Z-Mart returns $50 of defective goods it had bought on credit.', zMartEntries),
	card('5', 'Z-Mart keeps damaged goods and receives a $30 allowance instead of returning them.', zMartEntries),
	card('6', 'Z-Mart pays $75 freight on goods bought FOB shipping point.', zMartEntries, 'FOB shipping point: freight-in is part of inventory cost.'),
	card('7-price', 'Harborview Trading sells goods on credit for $2,400 — the price entry.', harborviewEntries),
	card('7-cost', 'Those goods cost $1,600 — the cost entry for the same sale.', harborviewEntries, 'Two entries, one sale: revenue at price, cost of goods sold at cost.'),
	card('8-price', 'The customer returns $800 of those goods — the price entry.', harborviewEntries),
	card('8-cost', 'The returned goods cost $600 and are resalable — the cost entry.', harborviewEntries, 'A resalable return needs its cost entry, or the goods are back on the shelf but not in the books.'),
	card('9', 'The customer pays a $1,000 invoice within terms 2/10, n/30.', harborviewEntries),
	card('10', 'Harborview pays $60 to deliver goods sold FOB destination.', harborviewEntries, 'FOB destination: the seller pays, and it is a selling expense, not inventory cost.'),
	card('11', 'A year-end count finds inventory $250 less than the records show.', harborviewEntries, 'Shrinkage is debited to Cost of goods sold.')
];

/* ---------- Recall rules ---------- */

export const rules: Rule[] = [
	{
		lo: 'C3',
		prompt: 'How many journal entries does one sale on credit need, under the perpetual system?',
		options: [{ id: '1', label: 'One' }, { id: '2', label: 'Two' }, { id: '3', label: 'Three' }],
		answer: '2',
		why: 'One entry records revenue at the selling price; a separate entry moves cost out of inventory into cost of goods sold.'
	},
	{
		lo: 'C2',
		prompt: 'Credit terms read "2/10, n/30." Inside how many days is the discount available?',
		options: [{ id: 'a', label: '2 days' }, { id: 'b', label: '10 days' }, { id: 'c', label: '30 days' }],
		answer: 'b',
		why: '2 percent off inside 10 days, all of it due in 30.'
	},
	{
		lo: 'C2',
		prompt: 'FOB shipping point — who owns the goods in transit, and who pays the freight?',
		options: [{ id: 'a', label: 'The buyer' }, { id: 'b', label: 'The seller' }, { id: 'c', label: 'The carrier' }],
		answer: 'a',
		why: 'Title passes at the seller’s dock, so the buyer owns goods in transit and pays the freight — into inventory.'
	},
	{
		lo: 'C2',
		prompt: "FOB destination — the seller's freight cost is recorded as:",
		options: [{ id: 'a', label: 'Merchandise inventory' }, { id: 'b', label: 'Delivery expense' }, { id: 'c', label: 'Cost of goods sold' }],
		answer: 'b',
		why: 'The seller owns goods in transit under FOB destination, and expenses the freight as delivery expense.'
	},
	{
		lo: 'C2',
		prompt: 'A purchase discount taken by the buyer reduces which account?',
		options: [{ id: 'a', label: 'Merchandise inventory' }, { id: 'b', label: 'A discounts-earned revenue account' }, { id: 'c', label: 'Nothing — it is ignored' }],
		answer: 'a',
		why: 'Under the perpetual system there is no separate discounts account — the discount comes straight out of Merchandise inventory.'
	},
	{
		lo: 'C3',
		prompt: 'A sales discount taken by the customer is recorded as:',
		options: [{ id: 'a', label: 'A reduction of Merchandise inventory' }, { id: 'b', label: 'A contra-revenue account' }, { id: 'c', label: 'An operating expense' }],
		answer: 'b',
		why: 'Sales discounts are a contra-revenue account, subtracted from Sales to get net sales — it never touches inventory.'
	},
	{
		lo: 'C1',
		prompt: 'Where does inventory shrinkage get recorded?',
		options: [{ id: 'a', label: 'Debited to Cost of goods sold' }, { id: 'b', label: 'Credited to Sales' }, { id: 'c', label: 'It is not recorded' }],
		answer: 'a',
		why: 'A perpetual system catches shrinkage at the count: debit Cost of goods sold, credit Merchandise inventory.'
	}
];

/* ---------- Formulas ---------- */

export const formulas: Formula[] = [
	{
		lo: 'C3',
		formula: 'Net sales = Sales − Sales discounts − Sales returns and allowances',
		worked: `${fmt(heroFinalBalances.get('413')!.balance, { dollar: true })} − ${fmt(heroFinalBalances.get('416')!.balance, { dollar: true })} − ${fmt(heroFinalBalances.get('415')!.balance, { dollar: true })} = ${fmt(netSales, { dollar: true })}`
	},
	{
		lo: 'C1',
		formula: 'Gross profit = Net sales − Cost of goods sold',
		worked: `${fmt(netSales, { dollar: true })} − ${fmt(costOfGoodsSold, { dollar: true })} = ${fmt(grossProfit, { dollar: true })}`
	},
	{
		lo: 'P2',
		formula: 'Gross margin ratio = (Net sales − Cost of goods sold) ÷ Net sales',
		worked: `${fmt(grossProfit, { dollar: true })} ÷ ${fmt(netSales, { dollar: true })} = ${(grossMarginRatio * 100).toFixed(1)}%`
	},
	{
		lo: 'A2',
		formula: 'Acid-test ratio = (Cash + Short-term investments + Current receivables) ÷ Current liabilities',
		worked: `${fmt(quickAssets, { dollar: true })} ÷ ${fmt(currentLiabilities, { dollar: true })} = ${acidTestRatio.toFixed(2)}`
	},
	{
		lo: 'A1',
		formula: 'Implied annual rate of skipping a discount = Discount ÷ Discounted price × 365 ÷ Days gained',
		worked: `${fmt(discountDecision.discountTaken, { dollar: true })} ÷ ${fmt(discountDecision.earlyPaymentCash, { dollar: true })} × 365 ÷ ${discountDecision.daysGained} = ${(discountDecision.impliedAnnualRate * 100).toFixed(1)}%`
	}
];

/* ---------- Lessons (Learn) and instruments (Lab) ---------- */

export const lessons: LessonMeta[] = [
	{ id: 'merchandisers', title: 'Buying to resell', lo: 'C1' },
	{ id: 'purchases', title: 'Buying merchandise', lo: 'C2' },
	{ id: 'discount-decision', title: 'The discount decision', lo: 'A1' },
	{ id: 'sales', title: 'Selling merchandise', lo: 'C3' },
	{ id: 'income-statement', title: 'Two ways to report it', lo: 'P2' },
	{ id: 'acid-test', title: 'The acid-test ratio', lo: 'A2' }
];

export const instruments: InstrumentMeta[] = [
	{
		id: 'merchandise-flow',
		title: 'Merchandise flow',
		lo: 'C3',
		instruction: 'Sell units from the shelf and watch two entries fire for every sale.',
		resultLine: `Net sales ${fmt(netSales, { dollar: true })} − Cost of goods sold ${fmt(costOfGoodsSold, { dollar: true })} = Gross profit ${fmt(grossProfit, { dollar: true })} · Gross margin ${(grossMarginRatio * 100).toFixed(1)}%`,
		noticed:
			'The price entry never touched inventory, and the cost entry never touched Sales. Each sale needs both, or either revenue or inventory is wrong.'
	},
	{
		id: 'discount-decision',
		title: 'Discount decision',
		lo: 'A1',
		instruction: 'Move the payment day and see what skipping the discount really costs.',
		resultLine: `Skip the discount → ${(discountDecision.impliedAnnualRate * 100).toFixed(1)}% a year to borrow ${fmt(discountDecision.earlyPaymentCash, { dollar: true })} for ${discountDecision.daysGained} days`,
		noticed:
			'Two percent sounds small. Over 20 days it is dearer than almost any bank loan, so borrowing to pay early is usually worth it.'
	},
	{
		id: 'income-statement-formats',
		title: 'Income statement formats',
		lo: 'P2',
		instruction: 'Toggle between multiple-step and single-step on the same numbers.',
		resultLine: `Net income ${fmt(multipleStep.netIncome, { dollar: true })} in both formats`,
		noticed:
			'Same bottom line. The multiple-step format shows gross profit and operating income on the way down; single-step hides both.'
	}
];

/* ---------- Chapter export, anchors, invariants ---------- */

export const meta = {
	number: 4,
	slug: 'merchandising-operations',
	title: 'Accounting for Merchandising Operations',
	part: 'financial' as const,
	status: 'live' as const,
	summary: 'Inventory in, sales out, gross profit in between.',
	instrument: 'Merchandise flow',
	oneLine:
		'A store buys goods, sells them for more, and records every sale twice — once at the price, once at what the goods cost.',
	headline: '**Two entries per sale.** Revenue at the selling price, cost of goods sold at cost.'
};

export const chapter: ChapterContent = {
	meta,
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
	journalPatterns: entryCards.map((c) => c.entry),
	ledgers: [
		{ label: 'Z-Mart, opening merchandising transactions', company: zMartCompany, entries: zMartEntries },
		{ label: 'Harborview Trading, a sale and its aftermath', company: harborviewCompany, entries: harborviewEntries },
		{ label: 'Cobalt Mercantile, the hero sequence', company: heroCompany, entries: heroEntries },
		{ label: 'Ridgeline Traders, one year', company: ridgelineCompany, entries: ridgelineEntries },
		{ label: 'Meridian Retail, year-end current position', company: meridianCompany, entries: meridianEntries }
	],
	anchors: (): Anchor[] => [
		{ label: 'Hero: net sales', expected: 490, actual: netSales },
		{ label: 'Hero: cost of goods sold', expected: 245, actual: costOfGoodsSold },
		{ label: 'Hero: gross profit', expected: 245, actual: grossProfit },
		{ label: 'Hero: gross margin ratio', expected: 0.5, actual: grossMarginRatio },
		{ label: 'Hero: ending inventory (5 units × $49)', expected: 245, actual: heroEndingInventory },
		{ label: 'Implied annual rate, 2/10, n/30', expected: 0.372, actual: discountDecision.impliedAnnualRate },
		{ label: 'Format toggle: net income both formats', expected: 20000, actual: multipleStep.netIncome },
		{ label: 'Format toggle: net income both formats (single-step)', expected: 20000, actual: singleStep.netIncome },
		{ label: 'Acid-test ratio', expected: 1.25, actual: acidTestRatio }
	],
	invariants: () => {
		if (classifications.length !== 13)
			throw new Error(`Chapter 4 should have 13 classification items, has ${classifications.length}`);
		if (entryCards.length !== 13)
			throw new Error(`Chapter 4 should have 13 entry-drill cards, has ${entryCards.length}`);
		for (const c of classifications) {
			if (!c.options.some((o) => o.id === c.answer))
				throw new Error(`Classification answer not in options: ${c.text}`);
		}
		for (const r of rules) {
			if (!r.options.some((o) => o.id === r.answer))
				throw new Error(`Rule answer not in options: ${r.prompt}`);
		}
		if (multipleStep.netIncome !== singleStep.netIncome)
			throw new Error(
				`Multiple-step and single-step net income should match: ${multipleStep.netIncome} vs ${singleStep.netIncome}`
			);
		if (Math.abs(heroUnitCostAfterDiscount * heroEndingInventoryUnits() - heroEndingInventory) > 0.01)
			throw new Error('Hero ending inventory should equal remaining units times the discounted unit cost');
	}
};

function heroEndingInventoryUnits(): number {
	return heroUnitsBought - heroUnitsSold + heroUnitsReturned;
}
