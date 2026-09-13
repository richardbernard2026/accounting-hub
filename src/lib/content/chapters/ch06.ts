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
 * Every number in this chapter's brief is tagged [built] — the brief itself
 * flags that Richard's copy has its own bank-reconciliation example that was
 * never substituted in (no access to the physical book from here). Built on
 * as given, arithmetic hand-verified against every anchor before building;
 * see the final report.
 *
 * Objective codes are not given in the brief, so this grouping is mine.
 */
export const objectives: Objective[] = [
	{
		code: 'C1',
		kind: 'conceptual',
		short: 'Internal control',
		text: 'Describe the purpose of internal control, the fraud triangle, and the principles of internal control.'
	},
	{
		code: 'C2',
		kind: 'conceptual',
		short: 'Cash and equivalents',
		text: 'Define cash and cash equivalents, and explain cash over and short.'
	},
	{
		code: 'P1',
		kind: 'procedural',
		short: 'Petty cash',
		text: 'Record the entries to establish, replenish, and change a petty cash fund.'
	},
	{
		code: 'P2',
		kind: 'procedural',
		short: 'Bank reconciliation',
		text: 'Prepare a bank reconciliation and record the entries it requires.'
	},
	{
		code: 'A1',
		kind: 'analytical',
		short: "Days' sales uncollected",
		text: "Compute days' sales uncollected and explain what it measures."
	}
];

export const terms: Term[] = [
	{ term: 'Internal control system', lo: 'C1', definition: 'The policies and procedures managers use to protect assets, ensure reliable accounting, and promote efficient operations.' },
	{ term: 'Sarbanes-Oxley Act (SOX)', lo: 'C1', definition: "Federal law requiring management and auditors to assess and report on the effectiveness of a public company's internal controls." },
	{
		term: 'Committee of Sponsoring Organizations (COSO)',
		lo: 'C1',
		definition:
			'A private group that publishes an influential internal-control framework used to design and evaluate controls. [book?] — check the exact framing this edition uses.'
	},
	{ term: 'Fraud triangle', lo: 'C1', definition: 'The three factors usually present for fraud to occur: opportunity, pressure, and rationalization.' },
	{ term: 'Principles of internal control', lo: 'C1', definition: 'The seven guidelines for designing a system that safeguards assets and produces reliable records.' },
	{ term: 'Separation of duties', lo: 'C1', definition: 'Dividing responsibility for related transactions among different people, so no one person controls a transaction start to finish.' },
	{ term: 'Bond', lo: 'C1', definition: 'An insurance policy that reimburses a company for losses from theft by a bonded employee.' },
	{ term: 'Collusion', lo: 'C1', definition: 'Two or more people working together to circumvent controls, such as separation of duties.' },
	{ term: 'Cash', lo: 'C2', definition: 'Currency, coins, and amounts on deposit that a bank will accept for immediate deposit.' },
	{ term: 'Cash equivalents', lo: 'C2', definition: 'Short-term, highly liquid investments that are both readily convertible to cash and close enough to maturity that their value is unaffected by rate changes.' },
	{ term: 'Liquidity', lo: 'C2', definition: "A company's ability to pay for its near-term obligations." },
	{ term: 'Liquid assets', lo: 'C2', definition: 'Assets easily converted into other asset types or used to buy services or pay liabilities.' },
	{ term: 'Cash over and short', lo: 'C2', definition: 'An income-statement account recording the income effect of a cash-count difference, expensed when short.' },
	{ term: 'Voucher system', lo: 'C2', definition: 'A set of procedures and approvals for controlling cash disbursements and their recording.' },
	{ term: 'Voucher', lo: 'C2', definition: 'A document authorizing a cash payment.' },
	{ term: 'Petty cash', lo: 'P1', definition: 'A small amount of cash kept on hand to pay minor amounts, managed under an imprest system.' },
	{ term: 'Petty cashier', lo: 'P1', definition: 'The person responsible for a petty cash fund and its receipts.' },
	{ term: 'Bank statement', lo: 'P2', definition: "A bank's record of a depositor's account activity and balance over a period." },
	{ term: 'Canceled checks', lo: 'P2', definition: "Checks the bank has paid and charged against the depositor's account." },
	{ term: 'Deposit in transit', lo: 'P2', definition: 'A deposit recorded by the depositor but not yet received or recorded by the bank.' },
	{ term: 'Outstanding checks', lo: 'P2', definition: 'Checks written and recorded by the depositor but not yet paid by the bank.' },
	{ term: 'Nonsufficient funds (NSF) check', lo: 'P2', definition: "A check the payer's bank refuses to pay, usually for lack of funds in the payer's account." },
	{ term: 'Electronic funds transfer (EFT)', lo: 'P2', definition: 'A payment system using electronic messages instead of paper documents to transfer cash between parties.' },
	{ term: 'Signature card', lo: 'P2', definition: 'A bank record of the signatures of people authorized to sign checks on an account.' },
	{ term: 'Bank reconciliation', lo: 'P2', definition: "A report explaining any differences between a depositor's book balance and the bank statement balance." },
	{ term: "Days' sales uncollected", lo: 'A1', definition: 'A measure of how long it takes to collect receivables, computed from accounts receivable and net sales.' }
];

