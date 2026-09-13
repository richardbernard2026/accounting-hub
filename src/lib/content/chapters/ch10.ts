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
 * "before building" note asks to pull the book's discount/premium bond
 * examples and confirm whether the chapter body teaches straight-line or
 * effective interest amortization, which needs the physical text (not
 * available from here). Built on the brief's own internally consistent
 * bond (par 100,000, 8% contract, 4 years semiannual) and hand-verified:
 * every issue price, first-period interest expense, and the installment
 * note's three-payment schedule reproduce the brief's table exactly. See
 * the final report for this standing caveat.
 */
export const objectives: Objective[] = [
	{
		code: 'C1',
		kind: 'conceptual',
		short: 'Discount, par, premium',
		text: 'Distinguish bonds sold at a discount, at par, or at a premium based on the relationship between contract and market rates.'
	},
	{
		code: 'P1',
		kind: 'procedural',
		short: 'Bond pricing',
		text: 'Compute the issue price of bonds as the present value of the principal and interest payments at the market rate.'
	},
	{
		code: 'P2',
		kind: 'procedural',
		short: 'Straight-line amortization',
		text: 'Amortize a bond discount or premium using the straight-line method.'
	},
	{
		code: 'P3',
		kind: 'procedural',
		short: 'Effective interest',
		text: 'Amortize a bond discount or premium using the effective interest method.'
	},
	{
		code: 'P4',
		kind: 'procedural',
		short: 'Installment notes',
		text: 'Prepare an installment note amortization schedule allocating each payment between interest and principal.'
	},
	{
		code: 'A1',
		kind: 'analytical',
		short: 'Early retirement',
		text: 'Compute the gain or loss on the early retirement of bonds.'
	},
	{
		code: 'A2',
		kind: 'analytical',
		short: 'Debt-to-equity',
		text: 'Compute and interpret the debt-to-equity ratio.'
	}
];

export const terms: Term[] = [
	{ term: 'Bond', lo: 'C1', definition: 'A long-term liability paid off in a series of interest payments and a final principal payment, split into transferable shares.' },
	{ term: 'Par value (face amount)', lo: 'C1', definition: "The amount printed on the bond, paid to the holder at maturity, and the base for computing cash interest." },
	{ term: 'Contract rate (coupon rate)', lo: 'C1', definition: "The rate printed on the bond, fixing the cash interest paid — it never changes over the bond's life." },
	{ term: 'Market rate', lo: 'C1', definition: 'The rate investors currently demand for bonds of similar risk; it prices the bond and can differ from the contract rate.' },
	{ term: 'Bond indenture', lo: 'C1', definition: 'The legal contract identifying the rights and obligations of bondholders and the issuer.' },
	{ term: 'Bond certificate', lo: 'C1', definition: 'The physical or electronic document evidencing a bondholder’s claim.' },
	{ term: 'Discount on bonds payable', lo: 'P1', definition: 'A contra liability recording the amount by which issue price is below par; arises when the market rate exceeds the contract rate.' },
	{ term: 'Premium on bonds payable', lo: 'P1', definition: 'An adjunct liability recording the amount by which issue price is above par; arises when the contract rate exceeds the market rate.' },
	{ term: 'Carrying (book) value of bonds', lo: 'P1', definition: 'Par value minus any unamortized discount, or plus any unamortized premium.' },
	{ term: 'Straight-line bond amortization', lo: 'P2', definition: 'Moving an equal slice of the discount or premium to interest expense each period.' },
	{ term: 'Effective interest method', lo: 'P3', definition: 'Computing interest expense each period as the market rate times the beginning carrying value.' },
	{ term: 'Callable bonds', lo: 'C1', definition: 'Bonds the issuer can retire before maturity at a stated call price.' },
	{ term: 'Convertible bonds', lo: 'C1', definition: 'Bonds the holder can exchange for a fixed number of shares of the issuer’s stock.' },
	{ term: 'Secured bonds', lo: 'C1', definition: 'Bonds backed by a pledge of specific issuer assets.' },
	{ term: 'Unsecured bonds (debentures)', lo: 'C1', definition: 'Bonds backed only by the issuer’s general credit standing, not a specific pledge.' },
	{ term: 'Term bonds', lo: 'C1', definition: 'Bonds that all mature at the same date.' },
	{ term: 'Serial bonds', lo: 'C1', definition: 'Bonds that mature in installments over several dates.' },
	{ term: 'Registered bonds', lo: 'C1', definition: 'Bonds issued in the owner’s name; the issuer pays that owner directly.' },
	{ term: 'Bearer bonds', lo: 'C1', definition: 'Unregistered bonds payable to whoever holds the certificate.' },
	{ term: 'Sinking fund bonds', lo: 'C1', definition: 'Bonds requiring the issuer to set assets aside toward their retirement.' },
	{ term: 'Installment note', lo: 'P4', definition: 'A liability requiring a series of periodic payments, each covering interest on the unpaid balance plus a portion of principal.' },
	{ term: 'Mortgage', lo: 'P4', definition: '[book?] — check this edition’s exact terminology. A long-term note secured by a pledge of specific property.' },
	{ term: 'Present value', lo: 'P1', definition: 'The value today of an amount to be received or paid in the future, discounted at a given rate.' },
	{ term: 'Annuity', lo: 'P1', definition: 'A series of equal payments made at equal time intervals.' },
	{ term: 'Lease', lo: 'C1', definition: '[book?] — check this edition’s exact terminology. A contract granting the right to use an asset for a period in exchange for payments.' },
	{ term: 'Pension plan', lo: 'C1', definition: '[book?] — check this edition’s exact terminology. An agreement by an employer to provide benefits to employees after they retire.' },
	{ term: 'Debt-to-equity ratio', lo: 'A2', definition: 'Total liabilities divided by total equity; measures how much of financing comes from creditors versus owners.' }
];

