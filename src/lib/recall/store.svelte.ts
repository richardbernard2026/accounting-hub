/**
 * Lightweight spaced repetition. Each card carries a box 1–5; a correct answer
 * promotes it, a wrong answer resets it to 1. Due in 1/2/4/8/16 days. localStorage only.
 */
import { browser } from '$app/environment';
import type { Card, CardProgress } from './types';

const KEY = 'accounting-hub:recall:v1';
const VISITED = 'accounting-hub:visited:v1';
export const INTERVALS = [1, 2, 4, 8, 16]; // days for box 1..5

export function today(): string {
	return new Date().toISOString().slice(0, 10);
}
function addDays(iso: string, days: number): string {
	const d = new Date(iso + 'T00:00:00');
	d.setDate(d.getDate() + days);
	return d.toISOString().slice(0, 10);
}

function load<T>(key: string, fallback: T): T {
	if (!browser) return fallback;
	try {
		const raw = localStorage.getItem(key);
		return raw ? (JSON.parse(raw) as T) : fallback;
	} catch {
		return fallback;
	}
}

class RecallStore {
	progress = $state<Record<string, CardProgress>>(load(KEY, {}));
	visited = $state<number[]>(load(VISITED, []));

	constructor() {
		if (browser) {
			$effect.root(() => {
				$effect(() => {
					try {
						localStorage.setItem(KEY, JSON.stringify(this.progress));
					} catch {}
				});
				$effect(() => {
					try {
						localStorage.setItem(VISITED, JSON.stringify(this.visited));
					} catch {}
				});
			});
		}
	}

	visit(chapter: number) {
		if (!this.visited.includes(chapter)) this.visited = [...this.visited, chapter];
	}

	/** A card is due if never seen or its due date is today or earlier. */
	isDue(card: Card, on = today()): boolean {
		const p = this.progress[card.id];
		return !p || p.due <= on;
	}

	due(cards: Card[], on = today()): Card[] {
		return cards.filter((c) => this.isDue(c, on));
	}

	grade(card: Card, correct: boolean, on = today()) {
		const prev = this.progress[card.id];
		const box = correct ? Math.min(5, (prev?.box ?? 0) + 1) : 1;
		this.progress = {
			...this.progress,
			[card.id]: {
				box,
				due: addDays(on, INTERVALS[box - 1]),
				seen: (prev?.seen ?? 0) + 1,
				lapses: (prev?.lapses ?? 0) + (correct ? 0 : 1),
				last: on
			}
		};
	}

	boxOf(card: Card): number {
		return this.progress[card.id]?.box ?? 0;
	}

	reset() {
		this.progress = {};
	}
}

export const recall = new RecallStore();
