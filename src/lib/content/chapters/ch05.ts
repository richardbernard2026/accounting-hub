import { accountNameOf, fmt, post, round } from '$lib/ledger';
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
		short: 'Costing methods',
		text: 'Describe specific identification, FIFO, LIFO, and weighted average, and explain that all four split the same goods available for sale.'
	},
	{
		code: 'C2',
		kind: 'conceptual',
		short: 'What counts as ours',
		text: 'Apply ownership rules — goods in transit, consigned goods — to decide what belongs in ending inventory.'
	},
	{
		code: 'C3',
		kind: 'conceptual',
		short: 'Lower of cost or market',
		text: 'Explain the conservatism constraint and apply the lower-of-cost-or-market rule to a inventory write-down.'
	},
	{
		code: 'A1',
		kind: 'analytical',
		short: 'Inventory errors',
		text: 'Analyze how an error in ending inventory misstates cost of goods sold and income in the current and following year.'
	},
	{
		code: 'A2',
		kind: 'analytical',
		short: 'Turnover',
		text: "Compute inventory turnover and days' sales in inventory, and explain what each measures."
	},
	{
		code: 'P1',
		kind: 'procedural',
		short: 'Journalizing',
		text: 'Record purchases and the cost of goods sold at cost under a perpetual system, for each costing method.'
	}
];

export const terms: Term[] = [
	{ term: 'Specific identification', lo: 'C1', definition: 'Costing method that tracks the actual cost of each specific unit sold and each unit remaining.' },
	{ term: 'First-in, first-out (FIFO)', lo: 'C1', definition: 'Costing method that assumes the earliest units purchased are the first ones sold.' },
	{ term: 'Last-in, first-out (LIFO)', lo: 'C1', definition: 'Costing method that assumes the most recently purchased units are the first ones sold.' },
	{ term: 'Weighted average', lo: 'C1', definition: 'Costing method that assigns a single average cost per unit, recomputed after each purchase, to all units.' },
	{ term: 'Consistency concept', lo: 'C1', definition: 'A company should use the same accounting methods period to period, or disclose a change and its effect.' },
	{ term: 'Goods in transit', lo: 'C2', definition: 'Goods shipped but not yet received by the buyer; owned by whoever holds title under the shipping terms.' },
	{ term: 'Consigned goods', lo: 'C2', definition: "Goods owned by one party (the consignor) but held and offered for sale by another (the consignee)." },
	{ term: 'Consignor', lo: 'C2', definition: 'The owner of consigned goods, who continues to own them until sold, even while another party holds them.' },
	{ term: 'Consignee', lo: 'C2', definition: 'The party holding and selling consigned goods on behalf of the owner, without ever owning them.' },
	{ term: 'Goods damaged or obsolete', lo: 'C2', definition: 'Goods still owned and countable in inventory, but reported at their net realizable value, not full cost.' },
	{ term: 'Net realizable value', lo: 'C2', definition: 'Expected sales price minus the cost to make the sale — what damaged or obsolete goods are actually worth.' },
	{ term: 'Lower of cost or market (LCM)', lo: 'C3', definition: "Inventory is reported at whichever is lower: its recorded cost, or its current market replacement cost." },
	{ term: 'Cost of goods available for sale', lo: 'C1', definition: 'Beginning inventory plus purchases during the period — the total that either sold or remains, however it is split.' },
	{ term: 'Conservatism constraint', lo: 'C3', definition: 'When in doubt, choose the accounting response least likely to overstate assets or income.' },
	{ term: 'Inventory turnover', lo: 'A2', definition: 'Cost of goods sold divided by average inventory — how many times inventory was sold and replaced in a period.' },
	{ term: "Days' sales in inventory", lo: 'A2', definition: 'Ending inventory divided by cost of goods sold, times 365 — roughly how many days it would take to sell off the inventory on hand.' },
	{ term: 'Periodic inventory system', lo: 'C1', definition: 'A system that updates Merchandise inventory only at period end, by physically counting what remains.' },
	{ term: 'Perpetual inventory system', lo: 'C1', definition: 'A system that updates Merchandise inventory continuously, with every purchase and every sale.' },
	{
		term: 'Retail inventory method',
		lo: 'C1',
		definition:
			'Estimates ending inventory at cost from its retail value, using the ratio of cost to retail price. [book?] — check whether this edition places it in this chapter.'
	},
	{
		term: 'Gross profit method',
		lo: 'C1',
		definition:
			'Estimates ending inventory from the historical gross profit ratio, without a physical count. [book?] — check whether this edition places it in this chapter.'
	}
];

