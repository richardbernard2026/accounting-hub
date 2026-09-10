import type { Note } from './store.svelte';

export interface ChapterLabel {
	number: number;
	title: string;
}

const KIND_HEAD: Record<Note['kind'], string> = {
	term: 'Terms',
	line: 'Lines worth keeping',
	state: 'Instrument states',
	own: 'In my own words'
};

/** Clean Markdown for one chapter: headings per note kind, terms as a definition list. */
export function chapterMarkdown(ch: ChapterLabel, notes: Note[]): string {
	const mine = notes.filter((n) => n.chapter === ch.number);
	const out: string[] = [`## Chapter ${ch.number} — ${ch.title}`, ''];
	if (mine.length === 0) {
		out.push('_No notes yet._', '');
		return out.join('\n');
	}
	for (const kind of ['term', 'line', 'state', 'own'] as const) {
		const group = mine
			.filter((n) => n.kind === kind)
			.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
		if (group.length === 0) continue;
		out.push(`### ${KIND_HEAD[kind]}`, '');
		for (const n of group) {
			const src = n.source?.lo
				? ` _(${n.source.lo}${n.source.label ? ', ' + n.source.label : ''})_`
				: '';
			switch (kind) {
				case 'term':
					out.push(`- **${n.text.trim()}** — ${(n.body ?? '').trim()}${src}`);
					if (n.book && n.origin !== 'book') out.push(`  _Book: ${n.book.trim()}_`);
					break;
				case 'line':
					out.push(`- > ${n.text.trim()}${src}`);
					if (n.body?.trim()) out.push(`  ${n.body.trim()}`);
					break;
				case 'state':
					out.push(`- ${n.text.trim()}${src}`);
					if (n.data) {
						const pairs = Object.entries(n.data).map(([k, v]) => `${k}: ${v}`);
						if (pairs.length) out.push(`  ${pairs.join(' · ')}`);
					}
					if (n.body?.trim()) out.push(`  ${n.body.trim()}`);
					break;
				case 'own':
					out.push(`- ${n.text.trim()}${src}`);
					break;
			}
		}
		out.push('');
	}
	return out.join('\n');
}

export function allMarkdown(
	chapters: ChapterLabel[],
	notes: Note[],
	title = 'Accounting notes'
): string {
	const out = [
		`# ${title}`,
		'',
		`_Wild, Financial and Managerial Accounting (2025 release). Exported ${new Date().toISOString().slice(0, 10)}._`,
		''
	];
	for (const ch of chapters) {
		if (!notes.some((n) => n.chapter === ch.number)) continue;
		out.push(chapterMarkdown(ch, notes));
	}
	return out.join('\n');
}

export function download(
	filename: string,
	text: string,
	mime = 'text/markdown;charset=utf-8'
): void {
	const blob = new Blob([text], { type: mime });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(url), 500);
}

export interface StudyEntry {
	id: string;
	explanation: string;
	lines: { name: string; dr?: number; cr?: number }[];
}

/**
 * Study-sheet Markdown: one page per chapter. Terms as a two-column table, the
 * chapter's key entries as journal blocks, then your pinned states and lines.
 */
export function studySheetMarkdown(ch: ChapterLabel, notes: Note[], entries: StudyEntry[]): string {
	const mine = notes.filter((n) => n.chapter === ch.number);
	const out: string[] = [`# Chapter ${ch.number} — ${ch.title}`, ''];
	const terms = mine.filter((n) => n.kind === 'term');
	if (terms.length) {
		out.push('## Terms', '', '| Term | In my words | The book |', '|---|---|---|');
		for (const t of terms) {
			const mineWords = t.origin === 'book' ? '' : (t.body ?? '');
			const book = t.book ?? (t.origin === 'book' ? t.body : '') ?? '';
			out.push(`| ${t.text.trim()} | ${mineWords.trim()} | ${book.trim()} |`);
		}
		out.push('');
	}
	if (entries.length) {
		out.push('## Entries', '');
		for (const e of entries) {
			out.push(`(${e.id}) ${e.explanation}`, '', '```');
			const w = Math.max(...e.lines.map((l) => l.name.length)) + 8;
			for (const l of e.lines) {
				const name = l.dr ? l.name : '    ' + l.name;
				out.push(
					name.padEnd(w) +
						(l.dr ? String(l.dr).padStart(8) : ''.padStart(8)) +
						(l.cr ? String(l.cr).padStart(10) : '')
				);
			}
			out.push('```', '');
		}
	}
	const states = mine.filter((n) => n.kind === 'state');
	if (states.length) {
		out.push('## Instrument states', '');
		for (const s of states) out.push(`- ${s.text.trim()}`);
		out.push('');
	}
	const lines = mine.filter((n) => n.kind === 'line' || n.kind === 'own');
	if (lines.length) {
		out.push('## Lines and my own words', '');
		for (const l of lines) out.push(`- ${l.text.trim()}${l.body ? ' — ' + l.body.trim() : ''}`);
		out.push('');
	}
	return out.join('\n');
}
