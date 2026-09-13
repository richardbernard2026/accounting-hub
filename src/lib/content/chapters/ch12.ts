import { accountNameOf, fmt, post, round } from '$lib/ledger';
import type { Account, Entry } from '$lib/ledger';
import type {
	Anchor,
	ChapterContent,
	Classification,
	Company,
	Formula,
	InstrumentMeta,
	LessonMeta,
	Objective,
	QuickCheck,
	Rule,
	Term
} from '../types';

/**
 * The operating section is confirmed [book] — a reproduction of the book's
 * own Genesis statement. The investing section (net inflow of 2,000: 12,000
 * in from a sale, 10,000 out for a purchase) is [book?] — the brief flags
 * that one secondary source calls investing a 2,000 outflow instead, and
 * asks to confirm the investing lines, the cash balances, and the book's
 * free cash flow definition against the physical text (not available from
 * here). Built on the brief's own stated net-inflow reading throughout;
 * hand-verified that operating = direct = indirect = 20,000 exactly, and
 * that the income statement ties to net income of 38,000. See the final
 * report for this standing caveat.
 *
 * The brief's own "Entry drill" is not a debit/credit exercise — a
 * statement of cash flows reclassifies facts already recorded elsewhere,
 * it does not journalize new ones. Built as a second sort drill (section +
 * direction) instead of forcing it through the site's debit/credit
 * journalizer, which does not fit this chapter's actual skill. A small,
 * separate set of real journal entries (depreciation, disposal, note
 * retirement, a part-cash purchase, issuing stock, paying dividends) is
 * still posted through one company for validation and for the Reference
 * page's entry patterns — an independent decision, not a book number.
 */
export const objectives: Objective[] = [
	{
		code: 'C1',
		kind: 'conceptual',
		short: 'Three activities',
		text: 'Classify a cash flow as operating, investing, or financing, and identify noncash investing and financing activities.'
	},
	{
		code: 'P1',
		kind: 'procedural',
		short: 'Indirect method',
		text: "Prepare the operating section of the statement of cash flows using the indirect method."
	},
	{
		code: 'P2',
		kind: 'procedural',
		short: 'Direct method',
		text: 'Prepare the operating section of the statement of cash flows using the direct method.'
	},
	{
		code: 'A1',
		kind: 'analytical',
		short: 'Balance sheet changes',
		text: 'Determine the cash flow effect of a change in a current asset or current liability account.'
	},
	{
		code: 'P3',
		kind: 'procedural',
		short: 'Investing and financing',
		text: 'Prepare the investing and financing sections of the statement of cash flows.'
	},
	{
		code: 'A2',
		kind: 'analytical',
		short: 'Free cash flow',
		text: 'Compute free cash flow and cash flow on total assets.'
	}
];

export const terms: Term[] = [
	{ term: 'Statement of cash flows', lo: 'C1', definition: 'A statement reporting cash inflows and outflows for a period, sorted into operating, investing, and financing activities.' },
	{ term: 'Cash', lo: 'C1', definition: 'Currency and demand deposits available for current operations.' },
	{ term: 'Cash equivalents', lo: 'C1', definition: 'Short-term, highly liquid investments so close to maturity that they are treated as cash.' },
	{ term: 'Operating activities', lo: 'C1', definition: "Cash flows from a company's main business — transactions that determine net income." },
	{ term: 'Investing activities', lo: 'C1', definition: 'Cash flows from buying and selling long-term assets and other investments.' },
	{ term: 'Financing activities', lo: 'C1', definition: "Cash flows from transactions with a company's owners and creditors, other than for operating purposes." },
	{ term: 'Noncash investing and financing activities', lo: 'C1', definition: 'Significant investing or financing transactions not involving cash, disclosed separately rather than included in the statement.' },
	{ term: 'Direct method', lo: 'P2', definition: 'Reports operating cash flows by listing each major class of cash receipt and cash payment.' },
	{ term: 'Indirect method', lo: 'P1', definition: 'Reports operating cash flows by adjusting net income for noncash items and changes in current operating assets and liabilities.' },
	{ term: 'Reconciliation (of net income to operating cash flow)', lo: 'P1', definition: 'The indirect-method walk from net income to net cash provided by operating activities.' },
	{ term: 'Operating items not providing or using cash', lo: 'P1', definition: 'Expenses like depreciation that reduce net income without any cash movement, added back under the indirect method.' },
	{ term: 'Nonoperating gains and losses', lo: 'P1', definition: 'Gains and losses from investing or financing transactions, removed from operating activities and reported at the actual cash amount in their own section.' },
	{ term: 'Changes in current operating assets and liabilities', lo: 'A1', definition: 'Increases and decreases in accounts like receivables, inventory, and payables, each adjusted for in the indirect method.' },
	{ term: 'Free cash flow', lo: 'A2', definition: 'Cash provided by operating activities minus cash used for capital expenditures.' },
	{ term: 'Cash flow on total assets', lo: 'A2', definition: 'Cash flow from operating activities divided by average total assets, measuring cash return on asset investment.' },
	{ term: 'Spreadsheet (work sheet) method', lo: 'P3', definition: '[book?] — check this edition’s exact terminology. A working paper some preparers use to organize the statement’s adjustments.' }
];