export const quickChecks: QuickCheck[] = [
	{
		lo: 'C1',
		q: 'A bond with an 8% contract rate is issued when the market wants 10%. It sells:',
		options: ['At a discount', 'At par', 'At a premium'],
		answer: 0,
		why: 'Investors will not pay par for a rate below what they can get elsewhere, so the price falls until the effective yield matches the market.'
	},
	{
		lo: 'P1',
		q: 'Bond price is the present value of which two cash flows?',
		options: ['Par value only', 'Interest payments only', 'Par value and the interest payments'],
		answer: 2,
		why: 'A bond promises two things: the principal at maturity and the periodic interest — price is the present value of both.'
	},
	{
		lo: 'P2',
		q: 'Straight-line amortization moves the same dollar amount to interest expense:',
		options: ['Every period', 'Only in the first period', 'Only at maturity'],
		answer: 0,
		why: 'Straight-line divides the discount or premium evenly across every period of the bond’s life.'
	},
	{
		lo: 'P3',
		q: 'Effective interest expense each period equals:',
		options: ['Par × contract rate', 'Beginning carrying value × market rate', 'Ending carrying value × contract rate'],
		answer: 1,
		why: 'Effective interest ties expense to the market rate and the carrying value actually outstanding that period.'
	},
	{
		lo: 'P4',
		q: 'On an installment note, as payments continue, the interest portion of each payment:',
		options: ['Grows', 'Shrinks', 'Stays the same'],
		answer: 1,
		why: 'Interest is charged only on the remaining balance, and that balance falls with every payment.'
	},
	{
		lo: 'A1',
		q: 'A gain or loss on bond retirement is measured against:',
		options: ['Par value', 'Carrying value', 'Original issue price'],
		answer: 1,
		why: 'What is actually removed from the books is the carrying value — par net of any unamortized discount or premium.'
	},
	{
		lo: 'A2',
		q: 'A rising debt-to-equity ratio means the company is financed more by:',
		options: ['Creditors', 'Owners', 'Neither — the ratio ignores financing'],
		answer: 0,
		why: 'The ratio is total liabilities over total equity; more debt relative to equity pushes it up.'
	}
];

/* ---------- Chart of accounts ---------- */

const ALL_ACCOUNTS: Account[] = [
	{ num: '101', name: 'Cash', type: 'asset' },
	{ num: '201', name: 'Bonds payable', type: 'liability' },
	{ num: '202', name: 'Discount on bonds payable', type: 'contra-liability' },
	{ num: '203', name: 'Premium on bonds payable', type: 'adjunct-liability' },
	{ num: '204', name: 'Notes payable', type: 'liability' },
	{ num: '307', name: 'Common stock', type: 'equity' },
	{ num: '318', name: 'Retained earnings', type: 'equity' },
	{ num: '319', name: 'Dividends', type: 'contra-equity' },
	{ num: '505', name: 'Loss on bond retirement', type: 'expense' },
	{ num: '601', name: 'Bond interest expense', type: 'expense' },
	{ num: '602', name: 'Interest expense', type: 'expense' }
];
function acctsFor(nums: string[]): Account[] {
	return ALL_ACCOUNTS.filter((a) => nums.includes(a.num));
}
export const accounts = ALL_ACCOUNTS;
export const accountName = accountNameOf(ALL_ACCOUNTS);

/* ---------- Bond pricing and amortization: generic present-value functions ---------- */

export const bondPar = 100000;
export const bondContractRateAnnual = 0.08;
export const bondYears = 4;
export const bondPeriodsPerYear = 2;
export const bondPeriods = bondYears * bondPeriodsPerYear; // 8
export const bondContractRatePerPeriod = bondContractRateAnnual / bondPeriodsPerYear; // 4%
export const bondCashInterest = round(bondPar * bondContractRatePerPeriod); // 4,000

