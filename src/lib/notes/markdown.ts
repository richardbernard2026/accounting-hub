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
