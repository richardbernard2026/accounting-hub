// Builds docs/screenshots/index.html (a contact sheet) and docs/screenshots/REVIEW.md
// (one row per screenshot, an empty verdict column) from every PNG in docs/screenshots.
//
// Filename convention, produced by tests/visual.spec.ts:
//   <route-slug>__<viewport>__<state>.png
// e.g. ch3-home__desktop__initial.png, ch3-lab-timeline__mobile__dragged.png
//
// Run after capturing screenshots: `pnpm contact-sheet` (also runs automatically
// after `pnpm test:visual`, see package.json).
//
// Re-running preserves any verdict already written for a filename that still
// exists, so filling in REVIEW.md is never wasted by a later recapture of an
// unrelated screen. A screenshot whose filename no longer exists on disk drops
// out; a new filename gets a fresh empty row.

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'docs/screenshots';
const REVIEW_PATH = join(DIR, 'REVIEW.md');
const INDEX_PATH = join(DIR, 'index.html');

const VIEWPORT_ORDER = { mobile: 0, tablet: 1, desktop: 2 };

function parse(filename) {
	const base = filename.replace(/\.png$/, '');
	const parts = base.split('__');
	if (parts.length < 2) return { route: base, viewport: '', state: '' };
	const [route, viewport, ...rest] = parts;
	return { route, viewport, state: rest.join('__') || 'default' };
}

function readExistingVerdicts(path) {
	const verdicts = new Map();
	let text;
	try {
		text = readFileSync(path, 'utf8');
	} catch {
		return verdicts;
	}
	// Row shape: | # | [file.png](file.png) | route | viewport | verdict text |
	for (const line of text.split('\n')) {
		const m = line.match(/^\|\s*\d+\s*\|\s*\[([^\]]+\.png)\]/);
		if (!m) continue;
		const cells = line
			.split('|')
			.slice(1, -1)
			.map((c) => c.trim());
		if (cells.length < 5) continue;
		const verdict = cells[4].trim();
		if (verdict) verdicts.set(m[1], verdict);
	}
	return verdicts;
}

function main() {
	let files;
	try {
		files = readdirSync(DIR).filter((f) => f.endsWith('.png'));
	} catch {
		console.error(`No ${DIR} directory. Run the capture script first: pnpm test:visual`);
		process.exit(1);
	}
	if (files.length === 0) {
		console.error(`No screenshots in ${DIR}. Run the capture script first: pnpm test:visual`);
		process.exit(1);
	}

	const previousVerdicts = readExistingVerdicts(REVIEW_PATH);

	const shots = files
		.map((filename) => ({ filename, ...parse(filename) }))
		.sort((a, b) => {
			if (a.route !== b.route) return a.route < b.route ? -1 : 1;
			const vd = (VIEWPORT_ORDER[a.viewport] ?? 9) - (VIEWPORT_ORDER[b.viewport] ?? 9);
			if (vd !== 0) return vd;
			return a.state < b.state ? -1 : a.state > b.state ? 1 : 0;
		});

	// ---------- REVIEW.md ----------
	const reviewLines = [
		'# Visual review',
		'',
		`${shots.length} screens, captured ${new Date().toISOString().slice(0, 10)}.`,
		'',
		'Open `index.html` in this folder — a browser tab, not a code editor — and look at',
		'every image before writing a verdict. A verdict is what is actually on the screen',
		'and what, if anything, is wrong with it. "Looks fine" is not a verdict.',
		'',
		'`pnpm review:check` fails the build if any row below is empty.',
		'',
		'| # | Screenshot | Route | Viewport | Verdict |',
		'|---|---|---|---|---|'
	];
	shots.forEach((s, i) => {
		const prior = previousVerdicts.get(s.filename) ?? '';
		reviewLines.push(
			`| ${i + 1} | [${s.filename}](${s.filename}) | ${s.route} | ${s.viewport} | ${prior} |`
		);
	});
	writeFileSync(REVIEW_PATH, reviewLines.join('\n') + '\n');

	// ---------- index.html (contact sheet) ----------
	const groups = new Map();
	for (const s of shots) {
		if (!groups.has(s.route)) groups.set(s.route, []);
		groups.get(s.route).push(s);
	}

	const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	const sections = [...groups.entries()]
		.map(
			([route, items]) => `
		<section>
			<h2>${escape(route)}</h2>
			<div class="row">
				${items
					.map(
						(s) => `
				<figure>
					<a href="${encodeURIComponent(s.filename)}" target="_blank" rel="noopener">
						<img src="${encodeURIComponent(s.filename)}" loading="lazy" alt="${escape(s.filename)}" />
					</a>
					<figcaption>
						<span class="viewport">${escape(s.viewport)}</span>
						<span class="state">${escape(s.state)}</span>
					</figcaption>
				</figure>`
					)
					.join('')}
			</div>
		</section>`
		)
		.join('');

	const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Contact sheet — ${shots.length} screens</title>
<style>
	:root { color-scheme: light dark; }
	body { font-family: -apple-system, system-ui, sans-serif; margin: 0; padding: 2rem; background: #f6f2ea; color: #1c1915; }
	@media (prefers-color-scheme: dark) { body { background: #17150f; color: #ece6d8; } }
	h1 { font-size: 1.1rem; font-weight: 600; margin: 0 0 1.5rem; }
	h2 { font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; margin: 2.5rem 0 0.75rem; border-bottom: 1px solid rgba(128,128,128,0.3); padding-bottom: 0.4rem; }
	section:first-of-type h2 { margin-top: 0; }
	.row { display: flex; flex-wrap: wrap; gap: 1rem; }
	figure { margin: 0; width: 280px; }
	figure img { width: 100%; height: auto; display: block; border: 1px solid rgba(128,128,128,0.35); background: #fff; }
	figcaption { font-size: 0.72rem; margin-top: 0.3rem; display: flex; justify-content: space-between; opacity: 0.75; }
	.viewport { text-transform: uppercase; letter-spacing: 0.03em; font-weight: 600; }
	.count { opacity: 0.6; font-weight: 400; }
</style>
</head>
<body>
	<h1>${shots.length} screens across ${groups.size} routes — captured ${new Date().toISOString().slice(0, 10)}. Write a verdict for every one in <code>REVIEW.md</code> before calling this done.</h1>
	${sections}
</body>
</html>
`;
	writeFileSync(INDEX_PATH, html);

	console.log(`Wrote ${INDEX_PATH} (${shots.length} screens, ${groups.size} routes)`);
	console.log(`Wrote ${REVIEW_PATH}`);
}

main();