export const quickChecks: QuickCheck[] = [
	{
		lo: 'C1',
		q: 'Costs are rising all year. Which method reports the highest ending inventory?',
		options: ['FIFO', 'LIFO', 'Weighted average', 'Specific identification'],
		answer: 0,
		why: 'FIFO leaves the newest, most expensive units in ending inventory when costs rise.'
	},
	{
		lo: 'C1',
		q: 'Every costing method starts from the same number. Which one?',
		options: ['Net income', 'Cost of goods available for sale', 'Ending inventory', 'Gross profit'],
		answer: 1,
		why: 'Beginning inventory plus purchases is fixed. Every method only decides how that total splits between cost of goods sold and ending inventory.'
	},
	{
		lo: 'C2',
		q: 'A store holds another company’s goods on consignment, unsold. Whose inventory are they?',
		options: ['The store’s (the consignee)', "The other company's (the consignor)", 'Split between both', "Nobody's, until sold"],
		answer: 1,
		why: 'The consignor owns consigned goods until they sell, no matter who is holding or displaying them.'
	},
	{
		lo: 'C3',
		q: '100 units cost $20 each; replacement cost has fallen to $17. Under LCM, inventory is reported at:',
		options: ['$2,000, the original cost', '$1,700, the lower market value', 'The average of the two', 'Whichever the company prefers'],
		answer: 1,
		why: 'LCM never carries inventory above what it could be replaced or sold for — the loss is recognized now.'
	},
	{
		lo: 'A1',
		q: "Last year's ending inventory was overstated by $2,000. Left uncorrected, this year's beginning inventory is:",
		options: ['Overstated by $2,000', 'Understated by $2,000', 'Unaffected', 'Overstated by $4,000'],
		answer: 0,
		why: "This year's beginning inventory is last year's ending inventory — the error carries straight in."
	},
	{
		lo: 'A2',
		q: 'A high inventory turnover, other things equal, means:',
		options: [
			'Inventory is selling and being replaced quickly',
			'The company is overstocked',
			'Cost of goods sold is understated',
			'The company uses LIFO'
		],
		answer: 0,
		why: 'Turnover measures how many times inventory cycled through during the period — higher means faster movement.'
	}
];

/* ---------- Chart of accounts ---------- */

const ALL_ACCOUNTS: Account[] = [
	{ num: '101', name: 'Cash', type: 'asset' },
	{ num: '106', name: 'Accounts receivable', type: 'asset' },
	{ num: '119', name: 'Merchandise inventory', type: 'asset' },
	{ num: '201', name: 'Accounts payable', type: 'liability' },
	{ num: '307', name: 'Common stock', type: 'equity' },
	{ num: '318', name: 'Retained earnings', type: 'equity' },
	{ num: '319', name: 'Dividends', type: 'contra-equity' },
	{ num: '413', name: 'Sales', type: 'revenue' },
	{ num: '502', name: 'Cost of goods sold', type: 'expense' }
];
function acctsFor(nums: string[]): Account[] {
	return ALL_ACCOUNTS.filter((a) => nums.includes(a.num));
}
export const accounts = ALL_ACCOUNTS;
export const accountName = accountNameOf(ALL_ACCOUNTS);
const TREKKING_NUMS = ['101', '106', '119', '201', '307', '318', '319', '413', '502'];

/* ---------- The perpetual cost-flow model: FIFO, LIFO, weighted average ---------- */

export type Method = 'fifo' | 'lifo' | 'wavg';
export const METHODS: { id: Method; label: string }[] = [
	{ id: 'fifo', label: 'FIFO' },
	{ id: 'lifo', label: 'LIFO' },
	{ id: 'wavg', label: 'Weighted average' }
];

export interface Layer {
	units: number;
	cost: number; // per unit
}

function purchaseInto(layers: Layer[], units: number, cost: number, method: Method): Layer[] {
	if (method === 'wavg') {
		const existing = layers[0] ?? { units: 0, cost: 0 };
		const totalUnits = existing.units + units;
		const totalCost = round(existing.units * existing.cost + units * cost);
		return [{ units: totalUnits, cost: round(totalCost / totalUnits) }];
	}
	return [...layers, { units, cost }];
}

function drainFrom(layers: Layer[], units: number, method: Method): { cogs: number; layers: Layer[] } {
	if (method === 'wavg') {
		const l = layers[0];
		const cogs = round(l.cost * units);
		return { cogs, layers: [{ units: l.units - units, cost: l.cost }] };
	}
	let remaining = units;
	let cogs = 0;
	const stack = layers.map((l) => ({ ...l }));
	while (remaining > 0) {
		const idx = method === 'fifo' ? 0 : stack.length - 1;
		const l = stack[idx];
		const take = Math.min(l.units, remaining);
		cogs = round(cogs + take * l.cost);
		l.units -= take;
		remaining -= take;
		if (l.units === 0) stack.splice(idx, 1);
	}
	return { cogs, layers: stack };
}