/** Bond and note math rounds to whole dollars, per the brief — `round()` from the ledger rounds to cents. */
function roundDollar(n: number): number {
	return Math.round(n);
}
export function presentValue(amount: number, ratePerPeriod: number, periods: number): number {
	return amount / Math.pow(1 + ratePerPeriod, periods);
}
export function presentValueAnnuity(payment: number, ratePerPeriod: number, periods: number): number {
	if (ratePerPeriod === 0) return payment * periods;
	return (payment * (1 - Math.pow(1 + ratePerPeriod, -periods))) / ratePerPeriod;
}
export function bondPrice(marketRateAnnualPct: number): number {
	const marketRatePerPeriod = marketRateAnnualPct / 100 / bondPeriodsPerYear;
	const pvPar = presentValue(bondPar, marketRatePerPeriod, bondPeriods);
	const pvInterest = presentValueAnnuity(bondCashInterest, marketRatePerPeriod, bondPeriods);
	return roundDollar(pvPar + pvInterest);
}
export function straightLineCarryingSchedule(marketRateAnnualPct: number): number[] {
	const price = bondPrice(marketRateAnnualPct);
	const perPeriod = roundDollar((bondPar - price) / bondPeriods);
	const out: number[] = [price];
	let carrying = price;
	for (let i = 0; i < bondPeriods; i++) {
		carrying = roundDollar(carrying + perPeriod);
		out.push(carrying);
	}
	out[out.length - 1] = bondPar; // corrects the last period for rounding drift
	return out;
}
export function effectiveInterestCarryingSchedule(marketRateAnnualPct: number): number[] {
	const marketRatePerPeriod = marketRateAnnualPct / 100 / bondPeriodsPerYear;
	const price = bondPrice(marketRateAnnualPct);
	const out: number[] = [price];
	let carrying = price;
	for (let i = 0; i < bondPeriods; i++) {
		const interestExpense = roundDollar(carrying * marketRatePerPeriod);
		const amortization = roundDollar(interestExpense - bondCashInterest);
		carrying = roundDollar(carrying + amortization);
		out.push(carrying);
	}
	out[out.length - 1] = bondPar; // corrects the last period for rounding drift
	return out;
}
export const discountPrice = bondPrice(10); // 93,537
export const parPrice = bondPrice(8); // 100,000
export const premiumPrice = bondPrice(6); // 107,020
export const discountAmount = roundDollar(bondPar - discountPrice); // 6,463
export const premiumAmount = roundDollar(premiumPrice - bondPar); // 7,020
export const straightLineAmortizationPerPeriod = roundDollar(discountAmount / bondPeriods); // 808
export const effectiveInterestFirstPeriodDiscount = roundDollar(discountPrice * 0.05); // 4,677
export const effectiveInterestFirstPeriodPremium = roundDollar(premiumPrice * 0.03); // 3,211
export const premiumAmortizationFirstPeriod = roundDollar(bondCashInterest - effectiveInterestFirstPeriodPremium); // 789

/* ---------- Installment note: a generic amortization schedule ---------- */

export interface InstallmentRow {
	payment: number;
	interest: number;
	principal: number;
	balance: number;
}
export function installmentPayment(principal: number, ratePerPeriod: number, periods: number): number {
	const factor = presentValueAnnuity(1, ratePerPeriod, periods);
	return roundDollar(principal / factor);
}
export function installmentSchedule(principal: number, ratePerPeriod: number, periods: number): InstallmentRow[] {
	const payment = installmentPayment(principal, ratePerPeriod, periods);
	const rows: InstallmentRow[] = [];
	let balance = principal;
	for (let i = 1; i <= periods; i++) {
		const interest = roundDollar(balance * ratePerPeriod);
		let principalPortion = roundDollar(payment - interest);
		balance = roundDollar(balance - principalPortion);
		if (i === periods && balance !== 0) {
			principalPortion = roundDollar(principalPortion + balance);
			balance = 0;
		}
		rows.push({ payment: i, interest, principal: principalPortion, balance });
	}
	return rows;
}
export const notePrincipal = 60000;
export const noteRate = 0.08;
export const notePeriods = 3;
export const notePayment = installmentPayment(notePrincipal, noteRate, notePeriods); // 23,282
export const noteSchedule = installmentSchedule(notePrincipal, noteRate, notePeriods);
export const noteTotalPaid = round(notePayment * notePeriods);
export const noteTotalInterest = round(noteSchedule.reduce((s, r) => s + r.interest, 0));

/* ---------- Early retirement ---------- */

