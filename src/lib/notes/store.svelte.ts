/**
 * Notes attach to things. Four kinds:
 *  term  — a term or acronym with its meaning (your words, or the book's if you accepted it)
 *  line  — a sentence the site told you, quoted, with optional words of your own
 *  state — a state of an instrument, carrying the numbers you were looking at
 *  own   — your own words, typed
 * Persisted per browser in localStorage. No account, no server.
 */
import { browser } from '$app/environment';

export type NoteKind = 'term' | 'line' | 'state' | 'own';

export interface Note {
	id: string;
	chapter: number;
	kind: NoteKind;
	/** The headline: the term, the quoted line, the state sentence, or your text. */
	text: string;
	/** For terms: the meaning. For lines/states: your added words. */
	body?: string;
	/** Where it came from: learning objective code and a label (e.g. "Adjustment timeline"). */
	source?: { lo?: string; label?: string };
	/** For state notes: the parameters and results, for export. */
	data?: Record<string, string | number>;
	/** For term notes: whether the meaning was written by you or accepted from the book. */
	origin?: 'own' | 'book';
	createdAt: string;
	updatedAt: string;
}

const KEY = 'accounting-hub:notes:v1';

function load(): Note[] {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

class NotesStore {
	notes = $state<Note[]>(load());
	/** The drawer's open state lives here so any component can open it. */
	drawerOpen = $state(false);
	/** A brief “saved” pulse for the header count. */
	lastSavedId = $state<string | null>(null);

	constructor() {
		if (browser) {
			$effect.root(() => {
				$effect(() => {
					try {
						localStorage.setItem(KEY, JSON.stringify(this.notes));
					} catch {
						/* storage unavailable: notes live for the session only */
					}
				});
			});
			window.addEventListener('storage', (e) => {
				if (e.key === KEY) this.notes = load();
			});
		}
	}

	forChapter(chapter: number): Note[] {
		return this.notes.filter((n) => n.chapter === chapter);
	}

	hasTerm(chapter: number, term: string): boolean {
		const t = term.trim().toLowerCase();
		return this.notes.some(
			(n) => n.chapter === chapter && n.kind === 'term' && n.text.trim().toLowerCase() === t
		);
	}

	add(input: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Note {
		const now = new Date().toISOString();
		const note: Note = { ...input, id: uid(), createdAt: now, updatedAt: now };
		this.notes = [note, ...this.notes];
		this.lastSavedId = note.id;
		setTimeout(() => {
			if (this.lastSavedId === note.id) this.lastSavedId = null;
		}, 1400);
		return note;
	}

	update(id: string, patch: Partial<Pick<Note, 'text' | 'body'>>): void {
		this.notes = this.notes.map((n) =>
			n.id === id ? { ...n, ...patch, updatedAt: new Date().toISOString() } : n
		);
	}

	remove(id: string): void {
		this.notes = this.notes.filter((n) => n.id !== id);
	}

	clearChapter(chapter: number): void {
		this.notes = this.notes.filter((n) => n.chapter !== chapter);
	}

	replaceAll(notes: Note[]): void {
		this.notes = notes;
	}
}

function uid(): string {
	return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export const notes = new NotesStore();
