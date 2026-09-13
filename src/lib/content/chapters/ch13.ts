import { fmt, round } from '$lib/ledger';
import type {
	Anchor,
	ChapterContent,
	Classification,
	ComputationItem,
	Formula,
	InstrumentMeta,
	LessonMeta,
	Objective,
	QuickCheck,
	Rule,
	Term
} from '../types';

/**
 * Every figure is [built] — a two-year company constructed for this site,
 * not one of the book's real-company examples. The brief's own "before
 * building" note says the physical text uses real companies for its
 * examples and asks to confirm the book's four building blocks and which
 * ratio sits in which block, which needs the physical text (not available
 * here). Built the classification drill on the brief's own stated
 * placements; hand-verified all 22 formula answers and both years'
 * balance sheets (600,000 = 600,000, 500,000 = 500,000) and the retained
 * earnings roll-forward (100,000 + 60,000 − 10,000 = 150,000) exactly. See
 * the final report for this standing caveat.
 *
 * This chapter's own "entry drill" has no journal entries at all — every
 * prompt asks the student to compute a number. Built a small new
 * ComputationDrill/ComputationCard pair (mirroring EntryDrill/EntryCard's
 * reveal pattern) rather than forcing 22 numeric prompts through the
 * site's debit/credit journalizer, which does not apply here. An
 * independent decision, not a book number.
 */
export const objectives: Objective[] = [
	{
		code: 'C1',
		kind: 'conceptual',
		short: 'Building blocks',
		text: 'Identify the standards for comparison and the four building blocks of financial statement analysis.'
	},
	{
		code: 'P1',
		kind: 'procedural',
		short: 'Horizontal and vertical',
		text: 'Compute dollar and percent changes across two years, and prepare common-size statements.'
	},
	{
		code: 'A1',
		kind: 'analytical',
		short: 'Liquidity and efficiency',
		text: 'Compute and interpret liquidity and efficiency ratios, and identify which two statement lines each is built from.'
	},
	{
		code: 'A2',
		kind: 'analytical',
		short: 'Solvency',
		text: "Compute and interpret solvency ratios."
	},
	{
		code: 'A3',
		kind: 'analytical',
		short: 'Profitability',
		text: 'Compute and interpret profitability ratios, and decompose return on assets into profit margin and turnover.'
	},
	{
		code: 'A4',
		kind: 'analytical',
		short: 'Market prospects',
		text: 'Compute and interpret market-prospect ratios.'
	}
];

export const terms: Term[] = [
	{ term: 'Financial statement analysis', lo: 'C1', definition: 'Evaluating the relevance, safety, and profitability of a business using its financial statements.' },
	{ term: 'General-purpose financial statements', lo: 'C1', definition: 'Statements distributed to a wide range of external users, not tailored to one reader.' },
	{ term: 'Building blocks of analysis', lo: 'C1', definition: 'The four aims of statement analysis: liquidity and efficiency, solvency, profitability, and market prospects.' },
	{ term: 'Liquidity and efficiency', lo: 'A1', definition: "A company's ability to meet short-term obligations and to use its assets productively." },
	{ term: 'Solvency', lo: 'A2', definition: "A company's ability to meet long-term obligations and survive over a long period." },
	{ term: 'Profitability', lo: 'A3', definition: 'The ability to earn a satisfactory income.' },
	{ term: 'Market prospects', lo: 'A4', definition: 'A company\'s prospects as seen through the price and returns of its stock.' },
	{ term: 'Standards for comparison', lo: 'C1', definition: "A benchmark for judging a ratio: the company's own past (intracompany), a competitor, or an industry guideline." },
	{ term: 'Horizontal analysis', lo: 'P1', definition: "Comparing a company's financial condition and performance across two or more periods." },
	{ term: 'Comparative financial statements', lo: 'P1', definition: 'Statements showing two or more periods side by side, the basis for horizontal analysis.' },
	{ term: 'Trend analysis', lo: 'P1', definition: 'Horizontal analysis extended across several periods, expressed as an index against a base period.' },
	{ term: 'Vertical analysis', lo: 'P1', definition: 'Comparing each line of a single period\'s statement to a base amount within that same statement.' },
	{ term: 'Common-size financial statements', lo: 'P1', definition: 'Statements where every amount is expressed as a percent of a base — net sales for the income statement, total assets for the balance sheet.' },
	{ term: 'Ratio analysis', lo: 'A1', definition: 'Expressing the mathematical relation between two financial statement amounts.' },
	{ term: 'Working capital', lo: 'A1', definition: 'Current assets minus current liabilities.' },
	{ term: 'Equity ratio', lo: 'A2', definition: 'Total equity divided by total assets, showing how much of the assets owners financed.' },
	{ term: 'Financial leverage', lo: 'A2', definition: 'Financing assets with liabilities in addition to equity, magnifying both gains and losses to owners.' },
	{ term: 'Analysis report', lo: 'C1', definition: 'A written report communicating the results of a financial statement analysis.' },
	{ term: 'Discontinued segments', lo: 'C1', definition: '[book?] — check this edition’s exact terminology. Operations a company has sold or is ending, reported separately from continuing operations.' },
	{ term: 'Other comprehensive income', lo: 'C1', definition: '[book?] — check this edition’s exact terminology. Certain gains and losses excluded from net income but included in total equity.' }
];