export const retirementPar = 100000;
export const retirementUnamortizedDiscount = 4000;
export const retirementCarryingValue = round(retirementPar - retirementUnamortizedDiscount); // 96,000
export function retirementGainOrLoss(callPrice: number): number {
	return round(retirementCarryingValue - callPrice);
}
export const retirementCallPrice = round(retirementPar * 1.03); // 103,000
export const retirementLoss = Math.abs(retirementGainOrLoss(retirementCallPrice)); // 7,000

/* ---------- Debt-to-equity (formula only — not tied to a chapter scenario's entries) ---------- */

export const totalLiabilitiesForRatio = 300000;
export const totalEquityForRatio = 200000;
export const debtToEquity = round((totalLiabilitiesForRatio / totalEquityForRatio) * 10) / 10;

/* ---------- Ridgemont Utilities: bonds issued at a discount, straight-line vs effective interest ---------- */

const ridgemontAccounts = acctsFor(['101', '201', '202', '307', '318', '319', '601']);
const ridgemontSlCompany: Company = {
	name: 'Ridgemont Utilities (straight-line)',
	accounts: ridgemontAccounts,
	retainedEarningsAcct: '318',
	dividendsAcct: '319',
	contraOf: {},
	contraLiabilityOf: { '202': '201' }
};
const ridgemontSlEntries: Entry[] = [
	{
		id: 'rsl-open',
		date: '2025-01-01',
		lines: [{ acct: '101', dr: 20000 }, { acct: '307', cr: 20000 }],
		explanation: 'Owner invests $20,000 cash for common stock'
	},
	{
		id: '3',
		date: '2025-01-01',
		lines: [
			{ acct: '101', dr: discountPrice },
			{ acct: '202', dr: discountAmount },
			{ acct: '201', cr: bondPar }
		],
		explanation: `Issue $${bondPar.toLocaleString()} of 8% bonds when the market wants 10%`
	},
	{
		id: '4',
		date: '2025-07-01',
		lines: [
			{ acct: '601', dr: straightLineAmortizationPerPeriod + bondCashInterest },
			{ acct: '202', cr: straightLineAmortizationPerPeriod },
			{ acct: '101', cr: bondCashInterest }
		],
		explanation: 'First interest payment, straight-line amortization'
	}
];
const ridgemontSlBalances = post(ridgemontAccounts, ridgemontSlEntries);
export const ridgemontSl = { company: ridgemontSlCompany, entries: ridgemontSlEntries, balances: ridgemontSlBalances };

const ridgemontEiCompany: Company = {
	name: 'Ridgemont Utilities (effective interest)',
	accounts: ridgemontAccounts,
	retainedEarningsAcct: '318',
	dividendsAcct: '319',
	contraOf: {},
	contraLiabilityOf: { '202': '201' }
};
const ridgemontEiEntries: Entry[] = [
	{ ...ridgemontSlEntries[0], id: 'rei-open' },
	{ ...ridgemontSlEntries[1], id: 'rei-issue' },
	{
		id: '5',
		date: '2025-07-01',
		lines: [
			{ acct: '601', dr: effectiveInterestFirstPeriodDiscount },
			{ acct: '202', cr: effectiveInterestFirstPeriodDiscount - bondCashInterest },
			{ acct: '101', cr: bondCashInterest }
		],
		explanation: 'First interest payment, effective interest amortization'
	}
];
const ridgemontEiBalances = post(ridgemontAccounts, ridgemontEiEntries);
export const ridgemontEi = { company: ridgemontEiCompany, entries: ridgemontEiEntries, balances: ridgemontEiBalances };

/* ---------- Harborline Freight: bonds issued at a premium, effective interest ---------- */

const harborlineAccounts = acctsFor(['101', '201', '203', '307', '318', '319', '601']);
const harborlineCompany: Company = {
	name: 'Harborline Freight',
	accounts: harborlineAccounts,
	retainedEarningsAcct: '318',
	dividendsAcct: '319',
	contraOf: {},
	adjunctLiabilityOf: { '203': '201' }
};
const harborlineEntries: Entry[] = [
	{
		id: 'hbl-open',
		date: '2025-01-01',
		lines: [{ acct: '101', dr: 20000 }, { acct: '307', cr: 20000 }],
		explanation: 'Owner invests $20,000 cash for common stock'
	},
	{
		id: '6',
		date: '2025-01-01',
		lines: [
			{ acct: '101', dr: premiumPrice },
			{ acct: '203', cr: premiumAmount },
			{ acct: '201', cr: bondPar }
		],
		explanation: `Issue $${bondPar.toLocaleString()} of 8% bonds when the market wants 6%`
	},
	{
		id: '7',
		date: '2025-07-01',
		lines: [
			{ acct: '601', dr: effectiveInterestFirstPeriodPremium },
			{ acct: '203', dr: premiumAmortizationFirstPeriod },
			{ acct: '101', cr: bondCashInterest }
		],
		explanation: 'First interest payment, effective interest amortization'
	}
];
const harborlineBalances = post(harborlineAccounts, harborlineEntries);
export const harborline = { company: harborlineCompany, entries: harborlineEntries, balances: harborlineBalances };