export interface Transaction {
	date: string;
	label: string;
	kind: 'purchase' | 'sale';
	units: number;
	unitCost?: number; // purchases
	unitPrice?: number; // sales
}

/** Trekking Company, August, confirmed against the book [book]. */
export const transactions: Transaction[] = [
	{ date: 'Aug 1', label: 'Beginning inventory: 10 units @ $91', kind: 'purchase', units: 10, unitCost: 91 },
	{ date: 'Aug 3', label: 'Purchase: 15 units @ $106', kind: 'purchase', units: 15, unitCost: 106 },
	{ date: 'Aug 14', label: 'Sale: 20 units @ $130', kind: 'sale', units: 20, unitPrice: 130 },
	{ date: 'Aug 17', label: 'Purchase: 20 units @ $115', kind: 'purchase', units: 20, unitCost: 115 },
	{ date: 'Aug 28', label: 'Purchase: 10 units @ $119', kind: 'purchase', units: 10, unitCost: 119 },
	{ date: 'Aug 31', label: 'Sale: 23 units @ $150', kind: 'sale', units: 23, unitPrice: 150 }
];

export interface StepState {
	layers: Layer[];
	cogs?: number;
	cumulativeCogs: number;
	cumulativeSales: number;
}

/** Replays `transactions` under one method, returning the layer state after each step. */
export function replay(method: Method): StepState[] {
	let layers: Layer[] = [];
	let cumulativeCogs = 0;
	let cumulativeSales = 0;
	const out: StepState[] = [];
	for (const t of transactions) {
		if (t.kind === 'purchase') {
			layers = purchaseInto(layers, t.units, t.unitCost!, method);
			out.push({ layers, cumulativeCogs, cumulativeSales });
		} else {
			const { cogs, layers: next } = drainFrom(layers, t.units, method);
			layers = next;
			cumulativeCogs = round(cumulativeCogs + cogs);
			cumulativeSales = round(cumulativeSales + t.units * t.unitPrice!);
			out.push({ layers, cogs, cumulativeCogs, cumulativeSales });
		}
	}
	return out;
}

const fifoSteps = replay('fifo');
const lifoSteps = replay('lifo');
const wavgSteps = replay('wavg');

export const goodsAvailableUnits = transactions
	.filter((t) => t.kind === 'purchase')
	.reduce((s, t) => s + t.units, 0);
export const goodsAvailableCost = round(
	transactions.filter((t) => t.kind === 'purchase').reduce((s, t) => s + t.units * t.unitCost!, 0)
);
export const unitsSold = transactions.filter((t) => t.kind === 'sale').reduce((s, t) => s + t.units, 0);
export const unitsRemaining = goodsAvailableUnits - unitsSold;
export const salesTotal = round(transactions.filter((t) => t.kind === 'sale').reduce((s, t) => s + t.units * t.unitPrice!, 0));

function endingInventory(steps: StepState[]): number {
	const last = steps[steps.length - 1];
	return round(last.layers.reduce((s, l) => s + l.units * l.cost, 0));
}
export const fifoCogs = fifoSteps[fifoSteps.length - 1].cumulativeCogs;
export const fifoEndingInv = endingInventory(fifoSteps);
export const lifoCogs = lifoSteps[lifoSteps.length - 1].cumulativeCogs;
export const lifoEndingInv = endingInventory(lifoSteps);
export const wavgCogs = wavgSteps[wavgSteps.length - 1].cumulativeCogs;
export const wavgEndingInv = endingInventory(wavgSteps);

/** Given directly by the book's own comparison; not independently derivable without knowing which physical units it sells. [book] */
export const specificId = { cogs: 4582, endingInv: 1408 };

export const grossProfit = {
	fifo: round(salesTotal - fifoCogs),
	lifo: round(salesTotal - lifoCogs),
	wavg: round(salesTotal - wavgCogs),
	specificId: round(salesTotal - specificId.cogs)
};

/* ---------- Three parallel ledgers, one per method, all sharing the same purchases ---------- */

