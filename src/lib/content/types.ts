import type { Account, Entry } from '$lib/ledger';

export type ObjectiveKind = 'conceptual' | 'analytical' | 'procedural';

export interface Objective {
	code: string; // C1, A1, P1 …
	kind: ObjectiveKind;
	text: string;
}

export interface Term {
	term: string;
	definition: string;
	lo: string;
	aliases?: string[];
}

export interface ChapterMeta {
	number: number;
	slug: string;
	title: string;
	part: 'financial' | 'managerial';
	status: 'live' | 'planned';
	/** One line for the index page. */
	summary: string;
	/** What the chapter opens on. */
	instrument?: string;
}

export interface Anchor {
	/** Human label shown in validation output. */
	label: string;
	/** Expected value, taken from the textbook. */
	expected: number;
	/** Derived value from the ledger model. */
	actual: number;
}

export interface Company {
	name: string;
	accounts: Account[];
	retainedEarningsAcct: string;
	dividendsAcct: string;
	contraOf: Record<string, string>;
}

export interface QuickCheck {
	lo: string;
	q: string;
	options: string[];
	answer: number;
	why: string;
}

export interface ChapterContent {
	meta: ChapterMeta;
	objectives: Objective[];
	terms: Term[];
	quickChecks: QuickCheck[];
	/** Every ledger the chapter shows, so the validator can check it. */
	ledgers: Array<{ label: string; company: Company; entries: Entry[] }>;
	/** Numbers the textbook states, which the model must reproduce. */
	anchors: () => Anchor[];
	/** Extra invariants specific to the chapter. Throw to fail. */
	invariants?: () => void;
}
