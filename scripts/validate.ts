/**
 * Asserts that every chapter's example numbers reconcile:
 *  - every journal entry balances
 *  - every trial balance has equal columns
 *  - A = L + E on every balance sheet, and statements link (NI → RE → BS)
 *  - the textbook anchors the chapter declares are reproduced by the model
 *  - chapter-specific invariants hold
 * Run: pnpm validate   (also runs before every Vercel build)
 */
import { chapters } from '../src/lib/content/index';
import { post, statements, trialBalance, entryTotals, fmt } from '../src/lib/ledger/index';

let failures = 0;
let checks = 0;

function ok(label: string) {
	checks++;
	console.log(`  ✓ ${label}`);
}
function fail(label: string) {
	checks++;
	failures++;
	console.log(`  ✗ ${label}`);
}
function eq(label: string, a: number, b: number) {
	if (Math.abs(a - b) < 0.005) ok(`${label}: ${fmt(a)}`);
	else fail(`${label}: expected ${fmt(b)}, got ${fmt(a)}`);
}

for (const ch of Object.values(chapters)) {
	console.log(`\nChapter ${ch.meta.number} — ${ch.meta.title}`);
	for (const ledger of ch.ledgers) {
		console.log(` ${ledger.label}`);
		for (const e of ledger.entries) {
			const t = entryTotals(e);
			if (t.dr === t.cr && t.dr > 0) checks++;
			else fail(`entry ${e.id} unbalanced: Dr ${t.dr} Cr ${t.cr}`);
		}
		ok(`${ledger.entries.length} entries balance`);
		const bal = post(ledger.company.accounts, ledger.entries);
		const tb = trialBalance(bal);
		eq('trial balance Dr = Cr', tb.totalDr, tb.totalCr);
		const s = statements(bal, ledger.company);
		eq('A = L + E', s.balanceSheet.totalAssets, s.balanceSheet.totalLiabilitiesAndEquity);
		eq(
			'NI = revenues − expenses',
			s.income.netIncome,
			s.income.totalRevenues - s.income.totalExpenses
		);
		eq(
			'Ending RE = Beg + NI − Div',
			s.retainedEarnings.ending,
			s.retainedEarnings.beginning + s.retainedEarnings.netIncome - s.retainedEarnings.dividends
		);
		const reOnBS =
			s.balanceSheet.equity.find((l) => l.num === ledger.company.retainedEarningsAcct)?.amount ??
			NaN;
		eq('RE on balance sheet = ending RE', reOnBS, s.retainedEarnings.ending);
		for (const b of bal.values()) {
			if (b.balance < 0)
				fail(`${b.acct.num} ${b.acct.name} has an abnormal balance (${fmt(b.balance)})`);
		}
	}
	console.log(' Textbook anchors');
	for (const a of ch.anchors()) eq(a.label, a.actual, a.expected);
	if (ch.invariants) {
		try {
			ch.invariants();
			ok('chapter invariants');
		} catch (err) {
			fail(`chapter invariant: ${(err as Error).message}`);
		}
	}
}

console.log(`\n${checks} checks, ${failures} failure${failures === 1 ? '' : 's'}`);
if (failures > 0) process.exit(1);
