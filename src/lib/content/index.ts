import type { ChapterContent, ChapterMeta } from './types';
import { chapter as ch01 } from './chapters/ch01';
import { chapter as ch02 } from './chapters/ch02';
import { chapter as ch03 } from './chapters/ch03';
import { chapter as ch04 } from './chapters/ch04';
import { chapter as ch05 } from './chapters/ch05';
import { chapter as ch06 } from './chapters/ch06';
import { chapter as ch07 } from './chapters/ch07';
import { chapter as ch08 } from './chapters/ch08';
import { chapter as ch09 } from './chapters/ch09';
import { chapter as ch10 } from './chapters/ch10';
import { chapter as ch11 } from './chapters/ch11';
import { chapter as ch12 } from './chapters/ch12';

/** Wild, Financial and Managerial Accounting, 2025 release. Chapters 1–13 are financial. */
export const chapterIndex: ChapterMeta[] = [
	ch01.meta,
	ch02.meta,
	ch03.meta,
	ch04.meta,
	ch05.meta,
	ch06.meta,
	ch07.meta,
	ch08.meta,
	ch09.meta,
	ch10.meta,
	ch11.meta,
	ch12.meta,
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

export const chapters: Record<number, ChapterContent> = { 1: ch01, 2: ch02, 3: ch03, 4: ch04, 5: ch05, 6: ch06, 7: ch07, 8: ch08, 9: ch09, 10: ch10, 11: ch11, 12: ch12 };

export function chapterMeta(n: number): ChapterMeta | undefined {
	return chapterIndex.find((c) => c.number === n);
}
