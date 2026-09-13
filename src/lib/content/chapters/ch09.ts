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
 * Every number in this chapter's brief is tagged [built]. The brief's own
 * "before building" note asks to confirm the book's payroll rates and wage
 * bases rather than current-year law, which needs the physical text (not
 * available from here) — built on the rates the brief states explicitly
 * (6.2%, 1.45%, FUTA 0.6%, SUTA 5.4%). The $10,000 payroll's FUTA/SUTA
 * figures only reconcile to the stated "first $7,000" wage base if read as
 * aggregate payroll across employees each individually under the cap
 * ("with no employee over any wage base") — built on that reading; see the
 * final report.
 */
export const objectives: Objective[] = [
	{
		code: 'C1',
		kind: 'conceptual',
		short: 'Current liabilities',
		text: 'Classify a liability as known, estimated, or contingent, and explain how each is reported.'
	},
	{
		code: 'C2',
		kind: 'conceptual',
		short: 'Sales tax & unearned revenue',
		text: 'Record sales tax collected on behalf of the government and revenue collected before it is earned.'
	},
	{
		code: 'P1',
		kind: 'procedural',
		short: 'Payroll',
		text: "Compute and record an employee's payroll deductions and an employer's payroll taxes."
	},
	{
		code: 'P2',
		kind: 'procedural',
		short: 'Notes payable',
		text: 'Record a short-term note payable and the interest it accrues across a year end.'
	},
	{
		code: 'A1',
		kind: 'analytical',
		short: 'Warranty accrual',
		text: 'Estimate and record warranty expense in the year of sale, and record repairs against the liability.'
	},
	{
		code: 'A3',
		kind: 'analytical',
		short: 'Times interest earned',
		text: 'Compute times interest earned and explain what it measures.'
	}
];

export const terms: Term[] = [
	{ term: 'Liabilities', lo: 'C1', definition: 'Obligations to transfer assets or provide services to another party in the future.' },
	{ term: 'Current liabilities', lo: 'C1', definition: 'Obligations due within one year or the operating cycle, whichever is longer.' },
	{ term: 'Long-term liabilities', lo: 'C1', definition: 'Obligations not due within one year or the operating cycle.' },
	{ term: 'Known liabilities', lo: 'C1', definition: 'Obligations set by agreement or law, with both the amount and the payee certain.' },
	{ term: 'Estimated liabilities', lo: 'C1', definition: 'Obligations known to exist but whose exact amount cannot be known with certainty until later.' },
	{ term: 'Contingent liability', lo: 'C1', definition: 'A potential obligation that depends on a future event arising from a past transaction.' },
	{ term: 'Accounts payable', lo: 'C1', definition: 'Amounts owed to suppliers for products or services bought on credit.' },
	{ term: 'Sales taxes payable', lo: 'C2', definition: 'Sales tax collected from customers on behalf of the government, owed until remitted.' },
	{ term: 'Unearned revenues', lo: 'C2', definition: 'Cash received before the related products or services are delivered; a liability until earned.' },
	{ term: 'Short-term note payable', lo: 'P2', definition: 'A written promise to pay a specified amount, due within one year.' },
	{ term: 'Current portion of long-term debt', lo: 'C1', definition: 'The part of a long-term liability due to be paid within the next year, reclassified as current.' },
	{ term: 'Payroll', lo: 'P1', definition: 'The amounts paid to employees for their work, along with the related deductions and employer costs.' },
	{ term: 'Gross pay', lo: 'P1', definition: 'Total compensation earned by an employee before any deductions.' },
	{ term: 'Net pay', lo: 'P1', definition: 'Gross pay minus all deductions; the amount an employee actually receives.' },
	{ term: 'Payroll deductions (withholdings)', lo: 'P1', definition: "Amounts subtracted from an employee's gross pay for taxes, insurance, and other obligations." },
	{ term: 'Federal Insurance Contributions Act (FICA) taxes', lo: 'P1', definition: 'Social Security and Medicare taxes, withheld from employees and matched by employers.' },
	{ term: 'Social Security taxes', lo: 'P1', definition: 'A FICA tax funding retirement, disability, and survivor benefits.' },
	{ term: 'Medicare taxes', lo: 'P1', definition: 'A FICA tax funding hospital insurance for the elderly and disabled.' },
	{ term: 'Federal income taxes withheld', lo: 'P1', definition: "An employee's estimated income tax liability, withheld from each paycheck by the employer." },
	{ term: 'Federal Unemployment Tax Act (FUTA)', lo: 'P1', definition: 'A federal unemployment tax paid entirely by the employer, never withheld from employees.' },
	{ term: 'State Unemployment Tax Act (SUTA)', lo: 'P1', definition: 'A state unemployment tax paid entirely by the employer, never withheld from employees.' },
	{ term: 'Form W-4', lo: 'P1', definition: "An employee's certificate specifying withholding allowances for federal income tax." },
	{ term: 'Form W-2', lo: 'P1', definition: "An annual statement of an employee's wages and taxes withheld during the year." },
	{
		term: 'Form 941',
		lo: 'P1',
		definition:
			"An employer's quarterly federal tax return reporting withheld income tax and FICA taxes. [book?] — check this edition's exact form references."
	},
	{
		term: 'Payroll register',
		lo: 'P1',
		definition:
			'A record summarizing the payroll for every employee for a pay period. [book?] — check this edition’s exact terminology.'
	},
	{
		term: 'Employee earnings report',
		lo: 'P1',
		definition:
			"A cumulative record of each employee's pay and withholdings across the year. [book?] — check this edition's exact terminology."
	},
	{ term: 'Employee benefits', lo: 'P1', definition: 'Additional compensation, beyond wages, provided to employees — insurance, retirement, and similar programs.' },
	{ term: 'Vacation benefits', lo: 'P1', definition: 'Paid time off employees earn as they work, estimated and accrued as a liability.' },
	{ term: 'Bonus plans', lo: 'P1', definition: 'Additional employee compensation tied to performance, often estimated and accrued as a liability.' },
	{ term: 'Warranty', lo: 'A1', definition: "A seller's promise to repair or replace a product that proves defective within a specified period." },
	{ term: 'Times interest earned', lo: 'A3', definition: 'Income before interest expense and income taxes, divided by interest expense; a measure of how easily interest is covered.' }
];