export const quickChecks: QuickCheck[] = [
	{
		lo: 'C1',
		q: 'One employee opens the mail, deposits checks, and posts payments to customer accounts. This violates:',
		options: [
			'Establish responsibilities',
			'Separate recordkeeping from custody of assets',
			'Insure assets and bond key employees',
			'Apply technological controls'
		],
		answer: 1,
		why: 'The same person controls both the asset (cash) and the record of it — nothing stops that person from taking cash and hiding it in the records.'
	},
	{
		lo: 'C1',
		q: 'The fraud triangle’s three factors are:',
		options: [
			'Opportunity, pressure, rationalization',
			'Cash, controls, collusion',
			'Custody, records, review',
			'Risk, reward, recovery'
		],
		answer: 0,
		why: 'All three usually have to be present for fraud to occur; removing any one of them reduces the risk.'
	},
	{
		lo: 'C2',
		q: 'A 60-day certificate of deposit purchased 45 days before it matures is:',
		options: ['A cash equivalent', 'Not a cash equivalent', 'Always classified as cash', 'A receivable'],
		answer: 1,
		why: 'It has to be within three months of maturity when purchased. Bought with 60 days left, it qualifies; the question of when it was purchased is what matters.'
	},
	{
		lo: 'P1',
		q: 'Replenishing a petty cash fund debits:',
		options: ['Petty cash', 'The expenses the receipts show', 'Cash', 'Cash over and short, always'],
		answer: 1,
		why: 'Petty cash is only debited to establish or increase the fund. Replenishing it debits whatever the receipts were actually for.'
	},
	{
		lo: 'P2',
		q: 'A deposit in transit needs a journal entry because:',
		options: [
			"It doesn't — it's already in the books",
			'It increases cash',
			'It decreases cash',
			'It corrects a bank error'
		],
		answer: 0,
		why: 'The depositor already recorded it. Only the bank has to catch up, so it adjusts the bank side of the reconciliation, not the books.'
	},
	{
		lo: 'A1',
		q: "Days' sales uncollected divides accounts receivable by:",
		options: ['Net sales, times 365', 'Cost of goods sold', 'Total assets', 'Cash'],
		answer: 0,
		why: "It's accounts receivable ÷ net sales × 365 — roughly how many days of sales are still sitting in receivables."
	}
];

/* ---------- Chart of accounts, shared across this chapter's small companies ---------- */

const ALL_ACCOUNTS: Account[] = [
	{ num: '101', name: 'Cash', type: 'asset' },
	{ num: '102', name: 'Petty cash', type: 'asset' },
	{ num: '106', name: 'Accounts receivable', type: 'asset' },
	{ num: '109', name: 'Notes receivable', type: 'asset' },
	{ num: '201', name: 'Accounts payable', type: 'liability' },
	{ num: '307', name: 'Common stock', type: 'equity' },
	{ num: '318', name: 'Retained earnings', type: 'equity' },
	{ num: '319', name: 'Dividends', type: 'contra-equity' },
	{ num: '409', name: 'Interest revenue', type: 'revenue' },
	{ num: '413', name: 'Sales', type: 'revenue' },
	{ num: '601', name: 'Postage expense', type: 'expense' },
	{ num: '602', name: 'Delivery expense', type: 'expense' },
	{ num: '603', name: 'Office supplies expense', type: 'expense' },
	{ num: '604', name: 'Miscellaneous expenses', type: 'expense' },
	{ num: '605', name: 'Cash over and short', type: 'expense' }
];
function acctsFor(nums: string[]): Account[] {
	return ALL_ACCOUNTS.filter((a) => nums.includes(a.num));
}
export const accounts = ALL_ACCOUNTS;
export const accountName = accountNameOf(ALL_ACCOUNTS);

