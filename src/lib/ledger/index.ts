/**
 * A tiny double-entry ledger. Every chapter's example numbers are *derived*
 * from journal entries through these functions, so trial balances and
 * statements cannot drift from the entries that produced them.
 */

export type AccountType =
	| 'asset'
	| 'contra-asset'
	| 'liability'
	| 'equity'
	| 'contra-equity'
	| 'revenue'
	| 'contra-revenue'
	| 'expense';

export interface Account {
	num: string;
	name: string;
	type: AccountType;
}

export type Side = 'dr' | 'cr';

export interface Line {
	acct: string; // account number
	dr?: number;
	cr?: number;
}

export interface Entry {
	id: string;
	date: string; // ISO date
	lines: Line[];
	explanation: string;
}

export interface Balance {
	acct: Account;
	dr: number; // total debits posted
	cr: number; // total credits posted
	/** Signed balance on the account's normal side (positive = normal). */
	balance: number;
}

export interface TrialBalanceRow {
	num: string;
	name: string;
	dr: number;
	cr: number;
}

export interface TrialBalance {
	rows: TrialBalanceRow[];
	totalDr: number;
	totalCr: number;
}

export function normalSide(type: AccountType): Side {
	switch (type) {
		case 'asset':
		case 'contra-equity':
		case 'contra-revenue':
		case 'expense':
			return 'dr';
		case 'contra-asset':
		case 'liability':
		case 'equity':
		case 'revenue':
			return 'cr';
	}
}

export function isTemporary(type: AccountType): boolean {
	return (
		type === 'revenue' || type === 'contra-revenue' || type === 'expense' || type === 'contra-equity'
	);
}

export function elementLabel(type: AccountType): string {
	switch (type) {
		case 'asset':
			return 'Asset';
		case 'contra-asset':
			return 'Contra asset';
		case 'liability':
			return 'Liability';
		case 'equity':
			return 'Equity';
		case 'contra-equity':
			return 'Equity (contra)';
		case 'revenue':
			return 'Revenue';
		case 'contra-revenue':
			return 'Revenue (contra)';
		case 'expense':
			return 'Expense';
	}
}

export function chartOf(accounts: Account[]): Map<string, Account> {
	const m = new Map<string, Account>();
	for (const a of accounts) {
		if (m.has(a.num)) throw new Error(`Duplicate account number ${a.num}`);
		m.set(a.num, a);
	}
	return m;
}

/** An `accountName` resolver bound to one chapter's chart of accounts. */
export function accountNameOf(accounts: Account[]): (num: string) => string {
	const chart = chartOf(accounts);
	return (num: string) => {
		const a = chart.get(num);
		if (!a) throw new Error(`Unknown account ${num}`);
		return a.name;
	};
}

export function entryTotals(e: Entry): { dr: number; cr: number } {
	let dr = 0;
	let cr = 0;
	for (const l of e.lines) {
		dr += l.dr ?? 0;
		cr += l.cr ?? 0;
	}
	return { dr: round(dr), cr: round(cr) };
}

export function assertEntryBalanced(e: Entry): void {
	const { dr, cr } = entryTotals(e);
	if (dr !== cr)
		throw new Error(`Entry ${e.id} (${e.explanation}) is unbalanced: Dr ${dr} ≠ Cr ${cr}`);
	if (e.lines.length < 2) throw new Error(`Entry ${e.id} needs at least two lines`);
	for (const l of e.lines) {
		if ((l.dr ?? 0) < 0 || (l.cr ?? 0) < 0) throw new Error(`Entry ${e.id} has a negative amount`);
		if ((l.dr ?? 0) > 0 && (l.cr ?? 0) > 0)
			throw new Error(`Entry ${e.id}: a line cannot be both debit and credit`);
	}
}

export function post(accounts: Account[], entries: Entry[]): Map<string, Balance> {
	chartOf(accounts); // throws on duplicate account numbers
	const out = new Map<string, Balance>();
	for (const a of accounts) out.set(a.num, { acct: a, dr: 0, cr: 0, balance: 0 });
	for (const e of entries) {
		assertEntryBalanced(e);
		for (const l of e.lines) {
			const b = out.get(l.acct);
			if (!b) throw new Error(`Entry ${e.id} posts to unknown account ${l.acct}`);
			b.dr = round(b.dr + (l.dr ?? 0));
			b.cr = round(b.cr + (l.cr ?? 0));
		}
	}
	for (const b of out.values()) {
		const side = normalSide(b.acct.type);
		b.balance = round(side === 'dr' ? b.dr - b.cr : b.cr - b.dr);
	}
	return out;
}

/** Trial balance: each account's balance on its normal side (or the other side if abnormal). */
export function trialBalance(
	balances: Map<string, Balance>,
	opts?: { includeZero?: boolean }
): TrialBalance {
	const rows: TrialBalanceRow[] = [];
	let totalDr = 0;
	let totalCr = 0;
	for (const b of [...balances.values()].sort((x, y) => x.acct.num.localeCompare(y.acct.num))) {
		const net = round(b.dr - b.cr); // positive → debit balance
		if (net === 0 && !opts?.includeZero) continue;
		const row: TrialBalanceRow = { num: b.acct.num, name: b.acct.name, dr: 0, cr: 0 };
		if (net > 0) row.dr = net;
		else row.cr = -net;
		rows.push(row);
		totalDr = round(totalDr + row.dr);
		totalCr = round(totalCr + row.cr);
	}
	return { rows, totalDr, totalCr };
}

