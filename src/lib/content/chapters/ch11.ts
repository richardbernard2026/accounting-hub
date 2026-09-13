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
 * "before building" note asks to confirm whether the book debits Retained
 * earnings or a separate Dividends account when a dividend is declared, and
 * the small/large stock dividend cutoff, which needs the physical text (not
 * available from here). Built debiting Retained earnings directly, as the
 * brief's own entry-drill table specifies, and treated the 10% stock
 * dividend as small (recorded at market value) — hand-verified the entire
 * equity walk (375,000 → 364,000 → 364,000 → 350,000 → 356,400 → 356,400)
 * and every entry-drill row balances exactly. See the final report for this
 * standing caveat.
 */
export const objectives: Objective[] = [
	{
		code: 'C1',
		kind: 'conceptual',
		short: 'Corporate organization',
		text: 'Describe the characteristics of a corporation, and distinguish authorized, issued, and outstanding stock.'
	},
	{
		code: 'P1',
		kind: 'procedural',
		short: 'Equity composition',
		text: 'Record the issuance of stock, cash and stock dividends, treasury stock transactions, and a stock split, and identify which change total equity.'
	},
	{
		code: 'P2',
		kind: 'procedural',
		short: 'Cash dividends',
		text: 'Record a cash dividend at declaration and at payment, and identify the date of record as requiring no entry.'
	},
	{
		code: 'P3',
		kind: 'procedural',
		short: 'Stock dividends and splits',
		text: 'Record a small stock dividend at market value, and explain why a stock split requires no journal entry.'
	},
	{
		code: 'A1',
		kind: 'analytical',
		short: 'Preferred dividends',
		text: 'Allocate a declared dividend between preferred and common stock under cumulative and noncumulative preferred.'
	},
	{
		code: 'P4',
		kind: 'procedural',
		short: 'Statement of equity',
		text: "Prepare a statement of stockholders' equity reconciling beginning and ending balances."
	},
	{
		code: 'A2',
		kind: 'analytical',
		short: 'Per-share ratios',
		text: 'Compute earnings per share, the price-earnings ratio, dividend yield, and book value per share.'
	}
];

