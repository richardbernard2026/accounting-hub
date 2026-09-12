/**
 * Tracks what a student has done in each module, per chapter, so the chapter
 * home can show real progress ("4 of 7 lessons", "2 of 6 instruments",
 * "not started") instead of a guess. localStorage only, no account.
 */
import { browser } from '$app/environment';

type DrillKind = 'classification' | 'entry';

interface ProgressState {
	lessons: Record<number, string[]>; // chapter -> lesson ids visited
	instruments: Record<number, string[]>; // chapter -> instrument ids interacted
	drills: Record<number, DrillKind[]>; // chapter -> drills completed
	recallOpened: number[]; // chapters whose Recall deck has been opened
}

const KEY = 'accounting-hub:progress:v1';

function load(): ProgressState {
	const empty: ProgressState = { lessons: {}, instruments: {}, drills: {}, recallOpened: [] };
	if (!browser) return empty;
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return empty;
		const parsed = JSON.parse(raw);
		return { ...empty, ...parsed };
	} catch {
		return empty;
	}
}

class ProgressStore {
	state = $state<ProgressState>(load());

	constructor() {
		if (browser) {
			$effect.root(() => {
				$effect(() => {
					try {
						localStorage.setItem(KEY, JSON.stringify(this.state));
					} catch {}
				});
			});
		}
	}

	visitLesson(chapter: number, lessonId: string) {
		const have = this.state.lessons[chapter] ?? [];
		if (have.includes(lessonId)) return;
		this.state = {
			...this.state,
			lessons: { ...this.state.lessons, [chapter]: [...have, lessonId] }
		};
	}
	lessonsVisited(chapter: number): number {
		return this.state.lessons[chapter]?.length ?? 0;
	}

	markInstrument(chapter: number, instrumentId: string) {
		const have = this.state.instruments[chapter] ?? [];
		if (have.includes(instrumentId)) return;
		this.state = {
			...this.state,
			instruments: { ...this.state.instruments, [chapter]: [...have, instrumentId] }
		};
	}
	instrumentTouched(chapter: number, instrumentId: string): boolean {
		return (this.state.instruments[chapter] ?? []).includes(instrumentId);
	}
	instrumentsTouched(chapter: number): number {
		return this.state.instruments[chapter]?.length ?? 0;
	}

	visitRecall(chapter: number) {
		if (this.state.recallOpened.includes(chapter)) return;
		this.state = { ...this.state, recallOpened: [...this.state.recallOpened, chapter] };
	}
	recallStarted(chapter: number): boolean {
		return this.state.recallOpened.includes(chapter);
	}

	markDrillDone(chapter: number, kind: DrillKind) {
		const have = this.state.drills[chapter] ?? [];
		if (have.includes(kind)) return;
		this.state = { ...this.state, drills: { ...this.state.drills, [chapter]: [...have, kind] } };
	}
	drillsDone(chapter: number): number {
		return this.state.drills[chapter]?.length ?? 0;
	}
}

export const progress = new ProgressStore();