/* ---------- Lakeside Furnishings: the bank reconciliation's five book-side entries ---------- */

const lakesideAccounts = acctsFor(['101', '106', '109', '201', '307', '318', '319', '409', '604']);
const lakesideCompany: Company = {
	name: 'Lakeside Furnishings',
	accounts: lakesideAccounts,
	retainedEarningsAcct: '318',
	dividendsAcct: '319',
	contraOf: {}
};
const lakesideEntries: Entry[] = [
	{
		id: 'lakeside-open',
		date: '2025-10-01',
		lines: [{ acct: '101', dr: 1383 }, { acct: '109', dr: 500 }, { acct: '307', cr: 1883 }],
		explanation: "Book balance $1,383 and a $500 note receivable, funded by common stock"
	},
	{
		id: '5',
		date: '2025-10-31',
		lines: [{ acct: '101', dr: 530 }, { acct: '109', cr: 500 }, { acct: '409', cr: 30 }],
		explanation: 'Bank collected a $500 note plus $30 interest'
	},
	{
		id: '6',
		date: '2025-10-31',
		lines: [{ acct: '101', dr: 8 }, { acct: '409', cr: 8 }],
		explanation: 'Interest earned on the account'
	},
	{
		id: '7',
		date: '2025-10-31',
		lines: [{ acct: '604', dr: 15 }, { acct: '101', cr: 15 }],
		explanation: 'Bank service fee'
	},
	{
		id: '8',
		date: '2025-10-31',
		lines: [{ acct: '106', dr: 220 }, { acct: '101', cr: 220 }],
		explanation: "Customer's check returned NSF"
	},
	{
		id: '9',
		date: '2025-10-31',
		lines: [{ acct: '101', dr: 9 }, { acct: '201', cr: 9 }],
		explanation: 'Check #118 for $56 to a supplier recorded in the books as $65'
	}
];
const lakesideBalances = post(lakesideAccounts, lakesideEntries);
export const lakeside = { company: lakesideCompany, entries: lakesideEntries, balances: lakesideBalances };
export const adjustedBookBalance = lakesideBalances.get('101')!.balance;

/* ---------- The bank reconciliation hero: two bank-side items, five book-side ---------- */

export interface ReconItem {
	id: string;
	label: string;
	side: 'bank' | 'book';
	amount: number; // signed
	entryId?: string; // for book-side items, the entry that posts it
}
export const bankStatementBalance = 2050;
export const reconItems: ReconItem[] = [
	{ id: 'deposit-in-transit', label: 'Deposit made Oct 31, not yet on the statement', side: 'bank', amount: 145 },
	{
		id: 'outstanding-checks',
		label: 'Outstanding checks #102 ($350) and #120 ($150)',
		side: 'bank',
		amount: -500
	},
	{ id: '5', label: 'Bank collected a $500 note plus $30 interest', side: 'book', amount: 530, entryId: '5' },
	{ id: '6', label: 'Interest earned on the account', side: 'book', amount: 8, entryId: '6' },
	{ id: '7', label: 'Bank service fee', side: 'book', amount: -15, entryId: '7' },
	{ id: '8', label: "Customer's check returned NSF", side: 'book', amount: -220, entryId: '8' },
	{
		id: '9',
		label: 'Check #118 for $56 to a supplier recorded in books as $65',
		side: 'book',
		amount: 9,
		entryId: '9'
	}
];
export const adjustedBankBalance = round(
	bankStatementBalance + reconItems.filter((i) => i.side === 'bank').reduce((s, i) => s + i.amount, 0)
);
export const bookSideEntryCount = reconItems.filter((i) => i.side === 'book').length;

/* ---------- Founders Print Shop: the petty cash cycle ---------- */