/* ---------- Vantage Equipment: installment note ---------- */

const vantageAccounts = acctsFor(['101', '204', '307', '318', '319', '602']);
const vantageCompany: Company = {
	name: 'Vantage Equipment',
	accounts: vantageAccounts,
	retainedEarningsAcct: '318',
	dividendsAcct: '319',
	contraOf: {}
};
const vantageEntries: Entry[] = [
	{
		id: 'van-open',
		date: '2025-01-01',
		lines: [{ acct: '101', dr: 20000 }, { acct: '307', cr: 20000 }],
		explanation: 'Owner invests $20,000 cash for common stock'
	},
	{
		id: '9',
		date: '2025-01-01',
		lines: [{ acct: '101', dr: notePrincipal }, { acct: '204', cr: notePrincipal }],
		explanation: `Borrow $${notePrincipal.toLocaleString()} on an 8% installment note`
	},
	{
		id: '10',
		date: '2025-12-31',
		lines: [
			{ acct: '602', dr: noteSchedule[0].interest },
			{ acct: '204', dr: noteSchedule[0].principal },
			{ acct: '101', cr: notePayment }
		],
		explanation: 'First annual installment payment'
	},
	{
		id: 'van-pay2',
		date: '2026-12-31',
		lines: [
			{ acct: '602', dr: noteSchedule[1].interest },
			{ acct: '204', dr: noteSchedule[1].principal },
			{ acct: '101', cr: notePayment }
		],
		explanation: 'Second annual installment payment'
	},
	{
		id: 'van-pay3',
		date: '2027-12-31',
		lines: [
			{ acct: '602', dr: noteSchedule[2].interest },
			{ acct: '204', dr: noteSchedule[2].principal },
			{ acct: '101', cr: notePayment }
		],
		explanation: 'Third and final annual installment payment'
	}
];
const vantageBalances = post(vantageAccounts, vantageEntries);
export const vantage = { company: vantageCompany, entries: vantageEntries, balances: vantageBalances };

/* ---------- Fenwick Traders: bonds called before maturity ---------- */

const fenwickAccounts = acctsFor(['101', '201', '202', '307', '318', '319', '505']);
const fenwickCompany: Company = {
	name: 'Fenwick Traders',
	accounts: fenwickAccounts,
	retainedEarningsAcct: '318',
	dividendsAcct: '319',
	contraOf: {},
	contraLiabilityOf: { '202': '201' }
};
const fenwickEntries: Entry[] = [
	{
		id: 'fen-open',
		date: '2025-01-01',
		lines: [{ acct: '101', dr: 20000 }, { acct: '307', cr: 20000 }],
		explanation: 'Owner invests $20,000 cash for common stock'
	},
	{
		id: 'fen-issue',
		date: '2025-01-01',
		lines: [
			{ acct: '101', dr: retirementCarryingValue },
			{ acct: '202', dr: retirementUnamortizedDiscount },
			{ acct: '201', cr: retirementPar }
		],
		explanation: `Issue $${retirementPar.toLocaleString()} of bonds at a $${retirementUnamortizedDiscount.toLocaleString()} discount`
	},
	{
		id: '8',
		date: '2025-01-02',
		lines: [
			{ acct: '201', dr: retirementPar },
			{ acct: '505', dr: retirementLoss },
			{ acct: '202', cr: retirementUnamortizedDiscount },
			{ acct: '101', cr: retirementCallPrice }
		],
		explanation: `Call the bonds at 103 with a $${retirementCarryingValue.toLocaleString()} carrying value`
	}
];
const fenwickBalances = post(fenwickAccounts, fenwickEntries);
export const fenwick = { company: fenwickCompany, entries: fenwickEntries, balances: fenwickBalances };

/* ---------- Two standalone at-par entries, shown only in the entry drill (never posted as a full company) ---------- */

const atParIssueEntry: Entry = {
	id: '1',
	date: '2025-01-01',
	lines: [{ acct: '101', dr: bondPar }, { acct: '201', cr: bondPar }],
	explanation: `Issue $${bondPar.toLocaleString()} of 8% bonds at par`
};
const atParInterestEntry: Entry = {
	id: '2',
	date: '2025-07-01',
	lines: [{ acct: '601', dr: bondCashInterest }, { acct: '101', cr: bondCashInterest }],
	explanation: "Pay six months' interest on bonds issued at par"
};

