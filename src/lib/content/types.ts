import type { Account, Entry } from '$lib/ledger';

export type ObjectiveKind = 'conceptual' | 'analytical' | 'procedural';

export interface Objective {
	code: string; // C1, A1, P1 …
	kind: ObjectiveKind;
	text: string;
	/** Two or three words for the progress rail. */
	short?: string;
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
	/** One line for the site-wide chapter index. */
	summary: string;
	/** What the chapter opens on. */
	instrument?: string;
	/** Chapter-home one-liner, max 60 words, plain language (SPEC-v3 §2.1). */
	oneLine?: string;
	/** Chapter-home headline number or idea. `**text**` renders bold. */
	headline?: string;
}

/** One page in Learn — one learning objective, or a closely related pair. */
export interface LessonMeta {
	id: string;
	title: string;
	/** Primary learning objective this lesson teaches. */
	lo: string;
}

/** One instrument in Lab, and where else (if anywhere) it is embedded in Learn. */
export interface InstrumentMeta {
	id: string;
	title: string;
	lo: string;
	/** The one-line imperative instruction, printed above the instrument. Never a legend alone. */
	instruction: string;
	/** Printed below the instrument, always visible. */
	resultLine: string;
	/** Printed below the result line, revealed only after the student interacts. */
	noticed: string;
}

/** A formula with a worked example, computed from the ledger so it cannot drift. */
export interface Formula {
	lo: string;
	formula: string;
	worked: string;
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
	contraRevenueOf?: Record<string, string>;
}

export interface QuickCheck {
	lo: string;
	q: string;
	options: string[];
	answer: number;
	why: string;
}

/** A sorting item: which of a chapter's categories does this situation belong to? */
export interface Classification {
	lo: string;
	text: string;
	options: { id: string; label: string }[];
	answer: string;
	why: string;
}

/** A journal entry the chapter teaches, as a card prompt. */
export interface EntryCardSpec {
	lo: string;
	prompt: string;
	entry: Entry;
	hint?: string;
}

/** A rule question with a short list of answers (debit or credit, deferral or accrual…). */
export interface Rule {
	lo: string;
	prompt: string;
	options: { id: string; label: string }[];
	answer: string;
	why: string;
}

export interface ChapterContent {
	meta: ChapterMeta;
	objectives: Objective[];
	terms: Term[];
	quickChecks: QuickCheck[];
	/** Accounts used by the chapter's entry cards. */
	accounts?: Account[];
	classifications?: Classification[];
	entryCards?: EntryCardSpec[];
	rules?: Rule[];
	formulas?: Formula[];
	/** Learn's pages, in order. */
	lessons?: LessonMeta[];
	/** Lab's instruments, in order. */
	instruments?: InstrumentMeta[];
	/** Every entry Reference should list as a journal-entry pattern. */
	journalPatterns?: Entry[];
	/** Every ledger the chapter shows, so the validator can check it. */
	ledgers: Array<{ label: string; company: Company; entries: Entry[] }>;
	/** Numbers the textbook states, which the model must reproduce. */
	anchors: () => Anchor[];
	/** Extra invariants specific to the chapter. Throw to fail. */
	invariants?: () => void;
}