function trekkingLedger(method: Method, cogs1: number, cogs2: number): { company: Company; entries: Entry[] } {
	const trekkingAccounts = acctsFor(TREKKING_NUMS);
	const company: Company = {
		name: `Trekking Company (${method.toUpperCase()})`,
		accounts: trekkingAccounts,
		retainedEarningsAcct: '318',
		dividendsAcct: '319',
		contraOf: {}
	};
	const entries: Entry[] = [
		{
			id: `${method}-open`,
			date: '2025-08-01',
			lines: [{ acct: '119', dr: 910 }, { acct: '307', cr: 910 }],
			explanation: 'Beginning inventory: 10 units at $91, funded by common stock'
		},
		{
			id: `${method}-aug3`,
			date: '2025-08-03',
			lines: [{ acct: '119', dr: 1590 }, { acct: '201', cr: 1590 }],
			explanation: 'Aug 3: buys 15 units at $106 on credit'
		},
		{
			id: `${method}-aug14-price`,
			date: '2025-08-14',
			lines: [{ acct: '106', dr: 2600 }, { acct: '413', cr: 2600 }],
			explanation: 'Aug 14: sells 20 units at $130 on credit — the price entry'
		},
		{
			id: `${method}-aug14-cost`,
			date: '2025-08-14',
			lines: [{ acct: '502', dr: cogs1 }, { acct: '119', cr: cogs1 }],
			explanation: `Aug 14: the cost entry under ${method.toUpperCase()}`
		},
		{
			id: `${method}-aug17`,
			date: '2025-08-17',
			lines: [{ acct: '119', dr: 2300 }, { acct: '201', cr: 2300 }],
			explanation: 'Aug 17: buys 20 units at $115 on credit'
		},
		{
			id: `${method}-aug28`,
			date: '2025-08-28',
			lines: [{ acct: '119', dr: 1190 }, { acct: '201', cr: 1190 }],
			explanation: 'Aug 28: buys 10 units at $119 on credit'
		},
		{
			id: `${method}-aug31-price`,
			date: '2025-08-31',
			lines: [{ acct: '106', dr: 3450 }, { acct: '413', cr: 3450 }],
			explanation: 'Aug 31: sells 23 units at $150 on credit — the price entry'
		},
		{
			id: `${method}-aug31-cost`,
			date: '2025-08-31',
			lines: [{ acct: '502', dr: cogs2 }, { acct: '119', cr: cogs2 }],
			explanation: `Aug 31: the cost entry under ${method.toUpperCase()}`
		}
	];
	return { company, entries };
}

export const fifoLedger = trekkingLedger('fifo', 1970, 2600);
export const lifoLedger = trekkingLedger('lifo', 2045, 2685);
export const wavgLedger = trekkingLedger('wavg', 2000, 2622);

/* ---------- Lower of cost or market: a small built company ---------- */

const lcmAccounts = acctsFor(['119', '307', '502']);
const lcmCompany: Company = {
	name: 'Palisade Hardware',
	accounts: lcmAccounts,
	retainedEarningsAcct: '318',
	dividendsAcct: '319',
	contraOf: {}
};
const lcmEntries: Entry[] = [
	{
		id: 'lcm-open',
		date: '2025-08-01',
		lines: [{ acct: '119', dr: 2000 }, { acct: '307', cr: 2000 }],
		explanation: '100 units on hand at $20 cost each, funded by common stock'
	},
	{
		id: '9',
		date: '2025-08-31',
		lines: [{ acct: '502', dr: 300 }, { acct: '119', cr: 300 }],
		explanation: 'Market value of 100 units falls from $20 cost to $17: write inventory down to market'
	}
];
const lcmBalances = post(lcmAccounts, lcmEntries);
export const lcm = {
	company: lcmCompany,
	entries: lcmEntries,
	units: 100,
	cost: 20,
	market: 17,
	get costTotal() {
		return this.units * this.cost;
	},
	get marketTotal() {
		return this.units * this.market;
	},
	get writeDown() {
		return round(this.costTotal - this.marketTotal);
	},
	endingInventory: lcmBalances.get('119')!.balance
};

/* ---------- Inventory error see-saw: a built company, formula-derived ---------- */

const ERROR_SEESAW_BASE = {
	beginningInv: 20000,
	purchases: 60000,
	sales: 100000,
	correctEndingY1: 18000,
	correctEndingY2: 22000
};

export interface ErrorSeesaw {
	overstatement: number;
	reportedEndingY1: number;
	correctCogsY1: number;
	reportedCogsY1: number;
	correctGpY1: number;
	reportedGpY1: number;
	correctCogsY2: number;
	reportedCogsY2: number;
	correctGpY2: number;
	reportedGpY2: number;
	swingY1: number;
	swingY2: number;
}