export const quickChecks: QuickCheck[] = [
	{
		lo: 'C1',
		q: 'Buying land by signing a note, with no cash changing hands, is:',
		options: ['Reported in investing activities', 'Reported in financing activities', 'Disclosed as a noncash investing and financing activity'],
		answer: 2,
		why: 'No cash moved, so it never enters the statement\'s three sections — it is disclosed separately instead.'
	},
	{
		lo: 'P1',
		q: 'Under the indirect method, depreciation expense is:',
		options: ['Subtracted from net income', 'Added back to net income', 'Ignored entirely'],
		answer: 1,
		why: 'Depreciation reduced net income without using any cash, so it is added back to get from net income toward cash.'
	},
	{
		lo: 'P2',
		q: 'Under the direct method, depreciation expense:',
		options: ['Is added to cash paid for operating expenses', 'Never appears at all', 'Is subtracted from cash receipts'],
		answer: 1,
		why: 'The direct method lists only actual cash receipts and payments — depreciation was never cash, so it never appears.'
	},
	{
		lo: 'A1',
		q: 'Accounts receivable increased during the year. Under the indirect method, this is:',
		options: ['Added to net income', 'Subtracted from net income', 'Not part of the statement'],
		answer: 1,
		why: 'A rising receivable means sales were recorded that have not yet come in as cash — subtract the increase.'
	},
	{
		lo: 'P3',
		q: 'Proceeds from selling equipment appear in investing activities at:',
		options: ['The cash actually received', 'The gain or loss on the sale', 'The equipment\'s original cost'],
		answer: 0,
		why: 'Investing activities show the real cash that changed hands. The gain or loss is removed from operating instead.'
	},
	{
		lo: 'A2',
		q: 'Free cash flow equals operating cash flow minus:',
		options: ['Net income', 'Capital expenditures', 'Total liabilities'],
		answer: 1,
		why: 'Free cash flow asks what is left after a company reinvests in the long-term assets it needs to keep operating.'
	}
];

/* ---------- Chart of accounts (for the small set of real entries behind the facts) ---------- */

const ALL_ACCOUNTS: Account[] = [
	{ num: '101', name: 'Cash', type: 'asset' },
	{ num: '141', name: 'Plant assets', type: 'asset' },
	{ num: '142', name: 'Accumulated depreciation—Plant assets', type: 'contra-asset' },
	{ num: '204', name: 'Notes payable', type: 'liability' },
	{ num: '307', name: 'Common stock', type: 'equity' },
	{ num: '318', name: 'Retained earnings', type: 'equity' },
	{ num: '319', name: 'Dividends', type: 'contra-equity' },
	{ num: '505', name: 'Gain on retirement of notes', type: 'revenue' },
	{ num: '601', name: 'Depreciation expense', type: 'expense' },
	{ num: '602', name: 'Loss on sale of plant assets', type: 'expense' }
];
export const accounts = ALL_ACCOUNTS;
export const accountName = accountNameOf(ALL_ACCOUNTS);

/* ---------- The indirect-method waterfall: a generic toggle-driven walk ---------- */

