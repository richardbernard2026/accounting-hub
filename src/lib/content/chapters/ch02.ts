import { accountNameOf, fmt, post, trialBalance } from '$lib/ledger';
import type { Entry } from '$lib/ledger';
import type {
	Anchor,
	ChapterContent,
	Classification,
	EntryCardSpec,
	Formula,
	InstrumentMeta,
	LessonMeta,
	Objective,
	QuickCheck,
	Rule,
	Term
} from '../types';
import { accounts, company, decemberTransactions } from './fastforward';

/**
 * Objective codes are not given in the brief (unlike Chapter 3's), so this
 * grouping is mine — built to match the brief's own structure, not lifted
 * from Wild's printed list.
 */
export const objectives: Objective[] = [
	{
		code: 'C1',
		kind: 'conceptual',
		short: 'Accounts & source documents',
		text: 'Describe source documents and their purpose, and describe an account and its role in the accounting system.'
	},
	{
		code: 'A1',
		kind: 'analytical',
		short: 'Debit/credit rule',
		text: 'Analyze the effects of transactions using the debit and credit rule.'
	},
	{
		code: 'A2',
		kind: 'analytical',
		short: 'Debt ratio',
		text: 'Compute the debt ratio and describe its use in analyzing a company.'
	},
	{
		code: 'P1',
		kind: 'procedural',
		short: 'Journalizing & posting',
		text: 'Record transactions in a journal and post them to a ledger, using the four-step process.'
	},
	{
		code: 'P2',
		kind: 'procedural',
		short: 'Trial balance',
		text: 'Prepare a trial balance and explain what it does, and does not, prove.'
	}
];

export const terms: Term[] = [
	{ term: 'Account', lo: 'C1', definition: 'A record of increases and decreases in one specific asset, liability, equity, revenue, or expense.' },
	{ term: 'Account balance', lo: 'C1', definition: 'The difference between an account’s total increases and total decreases.' },
	{ term: 'Source documents', lo: 'C1', definition: 'The paper or electronic record — invoice, check, receipt — that identifies and describes a transaction.' },
	{ term: 'Chart of accounts', lo: 'C1', definition: 'A list of every account a company uses, with an identifying number for each.' },
	{ term: 'Ledger (general ledger)', lo: 'C1', definition: 'The record holding all of a company’s accounts and their balances.' },
	{ term: 'T-account', lo: 'C1', definition: 'A simplified account form shaped like a T, used to show debits on the left and credits on the right.' },
	{ term: 'Debit', lo: 'A1', definition: 'An entry on the left side of an account. Abbreviated Dr.' },
	{ term: 'Credit', lo: 'A1', definition: 'An entry on the right side of an account. Abbreviated Cr.' },
	{ term: 'Double-entry accounting', lo: 'A1', definition: 'Every transaction affects at least two accounts, and total debits always equal total credits.' },
	{ term: 'Normal balance', lo: 'A1', definition: 'The side of an account — debit or credit — where increases are recorded.' },
	{ term: 'Journal (general journal)', lo: 'P1', definition: 'The record where a transaction is first entered, in date order, before posting.' },
	{ term: 'Journalizing', lo: 'P1', definition: 'The process of recording a transaction in a journal.' },
	{ term: 'Posting', lo: 'P1', definition: 'Transferring journal entry information to the ledger accounts it affects.' },
	{ term: 'Posting reference (PR) column', lo: 'P1', definition: 'A column in the journal and ledger that cross-references an entry to where it was posted.' },
	{ term: 'Balance column account', lo: 'P1', definition: 'A ledger account format with debit, credit, and running-balance columns, used instead of a plain T-account.' },
	{ term: 'Compound journal entry', lo: 'P1', definition: 'A journal entry with more than one debit or more than one credit line.' },
	{ term: 'Trial balance', lo: 'P2', definition: 'A list of every account and its balance, used to check that total debits equal total credits.' },
	{ term: 'Accounts receivable', lo: 'C1', definition: 'An asset representing amounts owed to a company by its customers.' },
	{ term: 'Note receivable', lo: 'C1', definition: 'An asset representing a customer’s written promise to pay a definite sum on a future date.' },
	{ term: 'Prepaid accounts', lo: 'C1', aliases: ['Prepaid expenses'], definition: 'Assets from paying in advance for products or services to be received later.' },
	{ term: 'Supplies', lo: 'C1', definition: 'An asset representing goods a company owns for use in its operations.' },
	{ term: 'Equipment', lo: 'C1', definition: 'An asset representing long-term tangible items used to produce or sell products and services.' },
	{ term: 'Land', lo: 'C1', definition: 'An asset representing property a company owns, reported at its cost and not depreciated.' },
	{ term: 'Accounts payable', lo: 'C1', definition: 'A liability representing amounts owed for products or services bought on credit.' },
	{ term: 'Note payable', lo: 'C1', definition: 'A liability representing a company’s own written promise to pay a definite sum on a future date.' },
	{ term: 'Unearned revenue', lo: 'C1', definition: 'A liability created when a customer pays in advance for products or services not yet delivered.' },
	{ term: 'Accrued liabilities', lo: 'C1', definition: 'Amounts owed that are not yet paid, such as wages or taxes.' },
	{ term: 'Common stock', lo: 'C1', definition: 'An equity account recording amounts received from investors in exchange for ownership shares.' },
	{ term: 'Dividends', lo: 'C1', definition: 'Distributions of a corporation’s earnings to its shareholders; reduces equity.' },
	{ term: 'Retained earnings', lo: 'C1', definition: 'The equity account accumulating a corporation’s earnings that have not been distributed as dividends.' },
	{ term: 'Revenues', lo: 'C1', definition: 'The increase in equity from a company’s earning activities, such as selling products or services.' },
	{ term: 'Expenses', lo: 'C1', definition: 'The cost of assets or services used to earn revenues; decreases equity.' },
	{ term: 'Debt ratio', lo: 'A2', definition: 'Total liabilities divided by total assets; the portion of assets financed by creditors.' }
];