/** `overstatement` may be negative (an understatement) — the see-saw still balances. */
export function computeErrorSeesaw(overstatement: number): ErrorSeesaw {
	const b = ERROR_SEESAW_BASE;
	const reportedEndingY1 = b.correctEndingY1 + overstatement;
	const correctCogsY1 = round(b.beginningInv + b.purchases - b.correctEndingY1);
	const reportedCogsY1 = round(b.beginningInv + b.purchases - reportedEndingY1);
	const correctGpY1 = round(b.sales - correctCogsY1);
	const reportedGpY1 = round(b.sales - reportedCogsY1);
	// Year 2's correct beginning inventory is year 1's correct ending; its reported
	// beginning inventory carries the year-1 overstatement, but year 2's own physical
	// count is unaffected, so both years use the same correct ending inventory.
	const correctCogsY2 = round(b.correctEndingY1 + b.purchases - b.correctEndingY2);
	const reportedCogsY2 = round(reportedEndingY1 + b.purchases - b.correctEndingY2);
	const correctGpY2 = round(b.sales - correctCogsY2);
	const reportedGpY2 = round(b.sales - reportedCogsY2);
	return {
		overstatement,
		reportedEndingY1,
		correctCogsY1,
		reportedCogsY1,
		correctGpY1,
		reportedGpY1,
		correctCogsY2,
		reportedCogsY2,
		correctGpY2,
		reportedGpY2,
		swingY1: round(reportedGpY1 - correctGpY1),
		swingY2: round(reportedGpY2 - correctGpY2)
	};
}
export const errorSeesaw = computeErrorSeesaw(2000);
export const errorSeesawBase = ERROR_SEESAW_BASE;

/* ---------- Inventory turnover and days' sales in inventory ---------- */

export const beginningInvCost = 910; // Aug 1
export const averageInventory = round((beginningInvCost + fifoEndingInv) / 2);
// The book prints these ratios rounded to one decimal; match that precision exactly
// rather than round(), which rounds to two decimals.
export const inventoryTurnover = Math.round((fifoCogs / averageInventory) * 10) / 10;
export const daysSalesInInventory = Math.round((fifoEndingInv / fifoCogs) * 365 * 10) / 10;

/* ---------- Classification drill ---------- */

const OWNERSHIP_CATEGORIES = [
	{ id: 'count', label: 'Count it in our inventory' },
	{ id: 'leave', label: 'Leave it out' }
];
export const classifications: Classification[] = [
	{
		lo: 'C2',
		text: 'Goods we bought, in transit, shipped FOB shipping point',
		options: OWNERSHIP_CATEGORIES,
		answer: 'count',
		why: 'Ownership passed to us when they left the seller.'
	},
	{
		lo: 'C2',
		text: 'Goods we bought, in transit, shipped FOB destination',
		options: OWNERSHIP_CATEGORIES,
		answer: 'leave',
		why: 'The seller owns them until they arrive.'
	},
	{
		lo: 'C2',
		text: 'Goods we sold, in transit, shipped FOB shipping point',
		options: OWNERSHIP_CATEGORIES,
		answer: 'leave',
		why: 'The customer owns them once shipped.'
	},
	{
		lo: 'C2',
		text: 'Goods we sold, in transit, shipped FOB destination',
		options: OWNERSHIP_CATEGORIES,
		answer: 'count',
		why: 'Still ours until delivered.'
	},
	{
		lo: 'C2',
		text: 'Our goods held by another store on consignment',
		options: OWNERSHIP_CATEGORIES,
		answer: 'count',
		why: 'We are the consignor; we still own them.'
	},
	{
		lo: 'C2',
		text: "Another company's goods we hold on consignment",
		options: OWNERSHIP_CATEGORIES,
		answer: 'leave',
		why: 'We are the consignee; they are not ours.'
	},
	{
		lo: 'C2',
		text: 'Damaged goods we still own and can sell at a reduced price',
		options: OWNERSHIP_CATEGORIES,
		answer: 'count',
		why: 'At their net realizable value, not full cost.'
	}
];

/* ---------- Entry drill: 9 situations, 11 cards (two sales split into price/cost) ---------- */