export const netIncome = 38000;
export interface WaterfallStep {
	id: string;
	label: string;
	amount: number;
	reason: string;
}
export const waterfallSteps: WaterfallStep[] = [
	{ id: 'depreciation', label: 'Add depreciation expense', amount: 24000, reason: 'Depreciation reduced net income but used no cash — add it back.' },
	{ id: 'loss', label: 'Add loss on sale of plant assets', amount: 6000, reason: 'The loss was a bookkeeping write-down, not a cash outflow — add it back.' },
	{ id: 'gain', label: 'Subtract gain on retirement of notes', amount: -16000, reason: 'The gain inflated net income for a financing transaction — remove it here; the real cash shows up in financing.' },
	{ id: 'ar', label: 'Subtract increase in accounts receivable', amount: -20000, reason: 'Receivables rose — sales were recorded that have not come in as cash.' },
	{ id: 'inventory', label: 'Subtract increase in merchandise inventory', amount: -14000, reason: 'More cash went into inventory than came out as cost of goods sold.' },
	{ id: 'prepaid', label: 'Subtract increase in prepaid expenses', amount: -2000, reason: 'Cash was paid out ahead of the expense being recorded.' },
	{ id: 'ap', label: 'Subtract decrease in accounts payable', amount: -5000, reason: 'Suppliers were paid down faster than new purchases were made on account.' },
	{ id: 'interest-payable', label: 'Subtract decrease in interest payable', amount: -1000, reason: 'Interest owed was paid off, using cash beyond the expense recorded.' },
	{ id: 'taxes-payable', label: 'Add increase in income taxes payable', amount: 10000, reason: 'Taxes were expensed but not yet paid — the unpaid amount held cash back.' }
];
export function waterfallTotal(onIds: Set<string>): number {
	return round(
		netIncome + waterfallSteps.filter((s) => onIds.has(s.id)).reduce((sum, s) => sum + s.amount, 0)
	);
}
export const operatingCashFlow = waterfallTotal(new Set(waterfallSteps.map((s) => s.id))); // 20,000

/* ---------- Direct method ---------- */

export const salesRevenue = 590000;
export const costOfGoodsSold = 300000;
export const otherOperatingExpenses = 216000;
export const interestExpense = 7000;
export const incomeTaxExpense = 15000;
export const increaseInReceivables = 20000;
export const increaseInInventory = 14000;
export const decreaseInPayables = 5000;
export const increaseInPrepaid = 2000;
export const decreaseInInterestPayable = 1000;
export const increaseInTaxesPayable = 10000;

export const cashFromCustomers = round(salesRevenue - increaseInReceivables); // 570,000
export const cashForMerchandise = round(costOfGoodsSold + increaseInInventory + decreaseInPayables); // 319,000
export const cashForOperatingExpenses = round(otherOperatingExpenses + increaseInPrepaid); // 218,000
export const cashForInterest = round(interestExpense + decreaseInInterestPayable); // 8,000
export const cashForTaxes = round(incomeTaxExpense - increaseInTaxesPayable); // 5,000
export const directMethodTotal = round(
	cashFromCustomers - cashForMerchandise - cashForOperatingExpenses - cashForInterest - cashForTaxes
); // 20,000
export const directLines = [
	{ label: 'Cash received from customers', builtFrom: `Sales ${fmt(salesRevenue, { dollar: true })} − increase in receivables ${fmt(increaseInReceivables, { dollar: true })}`, amount: cashFromCustomers },
	{ label: 'Cash paid for merchandise', builtFrom: `COGS ${fmt(costOfGoodsSold, { dollar: true })} + inventory increase ${fmt(increaseInInventory, { dollar: true })} + payables decrease ${fmt(decreaseInPayables, { dollar: true })}`, amount: -cashForMerchandise },
	{ label: 'Cash paid for wages and other operating expenses', builtFrom: `${fmt(otherOperatingExpenses, { dollar: true })} + prepaid increase ${fmt(increaseInPrepaid, { dollar: true })}`, amount: -cashForOperatingExpenses },
	{ label: 'Cash paid for interest', builtFrom: `${fmt(interestExpense, { dollar: true })} + interest payable decrease ${fmt(decreaseInInterestPayable, { dollar: true })}`, amount: -cashForInterest },
	{ label: 'Cash paid for taxes', builtFrom: `${fmt(incomeTaxExpense, { dollar: true })} − taxes payable increase ${fmt(increaseInTaxesPayable, { dollar: true })}`, amount: -cashForTaxes }
];