export const quickChecks: QuickCheck[] = [
	{
		lo: 'C1',
		q: 'A lawsuit the company will probably lose, with a reasonably estimable amount, is:',
		options: ['A known liability', 'An estimated liability', 'A recorded contingent liability', 'Disclosed only, never recorded'],
		answer: 2,
		why: 'Probable and estimable contingent liabilities are recorded, not just disclosed.'
	},
	{
		lo: 'C2',
		q: 'Sales tax collected from a customer is recorded as:',
		options: ['Revenue', 'A liability', 'An expense', 'A reduction of cash'],
		answer: 1,
		why: "It belongs to the government — the seller is only holding it, so it's a liability, never revenue."
	},
	{
		lo: 'P1',
		q: 'Which of these is never withheld from an employee’s pay?',
		options: ['Social Security', 'Medicare', 'FUTA', 'Federal income tax'],
		answer: 2,
		why: 'FUTA (and SUTA) are employer-only taxes — never withheld from the employee.'
	},
	{
		lo: 'A1',
		q: 'Warranty expense is recorded:',
		options: ['When a repair happens', 'In the year of the sale', 'When the warranty expires', 'Only if a customer files a claim'],
		answer: 1,
		why: 'The expense is estimated and recorded in the year of the sale — matching it against the revenue that sale produced.'
	},
	{
		lo: 'P2',
		q: 'A 90-day note dated December 16 has interest accrued at December 31 for:',
		options: ['90 days', '31 days', '15 days', '75 days'],
		answer: 2,
		why: 'From Dec 16 to Dec 31 is 15 days; the remaining 75 days of interest belong to the new year.'
	},
	{
		lo: 'A3',
		q: 'A low times interest earned ratio suggests:',
		options: [
			'The company easily covers its interest payments',
			'The company may struggle to cover its interest payments',
			'The company has no debt',
			'Interest expense is overstated'
		],
		answer: 1,
		why: 'A low ratio means income before interest and taxes barely covers the interest expense — a warning sign.'
	}
];

/* ---------- Chart of accounts ---------- */