const foundersAccounts = acctsFor(['101', '102', '307', '318', '319', '601', '602', '603', '605']);
const foundersCompany: Company = {
	name: 'Founders Print Shop',
	accounts: foundersAccounts,
	retainedEarningsAcct: '318',
	dividendsAcct: '319',
	contraOf: {}
};
export interface PettyCashStep {
	id: string;
	label: string;
	entryIds: string[];
}
export const pettyCashSteps: PettyCashStep[] = [
	{ id: 'establish', label: 'Establish a $100 petty cash fund.', entryIds: ['1'] },
	{
		id: 'replenish',
		label: 'Receipts: postage $22, delivery $30, office supplies $18. Cash counted: $28. Replenish the fund.',
		entryIds: ['2']
	},
	{ id: 'increase', label: 'Increase the fund to $150.', entryIds: ['3'] }
];
const pettyCashEntries: Entry[] = [
	{
		id: 'founders-open',
		date: '2025-11-01',
		lines: [{ acct: '101', dr: 1000 }, { acct: '307', cr: 1000 }],
		explanation: 'Owner invests $1,000 cash for common stock'
	},
	{
		id: '1',
		date: '2025-11-02',
		lines: [{ acct: '102', dr: 100 }, { acct: '101', cr: 100 }],
		explanation: 'Establish a $100 petty cash fund'
	},
	{
		id: '2',
		date: '2025-11-30',
		lines: [
			{ acct: '601', dr: 22 },
			{ acct: '602', dr: 30 },
			{ acct: '603', dr: 18 },
			{ acct: '605', dr: 2 },
			{ acct: '101', cr: 72 }
		],
		explanation: 'Replenish: postage $22, delivery $30, office supplies $18, $2 short'
	},
	{
		id: '3',
		date: '2025-12-01',
		lines: [{ acct: '102', dr: 50 }, { acct: '101', cr: 50 }],
		explanation: 'Increase the fund to $150'
	}
];
const pettyCashBalances = post(foundersAccounts, pettyCashEntries);
export const founders = { company: foundersCompany, entries: pettyCashEntries, balances: pettyCashBalances };
export const pettyCashReceipts = 22 + 30 + 18;
export const pettyCashShort = 2;
export const pettyCashOnHand = 28;
export const pettyCashFund = pettyCashReceipts + pettyCashShort + pettyCashOnHand;
export const pettyCashReplenishment = round(pettyCashReceipts + pettyCashShort);

/* ---------- A standalone entry for the register-overage pattern (entry 4) ---------- */

const registerOverageEntry: Entry = {
	id: '4',
	date: '2025-11-15',
	lines: [{ acct: '101', dr: 555 }, { acct: '413', cr: 550 }, { acct: '605', cr: 5 }],
	explanation: 'Register shows $550 of cash sales; drawer holds $555'
};

/* ---------- Days' sales uncollected ---------- */

export const accountsReceivableForTurnover = 12000;
export const netSalesForTurnover = 146000;
export const daysSalesUncollected =
	Math.round((accountsReceivableForTurnover / netSalesForTurnover) * 365 * 10) / 10;

/* ---------- Control failure diagnostic ---------- */

export interface ControlScenario {
	id: string;
	scenario: string;
	principle: string;
}
export const controlPrinciples = [
	'Establish responsibilities',
	'Maintain adequate records',
	'Insure assets and bond key employees',
	'Separate recordkeeping from custody of assets',
	'Divide responsibility for related transactions',
	'Apply technological controls',
	'Perform regular and independent reviews'
];
export const controlScenarios: ControlScenario[] = [
	{
		id: 'responsibilities',
		scenario: "Two cashiers share one register drawer, and no one can say whose count was off when it doesn't balance.",
		principle: 'Establish responsibilities'
	},
	{
		id: 'records',
		scenario: 'A warehouse tracks incoming shipments on scraps of paper that get thrown out at the end of each week.',
		principle: 'Maintain adequate records'
	},
	{
		id: 'insure',
		scenario:
			'The company carries no insurance on its delivery vans and never checked the background of the employee who handles payroll.',
		principle: 'Insure assets and bond key employees'
	},
	{
		id: 'separate',
		scenario: 'The clerk who opens the mail and deposits checks also posts customer payments.',
		principle: 'Separate recordkeeping from custody of assets'
	},
	{
		id: 'divide',
		scenario: 'The same manager orders inventory, receives the shipment, and approves the invoice for payment.',
		principle: 'Divide responsibility for related transactions'
	},
	{
		id: 'technological',
		scenario:
			'Anyone in the office can log into the accounting system with the same shared password, and no one reviews the access log.',
		principle: 'Apply technological controls'
	},
	{
		id: 'reviews',
		scenario: "The store's own bookkeeper is the only person who has ever reconciled its bank account, in the six years it has been open.",
		principle: 'Perform regular and independent reviews'
	}
];