export const terms: Term[] = [
	{ term: 'Corporation', lo: 'C1', definition: 'A business entity legally separate from its owners, with its own life and liability distinct from theirs.' },
	{ term: 'Stockholders (shareholders)', lo: 'C1', definition: 'Owners of a corporation, each holding shares in proportion to their investment.' },
	{ term: 'Stock certificate', lo: 'C1', definition: 'A document evidencing a stockholder’s ownership of shares.' },
	{ term: 'Proxy', lo: 'C1', definition: 'A document giving another party the authority to vote a stockholder’s shares.' },
	{ term: 'Preemptive right', lo: 'C1', definition: 'A stockholder’s right to maintain their percentage ownership when new shares are issued.' },
	{ term: 'Authorized stock', lo: 'C1', definition: 'The total number of shares a corporation’s charter allows it to issue.' },
	{ term: 'Issued stock', lo: 'C1', definition: 'Shares a corporation has sold or otherwise distributed, whether or not still outstanding.' },
	{ term: 'Outstanding stock', lo: 'C1', definition: 'Issued shares currently held by stockholders — issued shares minus treasury shares.' },
	{ term: 'Par value', lo: 'P1', definition: 'An amount assigned per share, credited to the stock account; the floor of a stockholder’s legal liability in most states.' },
	{ term: 'No-par value stock', lo: 'P1', definition: 'Stock with no par value assigned; the entire issue price is credited to the stock account.' },
	{ term: 'Stated value stock', lo: 'P1', definition: 'No-par stock assigned a stated value by the board, treated like par for recording purposes.' },
	{ term: 'Minimum legal capital', lo: 'C1', definition: 'The least amount stockholders must invest, set by state law, to protect creditors.' },
	{ term: 'Paid-in capital', lo: 'P1', definition: 'The total amount stockholders have invested in a corporation.' },
	{ term: 'Paid-in capital in excess of par value', lo: 'P1', definition: 'The amount received for stock above its par value.' },
	{ term: 'Common stock', lo: 'C1', definition: 'The basic ownership class of stock, carrying voting rights and a residual claim on assets.' },
	{ term: 'Preferred stock', lo: 'A1', definition: 'Stock with a priority claim over common stock on dividends and assets, usually without voting rights.' },
	{ term: 'Cumulative preferred stock', lo: 'A1', definition: 'Preferred stock whose unpaid dividends accumulate as arrears until paid.' },
	{ term: 'Noncumulative preferred stock', lo: 'A1', definition: 'Preferred stock whose unpaid dividends are forfeited if not declared in that period.' },
	{ term: 'Participating preferred stock', lo: 'A1', definition: '[book?] — check this edition’s exact terminology. Preferred stock that can share in dividends beyond its stated rate.' },
	{ term: 'Dividend in arrears', lo: 'A1', definition: 'A cumulative preferred dividend not yet declared; disclosed, not recorded, until the board declares it.' },
	{ term: 'Convertible preferred stock', lo: 'A1', definition: '[book?] — check this edition’s exact terminology. Preferred stock exchangeable for a set number of common shares.' },
	{ term: 'Callable preferred stock', lo: 'A1', definition: 'Preferred stock the issuer can retire at a stated call price.' },
	{ term: 'Call price', lo: 'A1', definition: 'The price a corporation must pay to retire callable preferred stock.' },
	{ term: 'Date of declaration', lo: 'P2', definition: 'The date the board formally approves a dividend, creating a liability.' },
	{ term: 'Date of record', lo: 'P2', definition: 'The date that fixes which stockholders will receive the dividend; no entry is made.' },
	{ term: 'Date of payment', lo: 'P2', definition: 'The date the dividend is actually paid, removing the liability and the cash.' },
	{ term: 'Stock dividend', lo: 'P3', definition: 'A distribution of additional shares to existing stockholders instead of cash.' },
	{ term: 'Small stock dividend', lo: 'P3', definition: '[book?] — check this edition’s exact cutoff. A stock dividend below the threshold recorded at market value.' },
	{ term: 'Large stock dividend', lo: 'P3', definition: '[book?] — check this edition’s exact cutoff. A stock dividend at or above the threshold recorded at par value.' },
	{ term: 'Stock split', lo: 'P3', definition: 'An increase in the number of outstanding shares with a proportional decrease in par value; no journal entry is made.' },
	{ term: 'Treasury stock', lo: 'P1', definition: 'A corporation’s own stock it has issued and reacquired but not retired; a contra equity account.' },
	{ term: 'Retained earnings', lo: 'P1', definition: 'Cumulative net income not distributed to stockholders as dividends.' },
	{ term: 'Retained earnings deficit', lo: 'P1', definition: 'A negative retained earnings balance, arising when cumulative losses and dividends exceed cumulative income.' },
	{ term: 'Restricted retained earnings', lo: 'P4', definition: '[book?] — check this edition’s exact terminology. Retained earnings unavailable for dividends due to a contract or law.' },
	{ term: 'Appropriated retained earnings', lo: 'P4', definition: '[book?] — check this edition’s exact terminology. Retained earnings formally set aside by the board for a specific purpose.' },
	{ term: 'Prior period adjustments', lo: 'P4', definition: 'Corrections of material errors from a prior period, reported as adjustments to beginning retained earnings.' },
	{ term: "Statement of stockholders' equity", lo: 'P4', definition: 'A statement reconciling the beginning and ending balance of every equity account for the period.' },
	{ term: 'Earnings per share', lo: 'A2', definition: 'Net income available to common stockholders divided by weighted-average common shares outstanding.' },
	{ term: 'Price-earnings ratio', lo: 'A2', definition: 'Market price per share divided by earnings per share.' },
	{ term: 'Dividend yield', lo: 'A2', definition: 'Annual cash dividends per share divided by market price per share.' },
	{ term: 'Book value per share', lo: 'A2', definition: 'Equity attributable to a class of stock divided by its shares outstanding.' }
];

