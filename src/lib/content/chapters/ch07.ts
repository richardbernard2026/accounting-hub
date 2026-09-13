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
 * Every number in this chapter's brief is tagged [built] — the brief's own
 * "before building" note asks to confirm the book uses a 360-day year for
 * note interest, which needs the physical text (not available from here).
 * The brief's own worked numbers are already self-consistent on a 360-day
 * basis throughout, so built on that convention as written; see the final
 * report for this standing caveat.
 */
export const objectives: Objective[] = [
	{
		code: 'C1',
		kind: 'conceptual',
		short: 'Receivables basics',
		text: 'Describe accounts receivable, subsidiary ledgers, and how credit card sales are recorded.'
	},
	{
		code: 'C2',
		kind: 'conceptual',
		short: 'Two write-off methods',
		text: 'Contrast the direct write-off method and the allowance method for bad debts.'
	},
	{
		code: 'A1',
		kind: 'analytical',
		short: 'Estimating bad debts',
		text: 'Estimate bad debts using the percent of sales method and the percent of receivables (aging) method.'
	},
	{
		code: 'P1',
		kind: 'procedural',
		short: 'Journalizing',
		text: 'Record bad debts expense, write-offs, reinstatements, and notes receivable transactions.'
	},
	{
		code: 'P2',
		kind: 'procedural',
		short: 'Notes receivable',
		text: 'Compute interest and maturity value on a promissory note, and record its collection or dishonor.'
	},
	{
		code: 'A2',
		kind: 'analytical',
		short: 'Turnover',
		text: 'Compute accounts receivable turnover and explain what it measures.'
	}
];

export const terms: Term[] = [
	{ term: 'Accounts receivable', lo: 'C1', definition: 'Amounts owed to a company by its customers from selling goods or services on credit.' },
	{ term: 'Subsidiary ledger', lo: 'C1', definition: "A list of individual account balances that together add up to a single controlling account in the general ledger." },
	{ term: 'Credit card', lo: 'C1', definition: 'A card allowing its holder to buy on credit from participating merchants, who accept a fee for the convenience and reduced risk.' },
	{ term: 'Direct write-off method', lo: 'C2', definition: 'Records bad debts expense only when a specific account is judged uncollectible, with no allowance account.' },
	{ term: 'Allowance method', lo: 'C2', definition: 'Estimates and records bad debts expense before specific accounts are known to be uncollectible, using a contra-asset allowance.' },
	{ term: 'Bad debts', lo: 'C2', definition: 'Accounts receivable a company does not expect to collect.' },
	{ term: 'Allowance for doubtful accounts', lo: 'C2', definition: 'A contra-asset account estimating the amount of accounts receivable a company expects will prove uncollectible.' },
	{ term: 'Realizable (net realizable) value', lo: 'C2', definition: 'The amount of accounts receivable a company actually expects to collect: accounts receivable minus the allowance.' },
	{ term: 'Percent of sales method', lo: 'A1', definition: "Estimates bad debts expense as a percent of credit sales, added to whatever balance the allowance already carries." },
	{ term: 'Percent of receivables method', lo: 'A1', definition: 'Estimates the required ending balance of the allowance directly from accounts receivable; the expense is whatever adjusts the allowance to that target.' },
	{ term: 'Aging of accounts receivable', lo: 'A1', definition: 'Sorting individual accounts receivable by how long they have been outstanding, to estimate uncollectible amounts by age group.' },
	{ term: 'Materiality constraint', lo: 'C2', definition: 'An amount small enough that it would not affect a reasonable person’s decisions can be treated more simply, without violating GAAP.' },
	{ term: 'Promissory note', lo: 'P2', definition: 'A written promise to pay a specified amount, either on demand or at a definite future date.' },
	{ term: 'Principal', lo: 'P2', definition: 'The amount that a promissory note promises to pay, not including interest.' },
	{ term: 'Maker', lo: 'P2', definition: 'The person or entity who signs a note and promises to pay it at maturity.' },
	{ term: 'Payee', lo: 'P2', definition: 'The person or entity to whom a promissory note is made payable.' },
	{ term: 'Maturity date', lo: 'P2', definition: 'The date a note (and any interest) is due to be paid.' },
	{ term: 'Period of a note', lo: 'P2', definition: 'The time between a note’s issue date and its maturity date.' },
	{ term: 'Maturity value', lo: 'P2', definition: 'The amount due at a note’s maturity date: principal plus interest.' },
	{ term: 'Dishonored note', lo: 'P2', definition: "A note the maker fails to pay at maturity; the holder still records the interest it earned and moves the balance to accounts receivable." },
	{
		term: 'Pledging receivables',
		lo: 'C1',
		definition: 'Using accounts receivable as collateral for a loan, while still owning and collecting them.'
	},
	{ term: 'Factoring', lo: 'C1', definition: 'Selling accounts receivable to another party for immediate cash, usually at a discount.' },
	{ term: 'Factor', lo: 'C1', definition: 'A business that buys accounts receivable from another company in a factoring arrangement.' },
	{ term: 'Accounts receivable turnover', lo: 'A2', definition: 'Net sales divided by average accounts receivable; how many times receivables were collected and re-extended in a period.' }
];

