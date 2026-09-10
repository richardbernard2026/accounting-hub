/**
 * FastForward — Wild's continuing example company (a consulting business
 * started by Chas Taylor on December 1, 2025). Chapter 2 records December's
 * transactions; Chapter 3 adjusts them at December 31.
 */
import type { Account, Entry } from '$lib/ledger';
import type { Company } from '../types';

export const accounts: Account[] = [
	{ num: '101', name: 'Cash', type: 'asset' },
	{ num: '106', name: 'Accounts receivable', type: 'asset' },
	{ num: '126', name: 'Supplies', type: 'asset' },
	{ num: '128', name: 'Prepaid insurance', type: 'asset' },
	{ num: '167', name: 'Equipment', type: 'asset' },
	{ num: '168', name: 'Accumulated depreciation—Equipment', type: 'contra-asset' },
	{ num: '201', name: 'Accounts payable', type: 'liability' },
	{ num: '209', name: 'Salaries payable', type: 'liability' },
	{ num: '236', name: 'Unearned consulting revenue', type: 'liability' },
	{ num: '307', name: 'Common stock', type: 'equity' },
	{ num: '318', name: 'Retained earnings', type: 'equity' },
	{ num: '319', name: 'Dividends', type: 'contra-equity' },
	{ num: '403', name: 'Consulting revenue', type: 'revenue' },
	{ num: '406', name: 'Rental revenue', type: 'revenue' },
	{ num: '612', name: 'Depreciation expense—Equipment', type: 'expense' },
	{ num: '622', name: 'Salaries expense', type: 'expense' },
	{ num: '637', name: 'Insurance expense', type: 'expense' },
	{ num: '640', name: 'Rent expense', type: 'expense' },
	{ num: '652', name: 'Supplies expense', type: 'expense' },
	{ num: '690', name: 'Utilities expense', type: 'expense' }
];

export const company: Company = {
	name: 'FastForward',
	accounts,
	retainedEarningsAcct: '318',
	dividendsAcct: '319',
	contraOf: { '168': '167' }
};

export function accountName(num: string): string {
	const a = accounts.find((x) => x.num === num);
	if (!a) throw new Error(`Unknown FastForward account ${num}`);
	return a.name;
}

/** Chapter 2: the sixteen December transactions (Wild, FastForward). */
export const decemberTransactions: Entry[] = [
	e(1, '2025-12-01', 'Owner invested $30,000 cash in exchange for common stock', [
		d('101', 30000),
		c('307', 30000)
	]),
	e(2, '2025-12-02', 'Purchased supplies for cash', [d('126', 2500), c('101', 2500)]),
	e(3, '2025-12-03', 'Purchased equipment for cash', [d('167', 26000), c('101', 26000)]),
	e(4, '2025-12-04', 'Purchased supplies on credit', [d('126', 7100), c('201', 7100)]),
	e(5, '2025-12-05', 'Provided consulting services for cash', [d('101', 4200), c('403', 4200)]),
	e(6, '2025-12-06', 'Paid December rent', [d('640', 1000), c('101', 1000)]),
	e(7, '2025-12-12', 'Paid employee salary to date', [d('622', 700), c('101', 700)]),
	e(8, '2025-12-15', 'Provided consulting and rented facilities on credit', [
		d('106', 1900),
		c('403', 1600),
		c('406', 300)
	]),
	e(9, '2025-12-22', 'Collected cash on account', [d('101', 1900), c('106', 1900)]),
	e(10, '2025-12-24', 'Paid part of the account payable', [d('201', 900), c('101', 900)]),
	e(11, '2025-12-24', 'Paid cash dividend', [d('319', 200), c('101', 200)]),
	e(12, '2025-12-26', 'Received cash in advance for 60 days of consulting', [
		d('101', 3000),
		c('236', 3000)
	]),
	e(13, '2025-12-26', 'Paid for a 24-month insurance policy', [d('128', 2400), c('101', 2400)]),
	e(14, '2025-12-26', 'Purchased supplies for cash', [d('126', 120), c('101', 120)]),
	e(15, '2025-12-26', 'Paid employee salary', [d('622', 700), c('101', 700)]),
	e(16, '2025-12-26', 'Paid utilities', [d('690', 230), c('101', 230)])
];

/** Chapter 3: the six adjusting entries at December 31, 2025 (Wild (a)–(f)). */
export const adjustments: Entry[] = [
	e('a', '2025-12-31', 'Insurance expired: one month of the $2,400 24-month policy', [
		d('637', 100),
		c('128', 100)
	]),
	e('b', '2025-12-31', 'Supplies used: $9,720 available less $8,670 on hand', [
		d('652', 1050),
		c('126', 1050)
	]),
	e('c', '2025-12-31', 'Depreciation on equipment: ($26,000 − $8,000) ÷ 48 months', [
		d('612', 375),
		c('168', 375)
	]),
	e('d', '2025-12-31', 'Unearned revenue earned: 5 days at $50/day', [
		d('236', 250),
		c('403', 250)
	]),
	e('e', '2025-12-31', 'Accrued salaries: 3 days at $70/day', [d('622', 210), c('209', 210)]),
	e('f', '2025-12-31', 'Accrued consulting revenue: 20 days at $90/day', [
		d('106', 1800),
		c('403', 1800)
	])
];

/** January follow-ups Wild shows for the two accruals. */
export const januaryFollowUps: Entry[] = [
	e('e2', '2026-01-09', 'Payday: 3 accrued days plus 7 January days', [
		d('209', 210),
		d('622', 490),
		c('101', 700)
	]),
	e('f2', '2026-01-10', 'Collected the 30-day contract: 20 accrued days plus 10 January days', [
		d('101', 2700),
		c('106', 1800),
		c('403', 900)
	])
];

function e(id: string | number, date: string, explanation: string, lines: Entry['lines']): Entry {
	return { id: String(id), date, explanation, lines };
}
function d(acct: string, dr: number) {
	return { acct, dr };
}
function c(acct: string, cr: number) {
	return { acct, cr };
}