/* ---------- Classification drill ---------- */

const PRICE_CATEGORIES = [
	{ id: 'discount', label: 'Sells at a discount' },
	{ id: 'par', label: 'Sells at par' },
	{ id: 'premium', label: 'Sells at a premium' }
];
export const classifications: Classification[] = [
	{ lo: 'C1', text: 'Contract rate 8%, market rate 10%', options: PRICE_CATEGORIES, answer: 'discount', why: 'The bond pays less than investors want, so they pay less.' },
	{ lo: 'C1', text: 'Contract rate 8%, market rate 6%', options: PRICE_CATEGORIES, answer: 'premium', why: 'The bond pays more than the market, so investors pay more.' },
	{ lo: 'C1', text: 'Contract rate 8%, market rate 8%', options: PRICE_CATEGORIES, answer: 'par', why: 'Rates match.' },
	{ lo: 'C1', text: 'Bond quoted at 97', options: PRICE_CATEGORIES, answer: 'discount', why: '97% of par.' },
	{ lo: 'C1', text: 'Bond quoted at 103½', options: PRICE_CATEGORIES, answer: 'premium', why: 'Above 100% of par.' },
	{ lo: 'C1', text: 'Market rates rose between printing the bonds and selling them', options: PRICE_CATEGORIES, answer: 'discount', why: 'The fixed contract rate now falls short.' },
	{ lo: 'P3', text: 'Interest expense each period is more than the cash interest paid', options: PRICE_CATEGORIES, answer: 'discount', why: 'Discount amortization adds to interest expense.' },
	{ lo: 'P3', text: 'Interest expense each period is less than the cash interest paid', options: PRICE_CATEGORIES, answer: 'premium', why: 'Premium amortization reduces interest expense.' }
];

/* ---------- Entry drill: 10 situations, 10 cards ---------- */

export const entryDrillAccounts = acctsFor(['101', '201', '202', '203', '204', '505', '601', '602']);
const allDrillEntries = [
	atParIssueEntry,
	atParInterestEntry,
	...ridgemontSlEntries,
	...ridgemontEiEntries,
	...harborlineEntries,
	...fenwickEntries,
	...vantageEntries
];
function findEntry(id: string): Entry {
	const e = allDrillEntries.find((x) => x.id === id);
	if (!e) throw new Error(`Entry drill card references unknown entry ${id}`);
	return e;
}
export const entryCards: EntryCardSpec[] = [
	{ lo: 'C1', prompt: 'Issue $100,000 of 8% bonds at par.', entry: findEntry('1') },
	{ lo: 'C1', prompt: "Pay six months' interest on bonds issued at par.", entry: findEntry('2') },
	{ lo: 'P1', prompt: 'Issue the bonds when the market rate is 10%.', entry: findEntry('3') },
	{
		lo: 'P2',
		prompt: 'First interest payment, straight-line (discount ÷ 8 periods).',
		entry: findEntry('4'),
		hint: 'Straight-line moves the same slice of the discount to expense every period.'
	},
	{
		lo: 'P3',
		prompt: 'First interest payment, effective interest (5% of the issue price).',
		entry: findEntry('5'),
		hint: 'Effective interest expense is the market rate times the beginning carrying value.'
	},
	{ lo: 'P1', prompt: 'Issue the bonds when the market rate is 6%.', entry: findEntry('6') },
	{
		lo: 'P3',
		prompt: 'First interest payment, effective interest (3% of the issue price).',
		entry: findEntry('7'),
		hint: 'Premium amortization reduces interest expense below the cash interest paid.'
	},
	{
		lo: 'A1',
		prompt: 'Call bonds at 103 with a $96,000 carrying value.',
		entry: findEntry('8'),
		hint: 'The loss is measured against carrying value, not par.'
	},
	{ lo: 'P4', prompt: 'Borrow $60,000 on an installment note.', entry: findEntry('9') },
	{
		lo: 'P4',
		prompt: 'First annual installment payment.',
		entry: findEntry('10'),
		hint: 'Interest is charged on the beginning balance; the rest of the payment reduces principal.'
	}
];

/* ---------- Recall rules ---------- */