export const quickChecks: QuickCheck[] = [
	{
		lo: 'C2',
		q: 'Under the allowance method, writing off a customer’s account debits:',
		options: ['Bad debts expense', 'Allowance for doubtful accounts', 'Accounts receivable only, no other account', 'Cash'],
		answer: 1,
		why: 'The expense was already recorded when the loss was estimated. A write-off only clears the specific account against the allowance.'
	},
	{
		lo: 'A1',
		q: 'The percent of sales method computes bad debts expense as a percent of credit sales, then:',
		options: [
			'Adds it to whatever the allowance already holds',
			'Replaces the allowance balance entirely',
			'Subtracts the existing allowance balance first',
			'Ignores the allowance account'
		],
		answer: 0,
		why: 'Percent of sales starts from the income statement and adds to the existing balance; it never looks at what the allowance already holds.'
	},
	{
		lo: 'A1',
		q: 'Aging the receivables says the allowance needs a $5,150 balance; it currently has a $650 credit balance. Bad debts expense is:',
		options: ['$5,150', '$650', '$4,500', '$5,800'],
		answer: 2,
		why: 'The percent of receivables method adjusts to the target: 5,150 − 650 = 4,500.'
	},
	{
		lo: 'P2',
		q: 'A $10,000, 12%, 90-day note, interest on a 360-day year, earns interest of:',
		options: ['$1,200', '$300', '$900', '$100'],
		answer: 1,
		why: '10,000 × 12% × 90/360 = 300.'
	},
	{
		lo: 'P2',
		q: 'A note is dishonored at maturity. The holder:',
		options: [
			'Writes the whole thing off as a loss',
			'Still records the interest earned and moves the balance to accounts receivable',
			'Reverses the original note entry as if it never happened',
			'Waits without recording anything until it is paid'
		],
		answer: 1,
		why: 'Dishonored does not mean forgiven — the maker still owes it. The holder records the interest earned and reclassifies the note as a receivable.'
	},
	{
		lo: 'A2',
		q: 'A rising accounts receivable turnover, other things equal, means:',
		options: [
			'Receivables are being collected faster',
			'The company is offering more credit',
			'Bad debts are increasing',
			'Sales are falling'
		],
		answer: 0,
		why: 'A higher turnover means receivables cycle through — are collected and re-extended — more times per period.'
	}
];

/* ---------- Chart of accounts ---------- */