export const quickChecks: QuickCheck[] = [
	{
		lo: 'C1',
		q: 'Comparing this year\'s ratio to last year\'s, for the same company, is:',
		options: ['An intracompany standard', 'An industry standard', 'A competitor standard'],
		answer: 0,
		why: 'Intracompany comparison uses the company\'s own history as the benchmark.'
	},
	{
		lo: 'P1',
		q: 'Vertical analysis expresses each balance sheet line as a percent of:',
		options: ['Net sales', 'Total assets', 'Total equity'],
		answer: 1,
		why: 'The balance sheet\'s common-size base is total assets; the income statement\'s is net sales.'
	},
	{
		lo: 'A1',
		q: 'The acid-test ratio differs from the current ratio by excluding:',
		options: ['Accounts receivable', 'Inventory and prepaid expenses', 'Cash'],
		answer: 1,
		why: 'Acid-test keeps only the quickest assets — inventory and prepaids are excluded because they are not near-cash.'
	},
	{
		lo: 'A2',
		q: 'A higher debt-to-equity ratio means:',
		options: ['More financing from creditors relative to owners', 'More financing from owners relative to creditors', 'No change in financing mix'],
		answer: 0,
		why: 'Debt-to-equity rises as creditor financing grows relative to owner financing.'
	},
	{
		lo: 'A3',
		q: 'Return on total assets equals profit margin multiplied by:',
		options: ['The current ratio', 'Total asset turnover', 'The debt ratio'],
		answer: 1,
		why: 'A dollar of assets earns a return by generating sales (turnover) at a given profit rate (margin) — the two multiply to give the return.'
	},
	{
		lo: 'A4',
		q: 'Dividend yield divides annual cash dividends per share by:',
		options: ['Earnings per share', 'Market price per share', 'Book value per share'],
		answer: 1,
		why: 'Yield measures the cash return relative to what the stock actually costs to buy — its market price.'
	}
];

/* ---------- The built company: two years, income statement and balance sheet ---------- */

export interface StatementLine {
	label: string;
	y2026: number;
	y2025: number;
}
export const incomeStatementLines: StatementLine[] = [
	{ label: 'Net sales', y2026: 600000, y2025: 500000 },
	{ label: 'Cost of goods sold', y2026: 360000, y2025: 290000 },
	{ label: 'Gross profit', y2026: 240000, y2025: 210000 },
	{ label: 'Operating expenses', y2026: 150000, y2025: 140000 },
	{ label: 'Income from operations', y2026: 90000, y2025: 70000 },
	{ label: 'Interest expense', y2026: 10000, y2025: 10000 },
	{ label: 'Income before taxes', y2026: 80000, y2025: 60000 },
	{ label: 'Income tax expense', y2026: 20000, y2025: 15000 },
	{ label: 'Net income', y2026: 60000, y2025: 45000 }
];
export const balanceSheetLines: StatementLine[] = [
	{ label: 'Cash', y2026: 40000, y2025: 30000 },
	{ label: 'Short-term investments', y2026: 10000, y2025: 10000 },
	{ label: 'Accounts receivable', y2026: 70000, y2025: 50000 },
	{ label: 'Merchandise inventory', y2026: 90000, y2025: 70000 },
	{ label: 'Prepaid expenses', y2026: 10000, y2025: 10000 },
	{ label: 'Total current assets', y2026: 220000, y2025: 170000 },
	{ label: 'Plant assets, net', y2026: 380000, y2025: 330000 },
	{ label: 'Total assets', y2026: 600000, y2025: 500000 },
	{ label: 'Current liabilities', y2026: 110000, y2025: 80000 },
	{ label: 'Long-term debt', y2026: 140000, y2025: 120000 },
	{ label: 'Total liabilities', y2026: 250000, y2025: 200000 },
	{ label: 'Common stock, $10 par, 20,000 shares', y2026: 200000, y2025: 200000 },
	{ label: 'Retained earnings', y2026: 150000, y2025: 100000 },
	{ label: 'Total equity', y2026: 350000, y2025: 300000 },
	{ label: 'Total liabilities and equity', y2026: 600000, y2025: 500000 }
];
export const dividendsPaid2026 = 10000;
export const dividendPerShare2026 = 0.5;
export const marketPricePerShare = 45;
export const sharesOutstanding = 20000;

/** Round `n` to `decimals` places — the ledger's `round()` is fixed at 2 decimals, which does not fit every ratio here (some print at 1 decimal, some at 2). */
function roundTo(n: number, decimals: number): number {
	const f = Math.pow(10, decimals);
	return Math.round(n * f) / f;
}
export function dollarChange(line: StatementLine): number {
	return round(line.y2026 - line.y2025);
}
export function percentChange(line: StatementLine): number | null {
	if (line.y2025 === 0) return null;
	return roundTo((dollarChange(line) / line.y2025) * 100, 1);
}
export function commonSize(line: StatementLine, base2026: number, base2025: number): { pct2026: number; pct2025: number } {
	return {
		pct2026: roundTo((line.y2026 / base2026) * 100, 1),
		pct2025: roundTo((line.y2025 / base2025) * 100, 1)
	};
}
const netSales2026 = incomeStatementLines[0].y2026;
const netSales2025 = incomeStatementLines[0].y2025;
const totalAssets2026 = balanceSheetLines.find((l) => l.label === 'Total assets')!.y2026;
const totalAssets2025 = balanceSheetLines.find((l) => l.label === 'Total assets')!.y2025;
export function incomeStatementCommonSize(line: StatementLine) {
	return commonSize(line, netSales2026, netSales2025);
}
export function balanceSheetCommonSize(line: StatementLine) {
	return commonSize(line, totalAssets2026, totalAssets2025);
}
export const highlightIncome: Record<'dollars' | 'horizontal' | 'vertical', string> = {
	dollars: 'Net income',
	horizontal: 'Cost of goods sold',
	vertical: 'Cost of goods sold'
};
export const highlightBalance: Record<'dollars' | 'horizontal' | 'vertical', string> = {
	dollars: 'Total assets',
	horizontal: 'Accounts receivable',
	vertical: 'Accounts receivable'
};