export const entryDrillAccounts = acctsFor(['106', '119', '201', '413', '502']);
function findEntry(id: string, entries: Entry[]): Entry {
	const e = entries.find((x) => x.id === id);
	if (!e) throw new Error(`Entry drill card references unknown entry ${id}`);
	return e;
}
export const entryCards: EntryCardSpec[] = [
	{ lo: 'P1', prompt: 'Aug 3: buys 15 units at $106 on credit.', entry: findEntry('fifo-aug3', fifoLedger.entries) },
	{
		lo: 'P1',
		prompt: 'Aug 14: sells 20 units at $130 on credit, under FIFO — the price entry.',
		entry: findEntry('fifo-aug14-price', fifoLedger.entries)
	},
	{
		lo: 'P1',
		prompt: 'Aug 14, under FIFO — the cost entry.',
		entry: findEntry('fifo-aug14-cost', fifoLedger.entries),
		hint: 'FIFO drains the oldest layer first: 10 @ $91, then 10 @ $106.'
	},
	{ lo: 'P1', prompt: 'Aug 17: buys 20 units at $115 on credit.', entry: findEntry('fifo-aug17', fifoLedger.entries) },
	{
		lo: 'P1',
		prompt: 'Aug 31: sells 23 units at $150 on credit, under FIFO — the price entry.',
		entry: findEntry('fifo-aug31-price', fifoLedger.entries)
	},
	{
		lo: 'P1',
		prompt: 'Aug 31, under FIFO — the cost entry (5 @ $106 + 18 @ $115).',
		entry: findEntry('fifo-aug31-cost', fifoLedger.entries)
	},
	{
		lo: 'P1',
		prompt: 'The Aug 14 sale under LIFO — cost entry only.',
		entry: findEntry('lifo-aug14-cost', lifoLedger.entries),
		hint: 'LIFO drains the newest layer first: 15 @ $106, then 5 @ $91.'
	},
	{
		lo: 'P1',
		prompt: 'The Aug 31 sale under LIFO — cost entry only (10 @ $119 + 13 @ $115).',
		entry: findEntry('lifo-aug31-cost', lifoLedger.entries)
	},
	{
		lo: 'P1',
		prompt: 'The Aug 14 sale under weighted average — cost entry only.',
		entry: findEntry('wavg-aug14-cost', wavgLedger.entries),
		hint: 'Average cost after Aug 3 is $2,500 ÷ 25 units = $100.'
	},
	{
		lo: 'P1',
		prompt: 'The Aug 31 sale under weighted average — cost entry only (23 @ $114).',
		entry: findEntry('wavg-aug31-cost', wavgLedger.entries)
	},
	{
		lo: 'C3',
		prompt: 'Market value of 100 units falls from $20 cost to $17.',
		entry: findEntry('9', lcmEntries),
		hint: 'The write-down is debited to Cost of goods sold, credited to Merchandise inventory.'
	}
];

/* ---------- Recall rules ---------- */

export const rules: Rule[] = [
	{
		lo: 'C1',
		prompt: 'Costs are rising. Which method reports the highest income?',
		options: [{ id: 'a', label: 'FIFO' }, { id: 'b', label: 'LIFO' }, { id: 'c', label: 'Weighted average' }],
		answer: 'a',
		why: 'FIFO leaves the newest, priciest units in ending inventory and the oldest, cheapest units in cost of goods sold.'
	},
	{
		lo: 'C1',
		prompt: 'Costs are rising. Which method results in the lowest tax bill?',
		options: [{ id: 'a', label: 'FIFO' }, { id: 'b', label: 'LIFO' }, { id: 'c', label: 'Weighted average' }],
		answer: 'b',
		why: 'LIFO puts the newest, priciest units into cost of goods sold, which lowers reported income and the tax on it.'
	},
	{
		lo: 'C1',
		prompt: 'Every costing method starts from the same number and only changes:',
		options: [{ id: 'a', label: 'The split between cost of goods sold and ending inventory' }, { id: 'b', label: 'The total goods available for sale' }, { id: 'c', label: 'The units actually sold' }],
		answer: 'a',
		why: 'Goods available for sale is fixed. Every method only decides how that fixed total is split.'
	},
	{
		lo: 'A1',
		prompt: "An ending inventory overstated by $2,000 this year does what to this year's income?",
		options: [{ id: 'a', label: 'Overstates it by $2,000' }, { id: 'b', label: 'Understates it by $2,000' }, { id: 'c', label: 'No effect' }],
		answer: 'a',
		why: 'A higher ending inventory means a lower cost of goods sold, which overstates gross profit and income by the same amount.'
	},
	{
		lo: 'A1',
		prompt: 'That same $2,000 overstatement does what to next year’s income, left uncorrected?',
		options: [{ id: 'a', label: 'Understates it by $2,000' }, { id: 'b', label: 'Overstates it by $2,000' }, { id: 'c', label: 'No effect' }],
		answer: 'a',
		why: "This year's overstated ending inventory becomes next year's overstated beginning inventory, which overstates next year's cost of goods sold and understates its income."
	},
	{
		lo: 'C1',
		prompt: 'Which costing method is not permitted under IFRS?',
		options: [{ id: 'a', label: 'FIFO' }, { id: 'b', label: 'LIFO' }, { id: 'c', label: 'Weighted average' }],
		answer: 'b',
		why: 'LIFO is permitted under US GAAP but not IFRS.'
	},
	{
		lo: 'C1',
		prompt: 'The consistency concept requires a company to:',
		options: [{ id: 'a', label: 'Use the same method every period, or disclose a change' }, { id: 'b', label: 'Switch methods whenever it lowers taxes' }, { id: 'c', label: 'Use FIFO for external reports and LIFO for tax returns only' }],
		answer: 'a',
		why: 'Consistency lets readers compare one period to the next; a change is allowed only if disclosed.'
	}
];