const ALL_ACCOUNTS: Account[] = [
	{ num: '101', name: 'Cash', type: 'asset' },
	{ num: '106', name: 'Accounts receivable', type: 'asset' },
	{ num: '107', name: 'Allowance for doubtful accounts', type: 'contra-asset' },
	{ num: '108', name: 'Interest receivable', type: 'asset' },
	{ num: '109', name: 'Notes receivable', type: 'asset' },
	{ num: '307', name: 'Common stock', type: 'equity' },
	{ num: '318', name: 'Retained earnings', type: 'equity' },
	{ num: '319', name: 'Dividends', type: 'contra-equity' },
	{ num: '409', name: 'Interest revenue', type: 'revenue' },
	{ num: '413', name: 'Sales', type: 'revenue' },
	{ num: '520', name: 'Credit card expense', type: 'expense' },
	{ num: '521', name: 'Bad debts expense', type: 'expense' }
];
function acctsFor(nums: string[]): Account[] {
	return ALL_ACCOUNTS.filter((a) => nums.includes(a.num));
}
export const accounts = ALL_ACCOUNTS;
export const accountName = accountNameOf(ALL_ACCOUNTS);

/* ---------- Bridgepoint Wholesale: credit card sale, aging entry, write-off, reinstate, collect ---------- */

const bridgepointAccounts = acctsFor(['101', '106', '107', '307', '318', '319', '413', '520', '521']);
const bridgepointCompany: Company = {
	name: 'Bridgepoint Wholesale',
	accounts: bridgepointAccounts,
	retainedEarningsAcct: '318',
	dividendsAcct: '319',
	contraOf: { '107': '106' }
};
const bridgepointEntries: Entry[] = [
	{
		id: 'bridgepoint-open',
		date: '2026-01-01',
		lines: [{ acct: '106', dr: 100000 }, { acct: '107', cr: 650 }, { acct: '307', cr: 99350 }],
		explanation: 'Opening accounts receivable of $100,000 and an existing $650 credit allowance balance'
	},
	{
		id: '1',
		date: '2026-06-15',
		lines: [{ acct: '101', dr: 970 }, { acct: '520', dr: 30 }, { acct: '413', cr: 1000 }],
		explanation: '$1,000 credit card sale; card company charges 3%, cash received today'
	},
	{
		id: '2',
		date: '2026-12-31',
		lines: [{ acct: '521', dr: 4500 }, { acct: '107', cr: 4500 }],
		explanation: 'Year end: aging requires $5,150; allowance has a $650 credit balance'
	},
	{
		id: '3',
		date: '2027-01-15',
		lines: [{ acct: '107', dr: 800 }, { acct: '106', cr: 800 }],
		explanation: "Write off a customer's $800 account"
	},
	{
		id: '4',
		date: '2027-02-01',
		lines: [{ acct: '106', dr: 800 }, { acct: '107', cr: 800 }],
		explanation: 'The written-off customer pays the $800 after all — reinstate'
	},
	{
		id: '5',
		date: '2027-02-02',
		lines: [{ acct: '101', dr: 800 }, { acct: '106', cr: 800 }],
		explanation: '… and collect'
	}
];
const bridgepointBalances = post(bridgepointAccounts, bridgepointEntries);
export const bridgepoint = { company: bridgepointCompany, entries: bridgepointEntries, balances: bridgepointBalances };

/* ---------- Meridian Crafts: a small company using direct write-off ---------- */

const meridianAccounts = acctsFor(['101', '106', '307', '318', '319', '521']);
const meridianCompany: Company = {
	name: 'Meridian Crafts',
	accounts: meridianAccounts,
	retainedEarningsAcct: '318',
	dividendsAcct: '319',
	contraOf: {}
};
const meridianEntries: Entry[] = [
	{
		id: 'meridian-open',
		date: '2026-01-01',
		lines: [{ acct: '106', dr: 1000 }, { acct: '307', cr: 1000 }],
		explanation: 'Opening accounts receivable, funded by common stock'
	},
	{
		id: '6',
		date: '2026-09-01',
		lines: [{ acct: '521', dr: 400 }, { acct: '106', cr: 400 }],
		explanation: 'A small company using direct write-off writes off $400'
	}
];
const meridianBalances = post(meridianAccounts, meridianEntries);
export const meridian = { company: meridianCompany, entries: meridianEntries, balances: meridianBalances };