/* ---------- Ratio formulas: every figure the entry drill and Reference need ---------- */

function lineOf(lines: StatementLine[], label: string): StatementLine {
	const l = lines.find((x) => x.label === label);
	if (!l) throw new Error(`Unknown statement line: ${label}`);
	return l;
}
const netSales = netSales2026;
const cogs = lineOf(incomeStatementLines, 'Cost of goods sold').y2026;
const grossProfit = lineOf(incomeStatementLines, 'Gross profit').y2026;
const netIncome = lineOf(incomeStatementLines, 'Net income').y2026;
const interestExpense = lineOf(incomeStatementLines, 'Interest expense').y2026;
const incomeBeforeTaxes = lineOf(incomeStatementLines, 'Income before taxes').y2026;
const incomeBeforeInterestAndTaxes = round(incomeBeforeTaxes + interestExpense);

const currentAssets = lineOf(balanceSheetLines, 'Total current assets').y2026;
const currentLiabilities = lineOf(balanceSheetLines, 'Current liabilities').y2026;
const cash = lineOf(balanceSheetLines, 'Cash').y2026;
const shortTermInvestments = lineOf(balanceSheetLines, 'Short-term investments').y2026;
const accountsReceivable2026 = lineOf(balanceSheetLines, 'Accounts receivable').y2026;
const accountsReceivable2025 = lineOf(balanceSheetLines, 'Accounts receivable').y2025;
const inventory2026 = lineOf(balanceSheetLines, 'Merchandise inventory').y2026;
const inventory2025 = lineOf(balanceSheetLines, 'Merchandise inventory').y2025;
const totalLiabilities = lineOf(balanceSheetLines, 'Total liabilities').y2026;
const totalEquity2026 = lineOf(balanceSheetLines, 'Total equity').y2026;
const totalEquity2025 = lineOf(balanceSheetLines, 'Total equity').y2025;

export const quickAssets = round(cash + shortTermInvestments + accountsReceivable2026);
export const averageAccountsReceivable = round((accountsReceivable2026 + accountsReceivable2025) / 2);
export const averageInventory = round((inventory2026 + inventory2025) / 2);
export const averageTotalAssets = round((totalAssets2026 + totalAssets2025) / 2);
export const averageCommonEquity = round((totalEquity2026 + totalEquity2025) / 2);

export const percentChangeNetSales = percentChange(lineOf(incomeStatementLines, 'Net sales'))!;
export const commonSizeCogs = incomeStatementCommonSize(lineOf(incomeStatementLines, 'Cost of goods sold')).pct2026;
export const workingCapital = round(currentAssets - currentLiabilities);
export const currentRatio = roundTo(currentAssets / currentLiabilities, 1);
export const acidTestRatio = roundTo(quickAssets / currentLiabilities, 2);
export const accountsReceivableTurnover = roundTo(netSales / averageAccountsReceivable, 1);
export const daysSalesUncollected = roundTo((accountsReceivable2026 / netSales) * 365, 1);
export const inventoryTurnover = roundTo(cogs / averageInventory, 1);
export const daysSalesInInventory = roundTo((inventory2026 / cogs) * 365, 1);
export const totalAssetTurnover = roundTo(netSales / averageTotalAssets, 2);
export const debtRatio = roundTo((totalLiabilities / totalAssets2026) * 100, 1);
export const equityRatio = roundTo((totalEquity2026 / totalAssets2026) * 100, 1);
export const debtToEquityRatio = roundTo(totalLiabilities / totalEquity2026, 2);
export const timesInterestEarned = roundTo(incomeBeforeInterestAndTaxes / interestExpense, 1);
export const profitMargin = roundTo((netIncome / netSales) * 100, 1);
export const grossMarginRatio = roundTo((grossProfit / netSales) * 100, 1);
const grossProfit2025 = lineOf(incomeStatementLines, 'Gross profit').y2025;
export const grossMarginRatio2025 = roundTo((grossProfit2025 / netSales2025) * 100, 1);
export const returnOnTotalAssets = roundTo((netIncome / averageTotalAssets) * 100, 1);
export const returnOnCommonEquity = roundTo((netIncome / averageCommonEquity) * 100, 1);
export const earningsPerShare = roundTo(netIncome / sharesOutstanding, 2);
export const bookValuePerShare = roundTo(totalEquity2026 / sharesOutstanding, 2);
export const priceEarningsRatio = roundTo(marketPricePerShare / earningsPerShare, 1);
export const dividendYield = roundTo((dividendPerShare2026 / marketPricePerShare) * 100, 1);

