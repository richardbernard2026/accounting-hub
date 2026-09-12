import type { Component } from 'svelte';
import {
	lessonComponents as ch03Lessons,
	instrumentComponents as ch03Instruments
} from './ch03/manifest';
import Ch03Practice from './ch03/Practice.svelte';
import Ch03Recall from './ch03/Recall.svelte';
import Ch03Notes from './ch03/Notes.svelte';
import Ch03Reference from './ch03/Reference.svelte';

export interface ChapterModules {
	lessonComponents: Record<string, Component>;
	instrumentComponents: Record<string, Component<{ href?: string }>>;
	practice: Component;
	recall: Component;
	notes: Component;
	reference: Component;
}

export const chapterModules: Record<number, ChapterModules> = {
	3: {
		lessonComponents: ch03Lessons,
		instrumentComponents: ch03Instruments,
		practice: Ch03Practice,
		recall: Ch03Recall,
		notes: Ch03Notes,
		reference: Ch03Reference
	}
};