/* ---------- Cobalt Freight: two notes receivable — one collected, one dishonored ---------- */

const cobaltAccounts = acctsFor(['101', '106', '108', '109', '307', '318', '319', '409']);
const cobaltCompany: Company = {
	name: 'Cobalt Freight',
	accounts: cobaltAccounts,
	retainedEarningsAcct: '318',
	dividendsAcct: '319',
	contraOf: {}
};
const cobaltEntries: Entry[] = [
	{
		id: 'cobalt-open',
		date: '2026-11-01',
		lines: [{ acct: '106', dr: 20000 }, { acct: '307', cr: 20000 }],
		explanation: 'Two past-due accounts receivable of $10,000 each, funded by common stock'
	},
	{
		id: 'noteY-open',
		date: '2026-11-15',
		lines: [{ acct: '109', dr: 10000 }, { acct: '106', cr: 10000 }],
		explanation: 'Accepts a second $10,000, 90-day, 12% note for a past-due account'
	},
	{
		id: '7',
		date: '2026-12-01',
		lines: [{ acct: '109', dr: 10000 }, { acct: '106', cr: 10000 }],
		explanation: 'Accept a $10,000, 90-day, 12% note for a past-due account on Dec 1'
	},
	{
		id: '8',
		date: '2026-12-31',
		lines: [{ acct: '108', dr: 100 }, { acct: '409', cr: 100 }],
		explanation: 'Dec 31: accrue 30 days of interest on the note'
	},
	{
		id: '9',
		date: '2027-03-01',
		lines: [{ acct: '101', dr: 10300 }, { acct: '409', cr: 200 }, { acct: '108', cr: 100 }, { acct: '109', cr: 10000 }],
		explanation: 'Mar 1: note paid in full at maturity'
	},
	{
		id: '10',
		date: '2027-02-13',
		lines: [{ acct: '106', dr: 10300 }, { acct: '409', cr: 300 }, { acct: '109', cr: 10000 }],
		explanation: 'A different $10,000, 12%, 90-day note is dishonored; no interest accrued'
	}
];
const cobaltBalances = post(cobaltAccounts, cobaltEntries);
export const cobalt = { company: cobaltCompany, entries: cobaltEntries, balances: cobaltBalances };

/* ---------- The aging schedule hero ---------- */

export interface AgeBucket {
	id: string;
	label: string;
	finalBalance: number;
	rate: number; // e.g. 0.01
}
export const ageBuckets: AgeBucket[] = [
	{ id: 'current', label: 'Not yet due', finalBalance: 60000, rate: 0.01 },
	{ id: 'b1-30', label: '1–30 days past due', finalBalance: 20000, rate: 0.03 },
	{ id: 'b31-60', label: '31–60 days past due', finalBalance: 12000, rate: 0.1 },
	{ id: 'b61-90', label: '61–90 days past due', finalBalance: 5000, rate: 0.25 },
	{ id: 'over90', label: 'Over 90 days past due', finalBalance: 3000, rate: 0.5 }
];
export const totalReceivables = ageBuckets.reduce((s, b) => s + b.finalBalance, 0);