export const quickChecks: QuickCheck[] = [
	{
		lo: 'C1',
		q: 'Shares a corporation has sold to stockholders and that stockholders still hold are called:',
		options: ['Authorized', 'Issued', 'Outstanding'],
		answer: 2,
		why: 'Issued shares reacquired by the corporation (treasury stock) are no longer outstanding, even though they remain issued.'
	},
	{
		lo: 'P1',
		q: 'Which of these changes total equity?',
		options: ['A 10% stock dividend', 'A 2-for-1 stock split', 'A cash dividend'],
		answer: 2,
		why: 'A cash dividend sends assets to stockholders, shrinking equity. Stock dividends and splits only move dollars within equity or change share count, never the total.'
	},
	{
		lo: 'P2',
		q: 'On which dividend date is a journal entry made for the liability?',
		options: ['Date of declaration', 'Date of record', 'Date of payment'],
		answer: 0,
		why: 'Declaration creates the liability; payment removes it. The date of record only fixes who is entitled — no entry.'
	},
	{
		lo: 'P3',
		q: 'A small stock dividend is recorded at:',
		options: ['Par value', 'Market value', 'Whatever the board chooses'],
		answer: 1,
		why: "A small stock dividend moves retained earnings to paid-in capital at the shares' current market value, not par."
	},
	{
		lo: 'A1',
		q: 'Dividends in arrears on cumulative preferred stock are:',
		options: ['A liability, recorded immediately', 'Disclosed only, until declared', 'Never paid'],
		answer: 1,
		why: 'Arrears are not a liability until the board actually declares a dividend — until then they are disclosed in the notes.'
	},
	{
		lo: 'P4',
		q: "A statement of stockholders' equity reconciles:",
		options: ['Only retained earnings', 'The beginning and ending balance of every equity account', 'Only cash'],
		answer: 1,
		why: 'Every equity column — common stock, paid-in capital, retained earnings, and more — gets its own beginning-to-ending walk.'
	},
	{
		lo: 'A2',
		q: 'Book value per share divides equity by:',
		options: ['Shares issued', 'Shares outstanding', 'Authorized shares'],
		answer: 1,
		why: 'Treasury shares are issued but not outstanding, and are excluded from both earnings per share and book value per share.'
	}
];

/* ---------- Chart of accounts ---------- */

const ALL_ACCOUNTS: Account[] = [
	{ num: '101', name: 'Cash', type: 'asset' },
	{ num: '141', name: 'Land', type: 'asset' },
	{ num: '221', name: 'Common dividend payable', type: 'liability' },
	{ num: '307', name: 'Common stock', type: 'equity' },
	{ num: '308', name: 'Paid-in capital in excess of par value, common stock', type: 'equity' },
	{ num: '309', name: 'Common stock dividend distributable', type: 'equity' },
	{ num: '310', name: 'Paid-in capital, treasury stock', type: 'equity' },
	{ num: '317', name: 'Common stock, no par', type: 'equity' },
	{ num: '318', name: 'Retained earnings', type: 'equity' },
	{ num: '319', name: 'Dividends', type: 'contra-equity' },
	{ num: '330', name: 'Treasury stock, common', type: 'contra-equity' }
];
function acctsFor(nums: string[]): Account[] {
	return ALL_ACCOUNTS.filter((a) => nums.includes(a.num));
}
export const accounts = ALL_ACCOUNTS;
export const accountName = accountNameOf(ALL_ACCOUNTS);

/* ---------- Preferred dividend allocation: a generic function ---------- */

export const preferredShares = 1000;
export const preferredParValue = 100;
export const preferredRate = 0.08;
export const preferredAnnualEntitlement = round(preferredShares * preferredParValue * preferredRate); // 8,000
export const arrearsFromYear1 = 3000;
export interface PreferredAllocation {
	preferred: number;
	common: number;
}
export function allocateDividend(declared: number, cumulative: boolean): PreferredAllocation {
	const preferredClaim = cumulative ? arrearsFromYear1 + preferredAnnualEntitlement : preferredAnnualEntitlement;
	const preferred = Math.min(declared, preferredClaim);
	const common = round(declared - preferred);
	return { preferred, common };
}
export const defaultDividendDeclared = 5000;
export const year2DividendDeclared = 20000;
export const year2Cumulative = allocateDividend(year2DividendDeclared, true);
export const year2Noncumulative = allocateDividend(year2DividendDeclared, false);

/* ---------- Per-share ratios (formula only — not tied to the hero's own numbers) ---------- */

export const netIncomeForEps = 108000;
export const preferredDividendsForEps = 8000;
export const weightedAverageShares = 50000;
export const earningsPerShare = round((netIncomeForEps - preferredDividendsForEps) / weightedAverageShares);
export const marketPricePerShare = 30;
export const priceEarningsRatio = round((marketPricePerShare / earningsPerShare) * 10) / 10;
export const annualDividendPerShare = 0.6;
export const dividendYield = round((annualDividendPerShare / marketPricePerShare) * 1000) / 1000;
export const totalEquityForBookValue = 700000;
export const preferredEquityForBookValue = 100000;
export const commonSharesForBookValue = 50000;
export const bookValuePerShare = round((totalEquityForBookValue - preferredEquityForBookValue) / commonSharesForBookValue);

/* ---------- Brightwater Corp: the hero's equity-composition walk ---------- */