/* ---------- Classification drill ---------- */

const RECON_CATEGORIES = [
	{ id: 'add-bank', label: 'Add to bank balance' },
	{ id: 'sub-bank', label: 'Subtract from bank balance' },
	{ id: 'add-book', label: 'Add to book balance (entry)' },
	{ id: 'sub-book', label: 'Subtract from book balance (entry)' }
];
export const classifications: Classification[] = [
	{ lo: 'P2', text: 'Deposit in transit', options: RECON_CATEGORIES, answer: 'add-bank', why: 'Recorded in books, not yet by the bank.' },
	{ lo: 'P2', text: 'Outstanding check', options: RECON_CATEGORIES, answer: 'sub-bank', why: 'Recorded in books, not yet cleared.' },
	{
		lo: 'P2',
		text: "Bank error: another customer's $40 check charged to us",
		options: RECON_CATEGORIES,
		answer: 'add-bank',
		why: "The bank's mistake; the bank corrects it."
	},
	{ lo: 'P2', text: 'Note collected by the bank', options: RECON_CATEGORIES, answer: 'add-book', why: 'Cash we have that the books do not show.' },
	{ lo: 'P2', text: 'Interest earned', options: RECON_CATEGORIES, answer: 'add-book', why: 'Same.' },
	{ lo: 'P2', text: 'Bank service charge', options: RECON_CATEGORIES, answer: 'sub-book', why: 'A cost the books have not recorded.' },
	{ lo: 'P2', text: 'NSF check', options: RECON_CATEGORIES, answer: 'sub-book', why: 'The deposit bounced; reinstate the receivable.' },
	{
		lo: 'P2',
		text: 'Check written for $56 recorded as $65',
		options: RECON_CATEGORIES,
		answer: 'add-book',
		why: 'Books took out 9 too much.'
	},
	{
		lo: 'P2',
		text: 'Deposit of $520 recorded in books as $250',
		options: RECON_CATEGORIES,
		answer: 'add-book',
		why: 'Books show 270 too little.'
	}
];

/* ---------- Entry drill: 9 situations, 9 cards ---------- */

export const entryDrillAccounts = acctsFor(['101', '102', '106', '109', '201', '409', '413', '601', '602', '603', '605']);
const allDrillEntries = [...pettyCashEntries, registerOverageEntry, ...lakesideEntries];
function findEntry(id: string): Entry {
	const e = allDrillEntries.find((x) => x.id === id);
	if (!e) throw new Error(`Entry drill card references unknown entry ${id}`);
	return e;
}
export const entryCards: EntryCardSpec[] = [
	{ lo: 'P1', prompt: 'Establish a $100 petty cash fund.', entry: findEntry('1') },
	{
		lo: 'P1',
		prompt: 'Replenish: postage $22, delivery $30, office supplies $18, $2 short.',
		entry: findEntry('2'),
		hint: 'Petty cash is not touched here — the expenses (and the shortage) get the debits.'
	},
	{ lo: 'P1', prompt: 'Increase the fund to $150.', entry: findEntry('3') },
	{
		lo: 'C2',
		prompt: 'Register shows $550 of cash sales; drawer holds $555.',
		entry: findEntry('4'),
		hint: 'The drawer has more than it should — Cash over and short is credited, not debited.'
	},
	{ lo: 'P2', prompt: 'Reconciliation: bank collected a $500 note plus $30 interest.', entry: findEntry('5') },
	{ lo: 'P2', prompt: 'Reconciliation: interest earned.', entry: findEntry('6') },
	{ lo: 'P2', prompt: 'Reconciliation: bank service fee.', entry: findEntry('7') },
	{
		lo: 'P2',
		prompt: "Reconciliation: customer's $220 check returned NSF.",
		entry: findEntry('8'),
		hint: 'The customer still owes it — debit Accounts receivable, not an expense.'
	},
	{
		lo: 'P2',
		prompt: 'Reconciliation: $56 check recorded as $65.',
		entry: findEntry('9'),
		hint: 'The books took too much out of Cash — add the 9 back.'
	}
];