const ALL_ACCOUNTS: Account[] = [
	{ num: '101', name: 'Cash', type: 'asset' },
	{ num: '141', name: 'Repair parts inventory', type: 'asset' },
	{ num: '201', name: 'Sales taxes payable', type: 'liability' },
	{ num: '202', name: 'Unearned ticket revenue', type: 'liability' },
	{ num: '203', name: 'Notes payable', type: 'liability' },
	{ num: '204', name: 'Interest payable', type: 'liability' },
	{ num: '205', name: 'FICA—Social Security taxes payable', type: 'liability' },
	{ num: '206', name: 'FICA—Medicare taxes payable', type: 'liability' },
	{ num: '207', name: 'Employee federal income taxes payable', type: 'liability' },
	{ num: '208', name: 'Employee medical insurance payable', type: 'liability' },
	{ num: '209', name: 'Salaries payable', type: 'liability' },
	{ num: '210', name: 'FUTA payable', type: 'liability' },
	{ num: '211', name: 'SUTA payable', type: 'liability' },
	{ num: '212', name: 'Estimated warranty liability', type: 'liability' },
	{ num: '307', name: 'Common stock', type: 'equity' },
	{ num: '318', name: 'Retained earnings', type: 'equity' },
	{ num: '319', name: 'Dividends', type: 'contra-equity' },
	{ num: '413', name: 'Sales', type: 'revenue' },
	{ num: '415', name: 'Ticket revenue', type: 'revenue' },
	{ num: '601', name: 'Interest expense', type: 'expense' },
	{ num: '602', name: 'Salaries expense', type: 'expense' },
	{ num: '603', name: 'Payroll taxes expense', type: 'expense' },
	{ num: '604', name: 'Warranty expense', type: 'expense' }
];
function acctsFor(nums: string[]): Account[] {
	return ALL_ACCOUNTS.filter((a) => nums.includes(a.num));
}
export const accounts = ALL_ACCOUNTS;
export const accountName = accountNameOf(ALL_ACCOUNTS);

/* ---------- Harbor Fields Outfitters: cash sale with sales tax ---------- */

const harborFieldsAccounts = acctsFor(['101', '201', '307', '318', '319', '413']);
const harborFieldsCompany: Company = {
	name: 'Harbor Fields Outfitters',
	accounts: harborFieldsAccounts,
	retainedEarningsAcct: '318',
	dividendsAcct: '319',
	contraOf: {}
};
const harborFieldsEntries: Entry[] = [
	{
		id: 'harborfields-open',
		date: '2026-01-01',
		lines: [{ acct: '101', dr: 5000 }, { acct: '307', cr: 5000 }],
		explanation: 'Owner invests $5,000 cash for common stock'
	},
	{
		id: '1',
		date: '2026-06-01',
		lines: [{ acct: '101', dr: 1050 }, { acct: '413', cr: 1000 }, { acct: '201', cr: 50 }],
		explanation: 'Cash sale of $1,000 with 5% sales tax'
	}
];
const harborFieldsBalances = post(harborFieldsAccounts, harborFieldsEntries);
export const harborFields = { company: harborFieldsCompany, entries: harborFieldsEntries, balances: harborFieldsBalances };

/* ---------- Continental Arena: season tickets sold in advance ---------- */

const arenaAccounts = acctsFor(['101', '202', '307', '318', '319', '415']);
const arenaCompany: Company = {
	name: 'Continental Arena',
	accounts: arenaAccounts,
	retainedEarningsAcct: '318',
	dividendsAcct: '319',
	contraOf: {}
};
const arenaEntries: Entry[] = [
	{
		id: 'arena-open',
		date: '2026-08-01',
		lines: [{ acct: '101', dr: 5000 }, { acct: '307', cr: 5000 }],
		explanation: 'Owner invests $5,000 cash for common stock'
	},
	{
		id: '2',
		date: '2026-08-15',
		lines: [{ acct: '101', dr: 120000 }, { acct: '202', cr: 120000 }],
		explanation: 'Sell 24 games of season tickets for $120,000 in advance'
	},
	{
		id: '3',
		date: '2026-10-01',
		lines: [{ acct: '202', dr: 15000 }, { acct: '415', cr: 15000 }],
		explanation: 'Three of the 24 games have been played'
	}
];
const arenaBalances = post(arenaAccounts, arenaEntries);
export const arena = { company: arenaCompany, entries: arenaEntries, balances: arenaBalances };