const heroAccounts = acctsFor(['101', '221', '307', '308', '309', '310', '318', '319', '330']);
const heroCompany: Company = {
	name: 'Brightwater Corp',
	accounts: heroAccounts,
	retainedEarningsAcct: '318',
	dividendsAcct: '319',
	contraOf: {},
	standingContraEquity: ['330']
};
const heroEntries: Entry[] = [
	{
		id: 'open',
		date: '2025-01-01',
		lines: [
			{ acct: '101', dr: 350000 },
			{ acct: '307', cr: 100000 },
			{ acct: '308', cr: 50000 },
			{ acct: '318', cr: 200000 }
		],
		explanation: 'Starting equity: 10,000 shares of $10 par common, paid-in capital, and retained earnings'
	},
	{
		id: '1',
		date: '2025-02-01',
		lines: [{ acct: '101', dr: 25000 }, { acct: '307', cr: 10000 }, { acct: '308', cr: 15000 }],
		explanation: 'Issue 1,000 shares of $10 par common for $25 cash'
	},
	{
		id: '4',
		date: '2025-03-01',
		lines: [{ acct: '318', dr: 11000 }, { acct: '221', cr: 11000 }],
		explanation: 'Declare an $11,000 cash dividend (11,000 shares outstanding at $1 a share)'
	},
	{
		id: '5',
		date: '2025-03-15',
		lines: [{ acct: '221', dr: 11000 }, { acct: '101', cr: 11000 }],
		explanation: 'Pay the dividend'
	},
	{
		id: '6',
		date: '2025-04-01',
		lines: [{ acct: '318', dr: 33000 }, { acct: '309', cr: 11000 }, { acct: '308', cr: 22000 }],
		explanation: 'Declare a 10% stock dividend: 1,100 shares, $10 par, $30 market'
	},
	{
		id: '7',
		date: '2025-04-15',
		lines: [{ acct: '309', dr: 11000 }, { acct: '307', cr: 11000 }],
		explanation: 'Distribute the stock dividend'
	},
	{
		id: '8',
		date: '2025-05-01',
		lines: [{ acct: '330', dr: 14000 }, { acct: '101', cr: 14000 }],
		explanation: 'Buy 500 treasury shares at $28'
	},
	{
		id: '9',
		date: '2025-05-15',
		lines: [{ acct: '101', dr: 6400 }, { acct: '330', cr: 5600 }, { acct: '310', cr: 800 }],
		explanation: 'Reissue 200 treasury shares at $32'
	}
];
const heroBalances = post(heroAccounts, heroEntries);
export const hero = { company: heroCompany, entries: heroEntries, balances: heroBalances };

/**
 * A second reissue, for entry-drill practice only — it happens after the
 * hero's own six-step story ends, so it is never posted into the hero's
 * ledger (which would drift its anchored final state past $356,400).
 */
const secondReissueEntry: Entry = {
	id: '10',
	date: '2025-06-01',
	lines: [{ acct: '101', dr: 2000 }, { acct: '310', dr: 800 }, { acct: '330', cr: 2800 }],
	explanation: 'Reissue 100 more treasury shares at $20'
};

/**
 * The 2-for-1 stock split (brief's entry-drill row 11) has no journal
 * entry — par halves and shares double as a memo only — so it is never
 * posted and never appears as an entry card, per the brief itself.
 */

/* ---------- Hero instrument steps: 6 named checkpoints, dollars and share counts ---------- */