export const gainOnRetirement = 16000;
export const lossOnSalePlantAssets = 6000;
export const depreciationExpense = 24000;
export const netIncomeCheck = round(
	salesRevenue - costOfGoodsSold - otherOperatingExpenses - interestExpense - incomeTaxExpense - depreciationExpense - lossOnSalePlantAssets + gainOnRetirement
); // 38,000

/* ---------- Investing, financing, and the cash walk ---------- */

export const proceedsFromSalePlantAssets = 12000;
export const cashPaidForPlantAssets = 10000;
export const notePortionOfPlantAssetPurchase = 60000;
export const costOfPlantAssetsPurchased = round(cashPaidForPlantAssets + notePortionOfPlantAssetPurchase); // 70,000
export const netCashFromInvesting = round(proceedsFromSalePlantAssets - cashPaidForPlantAssets); // 2,000

export const cashFromStockIssuance = 15000;
export const cashPaidToRetireNotes = 18000;
export const cashDividendsPaid = 14000;
export const netCashFromFinancing = round(cashFromStockIssuance - cashPaidToRetireNotes - cashDividendsPaid); // (17,000)

export const netChangeInCash = round(operatingCashFlow + netCashFromInvesting + netCashFromFinancing); // 5,000
export const beginningCash = 12000;
export const endingCash = round(beginningCash + netChangeInCash); // 17,000

export const capitalExpenditures = cashPaidForPlantAssets;
export const freeCashFlow = round(operatingCashFlow - capitalExpenditures); // 10,000
export const averageTotalAssetsForCashFlow = 200000;
export const cashFlowOnTotalAssets = round((operatingCashFlow / averageTotalAssetsForCashFlow) * 1000) / 1000; // 0.10

/* ---------- Balance sheet change reader: a generic function ---------- */

export type ChangeAccountKind = 'asset' | 'liability';
export interface ChangeAccount {
	id: string;
	label: string;
	kind: ChangeAccountKind;
}
export const changeAccounts: ChangeAccount[] = [
	{ id: 'ar', label: 'Accounts receivable', kind: 'asset' },
	{ id: 'inventory', label: 'Merchandise inventory', kind: 'asset' },
	{ id: 'ap', label: 'Accounts payable', kind: 'liability' },
	{ id: 'taxes-payable', label: 'Income taxes payable', kind: 'liability' }
];
export function cashEffectOfChange(kind: ChangeAccountKind, direction: 'increase' | 'decrease', amount = 1000): number {
	const sign = kind === 'asset' ? -1 : 1;
	const directionSign = direction === 'increase' ? 1 : -1;
	return sign * directionSign * amount;
}

/* ---------- Genesis Company: a small set of real entries behind the facts ---------- */

const genesisCompany: Company = {
	name: 'Genesis Company',
	accounts: ALL_ACCOUNTS,
	retainedEarningsAcct: '318',
	dividendsAcct: '319',
	contraOf: { '142': '141' }
};
const genesisEntries: Entry[] = [
	{
		id: 'open',
		date: '2025-01-01',
		lines: [
			{ acct: '101', dr: 100000 },
			{ acct: '141', dr: 30000 },
			{ acct: '142', cr: 12000 },
			{ acct: '204', cr: 34000 },
			{ acct: '307', cr: 50000 },
			{ acct: '318', cr: 34000 }
		],
		explanation: 'Starting balances, including the plant asset later sold and the note later retired'
	},
	{
		id: 'depreciation',
		date: '2025-12-31',
		lines: [{ acct: '601', dr: depreciationExpense }, { acct: '142', cr: depreciationExpense }],
		explanation: 'Record depreciation expense'
	},
	{
		id: 'disposal',
		date: '2025-06-01',
		lines: [
			{ acct: '101', dr: proceedsFromSalePlantAssets },
			{ acct: '142', dr: 12000 },
			{ acct: '602', dr: lossOnSalePlantAssets },
			{ acct: '141', cr: 30000 }
		],
		explanation: 'Sell plant assets (cost 30,000, accumulated depreciation 12,000) for 12,000 cash'
	},
	{
		id: 'retirement',
		date: '2025-07-01',
		lines: [
			{ acct: '204', dr: 34000 },
			{ acct: '101', cr: cashPaidToRetireNotes },
			{ acct: '505', cr: gainOnRetirement }
		],
		explanation: 'Retire notes with a 34,000 carrying value for 18,000 cash'
	},
	{
		id: 'purchase',
		date: '2025-08-01',
		lines: [
			{ acct: '141', dr: costOfPlantAssetsPurchased },
			{ acct: '101', cr: cashPaidForPlantAssets },
			{ acct: '204', cr: notePortionOfPlantAssetPurchase }
		],
		explanation: 'Buy plant assets costing 70,000: 10,000 cash and a 60,000 note'
	},
	{
		id: 'issue-stock',
		date: '2025-09-01',
		lines: [{ acct: '101', dr: cashFromStockIssuance }, { acct: '307', cr: cashFromStockIssuance }],
		explanation: 'Issue common stock for 15,000 cash'
	},
	{
		id: 'dividends',
		date: '2025-12-15',
		lines: [{ acct: '318', dr: cashDividendsPaid }, { acct: '101', cr: cashDividendsPaid }],
		explanation: 'Pay 14,000 cash dividends'
	},
	{
		id: 'close',
		date: '2025-12-31',
		lines: [
			{ acct: '505', dr: gainOnRetirement },
			{ acct: '318', dr: round(depreciationExpense + lossOnSalePlantAssets - gainOnRetirement) },
			{ acct: '601', cr: depreciationExpense },
			{ acct: '602', cr: lossOnSalePlantAssets }
		],
		explanation: 'Close the year\'s gain, depreciation, and loss into retained earnings'
	}
];
const genesisBalances = post(ALL_ACCOUNTS, genesisEntries);
export const genesis = { company: genesisCompany, entries: genesisEntries, balances: genesisBalances };