/* ---------- Driftwood Machine Co.: a note payable across year end ---------- */

const driftwoodAccounts = acctsFor(['101', '203', '204', '307', '318', '319', '601']);
const driftwoodCompany: Company = {
	name: 'Driftwood Machine Co.',
	accounts: driftwoodAccounts,
	retainedEarningsAcct: '318',
	dividendsAcct: '319',
	contraOf: {}
};
const driftwoodEntries: Entry[] = [
	{
		id: 'driftwood-open',
		date: '2026-01-01',
		lines: [{ acct: '101', dr: 5000 }, { acct: '307', cr: 5000 }],
		explanation: 'Owner invests $5,000 cash for common stock'
	},
	{
		id: '4',
		date: '2026-12-16',
		lines: [{ acct: '101', dr: 12000 }, { acct: '203', cr: 12000 }],
		explanation: 'Dec 16: borrow $12,000 on a 90-day, 10% note'
	},
	{
		id: '5',
		date: '2026-12-31',
		lines: [{ acct: '601', dr: 50 }, { acct: '204', cr: 50 }],
		explanation: 'Dec 31: accrue 15 days of interest'
	},
	{
		id: '6',
		date: '2027-03-16',
		lines: [{ acct: '203', dr: 12000 }, { acct: '204', dr: 50 }, { acct: '601', dr: 250 }, { acct: '101', cr: 12300 }],
		explanation: 'Mar 16: pay the note and interest'
	}
];
const driftwoodBalances = post(driftwoodAccounts, driftwoodEntries);
export const driftwood = { company: driftwoodCompany, entries: driftwoodEntries, balances: driftwoodBalances };
export const noteInterestTotal = 300;
export const noteDaysToYearEnd = 15; // Dec 16 to Dec 31
export const noteInterestAccruedDec31 = 50;
export const noteInterestNewYear = round(noteInterestTotal - noteInterestAccruedDec31);
export const notePrincipal = 12000;
export const noteRate = 10;
export const noteDays = 90;

/* ---------- Continental Parts Co.: payroll and warranty ---------- */

const partsCoAccounts = acctsFor([
	'141', '205', '206', '207', '208', '209', '210', '211', '212', '307', '318', '319', '602', '603', '604'
]);
const partsCoCompany: Company = {
	name: 'Continental Parts Co.',
	accounts: partsCoAccounts,
	retainedEarningsAcct: '318',
	dividendsAcct: '319',
	contraOf: {}
};
const partsCoEntries: Entry[] = [
	{
		id: 'partsco-open',
		date: '2026-01-01',
		lines: [{ acct: '141', dr: 5000 }, { acct: '307', cr: 5000 }],
		explanation: '$5,000 of repair parts on hand, funded by common stock'
	},
	{
		id: '7',
		date: '2026-12-31',
		lines: [
			{ acct: '602', dr: 10000 },
			{ acct: '205', cr: 620 },
			{ acct: '206', cr: 145 },
			{ acct: '207', cr: 1500 },
			{ acct: '208', cr: 200 },
			{ acct: '209', cr: 7535 }
		],
		explanation: 'Record the $10,000 payroll, employee side'
	},
	{
		id: '8',
		date: '2026-12-31',
		lines: [{ acct: '603', dr: 1365 }, { acct: '205', cr: 620 }, { acct: '206', cr: 145 }, { acct: '210', cr: 60 }, { acct: '211', cr: 540 }],
		explanation: "Record the employer's payroll taxes"
	},
	{
		id: '9',
		date: '2026-12-31',
		lines: [{ acct: '604', dr: 8000 }, { acct: '212', cr: 8000 }],
		explanation: 'Accrue warranty cost at 4% of $200,000 sales'
	},
	{
		id: '10',
		date: '2027-02-01',
		lines: [{ acct: '212', dr: 1500 }, { acct: '141', cr: 1500 }],
		explanation: 'Repair a product under warranty with $1,500 of parts'
	}
];
const partsCoBalances = post(partsCoAccounts, partsCoEntries);
export const partsCo = { company: partsCoCompany, entries: partsCoEntries, balances: partsCoBalances };

/* ---------- The payroll waterfall: everything scales with gross pay ---------- */