/** At t=0 every dollar sits in the current bucket; at t=1 the buckets match the book's table exactly. */
export function bucketsAt(t: number): { bucket: AgeBucket; balance: number; uncollectible: number }[] {
	const olderTotal = ageBuckets.slice(1).reduce((s, b) => s + b.finalBalance, 0);
	return ageBuckets.map((b, i) => {
		const balance = i === 0 ? totalReceivables - t * olderTotal : round(t * b.finalBalance);
		return { bucket: b, balance, uncollectible: round(balance * b.rate) };
	});
}
export function requiredAllowanceAt(t: number): number {
	return round(bucketsAt(t).reduce((s, b) => s + b.uncollectible, 0));
}
export const requiredAllowance = requiredAllowanceAt(1);
export function badDebtsExpense(requiredAllowance: number, existingBalance: number, existingIsCredit: boolean): number {
	return round(existingIsCredit ? requiredAllowance - existingBalance : requiredAllowance + existingBalance);
}
export const badDebtsExpenseCreditCase = badDebtsExpense(requiredAllowance, 650, true);
export const badDebtsExpenseDebitCase = badDebtsExpense(requiredAllowance, 350, false);
export const netRealizableValue = round(totalReceivables - requiredAllowance);

/* ---------- Sales method vs receivables method ---------- */

export const creditSales = 400000;
export const salesMethodRate = 0.01;
export const existingAllowanceCredit = 650;
export const salesMethod = {
	expense: round(creditSales * salesMethodRate),
	get allowance() {
		return round(existingAllowanceCredit + this.expense);
	}
};
export const receivablesMethod = {
	expense: badDebtsExpenseCreditCase,
	allowance: requiredAllowance
};

/* ---------- Note calculator ---------- */

export function noteInterest(principal: number, ratePct: number, days: number): number {
	return round(principal * (ratePct / 100) * (days / 360));
}
export function noteMaturityValue(principal: number, ratePct: number, days: number): number {
	return round(principal + noteInterest(principal, ratePct, days));
}
export function noteAccruedAt(principal: number, ratePct: number, daysElapsed: number, totalDays: number): number {
	return noteInterest(principal, ratePct, Math.min(daysElapsed, totalDays));
}
export const notePrincipal = 10000;
export const noteRate = 12;
export const noteDays = 90;
export const noteDaysToYearEnd = 30;
export const noteInterestTotal = noteInterest(notePrincipal, noteRate, noteDays);
export const noteMaturity = noteMaturityValue(notePrincipal, noteRate, noteDays);
export const noteAccruedAtYearEnd = noteAccruedAt(notePrincipal, noteRate, noteDaysToYearEnd, noteDays);

/* ---------- Accounts receivable turnover ---------- */

export const netSalesForTurnover = 500000;
export const beginningAR = 90000;
export const endingAR = 110000;
export const averageAR = round((beginningAR + endingAR) / 2);
export const arTurnover = Math.round((netSalesForTurnover / averageAR) * 10) / 10;

/* ---------- Classification drill ---------- */

const ASSET_CATEGORIES = [
	{ id: 'up', label: 'Total assets go up' },
	{ id: 'down', label: 'Total assets go down' },
	{ id: 'same', label: 'No change in total assets' }
];
export const classifications: Classification[] = [
	{ lo: 'C2', text: 'Record bad debts expense, allowance method', options: ASSET_CATEGORIES, answer: 'down', why: 'The allowance grows, so net receivables fall.' },
	{ lo: 'C2', text: 'Write off an account, allowance method', options: ASSET_CATEGORIES, answer: 'same', why: 'Receivables and allowance fall together; net is unchanged.' },
	{ lo: 'C2', text: 'Write off an account, direct write-off method', options: ASSET_CATEGORIES, answer: 'down', why: 'Receivables fall with nothing offsetting.' },
	{
		lo: 'C2',
		text: 'Reinstate and collect a written-off account, allowance method',
		options: ASSET_CATEGORIES,
		answer: 'same',
		why: 'Reinstating moves both; collecting swaps receivable for cash.'
	},
	{ lo: 'C1', text: 'Collect an ordinary receivable', options: ASSET_CATEGORIES, answer: 'same', why: 'One asset for another.' },
	{ lo: 'P2', text: 'Accept a note for an account receivable', options: ASSET_CATEGORIES, answer: 'same', why: 'One receivable for another.' },
	{ lo: 'P2', text: 'Accrue interest on a note receivable', options: ASSET_CATEGORIES, answer: 'up', why: 'A new receivable, earned with time.' },
	{
		lo: 'P2',
		text: 'Collect a note at maturity with interest not accrued before',
		options: ASSET_CATEGORIES,
		answer: 'up',
		why: 'Cash of 10,300 replaces a 10,000 note.'
	}
];