/* ---------- Classification drill (C1) ---------- */

const CASH_FLOW_CATEGORIES = [
	{ id: 'operating', label: 'Operating' },
	{ id: 'investing', label: 'Investing' },
	{ id: 'financing', label: 'Financing' },
	{ id: 'noncash', label: 'Noncash investing and financing' }
];
export const classifications: Classification[] = [
	{ lo: 'C1', text: 'Cash collected from customers', options: CASH_FLOW_CATEGORIES, answer: 'operating', why: 'The main business.' },
	{ lo: 'C1', text: 'Interest received on a loan to another company', options: CASH_FLOW_CATEGORIES, answer: 'operating', why: 'Under U.S. GAAP, interest and dividends received are operating.' },
	{ lo: 'C1', text: 'Interest paid on a bank loan', options: CASH_FLOW_CATEGORIES, answer: 'operating', why: 'Interest paid is operating; the principal is financing.' },
	{ lo: 'C1', text: 'Income taxes paid', options: CASH_FLOW_CATEGORIES, answer: 'operating', why: 'A cost of running the business.' },
	{ lo: 'C1', text: 'Purchase of equipment for cash', options: CASH_FLOW_CATEGORIES, answer: 'investing', why: 'Buying a long-term asset.' },
	{ lo: 'C1', text: 'Sale of a long-term investment', options: CASH_FLOW_CATEGORIES, answer: 'investing', why: 'Selling a long-term asset.' },
	{ lo: 'C1', text: 'Lending money to another company', options: CASH_FLOW_CATEGORIES, answer: 'investing', why: 'A loan made is an investment.' },
	{ lo: 'C1', text: 'Collecting the principal of that loan', options: CASH_FLOW_CATEGORIES, answer: 'investing', why: 'Getting the investment back.' },
	{ lo: 'C1', text: 'Issuing bonds for cash', options: CASH_FLOW_CATEGORIES, answer: 'financing', why: 'Raising money from lenders.' },
	{ lo: 'C1', text: 'Buying treasury stock', options: CASH_FLOW_CATEGORIES, answer: 'financing', why: 'Paying owners.' },
	{ lo: 'C1', text: 'Paying dividends', options: CASH_FLOW_CATEGORIES, answer: 'financing', why: 'Paying owners.' },
	{ lo: 'C1', text: 'Buying land by signing a note', options: CASH_FLOW_CATEGORIES, answer: 'noncash', why: 'No cash moved; disclose it.' },
	{ lo: 'C1', text: 'Converting bonds into common stock', options: CASH_FLOW_CATEGORIES, answer: 'noncash', why: 'No cash moved; disclose it.' }
];

/* ---------- Statement-line drill (P1/P3): section + direction, not debit/credit ---------- */