export interface StatementLine {
	num?: string;
	label: string;
	amount: number;
}

export interface Statements {
	income: {
		revenues: StatementLine[];
		totalRevenues: number;
		expenses: StatementLine[];
		totalExpenses: number;
		netIncome: number;
	};
	retainedEarnings: {
		beginning: number;
		netIncome: number;
		dividends: number;
		ending: number;
	};
	balanceSheet: {
		assets: StatementLine[]; // contra-assets appear as negative lines directly after their asset
		totalAssets: number;
		liabilities: StatementLine[];
		totalLiabilities: number;
		equity: StatementLine[];
		totalEquity: number;
		totalLiabilitiesAndEquity: number;
	};
}

export interface StatementOptions {
	retainedEarningsAcct: string; // e.g. '318'
	dividendsAcct?: string; // e.g. '319'
	/** For each contra-asset, which asset it offsets (so the balance sheet nets them). */
	/* Note: `beginning` retained earnings is the account balance before closing entries; chapters that close the books post those entries explicitly. */
	contraOf?: Record<string, string>;
	/** For each contra-revenue (e.g. sales discounts), which revenue it offsets (so net sales nets them). */
	contraRevenueOf?: Record<string, string>;
}

export function statements(balances: Map<string, Balance>, o: StatementOptions): Statements {
	const list = [...balances.values()].sort((x, y) => x.acct.num.localeCompare(y.acct.num));
	const revenues: StatementLine[] = [];
	for (const b of list) {
		if (b.acct.type !== 'revenue' || b.balance === 0) continue;
		revenues.push({ num: b.acct.num, label: b.acct.name, amount: b.balance });
		for (const c of list) {
			if (
				c.acct.type === 'contra-revenue' &&
				o.contraRevenueOf?.[c.acct.num] === b.acct.num &&
				c.balance !== 0
			) {
				revenues.push({ num: c.acct.num, label: `Less: ${c.acct.name}`, amount: -c.balance });
			}
		}
	}
	const expenses = list
		.filter((b) => b.acct.type === 'expense' && b.balance !== 0)
		.map((b) => ({ num: b.acct.num, label: b.acct.name, amount: b.balance }));
	const totalRevenues = sum(revenues.map((l) => l.amount));
	const totalExpenses = sum(expenses.map((l) => l.amount));
	const netIncome = round(totalRevenues - totalExpenses);

	const beginning = balances.get(o.retainedEarningsAcct)?.balance ?? 0;
	const dividends = o.dividendsAcct ? (balances.get(o.dividendsAcct)?.balance ?? 0) : 0;
	const ending = round(beginning + netIncome - dividends);

	const assets: StatementLine[] = [];
	for (const b of list) {
		if (b.acct.type !== 'asset' || b.balance === 0) continue;
		assets.push({ num: b.acct.num, label: b.acct.name, amount: b.balance });
		for (const c of list) {
			if (
				c.acct.type === 'contra-asset' &&
				o.contraOf?.[c.acct.num] === b.acct.num &&
				c.balance !== 0
			) {
				assets.push({ num: c.acct.num, label: `Less: ${c.acct.name}`, amount: -c.balance });
			}
		}
	}
	const totalAssets = sum(assets.map((l) => l.amount));
	const liabilities = list
		.filter((b) => b.acct.type === 'liability' && b.balance !== 0)
		.map((b) => ({ num: b.acct.num, label: b.acct.name, amount: b.balance }));
	const totalLiabilities = sum(liabilities.map((l) => l.amount));
	const equity: StatementLine[] = list
		.filter(
			(b) => b.acct.type === 'equity' && b.acct.num !== o.retainedEarningsAcct && b.balance !== 0
		)
		.map((b) => ({ num: b.acct.num, label: b.acct.name, amount: b.balance }));
	equity.push({ num: o.retainedEarningsAcct, label: 'Retained earnings', amount: ending });
	const totalEquity = sum(equity.map((l) => l.amount));

	return {
		income: { revenues, totalRevenues, expenses, totalExpenses, netIncome },
		retainedEarnings: { beginning, netIncome, dividends, ending },
		balanceSheet: {
			assets,
			totalAssets,
			liabilities,
			totalLiabilities,
			equity,
			totalEquity,
			totalLiabilitiesAndEquity: round(totalLiabilities + totalEquity)
		}
	};
}

export function sum(xs: number[]): number {
	return round(xs.reduce((a, b) => a + b, 0));
}

export function round(n: number): number {
	return Math.round(n * 100) / 100;
}

/** Format a number in ledger style: thousands separators, no decimals unless needed, parentheses for negatives. */
export function fmt(n: number, opts?: { dollar?: boolean; decimals?: number }): string {
	const abs = Math.abs(n);
	const decimals = opts?.decimals ?? (Number.isInteger(abs) ? 0 : 2);
	const s = abs.toLocaleString('en-US', {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals
	});
	const body = (opts?.dollar ? '$' : '') + s;
	return n < 0 ? `(${body})` : body;
}
