import type { ChapterContent, ChapterMeta } from './types';
import { chapter as ch01 } from './chapters/ch01';
import { chapter as ch02 } from './chapters/ch02';
import { chapter as ch03 } from './chapters/ch03';
import { chapter as ch04 } from './chapters/ch04';
import { chapter as ch05 } from './chapters/ch05';
import { chapter as ch06 } from './chapters/ch06';

/** Wild, Financial and Managerial Accounting, 2025 release. Chapters 1–13 are financial. */
export const chapterIndex: ChapterMeta[] = [
	ch01.meta,
	ch02.meta,
	ch03.meta,
	ch04.meta,
	ch05.meta,
	ch06.meta,
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

export const chapters: Record<number, ChapterContent> = { 1: ch01, 2: ch02, 3: ch03, 4: ch04, 5: ch05, 6: ch06 };

export function chapterMeta(n: number): ChapterMeta | undefined {
	return chapterIndex.find((c) => c.number === n);
}