export const quickChecks: QuickCheck[] = [
	{
		lo: 'A1',
		q: 'FastForward buys supplies for $2,500 cash. Which is correct?',
		options: [
			'Debit Cash, credit Supplies',
			'Debit Supplies, credit Cash',
			'Debit Supplies, debit Cash',
			'Credit Supplies, credit Cash'
		],
		answer: 1,
		why: 'Supplies (an asset) goes up: debit. Cash (an asset) goes down: credit. Debits increase assets; a decrease is the opposite side.'
	},
	{
		lo: 'A1',
		q: 'Which pair of accounts both carry a normal credit balance?',
		options: [
			'Accounts payable and Dividends',
			'Common stock and Consulting revenue',
			'Cash and Accounts receivable',
			'Salaries expense and Rent expense'
		],
		answer: 1,
		why: 'CLOR: credits increase liabilities, owner’s equity, and revenue. Common stock is equity; Consulting revenue is revenue.'
	},
	{
		lo: 'P1',
		q: 'On December 15, FastForward bills a client $1,600 for consulting and $300 for facility rental, both on credit. This entry:',
		options: [
			'Has one debit and one credit',
			'Has one debit and two credits',
			'Has two debits and one credit',
			'Cannot be journalized until cash is received'
		],
		answer: 1,
		why: 'Accounts receivable is debited once for $1,900; Consulting revenue and Rental revenue are each credited — a compound entry.'
	},
	{
		lo: 'P1',
		q: 'FastForward receives $3,000 cash on December 26 for 60 days of consulting it has not yet performed. The credit is to:',
		options: ['Consulting revenue', 'Accounts receivable', 'Unearned consulting revenue', 'Cash'],
		answer: 2,
		why: 'Cash came in before the work was done, so the credit is a liability — Unearned consulting revenue — not revenue.'
	},
	{
		lo: 'P2',
		q: 'A trial balance has equal debit and credit totals. This proves:',
		options: [
			'Every transaction was recorded',
			'No account has the wrong amount',
			'Total debits posted equal total credits posted',
			'The financial statements are correct'
		],
		answer: 2,
		why: 'Equal totals only prove that debits and credits are equal in the aggregate. An entry that was never recorded, or one posted twice, still balances.'
	},
	{
		lo: 'A2',
		q: 'FastForward has total liabilities of $9,200 and total assets of $42,470. Its debt ratio is:',
		options: ['4.6', '21.7%', '78.3%', '$33,270'],
		answer: 1,
		why: '9,200 ÷ 42,470 = 21.7%. About 22 cents of every dollar of assets is financed by creditors.'
	}
];