/* ---------- Recall rules ---------- */

export const rules: Rule[] = [
	{
		lo: 'C1',
		prompt: 'The fraud triangle is opportunity, pressure, and:',
		options: [{ id: 'a', label: 'Rationalization' }, { id: 'b', label: 'Retaliation' }, { id: 'c', label: 'Restitution' }],
		answer: 'a',
		why: 'People who commit fraud usually convince themselves it is justified, temporary, or not really wrong.'
	},
	{
		lo: 'P2',
		prompt: 'Which reconciling items get a journal entry?',
		options: [{ id: 'a', label: 'Only the bank-side items' }, { id: 'b', label: 'Only the book-side items' }, { id: 'c', label: 'Every item' }],
		answer: 'b',
		why: 'Bank-side items are already in the books — the bank just has not caught up. Only book-side items need an entry.'
	},
	{
		lo: 'C2',
		prompt: 'To count as a cash equivalent, an investment must be within how many months of maturity when purchased?',
		options: [{ id: 'a', label: 'One' }, { id: 'b', label: 'Three' }, { id: 'c', label: 'Twelve' }],
		answer: 'b',
		why: 'Cash equivalents are short-term, highly liquid, and within three months of maturity when bought.'
	},
	{
		lo: 'C2',
		prompt: 'When a cash count comes up short, Cash over and short is:',
		options: [{ id: 'a', label: 'Debited' }, { id: 'b', label: 'Credited' }, { id: 'c', label: 'Not recorded' }],
		answer: 'a',
		why: 'A shortage behaves like an expense: debit. An overage is the reverse: credit.'
	},
	{
		lo: 'P1',
		prompt: 'Petty cash is debited:',
		options: [{ id: 'a', label: 'Only to establish or increase the fund' }, { id: 'b', label: 'Every time it is replenished' }, { id: 'c', label: 'Whenever cash is spent from it' }],
		answer: 'a',
		why: 'Replenishing debits the expenses the receipts show. Petty cash itself only moves when the fund is created or its size changes.'
	}
];

/* ---------- Formulas ---------- */

export const formulas: Formula[] = [
	{
		lo: 'P2',
		formula: 'Adjusted bank balance = Bank balance + Deposits in transit − Outstanding checks ± Bank errors',
		worked: `${fmt(bankStatementBalance, { dollar: true })} + ${fmt(145, { dollar: true })} − ${fmt(500, { dollar: true })} = ${fmt(adjustedBankBalance, { dollar: true })}`
	},
	{
		lo: 'P2',
		formula: 'Adjusted book balance = Book balance + Collections and interest − Fees − NSF checks ± Book errors',
		worked: `${fmt(1383, { dollar: true })} + ${fmt(530, { dollar: true })} + ${fmt(8, { dollar: true })} − ${fmt(15, { dollar: true })} − ${fmt(220, { dollar: true })} + ${fmt(9, { dollar: true })} = ${fmt(adjustedBookBalance, { dollar: true })}`
	},
	{
		lo: 'A1',
		formula: "Days' sales uncollected = Accounts receivable ÷ Net sales × 365",
		worked: `${fmt(accountsReceivableForTurnover, { dollar: true })} ÷ ${fmt(netSalesForTurnover, { dollar: true })} × 365 = ${daysSalesUncollected.toFixed(1)} days`
	}
];

/* ---------- Lessons (Learn) and instruments (Lab) ---------- */

export const lessons: LessonMeta[] = [
	{ id: 'internal-control', title: 'Why controls exist', lo: 'C1' },
	{ id: 'control-principles', title: 'Seven principles, one weak link', lo: 'C1' },
	{ id: 'cash-and-equivalents', title: 'What counts as cash', lo: 'C2' },
	{ id: 'petty-cash', title: 'A small fund, carefully tracked', lo: 'P1' },
	{ id: 'bank-reconciliation', title: 'Two books, one true balance', lo: 'P2' },
	{ id: 'days-sales-uncollected', title: 'How long cash takes to arrive', lo: 'A1' }
];