export interface EquityStep {
	label: string;
	instruction: string;
	commonStock: number;
	paidInExcess: number;
	paidInTreasury: number;
	retainedEarnings: number;
	treasuryStock: number;
	totalEquity: number;
	sharesIssued: number;
	parPerShare: number;
}
function balancesAfter(ids: string[]) {
	const applied = heroEntries.filter((e) => ids.includes(e.id));
	return post(heroAccounts, applied);
}
function equityFrom(bal: ReturnType<typeof balancesAfter>): {
	commonStock: number;
	paidInExcess: number;
	paidInTreasury: number;
	retainedEarnings: number;
	treasuryStock: number;
	totalEquity: number;
} {
	const commonStock = bal.get('307')!.balance;
	const paidInExcess = bal.get('308')!.balance;
	const paidInTreasury = bal.get('310')?.balance ?? 0;
	const retainedEarnings = bal.get('318')!.balance;
	const treasuryStock = bal.get('330')?.balance ?? 0;
	const totalEquity = round(commonStock + paidInExcess + paidInTreasury + retainedEarnings - treasuryStock);
	return { commonStock, paidInExcess, paidInTreasury, retainedEarnings, treasuryStock, totalEquity };
}
const stepIds = [
	[],
	['open'],
	['open', '1'],
	['open', '1', '4'],
	['open', '1', '4', '5', '6', '7'],
	['open', '1', '4', '5', '6', '7', '8'],
	['open', '1', '4', '5', '6', '7', '8', '9']
];
const stepShares = [10000, 10000, 11000, 11000, 12100, 12100, 12100];
const stepPar = [10, 10, 10, 10, 10, 10, 10];
const stepLabels = [
	'Before start',
	'Start',
	'Issue 1,000 shares at $25',
	'Declare $1 a share cash dividend',
	'10% stock dividend, 1,100 shares at $30 market',
	'Buy 500 treasury shares at $28',
	'Reissue 200 treasury shares at $32'
];
const stepInstructions = [
	'',
	'The corporation as it stands today.',
	'New investors buy in above par.',
	"The board declares a dividend on today's 11,000 shares.",
	'Shares distribute; the stock dividend value moves within equity.',
	'The corporation buys back its own shares.',
	'Reissuing above cost adds to paid-in capital, never to income.'
];
export const equitySteps: EquityStep[] = stepIds
	.slice(1)
	.map((ids, i) => {
		const e = equityFrom(balancesAfter(ids));
		return {
			label: stepLabels[i + 1],
			instruction: stepInstructions[i + 1],
			...e,
			sharesIssued: stepShares[i + 1],
			parPerShare: stepPar[i + 1]
		};
	});
// The 2-for-1 split: a seventh, no-entry checkpoint. Dollars are identical to the reissue step.
export const splitStep: EquityStep = {
	...equitySteps[equitySteps.length - 1],
	label: '2-for-1 split: 24,200 shares at $5 par',
	instruction: 'Shares double, par halves — no entry, and the total never moves.',
	sharesIssued: equitySteps[equitySteps.length - 1].sharesIssued * 2,
	parPerShare: equitySteps[equitySteps.length - 1].parPerShare / 2
};
export const allEquitySteps: EquityStep[] = [...equitySteps, splitStep];

/* ---------- Statement of stockholders' equity: the hero's walk plus net income ---------- */

const netIncomeForYear = 60000;
const statementEntries: Entry[] = [
	...heroEntries,
	{ id: 'ni', date: '2025-12-31', lines: [{ acct: '101', dr: netIncomeForYear }, { acct: '318', cr: netIncomeForYear }], explanation: 'Close net income of $60,000 to retained earnings for the year' }
];
const statementCompany: Company = { ...heroCompany, name: 'Brightwater Corp (statement of equity)' };
const statementBalances = post(heroAccounts, statementEntries);
export const statement = { company: statementCompany, entries: statementEntries, balances: statementBalances };
export const statementRows: EquityStep[] = [
	...equitySteps,
	{
		...equityFrom(statementBalances),
		label: 'Net income for the year',
		instruction: 'Net income closes into retained earnings — one row, same as any other.',
		sharesIssued: equitySteps[equitySteps.length - 1].sharesIssued,
		parPerShare: equitySteps[equitySteps.length - 1].parPerShare
	}
];
export const endingRetainedEarnings = statementRows[statementRows.length - 1].retainedEarnings;
export const endingTotalEquity = statementRows[statementRows.length - 1].totalEquity;

/* ---------- Two standalone stock-issuance entries (alternate scenarios, not part of the hero's story) ---------- */

const noParAccounts = acctsFor(['101', '317']);
const noParIssueEntry: Entry = {
	id: '2',
	date: '2025-01-01',
	lines: [{ acct: '101', dr: 25000 }, { acct: '317', cr: 25000 }],
	explanation: 'Issue 1,000 no-par, no-stated-value shares for $25 cash'
};
const landIssueAccounts = acctsFor(['141', '307', '308']);
const landIssueEntry: Entry = {
	id: '3',
	date: '2025-01-01',
	lines: [{ acct: '141', dr: 30000 }, { acct: '307', cr: 10000 }, { acct: '308', cr: 20000 }],
	explanation: 'Issue 1,000 shares of $10 par common for land worth $30,000'
};

/* ---------- Classification drill ---------- */