/* ---------- Classification drill: debit-normal vs credit-normal ---------- */

const CLASS_OPTIONS = [
	{ id: 'debit', label: 'Debit-normal' },
	{ id: 'credit', label: 'Credit-normal' }
];

export const classifications: Classification[] = [
	{ lo: 'A1', text: 'Cash', answer: 'debit', why: 'Asset. DEBT — Expenses, Assets, Dividends.', options: CLASS_OPTIONS },
	{ lo: 'A1', text: 'Accounts receivable', answer: 'debit', why: 'Asset.', options: CLASS_OPTIONS },
	{ lo: 'A1', text: 'Prepaid insurance', answer: 'debit', why: 'Asset — insurance paid for and not yet used.', options: CLASS_OPTIONS },
	{ lo: 'A1', text: 'Equipment', answer: 'debit', why: 'Asset.', options: CLASS_OPTIONS },
	{ lo: 'A1', text: 'Accounts payable', answer: 'credit', why: 'Liability. CLOR — Credits: Liabilities, Owner’s equity, Revenue.', options: CLASS_OPTIONS },
	{ lo: 'A1', text: 'Unearned consulting revenue', answer: 'credit', why: 'Liability, despite the name. FastForward owes the work.', options: CLASS_OPTIONS },
	{ lo: 'A1', text: 'Common stock', answer: 'credit', why: 'Owner’s equity. It pushes equity up.', options: CLASS_OPTIONS },
	{ lo: 'A1', text: 'Dividends', answer: 'debit', why: 'Pulls equity down, so it grows on the debit side.', options: CLASS_OPTIONS },
	{ lo: 'A1', text: 'Consulting revenue', answer: 'credit', why: 'Revenue pushes equity up.', options: CLASS_OPTIONS },
	{ lo: 'A1', text: 'Rental revenue', answer: 'credit', why: 'Revenue.', options: CLASS_OPTIONS },
	{ lo: 'A1', text: 'Salaries expense', answer: 'debit', why: 'Expense pulls equity down.', options: CLASS_OPTIONS },
	{ lo: 'A1', text: 'Utilities expense', answer: 'debit', why: 'Expense.', options: CLASS_OPTIONS }
];

/* ---------- Entry cards: all sixteen December transactions ---------- */

const entryHints: Record<string, string> = {
	'1': 'An asset comes in; equity goes up in exchange.',
	'2': 'One asset replaces another. No liability, no equity change.',
	'3': 'One asset replaces another.',
	'4': 'The asset goes up now; the liability goes up because cash hasn’t moved.',
	'5': 'Cash in, revenue earned the same day.',
	'6': 'An expense pulls equity down; cash goes out.',
	'7': 'An expense pulls equity down; cash goes out.',
	'8': 'One debit, two credits — a compound entry. Two different revenue accounts.',
	'9': 'Collecting cash owed does not create revenue — that was recorded in entry 8.',
	'10': 'Paying down a payable reduces both an asset and a liability. No expense.',
	'11': 'Dividends reduce equity but are never an expense.',
	'12': 'Cash first, work later: the credit is a liability, not revenue.',
	'13': 'An asset is paid for in advance; nothing is expensed yet.',
	'14': 'One asset replaces another.',
	'15': 'An expense pulls equity down; cash goes out.',
	'16': 'An expense pulls equity down; cash goes out.'
};
export const entryCards: EntryCardSpec[] = decemberTransactions.map((entry) => ({
	lo: 'P1',
	prompt: entry.explanation + '.',
	entry,
	hint: entryHints[entry.id]
}));

/* ---------- Rules: the debit/credit side, tested directly ---------- */