/* ---------- Ratio builder: which two lines is each ratio built from? ---------- */

export interface RatioBuilderItem {
	id: string;
	label: string;
	numeratorCorrect: string;
	numeratorOptions: string[];
	numeratorValue: number;
	denominatorCorrect: string;
	denominatorOptions: string[];
	denominatorValue: number;
	result: number;
	resultUnit: '%' | 'times' | '';
}
export const ratioBuilderItems: RatioBuilderItem[] = [
	{
		id: 'current',
		label: 'Current ratio',
		numeratorCorrect: 'Current assets',
		numeratorOptions: ['Current assets', 'Total assets', 'Cash', 'Quick assets'],
		numeratorValue: currentAssets,
		denominatorCorrect: 'Current liabilities',
		denominatorOptions: ['Current liabilities', 'Total liabilities', 'Total equity', 'Long-term debt'],
		denominatorValue: currentLiabilities,
		result: currentRatio,
		resultUnit: ''
	},
	{
		id: 'acid-test',
		label: 'Acid-test ratio',
		numeratorCorrect: 'Quick assets (cash + short-term investments + receivables)',
		numeratorOptions: ['Quick assets (cash + short-term investments + receivables)', 'Current assets', 'Cash only', 'Total assets'],
		numeratorValue: quickAssets,
		denominatorCorrect: 'Current liabilities',
		denominatorOptions: ['Current liabilities', 'Total liabilities', 'Total equity', 'Long-term debt'],
		denominatorValue: currentLiabilities,
		result: acidTestRatio,
		resultUnit: ''
	},
	{
		id: 'debt-ratio',
		label: 'Debt ratio',
		numeratorCorrect: 'Total liabilities',
		numeratorOptions: ['Total liabilities', 'Current liabilities', 'Total equity', 'Total assets'],
		numeratorValue: totalLiabilities,
		denominatorCorrect: 'Total assets',
		denominatorOptions: ['Total assets', 'Total equity', 'Net sales', 'Total liabilities'],
		denominatorValue: totalAssets2026,
		result: debtRatio,
		resultUnit: '%'
	},
	{
		id: 'times-interest-earned',
		label: 'Times interest earned',
		numeratorCorrect: 'Income before interest and taxes',
		numeratorOptions: ['Income before interest and taxes', 'Net income', 'Income before taxes', 'Gross profit'],
		numeratorValue: incomeBeforeInterestAndTaxes,
		denominatorCorrect: 'Interest expense',
		denominatorOptions: ['Interest expense', 'Income tax expense', 'Operating expenses', 'Total liabilities'],
		denominatorValue: interestExpense,
		result: timesInterestEarned,
		resultUnit: 'times'
	},
	{
		id: 'profit-margin',
		label: 'Profit margin',
		numeratorCorrect: 'Net income',
		numeratorOptions: ['Net income', 'Gross profit', 'Income from operations', 'Income before taxes'],
		numeratorValue: netIncome,
		denominatorCorrect: 'Net sales',
		denominatorOptions: ['Net sales', 'Total assets', 'Cost of goods sold', 'Total equity'],
		denominatorValue: netSales,
		result: profitMargin,
		resultUnit: '%'
	},
	{
		id: 'return-on-assets',
		label: 'Return on total assets',
		numeratorCorrect: 'Net income',
		numeratorOptions: ['Net income', 'Gross profit', 'Net sales', 'Income from operations'],
		numeratorValue: netIncome,
		denominatorCorrect: 'Average total assets',
		denominatorOptions: ['Average total assets', 'Total assets (ending)', 'Total equity', 'Average total equity'],
		denominatorValue: averageTotalAssets,
		result: returnOnTotalAssets,
		resultUnit: '%'
	}
];

/* ---------- Return on assets, decomposed ---------- */

export function returnOnAssetsFrom(marginPct: number, turnover: number): number {
	return roundTo(marginPct * turnover, 1);
}
export const defaultProfitMarginForRoa = profitMargin;
export const defaultTurnoverForRoa = totalAssetTurnover;

/* ---------- Classification drill ---------- */