/* ---------- Entry drill: 10 situations, 10 cards ---------- */

export const entryDrillAccounts = acctsFor(['101', '106', '107', '108', '109', '409', '413', '520', '521']);
const allDrillEntries = [...bridgepointEntries, ...meridianEntries, ...cobaltEntries];
function findEntry(id: string): Entry {
	const e = allDrillEntries.find((x) => x.id === id);
	if (!e) throw new Error(`Entry drill card references unknown entry ${id}`);
	return e;
}
export const entryCards: EntryCardSpec[] = [
	{ lo: 'C1', prompt: '$1,000 credit card sale; card company charges 3%, cash received today.', entry: findEntry('1') },
	{
		lo: 'P1',
		prompt: 'Year end: aging requires $5,150; allowance has a $650 credit balance.',
		entry: findEntry('2'),
		hint: 'The entry only needs to close the gap between what the allowance has and what it needs.'
	},
	{
		lo: 'P1',
		prompt: "Write off a customer's $800 account.",
		entry: findEntry('3'),
		hint: 'The allowance absorbs it, not an expense — the expense was already recorded.'
	},
	{ lo: 'P1', prompt: 'The written-off customer pays the $800 after all — reinstate.', entry: findEntry('4') },
	{ lo: 'P1', prompt: '… and collect.', entry: findEntry('5') },
	{ lo: 'C2', prompt: 'A small company using direct write-off writes off $400.', entry: findEntry('6') },
	{ lo: 'P2', prompt: 'Accept a $10,000, 90-day, 12% note for a past-due account on Dec 1.', entry: findEntry('7') },
	{ lo: 'P2', prompt: 'Dec 31: accrue 30 days of interest on the note.', entry: findEntry('8') },
	{
		lo: 'P2',
		prompt: 'Mar 1: note paid in full at maturity.',
		entry: findEntry('9'),
		hint: 'Only 60 of the 90 days’ interest is new revenue here — 30 days were already accrued.'
	},
	{
		lo: 'P2',
		prompt: 'A different $10,000, 12%, 90-day note is dishonored; no interest accrued.',
		entry: findEntry('10'),
		hint: 'Dishonored is not forgiven — move the full maturity value to Accounts receivable.'
	}
];

/* ---------- Recall rules ---------- */

export const rules: Rule[] = [
	{
		lo: 'C2',
		prompt: 'The allowance for doubtful accounts is a contra asset with a normal:',
		options: [{ id: 'a', label: 'Debit balance' }, { id: 'b', label: 'Credit balance' }],
		answer: 'b',
		why: 'It offsets accounts receivable, an asset, so its normal balance is the opposite side: credit.'
	},
	{
		lo: 'C2',
		prompt: 'Under the allowance method, a write-off touches:',
		options: [{ id: 'a', label: 'Bad debts expense' }, { id: 'b', label: 'Only the allowance and accounts receivable' }],
		answer: 'b',
		why: 'Write-offs never touch expense under the allowance method — the expense was recorded when the loss was estimated.'
	},
	{
		lo: 'A1',
		prompt: 'Percent of sales and percent of receivables both estimate bad debts, but:',
		options: [
			{ id: 'a', label: 'Percent of sales adds to the allowance; percent of receivables adjusts to a target' },
			{ id: 'b', label: 'They always produce the same expense' }
		],
		answer: 'a',
		why: 'Percent of sales ignores the existing balance and adds to it. Percent of receivables sets a target balance and the expense is whatever gets there.'
	},
	{
		lo: 'C2',
		prompt: 'The direct write-off method is acceptable only when:',
		options: [{ id: 'a', label: 'Bad debts are immaterial' }, { id: 'b', label: 'The company is a corporation' }],
		answer: 'a',
		why: 'The materiality constraint allows the simpler method only when the amounts involved are too small to affect decisions.'
	}
];

