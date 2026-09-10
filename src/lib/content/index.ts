import type { ChapterContent, ChapterMeta } from './types';
import { chapter as ch03 } from './chapters/ch03';

/** Wild, Financial and Managerial Accounting, 2025 release. Chapters 1–13 are financial. */
export const chapterIndex: ChapterMeta[] = [
	{
		number: 1,
		slug: 'accounting-in-business',
		title: 'Accounting in Business',
		part: 'financial',
		status: 'planned',
		summary: 'What accounting is for, who uses it, and the equation everything rests on.'
	},
	{
		number: 2,
		slug: 'business-transactions',
		title: 'Accounting for Business Transactions',
		part: 'financial',
		status: 'planned',
		summary: 'Source documents, debits and credits, journal to ledger to trial balance.',
		instrument: 'Double-entry machine'
	},
	ch03.meta,
	{
		number: 4,
		slug: 'merchandising-operations',
		title: 'Accounting for Merchandising Operations',
		part: 'financial',
		status: 'planned',
		summary: 'Inventory in, sales out, gross profit in between.',
		instrument: 'Perpetual inventory flow'
	},
	{
		number: 5,
		slug: 'inventories',
		title: 'Inventories and Cost of Sales',
		part: 'financial',
		status: 'planned',
		summary: 'Which cost leaves when a unit sells: FIFO, LIFO, weighted average.',
		instrument: 'Cost layers'
	},
	{
		number: 6,
		slug: 'cash-and-internal-control',
		title: 'Cash, Fraud, and Internal Control',
		part: 'financial',
		status: 'planned',
		summary: 'Controls over cash and the bank reconciliation.',
		instrument: 'Bank reconciliation'
	},
	{
		number: 7,
		slug: 'receivables',
		title: 'Accounting for Receivables',
		part: 'financial',
		status: 'planned',
		summary: 'Estimating what customers won’t pay before they don’t.',
		instrument: 'Aging and allowance'
	},
	{
		number: 8,
		slug: 'long-term-assets',
		title: 'Accounting for Long-Term Assets',
		part: 'financial',
		status: 'planned',
		summary: 'Spreading an asset’s cost across the years it works.',
		instrument: 'Depreciation curves'
	},
	{
		number: 9,
		slug: 'current-liabilities',
		title: 'Accounting for Current Liabilities',
		part: 'financial',
		status: 'planned',
		summary: 'Payroll, warranties, and what is owed within the year.',
		instrument: 'Payroll breakdown'
	},
	{
		number: 10,
		slug: 'long-term-liabilities',
		title: 'Accounting for Long-Term Liabilities',
		part: 'financial',
		status: 'planned',
		summary: 'Bonds at a discount or premium, and how the difference amortizes.',
		instrument: 'Amortization curves'
	},
	{
		number: 11,
		slug: 'corporate-reporting',
		title: 'Corporate Reporting and Analysis',
		part: 'financial',
		status: 'planned',
		summary: 'Stock, dividends, treasury shares, and what each does to equity.',
		instrument: 'Equity effects'
	},
	{
		number: 12,
		slug: 'cash-flows',
		title: 'Reporting Cash Flows',
		part: 'financial',
		status: 'planned',
		summary: 'From net income to cash, one adjustment at a time.',
		instrument: 'Indirect-method waterfall'
	},
	{
		number: 13,
		slug: 'analysis',
		title: 'Analysis of Financial Statements',
		part: 'financial',
		status: 'planned',
		summary: 'Horizontal, vertical, and ratio analysis on one set of statements.',
		instrument: 'Ratio dashboard'
	}
];

export const chapters: Record<number, ChapterContent> = { 3: ch03 };

export function chapterMeta(n: number): ChapterMeta | undefined {
	return chapterIndex.find((c) => c.number === n);
}
