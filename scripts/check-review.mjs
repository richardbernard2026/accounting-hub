// Fails if docs/screenshots/REVIEW.md has any unfilled verdict row. This is the
// gate that stops "looks fine" from standing in for having actually looked.
// Run: pnpm review:check

import { readFileSync } from 'node:fs';

const PATH = 'docs/screenshots/REVIEW.md';

let text;
try {
	text = readFileSync(PATH, 'utf8');
} catch {
	console.error(`Missing ${PATH}. Run: pnpm test:visual && pnpm contact-sheet`);
	process.exit(1);
}

const rows = text
	.split('\n')
	.filter((l) => /^\|\s*\d+\s*\|/.test(l))
	.map((l) =>
		l
			.split('|')
			.slice(1, -1)
			.map((c) => c.trim())
	);

if (rows.length === 0) {
	console.error(`${PATH} has no rows. Run: pnpm test:visual && pnpm contact-sheet`);
	process.exit(1);
}

const unfilled = rows.filter((cells) => !cells[4] || cells[4].length === 0);

if (unfilled.length > 0) {
	console.error(`${unfilled.length} of ${rows.length} screens in ${PATH} have no written verdict:`);
	for (const cells of unfilled) console.error(`  #${cells[0]} — ${cells[2]} (${cells[3]})`);
	console.error(
		'\nLook at docs/screenshots/index.html and fill in every row before calling this done.'
	);
	process.exit(1);
}

console.log(`${rows.length} screens, all with a written verdict.`);