/* ---------- Formulas ---------- */

export const formulas: Formula[] = [
	{
		lo: 'C2',
		formula: 'Net realizable value = Accounts receivable − Allowance',
		worked: `${fmt(totalReceivables, { dollar: true })} − ${fmt(requiredAllowance, { dollar: true })} = ${fmt(netRealizableValue, { dollar: true })}`
	},
	{
		lo: 'A1',
		formula: 'Bad debts expense (sales method) = Credit sales × Rate',
		worked: `${fmt(creditSales, { dollar: true })} × ${(salesMethodRate * 100).toFixed(0)}% = ${fmt(salesMethod.expense, { dollar: true })}`
	},
	{
		lo: 'A1',
		formula: 'Bad debts expense (receivables method) = Required allowance − Existing credit balance',
		worked: `${fmt(requiredAllowance, { dollar: true })} − ${fmt(existingAllowanceCredit, { dollar: true })} = ${fmt(receivablesMethod.expense, { dollar: true })}`
	},
	{
		lo: 'P2',
		formula: 'Interest = Principal × Rate × Time',
		worked: `${fmt(notePrincipal, { dollar: true })} × ${noteRate}% × ${noteDays}/360 = ${fmt(noteInterestTotal, { dollar: true })}`
	},
	{
		lo: 'P2',
		formula: 'Maturity value = Principal + Interest',
		worked: `${fmt(notePrincipal, { dollar: true })} + ${fmt(noteInterestTotal, { dollar: true })} = ${fmt(noteMaturity, { dollar: true })}`
	},
	{
		lo: 'A2',
		formula: 'Accounts receivable turnover = Net sales ÷ Average accounts receivable',
		worked: `${fmt(netSalesForTurnover, { dollar: true })} ÷ ((${fmt(beginningAR, { dollar: true })} + ${fmt(endingAR, { dollar: true })}) ÷ 2) = ${arTurnover.toFixed(1)} times`
	}
];

/* ---------- Lessons (Learn) and instruments (Lab) ---------- */

export const lessons: LessonMeta[] = [
	{ id: 'receivables-basics', title: 'Money owed, and who owes it', lo: 'C1' },
	{ id: 'two-methods', title: 'Estimate first, write off later', lo: 'C2' },
	{ id: 'aging', title: 'Aging sets the target', lo: 'A1' },
	{ id: 'sales-vs-receivables', title: 'Two ways to size the estimate', lo: 'A1' },
	{ id: 'notes-receivable', title: 'A promise with interest', lo: 'P2' },
	{ id: 'turnover', title: 'How fast receivables cycle', lo: 'A2' }
];

export const instruments: InstrumentMeta[] = [
	{
		id: 'aging-schedule',
		title: 'Aging schedule',
		lo: 'A1',
		instruction: 'Move receivables into older buckets and watch the allowance and bad debts expense recompute.',
		resultLine: `Required allowance ${fmt(requiredAllowance, { dollar: true })} − existing ${fmt(existingAllowanceCredit, { dollar: true })} credit = Bad debts expense ${fmt(badDebtsExpenseCreditCase, { dollar: true })}`,
		noticed:
			'Aging sets the balance the allowance must reach. The expense is only what it takes to get there, so a leftover credit balance shrinks the entry.'
	},
	{
		id: 'sales-vs-receivables-method',
		title: 'Sales method versus receivables method',
		lo: 'A1',
		instruction: 'Switch methods on the same data and watch one add to the balance while the other adjusts to it.',
		resultLine: `Sales method — expense ${fmt(salesMethod.expense, { dollar: true })}, allowance ${fmt(salesMethod.allowance, { dollar: true })} · Receivables method — expense ${fmt(receivablesMethod.expense, { dollar: true })}, allowance ${fmt(receivablesMethod.allowance, { dollar: true })}`,
		noticed:
			'The sales method starts from the income statement and ignores the old balance. The receivables method starts from the balance sheet and works back to the expense.'
	},
	{
		id: 'note-calculator',
		title: 'Note calculator',
		lo: 'P2',
		instruction: 'Change the principal, rate, and days, and watch interest and maturity value.',
		resultLine: `Interest ${fmt(noteInterestTotal, { dollar: true })} · Maturity value ${fmt(noteMaturity, { dollar: true })} · Accrued at Dec 31: ${fmt(noteAccruedAtYearEnd, { dollar: true })}`,
		noticed: 'A third of the interest belongs to December, even though all of it is collected in March.'
	}
];