const EQUITY_CATEGORIES = [
	{ id: 'up', label: 'Total equity goes up' },
	{ id: 'down', label: 'Total equity goes down' },
	{ id: 'none', label: 'No change' }
];
export const classifications: Classification[] = [
	{ lo: 'P1', text: 'Issue common stock for cash', options: EQUITY_CATEGORIES, answer: 'up', why: 'Owners put in assets.' },
	{ lo: 'P2', text: 'Declare a cash dividend', options: EQUITY_CATEGORIES, answer: 'down', why: 'Retained earnings falls and a liability appears.' },
	{ lo: 'P2', text: 'Pay a cash dividend already declared', options: EQUITY_CATEGORIES, answer: 'none', why: 'A liability and cash fall together.' },
	{ lo: 'P3', text: 'Declare a small stock dividend', options: EQUITY_CATEGORIES, answer: 'none', why: 'Retained earnings moves into paid-in capital.' },
	{ lo: 'P3', text: 'Stock split', options: EQUITY_CATEGORIES, answer: 'none', why: 'More shares, lower par, same dollars.' },
	{ lo: 'P1', text: 'Buy treasury stock', options: EQUITY_CATEGORIES, answer: 'down', why: 'Cash goes out to former owners; treasury stock is contra equity.' },
	{ lo: 'P1', text: 'Reissue treasury stock above cost', options: EQUITY_CATEGORIES, answer: 'up', why: 'Cash comes back in.' },
	{ lo: 'P2', text: 'Date of record for a declared dividend', options: EQUITY_CATEGORIES, answer: 'none', why: 'No entry; it only fixes who gets paid.' },
	{ lo: 'P4', text: 'Net income for the year', options: EQUITY_CATEGORIES, answer: 'up', why: 'It is closed into retained earnings.' }
];

/* ---------- Entry drill: 10 situations, 10 cards ---------- */

export const entryDrillAccounts = acctsFor(['101', '141', '221', '307', '308', '309', '310', '317', '318', '330']);
const allDrillEntries = [noParIssueEntry, landIssueEntry, secondReissueEntry, ...heroEntries];
function findEntry(id: string): Entry {
	const e = allDrillEntries.find((x) => x.id === id);
	if (!e) throw new Error(`Entry drill card references unknown entry ${id}`);
	return e;
}
export const entryCards: EntryCardSpec[] = [
	{ lo: 'P1', prompt: 'Issue 1,000 shares of $10 par common for $25 cash.', entry: findEntry('1') },
	{ lo: 'P1', prompt: 'Issue 1,000 no-par, no-stated-value shares for $25 cash.', entry: findEntry('2') },
	{
		lo: 'P1',
		prompt: 'Issue 1,000 shares of $10 par common for land worth $30,000.',
		entry: findEntry('3'),
		hint: 'Common stock is credited at par; the rest is paid-in capital in excess of par.'
	},
	{ lo: 'P2', prompt: 'Declare an $11,000 cash dividend.', entry: findEntry('4') },
	{ lo: 'P2', prompt: 'Pay the dividend.', entry: findEntry('5') },
	{
		lo: 'P3',
		prompt: 'Declare a 10% stock dividend: 1,100 shares, $10 par, $30 market.',
		entry: findEntry('6'),
		hint: 'A small stock dividend is recorded at market value, not par.'
	},
	{ lo: 'P3', prompt: 'Distribute the stock dividend.', entry: findEntry('7') },
	{ lo: 'P1', prompt: 'Buy 500 treasury shares at $28.', entry: findEntry('8') },
	{
		lo: 'P1',
		prompt: 'Reissue 200 treasury shares at $32.',
		entry: findEntry('9'),
		hint: 'The excess over cost goes to paid-in capital, treasury stock — never to income.'
	},
	{
		lo: 'P1',
		prompt: 'Reissue 100 more treasury shares at $20.',
		entry: findEntry('10'),
		hint: 'A reissue below cost first draws down paid-in capital, treasury stock.'
	}
];

/* ---------- Recall rules ---------- */