const SIDE = [
	{ id: 'dr', label: 'Debit' },
	{ id: 'cr', label: 'Credit' }
];
export const rules: Rule[] = [
	{ lo: 'A1', prompt: 'Which side increases Cash?', options: SIDE, answer: 'dr', why: 'Asset: debits increase expenses, assets, and dividends.' },
	{ lo: 'A1', prompt: 'Which side increases Accounts payable?', options: SIDE, answer: 'cr', why: 'Liability: credits increase liabilities, equity, and revenue.' },
	{ lo: 'A1', prompt: 'Which side increases Common stock?', options: SIDE, answer: 'cr', why: 'Equity. Anything that pushes equity up is a credit.' },
	{ lo: 'A1', prompt: 'Which side increases Dividends?', options: SIDE, answer: 'dr', why: 'Dividends pull equity down, so they grow on the debit side.' },
	{ lo: 'A1', prompt: 'Which side increases Consulting revenue?', options: SIDE, answer: 'cr', why: 'Revenue pushes equity up: credit.' },
	{ lo: 'A1', prompt: 'Which side increases Salaries expense?', options: SIDE, answer: 'dr', why: 'Expenses pull equity down: debit.' },
	{ lo: 'A1', prompt: 'Which side increases Unearned consulting revenue?', options: SIDE, answer: 'cr', why: 'A liability, despite the name — credits increase liabilities.' },
	{ lo: 'A1', prompt: 'Which side decreases Accounts payable?', options: SIDE, answer: 'dr', why: 'A liability is credit-normal, so a debit moves it the other way — down.' },
	{ lo: 'A1', prompt: 'Which side decreases Cash?', options: SIDE, answer: 'cr', why: 'An asset is debit-normal, so a credit moves it the other way — down.' }
];

/* ---------- Formulas ---------- */

export const unadjusted = post(accounts, decemberTransactions);
export const unadjustedTB = trialBalance(unadjusted);
const totalAssets = ['101', '106', '126', '128', '167'].reduce(
	(s, n) => s + unadjusted.get(n)!.balance,
	0
);
const totalLiabilities = ['201', '236'].reduce((s, n) => s + unadjusted.get(n)!.balance, 0);
const revenues = unadjusted.get('403')!.balance + unadjusted.get('406')!.balance;
const expenses = unadjusted.get('640')!.balance + unadjusted.get('622')!.balance + unadjusted.get('690')!.balance;
const netIncome = revenues - expenses;
const debtRatio = totalLiabilities / totalAssets;

export const formulas: Formula[] = [
	{
		lo: 'C1',
		formula: 'Account balance = Total increases − Total decreases',
		worked: `Accounts payable: ${fmt(unadjusted.get('201')!.cr)} − ${fmt(unadjusted.get('201')!.dr)} = ${fmt(unadjusted.get('201')!.balance)}`
	},
	{
		lo: 'P2',
		formula: 'Total debits = Total credits',
		worked: `${fmt(unadjustedTB.totalDr)} = ${fmt(unadjustedTB.totalCr)}`
	},
	{
		lo: 'A2',
		formula: 'Debt ratio = Total liabilities ÷ Total assets',
		worked: `${fmt(totalLiabilities)} ÷ ${fmt(totalAssets)} = ${(debtRatio * 100).toFixed(1)}%`
	},
	{
		lo: 'P1',
		formula: 'Net income = Revenues − Expenses',
		worked: `${fmt(revenues)} − ${fmt(expenses)} = ${fmt(netIncome)}`
	}
];

/* ---------- Lessons (Learn) and instruments (Lab) ---------- */

export const lessons: LessonMeta[] = [
	{ id: 'accounts', title: 'What an account is', lo: 'C1' },
	{ id: 'rule', title: 'The rule: DEBT and CLOR', lo: 'A1' },
	{ id: 'four-steps', title: 'Four steps, sixteen transactions', lo: 'P1' },
	{ id: 'trial-balance', title: 'The trial balance', lo: 'P2' },
	{ id: 'debt-ratio', title: 'The debt ratio', lo: 'A2' }
];