const BUILDING_BLOCKS = [
	{ id: 'liquidity', label: 'Liquidity and efficiency' },
	{ id: 'solvency', label: 'Solvency' },
	{ id: 'profitability', label: 'Profitability' },
	{ id: 'market', label: 'Market prospects' }
];
export const classifications: Classification[] = [
	{ lo: 'A1', text: 'Current ratio', options: BUILDING_BLOCKS, answer: 'liquidity', why: 'Can current assets cover current liabilities?' },
	{ lo: 'A1', text: 'Acid-test ratio', options: BUILDING_BLOCKS, answer: 'liquidity', why: 'The same, using only quick assets.' },
	{ lo: 'A1', text: 'Accounts receivable turnover', options: BUILDING_BLOCKS, answer: 'liquidity', why: 'How fast receivables become cash.' },
	{ lo: 'A1', text: 'Inventory turnover', options: BUILDING_BLOCKS, answer: 'liquidity', why: 'How fast inventory sells.' },
	{ lo: 'A1', text: 'Days\' sales uncollected', options: BUILDING_BLOCKS, answer: 'liquidity', why: 'Receivables measured in days.' },
	{ lo: 'A1', text: 'Total asset turnover', options: BUILDING_BLOCKS, answer: 'liquidity', why: 'How hard the assets work to produce sales.' },
	{ lo: 'A2', text: 'Debt ratio', options: BUILDING_BLOCKS, answer: 'solvency', why: 'How much of the assets creditors financed.' },
	{ lo: 'A2', text: 'Equity ratio', options: BUILDING_BLOCKS, answer: 'solvency', why: 'How much owners financed.' },
	{ lo: 'A2', text: 'Debt-to-equity ratio', options: BUILDING_BLOCKS, answer: 'solvency', why: 'Creditor financing against owner financing.' },
	{ lo: 'A2', text: 'Times interest earned', options: BUILDING_BLOCKS, answer: 'solvency', why: 'Can earnings cover interest?' },
	{ lo: 'A3', text: 'Profit margin', options: BUILDING_BLOCKS, answer: 'profitability', why: 'Profit per sales dollar.' },
	{ lo: 'A3', text: 'Gross margin ratio', options: BUILDING_BLOCKS, answer: 'profitability', why: 'Gross profit per sales dollar.' },
	{ lo: 'A3', text: 'Return on total assets', options: BUILDING_BLOCKS, answer: 'profitability', why: 'Profit per dollar of assets.' },
	{ lo: 'A3', text: 'Return on common stockholders\' equity', options: BUILDING_BLOCKS, answer: 'profitability', why: 'Profit per dollar of common equity.' },
	{ lo: 'A4', text: 'Price-earnings ratio', options: BUILDING_BLOCKS, answer: 'market', why: 'What the market pays for a dollar of earnings.' },
	{ lo: 'A4', text: 'Dividend yield', options: BUILDING_BLOCKS, answer: 'market', why: 'Cash return on the share price.' }
];

/* ---------- Computation drill: 22 prompts, no journal entries ---------- */

export const computationItems: ComputationItem[] = [
	{ lo: 'P1', prompt: 'Percent change in net sales, 2025 to 2026.', answer: percentChangeNetSales, unit: '%', tolerance: 0.15, why: `${fmt(dollarChange(lineOf(incomeStatementLines, 'Net sales')), { dollar: true })} ÷ ${fmt(netSales2025, { dollar: true })} × 100 = ${percentChangeNetSales}%.` },
	{ lo: 'P1', prompt: 'Common-size cost of goods sold, 2026 (percent of net sales).', answer: commonSizeCogs, unit: '%', tolerance: 0.15, why: `${fmt(cogs, { dollar: true })} ÷ ${fmt(netSales, { dollar: true })} × 100 = ${commonSizeCogs}%.` },
	{ lo: 'A1', prompt: 'Working capital, 2026.', answer: workingCapital, unit: '$', tolerance: 1, why: `${fmt(currentAssets, { dollar: true })} − ${fmt(currentLiabilities, { dollar: true })} = ${fmt(workingCapital, { dollar: true })}.` },
	{ lo: 'A1', prompt: 'Current ratio, 2026.', answer: currentRatio, unit: '', tolerance: 0.05, why: `${fmt(currentAssets, { dollar: true })} ÷ ${fmt(currentLiabilities, { dollar: true })} = ${currentRatio}.` },
	{ lo: 'A1', prompt: 'Acid-test ratio, 2026.', answer: acidTestRatio, unit: '', tolerance: 0.05, why: `${fmt(quickAssets, { dollar: true })} ÷ ${fmt(currentLiabilities, { dollar: true })} = ${acidTestRatio}.` },
	{ lo: 'A1', prompt: 'Accounts receivable turnover, 2026.', answer: accountsReceivableTurnover, unit: 'times', tolerance: 0.1, why: `${fmt(netSales, { dollar: true })} ÷ average receivables ${fmt(averageAccountsReceivable, { dollar: true })} = ${accountsReceivableTurnover} times.` },
	{ lo: 'A1', prompt: 'Days\' sales uncollected, 2026.', answer: daysSalesUncollected, unit: 'days', tolerance: 0.2, why: `${fmt(accountsReceivable2026, { dollar: true })} ÷ ${fmt(netSales, { dollar: true })} × 365 = ${daysSalesUncollected} days.` },
	{ lo: 'A1', prompt: 'Inventory turnover, 2026.', answer: inventoryTurnover, unit: 'times', tolerance: 0.1, why: `${fmt(cogs, { dollar: true })} ÷ average inventory ${fmt(averageInventory, { dollar: true })} = ${inventoryTurnover} times.` },
	{ lo: 'A1', prompt: 'Days\' sales in inventory, 2026.', answer: daysSalesInInventory, unit: 'days', tolerance: 0.2, why: `${fmt(inventory2026, { dollar: true })} ÷ ${fmt(cogs, { dollar: true })} × 365 = ${daysSalesInInventory} days.` },
	{ lo: 'A1', prompt: 'Total asset turnover, 2026.', answer: totalAssetTurnover, unit: 'times', tolerance: 0.02, why: `${fmt(netSales, { dollar: true })} ÷ average assets ${fmt(averageTotalAssets, { dollar: true })} = ${totalAssetTurnover} times.` },
	{ lo: 'A2', prompt: 'Debt ratio, 2026.', answer: debtRatio, unit: '%', tolerance: 0.15, why: `${fmt(totalLiabilities, { dollar: true })} ÷ ${fmt(totalAssets2026, { dollar: true })} × 100 = ${debtRatio}%.` },
	{ lo: 'A2', prompt: 'Equity ratio, 2026.', answer: equityRatio, unit: '%', tolerance: 0.15, why: `${fmt(totalEquity2026, { dollar: true })} ÷ ${fmt(totalAssets2026, { dollar: true })} × 100 = ${equityRatio}%.` },
	{ lo: 'A2', prompt: 'Debt-to-equity ratio, 2026.', answer: debtToEquityRatio, unit: '', tolerance: 0.02, why: `${fmt(totalLiabilities, { dollar: true })} ÷ ${fmt(totalEquity2026, { dollar: true })} = ${debtToEquityRatio}.` },
	{ lo: 'A2', prompt: 'Times interest earned, 2026.', answer: timesInterestEarned, unit: 'times', tolerance: 0.1, why: `${fmt(incomeBeforeInterestAndTaxes, { dollar: true })} ÷ ${fmt(interestExpense, { dollar: true })} = ${timesInterestEarned} times.` },
	{ lo: 'A3', prompt: 'Profit margin, 2026.', answer: profitMargin, unit: '%', tolerance: 0.15, why: `${fmt(netIncome, { dollar: true })} ÷ ${fmt(netSales, { dollar: true })} × 100 = ${profitMargin}%.` },
	{ lo: 'A3', prompt: 'Gross margin ratio, 2026.', answer: grossMarginRatio, unit: '%', tolerance: 0.15, why: `${fmt(grossProfit, { dollar: true })} ÷ ${fmt(netSales, { dollar: true })} × 100 = ${grossMarginRatio}%.` },
	{ lo: 'A3', prompt: 'Return on total assets, 2026.', answer: returnOnTotalAssets, unit: '%', tolerance: 0.15, why: `${fmt(netIncome, { dollar: true })} ÷ average assets ${fmt(averageTotalAssets, { dollar: true })} × 100 = ${returnOnTotalAssets}%.` },
	{ lo: 'A3', prompt: 'Return on common stockholders\' equity, 2026.', answer: returnOnCommonEquity, unit: '%', tolerance: 0.15, why: `${fmt(netIncome, { dollar: true })} ÷ average equity ${fmt(averageCommonEquity, { dollar: true })} × 100 = ${returnOnCommonEquity}%.` },
	{ lo: 'A4', prompt: 'Earnings per share, 2026.', answer: earningsPerShare, unit: '$', tolerance: 0.05, why: `${fmt(netIncome, { dollar: true })} ÷ ${sharesOutstanding.toLocaleString()} shares = ${fmt(earningsPerShare, { dollar: true })}.` },
	{ lo: 'A4', prompt: 'Book value per common share, 2026.', answer: bookValuePerShare, unit: '$', tolerance: 0.1, why: `${fmt(totalEquity2026, { dollar: true })} ÷ ${sharesOutstanding.toLocaleString()} shares = ${fmt(bookValuePerShare, { dollar: true })}.` },
	{ lo: 'A4', prompt: 'Price-earnings ratio, 2026.', answer: priceEarningsRatio, unit: '', tolerance: 0.2, why: `${fmt(marketPricePerShare, { dollar: true })} ÷ ${fmt(earningsPerShare, { dollar: true })} = ${priceEarningsRatio}.` },
	{ lo: 'A4', prompt: 'Dividend yield, 2026.', answer: dividendYield, unit: '%', tolerance: 0.15, why: `${fmt(dividendPerShare2026, { dollar: true, decimals: 2 })} ÷ ${fmt(marketPricePerShare, { dollar: true })} × 100 = ${dividendYield}%.` }
];

