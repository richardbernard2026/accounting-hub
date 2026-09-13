import type { Component } from 'svelte';
import {
	lessonComponents as ch01Lessons,
	instrumentComponents as ch01Instruments
} from './ch01/manifest';
import Ch01Practice from './ch01/Practice.svelte';
import {
	lessonComponents as ch02Lessons,
	instrumentComponents as ch02Instruments
} from './ch02/manifest';
import Ch02Practice from './ch02/Practice.svelte';
import {
	lessonComponents as ch03Lessons,
	instrumentComponents as ch03Instruments
} from './ch03/manifest';
import Ch03Practice from './ch03/Practice.svelte';

/**
 * Only Learn's lessons, Lab's instruments, and Practice are bespoke per
 * chapter — Notes, Recall, and Reference are generic components driven
 * entirely by ChapterContent (see $lib/components/chapter/Chapter*.svelte).
 */
export interface ChapterModules {
	lessonComponents: Record<string, Component>;
	instrumentComponents: Record<string, Component<{ href?: string }>>;
	practice: Component;
}

export const chapterModules: Record<number, ChapterModules> = {
	1: {
		lessonComponents: ch01Lessons,
		instrumentComponents: ch01Instruments,
		practice: Ch01Practice
	},
	2: {
		lessonComponents: ch02Lessons,
		instrumentComponents: ch02Instruments,
		practice: Ch02Practice
	},
	3: {
		lessonComponents: ch03Lessons,
		instrumentComponents: ch03Instruments,
		practice: Ch03Practice
	}
};