export const rules: Rule[] = [
	{
		lo: 'P1',
		prompt: 'Treasury stock transactions:',
		options: [{ id: 'a', label: 'Never create a gain or loss on the income statement' }, { id: 'b', label: 'Can create a gain, like selling any other asset' }],
		answer: 'a',
		why: 'Treasury stock is equity, not an asset. Any excess over cost goes to paid-in capital, never to income.'
	},
	{
		lo: 'P1',
		prompt: 'When stock is issued above par, Common stock is credited for:',
		options: [{ id: 'a', label: 'Par value only' }, { id: 'b', label: 'The full amount received' }],
		answer: 'a',
		why: 'Only par goes to Common stock; the rest is paid-in capital in excess of par.'
	},
	{
		lo: 'P2',
		prompt: 'Dividend dates, in order, are:',
		options: [{ id: 'a', label: 'Declaration, record, payment' }, { id: 'b', label: 'Record, declaration, payment' }],
		answer: 'a',
		why: 'The board declares first, then a record date fixes who is entitled, then payment follows.'
	},
	{
		lo: 'P3',
		prompt: 'A stock split requires:',
		options: [{ id: 'a', label: 'No journal entry' }, { id: 'b', label: 'A journal entry moving par to paid-in capital' }],
		answer: 'a',
		why: 'A split changes share count and par value only in the company records — no account balance moves.'
	},
	{
		lo: 'A1',
		prompt: 'Dividends in arrears on noncumulative preferred stock are:',
		options: [{ id: 'a', label: 'Carried forward until paid' }, { id: 'b', label: 'Forfeited if not declared that year' }],
		answer: 'b',
		why: 'Noncumulative preferred has no claim on a missed year — only cumulative preferred carries arrears forward.'
	}
];

/* ---------- Formulas ---------- */

export const formulas: Formula[] = [
	{
		lo: 'A2',
		formula: 'Earnings per share = (Net income − Preferred dividends) ÷ Weighted-average common shares outstanding',
		worked: `(${fmt(netIncomeForEps, { dollar: true })} − ${fmt(preferredDividendsForEps, { dollar: true })}) ÷ ${weightedAverageShares.toLocaleString()} = ${fmt(earningsPerShare, { dollar: true })}`
	},
	{
		lo: 'A2',
		formula: 'Price-earnings ratio = Market price per share ÷ Earnings per share',
		worked: `${fmt(marketPricePerShare, { dollar: true })} ÷ ${fmt(earningsPerShare, { dollar: true })} = ${priceEarningsRatio.toFixed(1)}`
	},
	{
		lo: 'A2',
		formula: 'Dividend yield = Annual cash dividends per share ÷ Market price per share',
		worked: `${fmt(annualDividendPerShare, { dollar: true, decimals: 2 })} ÷ ${fmt(marketPricePerShare, { dollar: true })} = ${(dividendYield * 100).toFixed(1)}%`
	},
	{
		lo: 'A2',
		formula: 'Book value per common share = (Total equity − Preferred equity) ÷ Common shares outstanding',
		worked: `(${fmt(totalEquityForBookValue, { dollar: true })} − ${fmt(preferredEquityForBookValue, { dollar: true })}) ÷ ${commonSharesForBookValue.toLocaleString()} = ${fmt(bookValuePerShare, { dollar: true })}`
	},
	{
		lo: 'P3',
		formula: 'Stock dividend amount (small) = Shares distributed × Market price',
		worked: `1,100 × ${fmt(30, { dollar: true })} = ${fmt(33000, { dollar: true })}`
	}
];

/* ---------- Lessons (Learn) and instruments (Lab) ---------- */

export const lessons: LessonMeta[] = [
	{ id: 'corporate-organization', title: 'A separate legal life', lo: 'C1' },
	{ id: 'equity-composition', title: 'What moves, what only rearranges', lo: 'P1' },
	{ id: 'cash-dividends', title: 'Three dates, two entries', lo: 'P2' },
	{ id: 'stock-dividends-and-splits', title: 'More shares, same pie', lo: 'P3' },
	{ id: 'preferred-dividends', title: 'Preferred takes its share first', lo: 'A1' },
	{ id: 'statement-of-stockholders-equity', title: "Every column, beginning to ending", lo: 'P4' },
	{ id: 'per-share-ratios', title: 'One share, four numbers', lo: 'A2' }
];

export const instruments: InstrumentMeta[] = [
	{
		id: 'equity-composition',
		title: 'Equity composition',
		lo: 'P1',
		instruction: 'Issue stock, declare a dividend, buy back shares, split the stock — and watch which parts of equity move and whether the total does.',
		resultLine: `Total equity ${fmt(endingTotalEquity - netIncomeForYear, { dollar: true })} · Shares issued ${splitStep.sharesIssued.toLocaleString()} at ${fmt(splitStep.parPerShare, { dollar: true })} par`,
		noticed:
			'The stock dividend and the split never changed the total. The cash dividend and the buyback did — declaring the dividend created a liability, and the buyback sent cash to former shareholders.'
	},
	{
		id: 'preferred-dividend-allocator',
		title: 'Preferred dividend allocator',
		lo: 'A1',
		instruction: 'Set the dividend declared and watch cumulative preferred take its share first.',
		resultLine: `Year 2, cumulative — preferred ${fmt(year2Cumulative.preferred, { dollar: true })} · common ${fmt(year2Cumulative.common, { dollar: true })}`,
		noticed: 'Whatever is owed from a prior year comes back to cumulative preferred before common sees anything. Noncumulative preferred never recovers a missed year.'
	},
	{
		id: 'statement-of-stockholders-equity',
		title: "Statement of stockholders' equity",
		lo: 'P4',
		instruction: 'Step through each equity event and watch every column walk from its starting balance to its ending one.',
		resultLine: `Ending retained earnings ${fmt(endingRetainedEarnings, { dollar: true })} · Ending total equity ${fmt(endingTotalEquity, { dollar: true })}`,
		noticed: "Every column starts with last year's balance sheet and ends with this year's. Net income is only one row among several."
	}
];