const STATEMENT_LINE_OPTIONS = [
	{ id: 'op-add', label: 'Operating, add' },
	{ id: 'op-sub', label: 'Operating, subtract' },
	{ id: 'inv-add', label: 'Investing, add' },
	{ id: 'inv-sub', label: 'Investing, subtract' },
	{ id: 'fin-add', label: 'Financing, add' },
	{ id: 'fin-sub', label: 'Financing, subtract' },
	{ id: 'noncash', label: 'Noncash schedule' }
];
export const statementLineItems: Classification[] = [
	{ lo: 'P1', text: 'Depreciation expense 24,000', options: STATEMENT_LINE_OPTIONS, answer: 'op-add', why: 'A noncash expense — add it back to net income.' },
	{ lo: 'P1', text: 'Loss on sale of plant assets 6,000', options: STATEMENT_LINE_OPTIONS, answer: 'op-add', why: 'Not a cash outflow — add it back.' },
	{ lo: 'P1', text: 'Gain on retirement of notes 16,000', options: STATEMENT_LINE_OPTIONS, answer: 'op-sub', why: 'Remove a nonoperating gain from operating; its cash is in financing.' },
	{ lo: 'A1', text: 'Accounts receivable rose 20,000', options: STATEMENT_LINE_OPTIONS, answer: 'op-sub', why: 'Asset up — subtract.' },
	{ lo: 'A1', text: 'Merchandise inventory rose 14,000', options: STATEMENT_LINE_OPTIONS, answer: 'op-sub', why: 'Asset up — subtract.' },
	{ lo: 'A1', text: 'Prepaid expenses rose 2,000', options: STATEMENT_LINE_OPTIONS, answer: 'op-sub', why: 'Asset up — subtract.' },
	{ lo: 'A1', text: 'Accounts payable fell 5,000', options: STATEMENT_LINE_OPTIONS, answer: 'op-sub', why: 'Liability down — subtract.' },
	{ lo: 'A1', text: 'Interest payable fell 1,000', options: STATEMENT_LINE_OPTIONS, answer: 'op-sub', why: 'Liability down — subtract.' },
	{ lo: 'A1', text: 'Income taxes payable rose 10,000', options: STATEMENT_LINE_OPTIONS, answer: 'op-add', why: 'Liability up — add.' },
	{ lo: 'P3', text: 'Sold plant assets for 12,000 cash', options: STATEMENT_LINE_OPTIONS, answer: 'inv-add', why: 'The real cash received, not the gain or loss.' },
	{ lo: 'P3', text: "Bought plant assets: the $10,000 paid in cash", options: STATEMENT_LINE_OPTIONS, answer: 'inv-sub', why: 'The cash portion of the purchase.' },
	{ lo: 'P3', text: "Bought plant assets: the $60,000 financed by a note", options: STATEMENT_LINE_OPTIONS, answer: 'noncash', why: 'No cash moved for this part — disclose it separately.' },
	{ lo: 'P3', text: 'Issued common stock for 15,000 cash', options: STATEMENT_LINE_OPTIONS, answer: 'fin-add', why: 'Raising money from owners.' },
	{ lo: 'P3', text: 'Paid 18,000 cash to retire notes', options: STATEMENT_LINE_OPTIONS, answer: 'fin-sub', why: 'Repaying a lender the principal.' },
	{ lo: 'P3', text: 'Paid 14,000 cash dividends', options: STATEMENT_LINE_OPTIONS, answer: 'fin-sub', why: 'Paying owners.' }
];

/* ---------- Recall rules ---------- */

export const rules: Rule[] = [
	{
		lo: 'P1',
		prompt: 'Under the indirect method, a noncash expense like depreciation is:',
		options: [{ id: 'a', label: 'Added back to net income' }, { id: 'b', label: 'Subtracted from net income' }],
		answer: 'a',
		why: 'It reduced net income without using cash, so operating cash flow adds it back.'
	},
	{
		lo: 'A1',
		prompt: 'A current asset that increased during the year:',
		options: [{ id: 'a', label: 'Used cash — subtract it' }, { id: 'b', label: 'Provided cash — add it' }],
		answer: 'a',
		why: 'More was tied up in that asset by year end, which drew cash away from the operating total.'
	},
	{
		lo: 'C1',
		prompt: 'Interest paid, interest received, and dividends received are classified as:',
		options: [{ id: 'a', label: 'Operating' }, { id: 'b', label: 'Financing' }],
		answer: 'a',
		why: 'U.S. GAAP treats all three as operating. Only dividends paid are financing.'
	},
	{
		lo: 'P3',
		prompt: 'The proceeds from selling an asset are reported in investing at:',
		options: [{ id: 'a', label: 'The cash actually received' }, { id: 'b', label: 'The gain or loss on the sale' }],
		answer: 'a',
		why: 'Investing shows real cash; any gain or loss is removed from operating instead.'
	},
	{
		lo: 'C1',
		prompt: 'A noncash investing and financing activity, like buying land with a note, is:',
		options: [{ id: 'a', label: 'Disclosed, not included in any of the three totals' }, { id: 'b', label: 'Split between investing and financing' }],
		answer: 'a',
		why: 'No cash moved, so nothing belongs in the statement itself — only in a separate disclosure.'
	}
];