export const defaultGrossPay = 10000;
export const socialSecurityRate = 0.062;
export const medicareRate = 0.0145;
export const futaRate = 0.006;
export const sutaRate = 0.054;
// Federal income tax and medical insurance are given as flat figures at the
// $10,000 default; expressed as rates here purely so the instrument scales
// sensibly across the slider's range, matching the given anchors exactly at
// the default.
export const federalIncomeTaxRate = round((1500 / defaultGrossPay) * 10000) / 10000;
export const medicalInsuranceRate = round((200 / defaultGrossPay) * 10000) / 10000;

export interface PayrollFigures {
	grossPay: number;
	socialSecurity: number;
	medicare: number;
	federalIncomeTax: number;
	medicalInsurance: number;
	netPay: number;
	employerSocialSecurity: number;
	employerMedicare: number;
	futa: number;
	suta: number;
	employerTaxes: number;
	totalCost: number;
}
export function payrollAt(grossPay: number): PayrollFigures {
	const socialSecurity = round(grossPay * socialSecurityRate);
	const medicare = round(grossPay * medicareRate);
	const federalIncomeTax = round(grossPay * federalIncomeTaxRate);
	const medicalInsurance = round(grossPay * medicalInsuranceRate);
	const netPay = round(grossPay - socialSecurity - medicare - federalIncomeTax - medicalInsurance);
	const futa = round(grossPay * futaRate);
	const suta = round(grossPay * sutaRate);
	const employerTaxes = round(socialSecurity + medicare + futa + suta);
	return {
		grossPay,
		socialSecurity,
		medicare,
		federalIncomeTax,
		medicalInsurance,
		netPay,
		employerSocialSecurity: socialSecurity,
		employerMedicare: medicare,
		futa,
		suta,
		employerTaxes,
		totalCost: round(grossPay + employerTaxes)
	};
}
export const defaultPayroll = payrollAt(defaultGrossPay);

/* ---------- Warranty accrual ---------- */

export const defaultSales = 200000;
export const defaultWarrantyRate = 0.04;
export const defaultRepairsUsed = 1500;
export function warrantyExpense(sales: number, rate: number): number {
	return round(sales * rate);
}
export function warrantyLiabilityAfterRepairs(sales: number, rate: number, repairsUsed: number): number {
	return round(warrantyExpense(sales, rate) - repairsUsed);
}

/* ---------- Times interest earned ---------- */

export const incomeBeforeInterestAndTaxes = 150000;
export const interestExpenseForTurnover = 30000;
export const timesInterestEarned = round((incomeBeforeInterestAndTaxes / interestExpenseForTurnover) * 10) / 10;

/* ---------- Classification drill ---------- */

const LIABILITY_CATEGORIES = [
	{ id: 'known', label: 'Known liability' },
	{ id: 'estimated', label: 'Estimated liability' },
	{ id: 'contingent-record', label: 'Contingent — record it' },
	{ id: 'contingent-disclose', label: 'Contingent — disclose in notes' },
	{ id: 'none', label: 'No entry, no disclosure' }
];
export const classifications: Classification[] = [
	{ lo: 'C1', text: 'Amounts owed to suppliers', options: LIABILITY_CATEGORIES, answer: 'known', why: 'The amount and the creditor are certain.' },
	{ lo: 'C2', text: 'Sales taxes collected from customers', options: LIABILITY_CATEGORIES, answer: 'known', why: 'Owed to the government, amount certain.' },
	{
		lo: 'C2',
		text: 'Season tickets sold in advance',
		options: LIABILITY_CATEGORIES,
		answer: 'known',
		why: 'Unearned revenue: the obligation is to deliver the games.'
	},
	{ lo: 'P1', text: "Taxes withheld from employees' pay", options: LIABILITY_CATEGORIES, answer: 'known', why: 'Collected and owed to the government.' },
	{
		lo: 'C1',
		text: 'The part of a long-term note due next year',
		options: LIABILITY_CATEGORIES,
		answer: 'known',
		why: 'Current portion of long-term debt.'
	},
	{
		lo: 'A1',
		text: 'Warranty repairs on products already sold',
		options: LIABILITY_CATEGORIES,
		answer: 'estimated',
		why: 'Certain to arise; amount must be estimated.'
	},
	{
		lo: 'C1',
		text: 'Vacation pay employees have earned',
		options: LIABILITY_CATEGORIES,
		answer: 'estimated',
		why: 'Owed, but the amount depends on who takes it.'
	},
	{
		lo: 'C1',
		text: 'A lawsuit the company will probably lose, amount can be estimated',
		options: LIABILITY_CATEGORIES,
		answer: 'contingent-record',
		why: 'Probable and estimable.'
	},
	{
		lo: 'C1',
		text: 'A lawsuit the company could reasonably possibly lose',
		options: LIABILITY_CATEGORIES,
		answer: 'contingent-disclose',
		why: 'Not probable, but not remote.'
	},
	{ lo: 'C1', text: 'A claim with only a remote chance of loss', options: LIABILITY_CATEGORIES, answer: 'none', why: 'Remote.' }
];