/* ---------- Formulas ---------- */

export const formulas: Formula[] = [
	{
		lo: 'C1',
		formula: 'Goods available for sale = Beginning inventory + Purchases',
		worked: `${fmt(910, { dollar: true })} + ${fmt(1590, { dollar: true })} + ${fmt(2300, { dollar: true })} + ${fmt(1190, { dollar: true })} = ${fmt(goodsAvailableCost, { dollar: true })}`
	},
	{
		lo: 'C1',
		formula: 'Cost of goods sold = Goods available − Ending inventory',
		worked: `FIFO: ${fmt(goodsAvailableCost, { dollar: true })} − ${fmt(fifoEndingInv, { dollar: true })} = ${fmt(fifoCogs, { dollar: true })}`
	},
	{
		lo: 'P1',
		formula: 'Weighted average unit cost (perpetual) = Cost on hand ÷ Units on hand',
		worked: `After Aug 3: ${fmt(2500, { dollar: true })} ÷ 25 = $100. After Aug 28: ${fmt(3990, { dollar: true })} ÷ 35 = $114`
	},
	{
		lo: 'A2',
		formula: 'Inventory turnover = Cost of goods sold ÷ Average inventory',
		worked: `${fmt(fifoCogs, { dollar: true })} ÷ ((${fmt(beginningInvCost, { dollar: true })} + ${fmt(fifoEndingInv, { dollar: true })}) ÷ 2) = ${inventoryTurnover.toFixed(1)} times`
	},
	{
		lo: 'A2',
		formula: "Days' sales in inventory = Ending inventory ÷ Cost of goods sold × 365",
		worked: `${fmt(fifoEndingInv, { dollar: true })} ÷ ${fmt(fifoCogs, { dollar: true })} × 365 = ${daysSalesInInventory.toFixed(1)} days`
	}
];

/* ---------- Lessons (Learn) and instruments (Lab) ---------- */

export const lessons: LessonMeta[] = [
	{ id: 'costing-methods', title: 'Same goods, four ways to split the cost', lo: 'C1' },
	{ id: 'cost-layers', title: 'Watching the layers drain', lo: 'C1' },
	{ id: 'what-counts', title: 'What counts as ours', lo: 'C2' },
	{ id: 'inventory-errors', title: 'An error that corrects itself', lo: 'A1' },
	{ id: 'lower-of-cost-or-market', title: 'Never above what it is worth', lo: 'C3' },
	{ id: 'turnover', title: 'Turnover and days on the shelf', lo: 'A2' }
];

export const instruments: InstrumentMeta[] = [
	{
		id: 'cost-layers',
		title: 'Cost layers',
		lo: 'C1',
		instruction: 'Sell units and watch which layer drains.',
		resultLine: `FIFO COGS ${fmt(fifoCogs, { dollar: true })} · LIFO ${fmt(lifoCogs, { dollar: true })} · Weighted average ${fmt(wavgCogs, { dollar: true })} — goods available ${fmt(goodsAvailableCost, { dollar: true })} in all three`,
		noticed:
			'Total cost never changed. The methods only decided how $5,990 splits between cost of goods sold and ending inventory — and with rising costs, FIFO kept the expensive units on the balance sheet.'
	},
	{
		id: 'inventory-error-seesaw',
		title: 'Inventory error see-saw',
		lo: 'A1',
		instruction: "Overstate this year's ending inventory and watch next year's profit swing back.",
		resultLine: `Year 1 profit +${fmt(errorSeesaw.swingY1, { dollar: true })} · Year 2 profit ${fmt(errorSeesaw.swingY2, { dollar: true })} · Two-year total correct`,
		noticed:
			"The error corrected itself over two years, because this year's ending inventory is next year's beginning inventory."
	},
	{
		id: 'lower-of-cost-or-market',
		title: 'Lower of cost or market',
		lo: 'C3',
		instruction: 'Drop the market price below cost and watch the write-down reach cost of goods sold.',
		resultLine: `Inventory ${fmt(lcm.costTotal, { dollar: true })} → ${fmt(lcm.marketTotal, { dollar: true })} · Cost of goods sold +${fmt(lcm.writeDown, { dollar: true })}`,
		noticed:
			'Inventory is never carried above what it could be replaced or sold for. The loss is recognized now, not when the units sell.'
	}
];