/* ---------- Recall rules ---------- */

export const rules: Rule[] = [
	{
		lo: 'P1',
		prompt: 'Horizontal analysis compares:',
		options: [{ id: 'a', label: 'Across two or more years' }, { id: 'b', label: 'Within a single year' }],
		answer: 'a',
		why: 'Horizontal analysis looks across periods; vertical analysis looks within one period.'
	},
	{
		lo: 'P1',
		prompt: 'The common-size base for the balance sheet is:',
		options: [{ id: 'a', label: 'Total assets' }, { id: 'b', label: 'Net sales' }],
		answer: 'a',
		why: 'Net sales is the income statement\'s base; total assets is the balance sheet\'s.'
	},
	{
		lo: 'A1',
		prompt: 'Turnover and return ratios use:',
		options: [{ id: 'a', label: 'Average balances' }, { id: 'b', label: 'Year-end balances' }],
		answer: 'a',
		why: 'They divide a whole year\'s flow by a representative balance — an average of the beginning and ending amounts.'
	},
	{
		lo: 'P1',
		prompt: 'A percent change from a zero or negative base year is:',
		options: [{ id: 'a', label: 'Not meaningful' }, { id: 'b', label: 'Always reported as a positive number' }],
		answer: 'a',
		why: 'Dividing by zero or a negative base produces a number that does not mean what a percent change should mean.'
	},
	{
		lo: 'A1',
		prompt: 'A higher current ratio is:',
		options: [{ id: 'a', label: 'Not always better' }, { id: 'b', label: 'Always better' }],
		answer: 'a',
		why: 'Idle cash and slow-moving inventory both raise the current ratio without making the company healthier.'
	}
];

/* ---------- Formulas ---------- */