/* ---------- Entry drill: 10 situations, 10 cards ---------- */

export const entryDrillAccounts = acctsFor([
	'101', '141', '201', '202', '203', '204', '205', '206', '207', '208', '209', '210', '211', '212', '413', '415', '601', '602', '603', '604'
]);
const allDrillEntries = [...harborFieldsEntries, ...arenaEntries, ...driftwoodEntries, ...partsCoEntries];
function findEntry(id: string): Entry {
	const e = allDrillEntries.find((x) => x.id === id);
	if (!e) throw new Error(`Entry drill card references unknown entry ${id}`);
	return e;
}
export const entryCards: EntryCardSpec[] = [
	{ lo: 'C2', prompt: 'Cash sale of $1,000 with 5% sales tax (price entry only).', entry: findEntry('1') },
	{ lo: 'C2', prompt: 'Sell 24 games of season tickets for $120,000 in advance.', entry: findEntry('2') },
	{ lo: 'C2', prompt: 'Three of the 24 games have been played.', entry: findEntry('3') },
	{ lo: 'P2', prompt: 'Dec 16: borrow $12,000 on a 90-day, 10% note.', entry: findEntry('4') },
	{ lo: 'P2', prompt: 'Dec 31: accrue 15 days of interest.', entry: findEntry('5') },
	{
		lo: 'P2',
		prompt: 'Mar 16: pay the note and interest.',
		entry: findEntry('6'),
		hint: 'Only 75 of the 90 days’ interest is new expense here — 15 days were already accrued.'
	},
	{
		lo: 'P1',
		prompt: 'Record the $10,000 payroll, employee side.',
		entry: findEntry('7'),
		hint: 'Salaries payable absorbs whatever gross pay does not go to a withholding.'
	},
	{
		lo: 'P1',
		prompt: "Record the employer's payroll taxes.",
		entry: findEntry('8'),
		hint: 'FUTA and SUTA are never withheld from the employee — this entry is the employer’s alone.'
	},
	{ lo: 'A1', prompt: 'Accrue warranty cost at 4% of $200,000 sales.', entry: findEntry('9') },
	{
		lo: 'A1',
		prompt: 'Repair a product under warranty with $1,500 of parts.',
		entry: findEntry('10'),
		hint: 'The repair reduces the liability, not expense — the expense was already recorded at the sale.'
	}
];

/* ---------- Recall rules ---------- */

export const rules: Rule[] = [
	{
		lo: 'P1',
		prompt: 'FICA is matched by the employer. FUTA and SUTA are:',
		options: [{ id: 'a', label: 'Also matched by the employer' }, { id: 'b', label: 'Withheld from the employee instead' }, { id: 'c', label: 'Paid entirely by the employer, never withheld' }],
		answer: 'c',
		why: 'FUTA and SUTA are employer-only taxes — nothing is withheld from the employee for them.'
	},
	{
		lo: 'A1',
		prompt: 'Warranty expense is recorded in:',
		options: [{ id: 'a', label: 'The year of the sale' }, { id: 'b', label: 'The year of the repair' }, { id: 'c', label: 'Whichever year is more convenient' }],
		answer: 'a',
		why: 'The expense is estimated and recorded when the product is sold, matched against that sale’s revenue.'
	},
	{
		lo: 'C1',
		prompt: 'A contingent liability that is probable and estimable is:',
		options: [{ id: 'a', label: 'Recorded' }, { id: 'b', label: 'Disclosed only' }, { id: 'c', label: 'Ignored' }],
		answer: 'a',
		why: 'Probable and estimable means record it. Reasonably possible means disclose it. Remote means neither.'
	},
	{
		lo: 'C2',
		prompt: 'Sales tax a business collects from customers is:',
		options: [{ id: 'a', label: 'Revenue' }, { id: 'b', label: 'A liability, never revenue' }, { id: 'c', label: 'An expense' }],
		answer: 'b',
		why: "It belongs to the government — the business only holds it until it's remitted."
	},
	{
		lo: 'C1',
		prompt: 'The portion of a long-term note due within the next year is classified as:',
		options: [{ id: 'a', label: 'Still entirely long-term' }, { id: 'b', label: 'A current liability' }, { id: 'c', label: "Removed from the books until it's due" }],
		answer: 'b',
		why: "It's reclassified as a current liability — the current portion of long-term debt."
	}
];