export const rules: Rule[] = [
	{
		lo: 'C1',
		prompt: 'Market rate above the contract rate means the bond sells:',
		options: [{ id: 'a', label: 'At a discount' }, { id: 'b', label: 'At a premium' }],
		answer: 'a',
		why: 'Investors will not pay par for a bond paying less than the going rate.'
	},
	{
		lo: 'P2',
		prompt: 'Discount amortization each period:',
		options: [{ id: 'a', label: 'Increases interest expense' }, { id: 'b', label: 'Decreases interest expense' }],
		answer: 'a',
		why: 'Amortizing a discount adds to the cash interest already paid, so total interest expense rises above it.'
	},
	{
		lo: 'C1',
		prompt: 'Cash interest each period is based on:',
		options: [{ id: 'a', label: 'Par value' }, { id: 'b', label: 'Carrying value' }],
		answer: 'a',
		why: 'Cash interest is fixed by contract: par × contract rate × time, whatever the bond’s price.'
	},
	{
		lo: 'P1',
		prompt: 'Discount on bonds payable is classified as:',
		options: [{ id: 'a', label: 'A contra liability' }, { id: 'b', label: 'An asset' }],
		answer: 'a',
		why: 'It is subtracted from Bonds payable on the balance sheet, never reported as an asset.'
	},
	{
		lo: 'P4',
		prompt: 'On an installment note, each equal payment:',
		options: [{ id: 'a', label: 'Shifts from mostly interest to mostly principal over time' }, { id: 'b', label: 'Splits interest and principal the same way every time' }],
		answer: 'a',
		why: 'Interest is charged only on the shrinking balance, so less of each later payment is interest.'
	}
];

/* ---------- Formulas ---------- */

export const formulas: Formula[] = [
	{
		lo: 'C1',
		formula: 'Cash interest = Par × Contract rate × Time',
		worked: `${fmt(bondPar, { dollar: true })} × 8% × 6/12 = ${fmt(bondCashInterest, { dollar: true })}`
	},
	{
		lo: 'P1',
		formula: 'Bond price = PV of par + PV of interest payments (at the market rate)',
		worked: `PV(${fmt(bondPar, { dollar: true })}) + PV(${fmt(bondCashInterest, { dollar: true })} annuity) at 5% = ${fmt(discountPrice, { dollar: true })}`
	},
	{
		lo: 'P1',
		formula: 'Carrying value = Par − Unamortized discount (or + Unamortized premium)',
		worked: `${fmt(bondPar, { dollar: true })} − ${fmt(discountAmount, { dollar: true })} = ${fmt(discountPrice, { dollar: true })}`
	},
	{
		lo: 'P2',
		formula: 'Straight-line amortization = Discount ÷ Number of periods',
		worked: `${fmt(discountAmount, { dollar: true })} ÷ ${bondPeriods} = ${fmt(straightLineAmortizationPerPeriod, { dollar: true })}`
	},
	{
		lo: 'P3',
		formula: 'Effective interest expense = Beginning carrying value × Market rate per period',
		worked: `${fmt(discountPrice, { dollar: true })} × 5% = ${fmt(effectiveInterestFirstPeriodDiscount, { dollar: true })}`
	},
	{
		lo: 'A1',
		formula: 'Gain or loss on retirement = Carrying value − Retirement price',
		worked: `${fmt(retirementCarryingValue, { dollar: true })} − ${fmt(retirementCallPrice, { dollar: true })} = ${fmt(retirementLoss, { dollar: true })} loss`
	},
	{
		lo: 'P4',
		formula: 'Installment interest = Beginning balance × Rate',
		worked: `${fmt(notePrincipal, { dollar: true })} × 8% = ${fmt(noteSchedule[0].interest, { dollar: true })}`
	},
	{
		lo: 'A2',
		formula: 'Debt-to-equity = Total liabilities ÷ Total equity',
		worked: `${fmt(totalLiabilitiesForRatio, { dollar: true })} ÷ ${fmt(totalEquityForRatio, { dollar: true })} = ${debtToEquity.toFixed(1)}`
	}
];

/* ---------- Lessons (Learn) and instruments (Lab) ---------- */

export const lessons: LessonMeta[] = [
	{ id: 'discount-par-premium', title: "Why bonds don't always sell at par", lo: 'C1' },
	{ id: 'pricing-a-bond', title: 'The price is two present values', lo: 'P1' },
	{ id: 'straight-line-amortization', title: 'Amortizing the difference, evenly', lo: 'P2' },
	{ id: 'effective-interest-amortization', title: 'Amortizing the difference, by the rate', lo: 'P3' },
	{ id: 'installment-notes', title: 'Every payment the same, every split different', lo: 'P4' },
	{ id: 'early-retirement', title: 'Retiring debt ahead of schedule', lo: 'A1' },
	{ id: 'debt-to-equity', title: 'How much of the business is borrowed', lo: 'A2' }
];