export const formulas: Formula[] = [
	{ lo: 'P1', formula: 'Dollar change = Analysis period − Base period', worked: `${fmt(netSales2026, { dollar: true })} − ${fmt(netSales2025, { dollar: true })} = ${fmt(dollarChange(lineOf(incomeStatementLines, 'Net sales')), { dollar: true })}` },
	{ lo: 'P1', formula: 'Percent change = Dollar change ÷ Base period × 100', worked: `${fmt(dollarChange(lineOf(incomeStatementLines, 'Net sales')), { dollar: true })} ÷ ${fmt(netSales2025, { dollar: true })} × 100 = ${percentChangeNetSales}%` },
	{ lo: 'P1', formula: 'Common-size percent = Analysis amount ÷ Base amount × 100', worked: `${fmt(cogs, { dollar: true })} ÷ ${fmt(netSales, { dollar: true })} × 100 = ${commonSizeCogs}%` },
	{ lo: 'A1', formula: 'Working capital = Current assets − Current liabilities', worked: `${fmt(currentAssets, { dollar: true })} − ${fmt(currentLiabilities, { dollar: true })} = ${fmt(workingCapital, { dollar: true })}` },
	{ lo: 'A1', formula: 'Current ratio = Current assets ÷ Current liabilities', worked: `${fmt(currentAssets, { dollar: true })} ÷ ${fmt(currentLiabilities, { dollar: true })} = ${currentRatio}` },
	{ lo: 'A1', formula: 'Acid-test ratio = (Cash + Short-term investments + Current receivables) ÷ Current liabilities', worked: `${fmt(quickAssets, { dollar: true })} ÷ ${fmt(currentLiabilities, { dollar: true })} = ${acidTestRatio}` },
	{ lo: 'A1', formula: 'Accounts receivable turnover = Net sales ÷ Average accounts receivable', worked: `${fmt(netSales, { dollar: true })} ÷ ${fmt(averageAccountsReceivable, { dollar: true })} = ${accountsReceivableTurnover}` },
	{ lo: 'A1', formula: 'Inventory turnover = Cost of goods sold ÷ Average inventory', worked: `${fmt(cogs, { dollar: true })} ÷ ${fmt(averageInventory, { dollar: true })} = ${inventoryTurnover}` },
	{ lo: 'A2', formula: 'Debt ratio = Total liabilities ÷ Total assets', worked: `${fmt(totalLiabilities, { dollar: true })} ÷ ${fmt(totalAssets2026, { dollar: true })} = ${debtRatio}%` },
	{ lo: 'A2', formula: 'Times interest earned = Income before interest and taxes ÷ Interest expense', worked: `${fmt(incomeBeforeInterestAndTaxes, { dollar: true })} ÷ ${fmt(interestExpense, { dollar: true })} = ${timesInterestEarned}` },
	{ lo: 'A3', formula: 'Profit margin = Net income ÷ Net sales', worked: `${fmt(netIncome, { dollar: true })} ÷ ${fmt(netSales, { dollar: true })} = ${profitMargin}%` },
	{ lo: 'A3', formula: 'Return on total assets = Profit margin × Total asset turnover', worked: `${profitMargin}% × ${totalAssetTurnover} = ${returnOnAssetsFrom(profitMargin, totalAssetTurnover)}%` },
	{ lo: 'A4', formula: 'Earnings per share = Net income ÷ Weighted-average common shares', worked: `${fmt(netIncome, { dollar: true })} ÷ ${sharesOutstanding.toLocaleString()} = ${fmt(earningsPerShare, { dollar: true })}` },
	{ lo: 'A4', formula: 'Price-earnings ratio = Market price per share ÷ Earnings per share', worked: `${fmt(marketPricePerShare, { dollar: true })} ÷ ${fmt(earningsPerShare, { dollar: true })} = ${priceEarningsRatio}` },
	{ lo: 'A4', formula: 'Dividend yield = Annual cash dividends per share ÷ Market price per share', worked: `${fmt(dividendPerShare2026, { dollar: true, decimals: 2 })} ÷ ${fmt(marketPricePerShare, { dollar: true })} = ${dividendYield}%` }
];

/* ---------- Lessons (Learn) and instruments (Lab) ---------- */

export const lessons: LessonMeta[] = [
	{ id: 'building-blocks', title: 'Four questions, one set of statements', lo: 'C1' },
	{ id: 'three-lenses', title: 'The same numbers, three ways', lo: 'P1' },
	{ id: 'ratio-builder', title: 'Every ratio is two lines', lo: 'A1' },
	{ id: 'solvency', title: 'Who financed the assets', lo: 'A2' },
	{ id: 'profitability', title: 'Margin times turnover', lo: 'A3' },
	{ id: 'market-prospects', title: 'What the market is paying for', lo: 'A4' }
];