/* ---------- Chapter export, anchors, invariants ---------- */

export const meta = {
	number: 5,
	slug: 'inventories',
	title: 'Inventories and Cost of Sales',
	part: 'financial' as const,
	status: 'live' as const,
	summary: 'Which cost leaves when a unit sells: FIFO, LIFO, weighted average.',
	instrument: 'Cost layers',
	oneLine:
		'When identical units were bought at different prices, the cost method decides which price leaves with each sale — and so how big profit looks.',
	headline: `**${fmt(goodsAvailableCost, { dollar: true })}** of goods available. FIFO, LIFO, and weighted average split it three different ways.`
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
		{ label: 'Trekking Company, FIFO', company: fifoLedger.company, entries: fifoLedger.entries },
		{ label: 'Trekking Company, LIFO', company: lifoLedger.company, entries: lifoLedger.entries },
		{ label: 'Trekking Company, weighted average', company: wavgLedger.company, entries: wavgLedger.entries },
		{ label: 'Palisade Hardware, lower of cost or market', company: lcmCompany, entries: lcmEntries }
	],
	anchors: (): Anchor[] => [
		{ label: 'Units available / cost available', expected: 5990, actual: goodsAvailableCost },
		{ label: 'Units sold', expected: 43, actual: unitsSold },
		{ label: 'Units in ending inventory', expected: 12, actual: unitsRemaining },
		{ label: 'Sales', expected: 6050, actual: salesTotal },
		{ label: 'FIFO cost of goods sold', expected: 4570, actual: fifoCogs },
		{ label: 'FIFO ending inventory', expected: 1420, actual: fifoEndingInv },
		{ label: 'LIFO cost of goods sold', expected: 4730, actual: lifoCogs },
		{ label: 'LIFO ending inventory', expected: 1260, actual: lifoEndingInv },
		{ label: 'Weighted average cost of goods sold', expected: 4622, actual: wavgCogs },
		{ label: 'Weighted average ending inventory', expected: 1368, actual: wavgEndingInv },
		{ label: 'Gross profit: FIFO', expected: 1480, actual: grossProfit.fifo },
		{ label: 'Gross profit: LIFO', expected: 1320, actual: grossProfit.lifo },
		{ label: 'Gross profit: weighted average', expected: 1428, actual: grossProfit.wavg },
		{ label: 'Gross profit: specific identification', expected: 1468, actual: grossProfit.specificId },
		{ label: 'Error see-saw: year 1 profit swing', expected: 2000, actual: errorSeesaw.swingY1 },
		{ label: 'Error see-saw: year 2 profit swing', expected: -2000, actual: errorSeesaw.swingY2 },
		{ label: 'LCM write-down', expected: 300, actual: lcm.writeDown },
		{ label: 'Inventory turnover', expected: 3.9, actual: inventoryTurnover },
		{ label: "Days' sales in inventory", expected: 113.4, actual: daysSalesInInventory }
	],
	invariants: () => {
		if (classifications.length !== 7)
			throw new Error(`Chapter 5 should have 7 classification items, has ${classifications.length}`);
		if (entryCards.length !== 11)
			throw new Error(`Chapter 5 should have 11 entry-drill cards, has ${entryCards.length}`);
		for (const c of classifications) {
			if (!c.options.some((o) => o.id === c.answer))
				throw new Error(`Classification answer not in options: ${c.text}`);
		}
		for (const r of rules) {
			if (!r.options.some((o) => o.id === r.answer))
				throw new Error(`Rule answer not in options: ${r.prompt}`);
		}
		const invariant = 5990;
		for (const [label, cogs, ending] of [
			['FIFO', fifoCogs, fifoEndingInv],
			['LIFO', lifoCogs, lifoEndingInv],
			['Weighted average', wavgCogs, wavgEndingInv],
			['Specific identification', specificId.cogs, specificId.endingInv]
		] as [string, number, number][]) {
			if (Math.abs(cogs + ending - invariant) > 0.01)
				throw new Error(`${label}: cost of goods sold + ending inventory should equal ${invariant}, got ${cogs + ending}`);
		}
	}
};