/* ---------- Formulas ---------- */

export const formulas: Formula[] = [
	{
		lo: 'P1',
		formula: 'Operating cash flow (indirect) = Net income + Non-cash expenses + Losses − Gains − Increases in current assets + Increases in current liabilities',
		worked: `${fmt(netIncome, { dollar: true })} + ${fmt(depreciationExpense, { dollar: true })} + ${fmt(lossOnSalePlantAssets, { dollar: true })} − ${fmt(gainOnRetirement, { dollar: true })} − ${fmt(36000, { dollar: true })} + ${fmt(4000, { dollar: true })} = ${fmt(operatingCashFlow, { dollar: true })}`
	},
	{
		lo: 'P2',
		formula: 'Cash received from customers = Sales − Increase in accounts receivable',
		worked: `${fmt(salesRevenue, { dollar: true })} − ${fmt(increaseInReceivables, { dollar: true })} = ${fmt(cashFromCustomers, { dollar: true })}`
	},
	{
		lo: 'P3',
		formula: 'Net change in cash = Operating + Investing + Financing',
		worked: `${fmt(operatingCashFlow, { dollar: true })} + ${fmt(netCashFromInvesting, { dollar: true })} − ${fmt(Math.abs(netCashFromFinancing), { dollar: true })} = ${fmt(netChangeInCash, { dollar: true })}`
	},
	{
		lo: 'P3',
		formula: 'Ending cash = Beginning cash + Net change',
		worked: `${fmt(beginningCash, { dollar: true })} + ${fmt(netChangeInCash, { dollar: true })} = ${fmt(endingCash, { dollar: true })}`
	},
	{
		lo: 'A2',
		formula: 'Free cash flow = Operating cash flow − Capital expenditures',
		worked: `${fmt(operatingCashFlow, { dollar: true })} − ${fmt(capitalExpenditures, { dollar: true })} = ${fmt(freeCashFlow, { dollar: true })}`
	},
	{
		lo: 'A2',
		formula: 'Cash flow on total assets = Operating cash flow ÷ Average total assets',
		worked: `${fmt(operatingCashFlow, { dollar: true })} ÷ ${fmt(averageTotalAssetsForCashFlow, { dollar: true })} = ${(cashFlowOnTotalAssets * 100).toFixed(1)}%`
	}
];

/* ---------- Lessons (Learn) and instruments (Lab) ---------- */

export const lessons: LessonMeta[] = [
	{ id: 'three-activities', title: 'Sorted by why the cash moved', lo: 'C1' },
	{ id: 'indirect-method', title: 'From net income to cash', lo: 'P1' },
	{ id: 'direct-vs-indirect', title: 'Two roads, one number', lo: 'P2' },
	{ id: 'balance-sheet-change-reader', title: 'Up or down, the rule never changes', lo: 'A1' },
	{ id: 'investing-and-financing', title: 'The other two-thirds of the statement', lo: 'P3' },
	{ id: 'free-cash-flow', title: 'What is left after staying in business', lo: 'A2' }
];