/* ---------- Chapter export, anchors, invariants ---------- */

export const meta = {
	number: 7,
	slug: 'receivables',
	title: 'Accounting for Receivables',
	part: 'financial' as const,
	status: 'live' as const,
	summary: 'Estimating what customers won’t pay before they don’t.',
	instrument: 'Aging and allowance',
	oneLine:
		'Some customers will never pay. Accounting estimates that loss up front, before anyone knows which customers they are.',
	headline: '**Write-offs never touch expense.** The expense was recorded when the loss was estimated.'
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
		{ label: 'Bridgepoint Wholesale, the allowance method', company: bridgepointCompany, entries: bridgepointEntries },
		{ label: 'Meridian Crafts, direct write-off', company: meridianCompany, entries: meridianEntries },
		{ label: 'Cobalt Freight, two notes receivable', company: cobaltCompany, entries: cobaltEntries }
	],
	anchors: (): Anchor[] => [
		{ label: 'Required allowance', expected: 5150, actual: requiredAllowance },
		{ label: 'Bad debts expense, 650 credit balance', expected: 4500, actual: badDebtsExpenseCreditCase },
		{ label: 'Bad debts expense, 350 debit balance', expected: 5500, actual: badDebtsExpenseDebitCase },
		{ label: 'Net realizable value', expected: 94850, actual: netRealizableValue },
		{ label: 'Sales method: expense', expected: 4000, actual: salesMethod.expense },
		{ label: 'Sales method: allowance', expected: 4650, actual: salesMethod.allowance },
		{ label: 'Note interest', expected: 300, actual: noteInterestTotal },
		{ label: 'Note maturity value', expected: 10300, actual: noteMaturity },
		{ label: 'Interest accrued at Dec 31', expected: 100, actual: noteAccruedAtYearEnd },
		{ label: 'Accounts receivable turnover', expected: 5, actual: arTurnover }
	],
	invariants: () => {
		if (classifications.length !== 8)
			throw new Error(`Chapter 7 should have 8 classification items, has ${classifications.length}`);
		if (entryCards.length !== 10)
			throw new Error(`Chapter 7 should have 10 entry-drill cards, has ${entryCards.length}`);
		for (const c of classifications) {
			if (!c.options.some((o) => o.id === c.answer))
				throw new Error(`Classification answer not in options: ${c.text}`);
		}
		for (const r of rules) {
			if (!r.options.some((o) => o.id === r.answer))
				throw new Error(`Rule answer not in options: ${r.prompt}`);
		}
		const t1 = bucketsAt(1).reduce((s, b) => s + b.balance, 0);
		if (Math.abs(t1 - totalReceivables) > 0.01)
			throw new Error(`Aged buckets at t=1 should sum to ${totalReceivables}, got ${t1}`);
		for (const b of bucketsAt(1)) {
			const expected = ageBuckets.find((a) => a.id === b.bucket.id)!.finalBalance;
			if (Math.abs(b.balance - expected) > 0.01)
				throw new Error(`Bucket ${b.bucket.id} at t=1 should be ${expected}, got ${b.balance}`);
		}
	}
};
