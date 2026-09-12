// Splits chapters/CHAPTER-BRIEFS.md into chapters/chNN/BRIEF.md.
// Edit the master file, then run: node scripts/split-briefs.mjs
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const master = readFileSync('chapters/CHAPTER-BRIEFS.md', 'utf8');
const [preamble, ...chapters] = master.split(/^(?=# Chapter \d{2} · )/m);

const section = (title) => {
	const m = preamble.match(new RegExp(`^## ${title}\\n[\\s\\S]*?(?=^## |^---\\s*$)`, 'm'));
	if (!m) throw new Error(`Preamble section missing: ${title}`);
	return m[0].trim();
};
const conventions = [
	section('Where every number comes from'),
	section('Rules that apply to every chapter')
]
	.join('\n\n')
	.replace(/^## /gm, '### ');

if (chapters.length !== 13) throw new Error(`Expected 13 chapters, found ${chapters.length}`);

for (const body of chapters) {
	const nn = body.match(/^# Chapter (\d{2})/)[1];
	const [title, ...rest] = body
		.trim()
		.replace(/\n---\s*$/, '')
		.trimEnd()
		.split('\n');
	const out = [
		`<!-- Generated from chapters/CHAPTER-BRIEFS.md by scripts/split-briefs.mjs. Edit the master, then re-split. -->`,
		'',
		title,
		'',
		'Read with `SPEC-v3.md`. Number tags (`[ledger]`, `[book]`, `[book?]`, `[built]`) and the rules for every chapter are at the foot of this file.',
		...rest,
		'',
		'---',
		'',
		'## Conventions',
		'',
		conventions,
		''
	].join('\n');
	mkdirSync(`chapters/ch${nn}`, { recursive: true });
	writeFileSync(`chapters/ch${nn}/BRIEF.md`, out);
	console.log(`chapters/ch${nn}/BRIEF.md`);
}