export const instruments: InstrumentMeta[] = [
	{
		id: 'indirect-method-waterfall',
		title: 'Indirect-method waterfall',
		lo: 'P1',
		instruction: 'Switch on each adjustment and walk net income down to cash from operating activities.',
		resultLine: `Net cash provided by operating activities ${fmt(operatingCashFlow, { dollar: true })}`,
		noticed: 'Every current asset that went up pulled cash down, and every current liability that went up held cash back from leaving.'
	},
	{
		id: 'direct-vs-indirect',
		title: 'Direct versus indirect',
		lo: 'P2',
		instruction: 'Flip between the direct and indirect methods and watch both land on $20,000.',
		resultLine: `Direct ${fmt(directMethodTotal, { dollar: true })} = Indirect ${fmt(operatingCashFlow, { dollar: true })}`,
		noticed: 'Depreciation, the loss, and the gain never appear in the direct method. They were not cash, so there is nothing to undo.'
	},
	{
		id: 'balance-sheet-change-reader',
		title: 'Balance sheet change reader',
		lo: 'A1',
		instruction: 'Nudge a current asset or liability up or down and watch the sign of its adjustment flip.',
		resultLine: 'Asset up → subtract · Liability up → add',
		noticed: 'Asset up used cash; liability up saved cash. The rule is the same for every account on the list.'
	}
];

/* ---------- Chapter export, anchors, invariants ---------- */

export const meta = {
	number: 12,
	slug: 'cash-flows',
	title: 'Reporting Cash Flows',
	part: 'financial' as const,
	status: 'live' as const,
	summary: 'From net income to cash, one adjustment at a time.',
	instrument: 'Indirect-method waterfall',
	oneLine:
		'Profit and cash are not the same number. This statement walks from one to the other and sorts every cash movement into operating, investing, or financing.',
	headline: `Net income **${fmt(netIncome, { dollar: true })}**. Cash from operations **${fmt(operatingCashFlow, { dollar: true })}**.`
};

export const chapter: ChapterContent = {
	meta,
	objectives,
	terms,
	quickChecks,
	accounts,
	classifications,
	secondaryClassifications: statementLineItems,
	rules,
	formulas,
	lessons,
	instruments,
	journalPatterns: genesisEntries.filter((e) => e.id !== 'open' && e.id !== 'close'),
	ledgers: [{ label: 'Genesis Company — the real entries behind the statement', company: genesisCompany, entries: genesisEntries }],
	anchors: (): Anchor[] => [
		{ label: 'Net income', expected: 38000, actual: netIncomeCheck },
		{ label: 'Net cash from operating activities (indirect)', expected: 20000, actual: operatingCashFlow },
		{ label: 'Net cash from operating activities (direct)', expected: 20000, actual: directMethodTotal },
		{ label: 'Net cash from investing activities', expected: 2000, actual: netCashFromInvesting },
		{ label: 'Net cash used by financing activities', expected: -17000, actual: netCashFromFinancing },
		{ label: 'Net increase in cash', expected: 5000, actual: netChangeInCash },
		{ label: 'Ending cash', expected: 17000, actual: endingCash },
		{ label: 'Cash received from customers', expected: 570000, actual: cashFromCustomers },
		{ label: 'Cash paid for merchandise', expected: -319000, actual: -cashForMerchandise },
		{ label: 'Cash paid for operating expenses', expected: -218000, actual: -cashForOperatingExpenses },
		{ label: 'Cash paid for interest', expected: -8000, actual: -cashForInterest },
		{ label: 'Cash paid for taxes', expected: -5000, actual: -cashForTaxes },
		{ label: 'Free cash flow', expected: 10000, actual: freeCashFlow },
		{ label: 'Cash flow on total assets', expected: 0.1, actual: cashFlowOnTotalAssets }
	],
	invariants: () => {
		if (classifications.length !== 13)
			throw new Error(`Chapter 12 should have 13 classification items, has ${classifications.length}`);
		if (statementLineItems.length !== 15)
			throw new Error(`Chapter 12 should have 15 statement-line items, has ${statementLineItems.length}`);
		for (const c of [...classifications, ...statementLineItems]) {
			if (!c.options.some((o) => o.id === c.answer))
				throw new Error(`Classification answer not in options: ${c.text}`);
		}
		for (const r of rules) {
			if (!r.options.some((o) => o.id === r.answer))
				throw new Error(`Rule answer not in options: ${r.prompt}`);
		}
		if (Math.abs(directMethodTotal - operatingCashFlow) > 0.01)
			throw new Error('Direct and indirect methods should reach the same operating cash flow');
		if (Math.abs(waterfallTotal(new Set()) - netIncome) > 0.01)
			throw new Error('With every adjustment off, the waterfall should show net income unchanged');
	}
};