/* ---------- Formulas ---------- */

export const formulas: Formula[] = [
	{
		lo: 'P1',
		formula: 'Net pay = Gross pay − Withholdings',
		worked: `${fmt(defaultPayroll.grossPay, { dollar: true })} − ${fmt(defaultPayroll.socialSecurity, { dollar: true })} − ${fmt(defaultPayroll.medicare, { dollar: true })} − ${fmt(defaultPayroll.federalIncomeTax, { dollar: true })} − ${fmt(defaultPayroll.medicalInsurance, { dollar: true })} = ${fmt(defaultPayroll.netPay, { dollar: true })}`
	},
	{
		lo: 'P1',
		formula: 'Employer payroll taxes = Employer FICA + FUTA + SUTA',
		worked: `${fmt(defaultPayroll.employerSocialSecurity, { dollar: true })} + ${fmt(defaultPayroll.employerMedicare, { dollar: true })} + ${fmt(defaultPayroll.futa, { dollar: true })} + ${fmt(defaultPayroll.suta, { dollar: true })} = ${fmt(defaultPayroll.employerTaxes, { dollar: true })}`
	},
	{
		lo: 'P1',
		formula: 'Total cost of payroll = Gross pay + Employer payroll taxes',
		worked: `${fmt(defaultPayroll.grossPay, { dollar: true })} + ${fmt(defaultPayroll.employerTaxes, { dollar: true })} = ${fmt(defaultPayroll.totalCost, { dollar: true })}`
	},
	{
		lo: 'P2',
		formula: 'Interest = Principal × Rate × Time',
		worked: `${fmt(notePrincipal, { dollar: true })} × ${noteRate}% × ${noteDays}/360 = ${fmt(noteInterestTotal, { dollar: true })}`
	},
	{
		lo: 'A3',
		formula: 'Times interest earned = Income before interest expense and income taxes ÷ Interest expense',
		worked: `${fmt(incomeBeforeInterestAndTaxes, { dollar: true })} ÷ ${fmt(interestExpenseForTurnover, { dollar: true })} = ${timesInterestEarned.toFixed(1)} times`
	}
];

/* ---------- Lessons (Learn) and instruments (Lab) ---------- */

export const lessons: LessonMeta[] = [
	{ id: 'current-liabilities', title: 'Three kinds of owing', lo: 'C1' },
	{ id: 'sales-tax-and-unearned-revenue', title: 'Money that is not yours yet', lo: 'C2' },
	{ id: 'payroll', title: 'The number on the check is not the cost', lo: 'P1' },
	{ id: 'notes-payable', title: 'Interest does not wait for the calendar', lo: 'P2' },
	{ id: 'warranty', title: 'Promise now, pay later', lo: 'A1' },
	{ id: 'times-interest-earned', title: 'How easily interest is covered', lo: 'A3' }
];

