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
import {
	lessonComponents as ch04Lessons,
	instrumentComponents as ch04Instruments
} from './ch04/manifest';
import Ch04Practice from './ch04/Practice.svelte';
import {
	lessonComponents as ch05Lessons,
	instrumentComponents as ch05Instruments
} from './ch05/manifest';
import Ch05Practice from './ch05/Practice.svelte';
import {
	lessonComponents as ch06Lessons,
	instrumentComponents as ch06Instruments
} from './ch06/manifest';
import Ch06Practice from './ch06/Practice.svelte';
import {
	lessonComponents as ch07Lessons,
	instrumentComponents as ch07Instruments
} from './ch07/manifest';
import Ch07Practice from './ch07/Practice.svelte';
import {
	lessonComponents as ch08Lessons,
	instrumentComponents as ch08Instruments
} from './ch08/manifest';
import Ch08Practice from './ch08/Practice.svelte';

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
	},
	4: {
		lessonComponents: ch04Lessons,
		instrumentComponents: ch04Instruments,
		practice: Ch04Practice
	},
	5: {
		lessonComponents: ch05Lessons,
		instrumentComponents: ch05Instruments,
		practice: Ch05Practice
	},
	6: {
		lessonComponents: ch06Lessons,
		instrumentComponents: ch06Instruments,
		practice: Ch06Practice
	},
	7: {
		lessonComponents: ch07Lessons,
		instrumentComponents: ch07Instruments,
		practice: Ch07Practice
	},
	8: {
		lessonComponents: ch08Lessons,
		instrumentComponents: ch08Instruments,
		practice: Ch08Practice
	}
};