export const instruments: InstrumentMeta[] = [
	{
		id: 'double-entry-machine',
		title: 'Double-entry machine',
		lo: 'P1',
		instruction: 'Push each transaction through the four steps and watch debits and credits stay equal.',
		resultLine: `Trial balance — Debits ${fmt(unadjustedTB.totalDr, { dollar: true })} = Credits ${fmt(unadjustedTB.totalCr, { dollar: true })}`,
		noticed:
			'The totals never drifted apart, because every entry added the same amount to both sides. Entry 9 changed two accounts and left total assets exactly where they were.'
	},
	{
		id: 't-account-trainer',
		title: 'T-account trainer',
		lo: 'C1',
		instruction: 'Post the amount to either side of the account and say whether its balance went up or down.',
		resultLine: `Accounts payable — ${fmt(unadjusted.get('201')!.balance, { dollar: true })} credit balance`,
		noticed: 'Debit means left, not decrease. Whether left raises the balance depends on the account.'
	},
	{
		id: 'trial-balance-error-finder',
		title: 'Trial balance error finder',
		lo: 'P2',
		instruction: 'Plant an error in December’s books and see whether the trial balance catches it.',
		resultLine: 'Difference 90 — divisible by 9, look for a transposition',
		noticed:
			'Three of five errors left the trial balance perfectly even. Equal totals prove the debits match the credits, not that the books are right.'
	}
];

export const journalPatterns: Entry[] = decemberTransactions;

export const chapter: ChapterContent = {
	meta: {
		number: 2,
		slug: 'business-transactions',
		title: 'Accounting for Business Transactions',
		part: 'financial',
		status: 'live',
		summary: 'Source documents, debits and credits, journal to ledger to trial balance.',
		instrument: 'Double-entry machine',
		oneLine:
			'Every transaction is recorded twice — a debit and a credit — and sixteen FastForward entries show why the books stay in balance.',
		headline: `Sixteen entries. **Debits ${fmt(unadjustedTB.totalDr, { dollar: true })} = Credits ${fmt(unadjustedTB.totalCr, { dollar: true })}.**`
	},
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
	journalPatterns,
	ledgers: [{ label: 'FastForward, December transactions', company, entries: decemberTransactions }],
	anchors: () => {
		const a: Anchor[] = [
			{ label: 'Trial balance, debits = credits', expected: 45300, actual: unadjustedTB.totalDr },
			{ label: 'Cash', expected: 4350, actual: unadjusted.get('101')!.balance },
			{ label: 'Supplies', expected: 9720, actual: unadjusted.get('126')!.balance },
			{ label: 'Prepaid insurance', expected: 2400, actual: unadjusted.get('128')!.balance },
			{ label: 'Equipment', expected: 26000, actual: unadjusted.get('167')!.balance },
			{ label: 'Total assets', expected: 42470, actual: totalAssets },
			{ label: 'Accounts payable', expected: 6200, actual: unadjusted.get('201')!.balance },
			{ label: 'Unearned consulting revenue', expected: 3000, actual: unadjusted.get('236')!.balance },
			{ label: 'Total liabilities', expected: 9200, actual: totalLiabilities },
			{ label: 'Revenues (consulting + rental)', expected: 6100, actual: revenues },
			{ label: 'Expenses (rent, salaries, utilities)', expected: 2630, actual: expenses },
			{ label: 'Net income', expected: 3470, actual: netIncome },
			{ label: 'Debt ratio', expected: 0.217, actual: debtRatio }
		];
		return a;
	},
	invariants: () => {
		if (decemberTransactions.length !== 16)
			throw new Error(`Chapter 2 should record all 16 December transactions, has ${decemberTransactions.length}`);
		const accountName = accountNameOf(accounts);
		for (const e of decemberTransactions) accountName(e.lines[0].acct); // throws if unknown
		for (const c of classifications) {
			if (!c.options.some((o) => o.id === c.answer))
				throw new Error(`Classification answer not in options: ${c.text}`);
		}
		for (const r of rules) {
			if (!r.options.some((o) => o.id === r.answer))
				throw new Error(`Rule answer not in options: ${r.prompt}`);
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
		// Every entry balances and touches only known accounts (post() already
		// throws on unknown accounts/imbalance for the ledgers array; this
		// double-checks the entryCards copy used by drills matches 1:1).
		if (entryCards.length !== 16)
			throw new Error(`Should have one entry card per December transaction, has ${entryCards.length}`);
	}
};