export const instruments: InstrumentMeta[] = [
	{
		id: 'bank-reconciliation',
		title: 'Bank reconciliation',
		lo: 'P2',
		instruction: 'Sort each item to the bank side or the book side until the two adjusted balances match.',
		resultLine: `Adjusted bank balance ${fmt(adjustedBankBalance, { dollar: true })} = Adjusted book balance ${fmt(adjustedBookBalance, { dollar: true })}`,
		noticed:
			'Five items made journal entries and two did not. Deposits in transit and outstanding checks are already in the books — the bank just has not caught up.'
	},
	{
		id: 'control-failure-diagnostic',
		title: 'Control failure diagnostic',
		lo: 'C1',
		instruction: 'Read the scenario and name the control principle that failed.',
		resultLine: `${controlScenarios.length} scenarios, one for each of the ${controlPrinciples.length} principles`,
		noticed:
			'Most of the scenarios needed one person to do two jobs. Separation of duties is what makes theft require collusion.'
	},
	{
		id: 'petty-cash-cycle',
		title: 'Petty cash cycle',
		lo: 'P1',
		instruction: 'Spend from the $100 fund, then replenish it and watch which accounts move.',
		resultLine: `Receipts ${fmt(pettyCashReceipts, { dollar: true })} + Cash short ${fmt(pettyCashShort, { dollar: true })} + Cash on hand ${fmt(pettyCashOnHand, { dollar: true })} = Fund ${fmt(pettyCashFund, { dollar: true })}`,
		noticed:
			'Petty cash moved only when the fund was created or increased. Replenishing it debits the expenses, not Petty cash.'
	}
];

/* ---------- Chapter export, anchors, invariants ---------- */

export const meta = {
	number: 6,
	slug: 'cash-and-internal-control',
	title: 'Cash, Fraud, and Internal Control',
	part: 'financial' as const,
	status: 'live' as const,
	summary: 'Controls over cash and the bank reconciliation.',
	instrument: 'Bank reconciliation',
	oneLine:
		"How a business keeps its cash from walking out the door, and how it proves its cash balance matches the bank's.",
	headline: '**Only the book side makes entries.** The bank already knows its half.'
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
		{ label: 'Lakeside Furnishings, the bank reconciliation entries', company: lakesideCompany, entries: lakesideEntries },
		{ label: 'Founders Print Shop, the petty cash cycle', company: foundersCompany, entries: pettyCashEntries }
	],
	anchors: (): Anchor[] => [
		{ label: 'Adjusted bank balance', expected: 1695, actual: adjustedBankBalance },
		{ label: 'Adjusted book balance', expected: 1695, actual: adjustedBookBalance },
		{ label: 'Book-side entries', expected: 5, actual: bookSideEntryCount },
		{ label: 'Petty cash replenishment', expected: 72, actual: pettyCashReplenishment },
		{ label: "Days' sales uncollected", expected: 30, actual: daysSalesUncollected }
	],
	invariants: () => {
		if (classifications.length !== 9)
			throw new Error(`Chapter 6 should have 9 classification items, has ${classifications.length}`);
		if (entryCards.length !== 9)
			throw new Error(`Chapter 6 should have 9 entry-drill cards, has ${entryCards.length}`);
		if (controlScenarios.length !== controlPrinciples.length)
			throw new Error('Every control principle should have exactly one scenario');
		for (const c of classifications) {
			if (!c.options.some((o) => o.id === c.answer))
				throw new Error(`Classification answer not in options: ${c.text}`);
		}
		for (const r of rules) {
			if (!r.options.some((o) => o.id === r.answer))
				throw new Error(`Rule answer not in options: ${r.prompt}`);
		}
		if (Math.abs(adjustedBankBalance - adjustedBookBalance) > 0.01)
			throw new Error(`Adjusted bank and book balances should match: ${adjustedBankBalance} vs ${adjustedBookBalance}`);
		for (const s of controlScenarios) {
			if (!controlPrinciples.includes(s.principle))
				throw new Error(`Scenario references unknown principle: ${s.principle}`);
		}
	}
};
