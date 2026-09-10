import type { Entry } from '$lib/ledger';

/** A retrieval card makes you produce an answer. Generated from chapter content, never authored separately. */
export type Card =
	| { id: string; chapter: number; lo: string; type: 'term'; prompt: string; answer: string }
	| {
			id: string;
			chapter: number;
			lo: string;
			type: 'classification';
			prompt: string;
			options: { id: string; label: string }[];
			answer: string;
			why: string;
	  }
	| {
			id: string;
			chapter: number;
			lo: string;
			type: 'entry';
			prompt: string;
			entry: Entry;
			hint?: string;
	  }
	| {
			id: string;
			chapter: number;
			lo: string;
			type: 'rule';
			prompt: string;
			options: { id: string; label: string }[];
			answer: string;
			why: string;
	  };

export interface CardProgress {
	box: number; // 1–5
	due: string; // ISO date (YYYY-MM-DD)
	seen: number;
	lapses: number;
	last?: string;
}