export const instruments: InstrumentMeta[] = [
	{
		id: 'three-lenses',
		title: 'Three lenses',
		lo: 'P1',
		instruction: 'Switch the lens from dollars to year-over-year change to common-size and watch the same statements tell a different story.',
		resultLine: `Gross margin fell from ${grossMarginRatio2025}% to ${grossMarginRatio}% · operating expenses fell from 28.0% to 25.0% of sales · net margin rose to ${profitMargin}%`,
		noticed: 'Cost of goods sold grew faster than sales, so each sale earned less gross profit. Net income still rose because operating expenses barely grew.'
	},
	{
		id: 'ratio-builder',
		title: 'Ratio builder',
		lo: 'A1',
		instruction: 'Pick a ratio and click the two statement lines it is built from.',
		resultLine: `Current ratio = ${fmt(currentAssets, { dollar: true })} ÷ ${fmt(currentLiabilities, { dollar: true })} = ${currentRatio}`,
		noticed: 'Turnover ratios and returns needed two balance sheets — they divide a whole year\'s flow by an average.'
	},
	{
		id: 'return-on-assets-taken-apart',
		title: 'Return on assets, taken apart',
		lo: 'A3',
		instruction: 'Drag profit margin or total asset turnover and watch return on assets move.',
		resultLine: `${profitMargin}% × ${totalAssetTurnover} = ${returnOnAssetsFrom(profitMargin, totalAssetTurnover)}%`,
		noticed: 'A company can earn the same return with thin margins and fast turnover or fat margins and slow turnover.'
	}
];

/* ---------- Chapter export, anchors, invariants ---------- */

export const meta = {
	number: 13,
	slug: 'analysis',
	title: 'Analysis of Financial Statements',
	part: 'financial' as const,
	status: 'live' as const,
	summary: 'Horizontal, vertical, and ratio analysis on one set of statements.',
	instrument: 'Three lenses',
	oneLine:
		'The same statements read three ways — change over time, share of a total, and ratios — to judge liquidity, solvency, profitability, and market prospects.',
	headline: `Sales grew **${percentChangeNetSales}%**. Net income grew **33%**. The statements show why.`
};

export const chapter: ChapterContent = {
	meta,
	objectives,
	terms,
	quickChecks,
	classifications,
	computationItems,
	rules,
	formulas,
	lessons,
	instruments,
	ledgers: [],
	anchors: (): Anchor[] => [
		{ label: 'Percent change in net sales', expected: 20, actual: percentChangeNetSales },
		{ label: 'Common-size cost of goods sold', expected: 60, actual: commonSizeCogs },
		{ label: 'Working capital', expected: 110000, actual: workingCapital },
		{ label: 'Current ratio', expected: 2, actual: currentRatio },
		{ label: 'Acid-test ratio', expected: 1.09, actual: acidTestRatio },
		{ label: 'Accounts receivable turnover', expected: 10, actual: accountsReceivableTurnover },
		{ label: 'Days\' sales uncollected', expected: 42.6, actual: daysSalesUncollected },
		{ label: 'Inventory turnover', expected: 4.5, actual: inventoryTurnover },
		{ label: 'Days\' sales in inventory', expected: 91.3, actual: daysSalesInInventory },
		{ label: 'Total asset turnover', expected: 1.09, actual: totalAssetTurnover },
		{ label: 'Debt ratio', expected: 41.7, actual: debtRatio },
		{ label: 'Equity ratio', expected: 58.3, actual: equityRatio },
		{ label: 'Debt-to-equity ratio', expected: 0.71, actual: debtToEquityRatio },
		{ label: 'Times interest earned', expected: 9, actual: timesInterestEarned },
		{ label: 'Profit margin', expected: 10, actual: profitMargin },
		{ label: 'Gross margin ratio', expected: 40, actual: grossMarginRatio },
		{ label: 'Return on total assets', expected: 10.9, actual: returnOnTotalAssets },
		{ label: 'Return on common stockholders\' equity', expected: 18.5, actual: returnOnCommonEquity },
		{ label: 'Earnings per share', expected: 3, actual: earningsPerShare },
		{ label: 'Book value per common share', expected: 17.5, actual: bookValuePerShare },
		{ label: 'Price-earnings ratio', expected: 15, actual: priceEarningsRatio },
		{ label: 'Dividend yield', expected: 1.1, actual: dividendYield },
		{ label: 'Assets = liabilities + equity, 2026', expected: 600000, actual: lineOf(balanceSheetLines, 'Total liabilities and equity').y2026 },
		{ label: 'Assets = liabilities + equity, 2025', expected: 500000, actual: lineOf(balanceSheetLines, 'Total liabilities and equity').y2025 },
		{ label: 'Retained earnings roll forward', expected: 150000, actual: round(lineOf(balanceSheetLines, 'Retained earnings').y2025 + netIncome - dividendsPaid2026) },
		{ label: 'Return on assets = profit margin × total asset turnover', expected: 10.9, actual: returnOnAssetsFrom(profitMargin, totalAssetTurnover) }
	],
	invariants: () => {
		if (classifications.length !== 16)
			throw new Error(`Chapter 13 should have 16 classification items, has ${classifications.length}`);
		if (computationItems.length !== 22)
			throw new Error(`Chapter 13 should have 22 computation items, has ${computationItems.length}`);
		for (const c of classifications) {
			if (!c.options.some((o) => o.id === c.answer))
				throw new Error(`Classification answer not in options: ${c.text}`);
		}
		for (const r of rules) {
			if (!r.options.some((o) => o.id === r.answer))
				throw new Error(`Rule answer not in options: ${r.prompt}`);
		}
		for (const l of balanceSheetLines.filter((l) => l.label === 'Total assets')) {
			const liabEq = lineOf(balanceSheetLines, 'Total liabilities and equity');
			if (l.y2026 !== liabEq.y2026 || l.y2025 !== liabEq.y2025)
				throw new Error('Total assets should equal total liabilities and equity in both years');
		}
	}
};