export const instruments: InstrumentMeta[] = [
	{
		id: 'payroll-waterfall',
		title: 'Payroll waterfall',
		lo: 'P1',
		instruction: "Change the gross pay and watch each withholding step it down to net pay, with the employer's cost growing beside it.",
		resultLine: `Net pay ${fmt(defaultPayroll.netPay, { dollar: true })} · Employer payroll taxes ${fmt(defaultPayroll.employerTaxes, { dollar: true })} · Total cost ${fmt(defaultPayroll.totalCost, { dollar: true })}`,
		noticed:
			"The employee's withholdings come out of gross pay. The employer's taxes are a second, separate cost added on top — they never touch the paycheck."
	},
	{
		id: 'warranty-accrual',
		title: 'Warranty accrual',
		lo: 'A1',
		instruction: 'Change sales and the warranty rate and watch the liability build before any repair happens.',
		resultLine: `Warranty expense ${fmt(warrantyExpense(defaultSales, defaultWarrantyRate), { dollar: true })} (year of sale) · Liability after repairs ${fmt(warrantyLiabilityAfterRepairs(defaultSales, defaultWarrantyRate, defaultRepairsUsed), { dollar: true })}`,
		noticed: 'The expense landed in the year the products were sold, even though the repairs came later.'
	},
	{
		id: 'note-across-year-end',
		title: 'Note payable across year end',
		lo: 'P2',
		instruction: "Drag year end across the note's term and watch the interest split between two years.",
		resultLine: `Dec 31 accrued interest ${fmt(noteInterestAccruedDec31, { dollar: true })} · Paid at maturity Mar 16: ${fmt(round(notePrincipal + noteInterestTotal), { dollar: true })}`,
		noticed:
			"Whatever day year end falls on, the days up to it belong to this year's interest expense — the rest belongs to next year, no matter when the note is paid."
	}
];

/* ---------- Chapter export, anchors, invariants ---------- */

export const meta = {
	number: 9,
	slug: 'current-liabilities',
	title: 'Accounting for Current Liabilities',
	part: 'financial' as const,
	status: 'live' as const,
	summary: 'Payroll, warranties, and what is owed within the year.',
	instrument: 'Payroll breakdown',
	oneLine:
		'What a business owes within the year — including the payroll costs most employees never see on their pay stub.',
	headline: `A **${fmt(defaultPayroll.grossPay, { dollar: true })}** payroll puts **${fmt(defaultPayroll.netPay, { dollar: true })}** in employees' pockets and costs the company **${fmt(defaultPayroll.totalCost, { dollar: true })}**.`
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
		{ label: 'Harbor Fields Outfitters, a cash sale with sales tax', company: harborFieldsCompany, entries: harborFieldsEntries },
		{ label: 'Continental Arena, season tickets sold in advance', company: arenaCompany, entries: arenaEntries },
		{ label: 'Driftwood Machine Co., a note payable across year end', company: driftwoodCompany, entries: driftwoodEntries },
		{ label: 'Continental Parts Co., payroll and warranty', company: partsCoCompany, entries: partsCoEntries }
	],
	anchors: (): Anchor[] => [
		{ label: 'Net pay', expected: 7535, actual: defaultPayroll.netPay },
		{ label: 'Employer payroll taxes', expected: 1365, actual: defaultPayroll.employerTaxes },
		{ label: 'Total cost of payroll', expected: 11365, actual: defaultPayroll.totalCost },
		{ label: 'Warranty expense', expected: 8000, actual: warrantyExpense(defaultSales, defaultWarrantyRate) },
		{
			label: 'Warranty liability after repair',
			expected: 6500,
			actual: warrantyLiabilityAfterRepairs(defaultSales, defaultWarrantyRate, defaultRepairsUsed)
		},
		{ label: 'Note interest, total', expected: 300, actual: noteInterestTotal },
		{ label: 'Note interest, accrued Dec 31', expected: 50, actual: noteInterestAccruedDec31 },
		{ label: 'Note interest, new year', expected: 250, actual: noteInterestNewYear },
		{ label: 'Times interest earned', expected: 5, actual: timesInterestEarned }
	],
	invariants: () => {
		if (classifications.length !== 10)
			throw new Error(`Chapter 9 should have 10 classification items, has ${classifications.length}`);
		if (entryCards.length !== 10)
			throw new Error(`Chapter 9 should have 10 entry-drill cards, has ${entryCards.length}`);
		for (const c of classifications) {
			if (!c.options.some((o) => o.id === c.answer))
				throw new Error(`Classification answer not in options: ${c.text}`);
		}
		for (const r of rules) {
			if (!r.options.some((o) => o.id === r.answer))
				throw new Error(`Rule answer not in options: ${r.prompt}`);
		}
		if (Math.abs(noteInterestAccruedDec31 + noteInterestNewYear - noteInterestTotal) > 0.01)
			throw new Error('Note interest split across the year end should sum to the total');
	}
};