export const instruments: InstrumentMeta[] = [
	{
		id: 'bond-price-and-carrying-value',
		title: 'Bond price and carrying value',
		lo: 'P1',
		instruction: "Move the market rate above and below the 8% contract rate and watch the issue price cross par.",
		resultLine: `Market 10% → price ${fmt(discountPrice, { dollar: true })} · discount ${fmt(discountAmount, { dollar: true })} · carrying value reaches ${fmt(bondPar, { dollar: true })} at period ${bondPeriods}`,
		noticed:
			'The cash interest never moved from $4,000. The price adjusted instead, so an investor still earns the market rate.'
	},
	{
		id: 'installment-note-schedule',
		title: 'Installment note schedule',
		lo: 'P4',
		instruction: 'Step through the payments and watch the interest shrink as the principal share grows.',
		resultLine: `Total paid ${fmt(noteTotalPaid, { dollar: true })} · Total interest ${fmt(noteTotalInterest, { dollar: true })}`,
		noticed:
			'Every payment was the same, but less of each one was interest, because interest is charged only on what is still owed.'
	},
	{
		id: 'early-retirement',
		title: 'Early retirement',
		lo: 'A1',
		instruction: 'Set the call price and watch the gain or loss against carrying value.',
		resultLine: `Paid ${fmt(retirementCallPrice, { dollar: true })} − Carrying value ${fmt(retirementCarryingValue, { dollar: true })} = Loss on retirement ${fmt(retirementLoss, { dollar: true })}`,
		noticed: 'The loss is measured against carrying value, not par.'
	}
];

/* ---------- Chapter export, anchors, invariants ---------- */

export const meta = {
	number: 10,
	slug: 'long-term-liabilities',
	title: 'Accounting for Long-Term Liabilities',
	part: 'financial' as const,
	status: 'live' as const,
	summary: "Bonds at a discount or premium, and how the difference amortizes.",
	instrument: 'Bond price and carrying value',
	oneLine:
		"When a company borrows for years, the price investors pay for its bonds depends on how the bond's interest rate compares with the market's.",
	headline: `An 8% bond sells for **${fmt(discountPrice, { dollar: true })}** when the market wants 10%, and **${fmt(premiumPrice, { dollar: true })}** when it wants 6%.`
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
		{ label: 'Ridgemont Utilities, straight-line — issue at a discount, first interest payment', company: ridgemontSlCompany, entries: ridgemontSlEntries },
		{ label: 'Ridgemont Utilities, effective interest — same issue, first interest payment', company: ridgemontEiCompany, entries: ridgemontEiEntries },
		{ label: 'Harborline Freight — issue at a premium, effective interest', company: harborlineCompany, entries: harborlineEntries },
		{ label: 'Vantage Equipment — installment note, three annual payments', company: vantageCompany, entries: vantageEntries },
		{ label: 'Fenwick Traders — bonds called before maturity', company: fenwickCompany, entries: fenwickEntries }
	],
	anchors: (): Anchor[] => [
		{ label: 'Issue price at 10% market', expected: 93537, actual: discountPrice },
		{ label: 'Issue price at 8% market (par)', expected: 100000, actual: parPrice },
		{ label: 'Issue price at 6% market', expected: 107020, actual: premiumPrice },
		{ label: 'Semiannual cash interest', expected: 4000, actual: bondCashInterest },
		{ label: 'First-period interest expense, effective, discount', expected: 4677, actual: effectiveInterestFirstPeriodDiscount },
		{ label: 'First-period interest expense, straight-line, discount', expected: 4808, actual: straightLineAmortizationPerPeriod + bondCashInterest },
		{ label: 'First-period interest expense, effective, premium', expected: 3211, actual: effectiveInterestFirstPeriodPremium },
		{ label: 'Installment payment', expected: 23282, actual: notePayment },
		{ label: 'Total interest on installment note', expected: 9846, actual: noteTotalInterest },
		{ label: 'Loss on retirement', expected: 7000, actual: retirementLoss },
		{ label: 'Debt-to-equity', expected: 1.5, actual: debtToEquity }
	],
	invariants: () => {
		if (classifications.length !== 8)
			throw new Error(`Chapter 10 should have 8 classification items, has ${classifications.length}`);
		if (entryCards.length !== 10)
			throw new Error(`Chapter 10 should have 10 entry-drill cards, has ${entryCards.length}`);
		for (const c of classifications) {
			if (!c.options.some((o) => o.id === c.answer))
				throw new Error(`Classification answer not in options: ${c.text}`);
		}
		for (const r of rules) {
			if (!r.options.some((o) => o.id === r.answer))
				throw new Error(`Rule answer not in options: ${r.prompt}`);
		}
		if (Math.abs(straightLineCarryingSchedule(10)[bondPeriods] - bondPar) > 0.01)
			throw new Error('Straight-line carrying value should reach par exactly at maturity');
		if (Math.abs(effectiveInterestCarryingSchedule(10)[bondPeriods] - bondPar) > 0.01)
			throw new Error('Effective interest carrying value should reach par exactly at maturity');
		if (Math.abs(noteSchedule[notePeriods - 1].balance) > 0.01)
			throw new Error('Installment note balance should reach exactly zero at the final payment');
	}
};