/* ---------- Chapter export, anchors, invariants ---------- */

export const meta = {
	number: 11,
	slug: 'equity',
	title: 'Equity',
	part: 'financial' as const,
	status: 'live' as const,
	summary: 'Stock, dividends, treasury shares, and what each does to equity.',
	instrument: 'Equity composition',
	oneLine:
		'What shareholders own, and how issuing shares, paying dividends, buying shares back, and splitting stock each change it — or only rearrange it.',
	headline: 'Cash dividends and buybacks shrink equity. Stock dividends and splits only rearrange it.'
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
		{ label: "Brightwater Corp — issue stock, dividends, treasury, split", company: heroCompany, entries: heroEntries },
		{ label: "Brightwater Corp (statement of equity) — the hero's walk plus net income", company: statementCompany, entries: statementEntries }
	],
	anchors: (): Anchor[] => [
		{ label: 'Total equity after issuing stock', expected: 375000, actual: equitySteps[1].totalEquity },
		{ label: 'Total equity after cash dividend declared', expected: 364000, actual: equitySteps[2].totalEquity },
		{ label: 'Total equity after stock dividend', expected: 364000, actual: equitySteps[3].totalEquity },
		{ label: 'Total equity after buying treasury shares', expected: 350000, actual: equitySteps[4].totalEquity },
		{ label: 'Total equity after reissuing treasury shares', expected: 356400, actual: equitySteps[5].totalEquity },
		{ label: 'Total equity after the split', expected: 356400, actual: splitStep.totalEquity },
		{ label: 'Shares issued after the split', expected: 24200, actual: splitStep.sharesIssued },
		{ label: 'Ending retained earnings, hero', expected: 156000, actual: equitySteps[5].retainedEarnings },
		{ label: 'Year 2 cumulative: preferred', expected: 11000, actual: year2Cumulative.preferred },
		{ label: 'Year 2 cumulative: common', expected: 9000, actual: year2Cumulative.common },
		{ label: 'Year 2 noncumulative: preferred', expected: 8000, actual: year2Noncumulative.preferred },
		{ label: 'Year 2 noncumulative: common', expected: 12000, actual: year2Noncumulative.common },
		{ label: "Statement of equity: ending retained earnings", expected: 216000, actual: endingRetainedEarnings },
		{ label: "Statement of equity: ending total equity", expected: 416400, actual: endingTotalEquity },
		{ label: 'Earnings per share', expected: 2, actual: earningsPerShare },
		{ label: 'Price-earnings ratio', expected: 15, actual: priceEarningsRatio },
		{ label: 'Dividend yield', expected: 0.02, actual: dividendYield },
		{ label: 'Book value per common share', expected: 12, actual: bookValuePerShare }
	],
	invariants: () => {
		if (classifications.length !== 9)
			throw new Error(`Chapter 11 should have 9 classification items, has ${classifications.length}`);
		if (entryCards.length !== 10)
			throw new Error(`Chapter 11 should have 10 entry-drill cards, has ${entryCards.length}`);
		for (const c of classifications) {
			if (!c.options.some((o) => o.id === c.answer))
				throw new Error(`Classification answer not in options: ${c.text}`);
		}
		for (const r of rules) {
			if (!r.options.some((o) => o.id === r.answer))
				throw new Error(`Rule answer not in options: ${r.prompt}`);
		}
		if (Math.abs(equitySteps[1].totalEquity - equitySteps[0].totalEquity) < 0.01)
			throw new Error('Issuing stock should change total equity');
		if (Math.abs(equitySteps[3].totalEquity - equitySteps[2].totalEquity) > 0.01)
			throw new Error('A stock dividend should not change total equity');
		if (Math.abs(splitStep.totalEquity - equitySteps[5].totalEquity) > 0.01)
			throw new Error('A stock split should not change total equity');
	}
};
