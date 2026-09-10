/**
 * Renders every stop of every chapter at 390, 768, and 1440 px, drives every
 * instrument and drill, and writes screenshots to docs/screenshots.
 * Each screenshot is looked at by a person before a chapter is called done.
 */
import { test, expect, type Page } from '@playwright/test';

const OUT = 'docs/screenshots';
const widths = [
	{ name: 'mobile', width: 390, height: 844 },
	{ name: 'tablet', width: 768, height: 1024 },
	{ name: 'desktop', width: 1440, height: 900 }
];
const STOPS = [
	's01',
	's02',
	's03',
	's04',
	's05',
	's06',
	's07',
	's08',
	's09',
	's10',
	's11',
	's12',
	's13',
	's14',
	's15',
	's16',
	's17'
];

async function openCh3(page: Page) {
	await page.goto('/ch/3');
	await page.locator('[data-sweep-done="true"]').waitFor();
	await page.waitForTimeout(300);
}
async function stop(page: Page, id: string) {
	await page.evaluate(
		(id) => document.getElementById(id)!.scrollIntoView({ block: 'start', behavior: 'auto' }),
		id
	);
	await page.waitForTimeout(350);
}

test.describe('@screens index and review', () => {
	for (const w of widths) {
		test(`index ${w.name}`, async ({ page }) => {
			await page.setViewportSize({ width: w.width, height: w.height });
			await page.goto('/');
			await page.waitForLoadState('networkidle');
			await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
			await page.screenshot({ path: `${OUT}/index-${w.name}.png`, fullPage: true });
		});
	}
});

test.describe('@screens chapter 3 stops', () => {
	for (const w of widths) {
		test(`ch3 every stop ${w.name}`, async ({ page }) => {
			await page.setViewportSize({ width: w.width, height: w.height });
			await openCh3(page);
			for (const id of STOPS) {
				await stop(page, id);
				await page.screenshot({ path: `${OUT}/ch3-${w.name}-${id}.png` });
			}
			if (w.width >= 900) {
				await expect(page.getByRole('navigation', { name: 'Chapter progress' })).toBeVisible();
				await expect(page.locator('[aria-current="step"]')).toHaveCount(1);
			}
		});
	}
});

test.describe('chapter 3 interactive states (desktop)', () => {
	test('timeline, pin, term capture in place, rail keyboard', async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
		await openCh3(page);

		// Timeline: Dec 20, lane (f): 9 × 90 = 810; pin it
		await page.getByRole('button', { name: /\(f\)\s*Accrued consulting revenue/ }).click();
		await page.locator('#period-end').fill('20');
		await page.waitForTimeout(250);
		await expect(
			page.locator('aside p', { hasText: '9 of 30 days delivered' }).first()
		).toBeVisible();
		await page.getByRole('button', { name: /Pin this state/ }).click();
		await expect(page.getByRole('button', { name: /^Notes, / })).toContainText('1');
		await page.screenshot({ path: `${OUT}/ch3-state-timeline-dec20-f.png` });

		// Rail: J moves to the next stop, click a tick jumps
		await page.keyboard.press('j');
		await page.waitForTimeout(600);
		await expect(page.locator('[aria-current="step"]')).toHaveAttribute(
			'title',
			'Periods, and why the books stop being right'
		);
		await page
			.getByRole('navigation', { name: 'Chapter progress' })
			.getByRole('button', { name: 'Profit margin' })
			.click();
		await page.waitForTimeout(700);
		await expect(page.locator('[aria-current="step"]')).toHaveAttribute('title', 'Profit margin');

		// Term capture in place: click the marked term, write, compare, save both
		await stop(page, 's02');
		await page
			.locator('#s02')
			.getByRole('button', { name: /^fiscal year$/i })
			.click();
		const dlg = page.getByRole('dialog', { name: 'Define Fiscal year' });
		await expect(dlg).toBeVisible();
		await expect(dlg).not.toContainText('twelve consecutive months'); // nothing revealed yet
		await dlg.locator('textarea').fill('Any 12 months a company picks as its reporting year.');
		await dlg.getByRole('button', { name: 'Compare' }).click();
		await expect(dlg).toContainText('twelve consecutive months');
		await page.screenshot({ path: `${OUT}/ch3-state-term-inplace.png` });
		await dlg.getByRole('button', { name: 'Save both' }).click();
		await expect(
			page.locator('#s02 button.term.captured', { hasText: /fiscal year/i })
		).toBeVisible();

		// Go deeper expander
		await page.locator('#s02 summary').click();
		await expect(page.locator('#s02 details')).toHaveAttribute('open', '');
		await page.locator('#s02').screenshot({ path: `${OUT}/ch3-state-deeper.png` });

		// Mnemonic toggle: DEBT always shows its three accounts; DEAD toggles
		await stop(page, 's05');
		await expect(page.locator('#s05')).toContainText('Expenses, Assets, Dividends');
		await page.locator('#s05').getByRole('button', { name: 'DEAD' }).click();
		await expect(page.locator('#s05')).toContainText('D for debits');
		await page.locator('#s05').getByRole('button', { name: 'DEBT' }).click();

		// Sort drill: all eight right → takeaway
		await stop(page, 's06');
		const kinds = [
			'Prepaid expense',
			'Accrued expense',
			'Unearned revenue',
			'Accrued revenue',
			'Prepaid expense',
			'Accrued expense',
			'Unearned revenue',
			'Accrued revenue'
		];
		const items = page.locator('#s06 ol > li');
		for (let i = 0; i < kinds.length; i++)
			await items.nth(i).getByRole('button', { name: kinds[i], exact: true }).click();
		await expect(page.locator('#s06').getByText('What you just proved')).toBeVisible();
		await page.locator('#s06').getByRole('button', { name: 'Keep this' }).click();
		await page.locator('#s06').screenshot({ path: `${OUT}/ch3-state-sort-complete.png` });

		// Entry drill: solve (a) with the generalized entry card; wrong attempt first for the hint path
		await stop(page, 's09');
		const s09 = page.locator('#s09');
		await s09.locator('select').nth(0).selectOption('128');
		await s09.locator('select').nth(1).selectOption('637');
		await s09.locator('input').fill('100');
		await s09.getByRole('button', { name: 'Check entry' }).click();
		await expect(s09.getByText(/credit side of this entry/)).toBeVisible();
		await s09.locator('select').nth(0).selectOption('637');
		await s09.locator('select').nth(1).selectOption('128');
		await s09.getByRole('button', { name: 'Check entry' }).click();
		await expect(s09.getByText('1 of 6 solved')).toBeVisible();
		await s09.screenshot({ path: `${OUT}/ch3-state-entry-drill.png` });

		// A1 selector
		await stop(page, 's10');
		await page.locator('#s10').getByRole('button', { name: 'Accrued expenses' }).click();
		await expect(page.locator('#s10')).toContainText('Salaries Payable shows 0 instead of 210');

		// Worksheet trace (c)
		await stop(page, 's11');
		await page.locator('#s11').getByRole('button', { name: '(c)' }).click();
		await page.locator('#s11').screenshot({ path: `${OUT}/ch3-state-worksheet-c.png` });

		// Statements: keyboard focus on a trial-balance row highlights it
		await stop(page, 's12');
		await page.locator('#s12 tr', { hasText: /^403/ }).first().focus();
		await page.waitForTimeout(150);
		await expect(page.locator('#s12')).toContainText(
			'is a revenue: it lands on the income statement'
		);

		// Profit margin slider → pin appears
		await stop(page, 's13');
		await page.locator('#s13 input[type=range]').first().fill('4000');
		await expect(
			page.locator('#s13').getByRole('button', { name: /Pin this state/ })
		).toBeVisible();

		// Appendix toggle
		await stop(page, 's14');
		await page.locator('#s14').getByRole('button', { name: 'Expense first' }).click();
		await expect(
			page.locator('#s14').getByRole('button', { name: 'Expense first' })
		).toHaveAttribute('aria-pressed', 'true');

		// Quick check: answer one
		await stop(page, 's15');
		await page.locator('#s15 ol > li').first().getByRole('button', { name: '$100' }).click();
		await expect(page.locator('#s15')).toContainText('1 of 1 right');

		// Retrieval deck: start, do one entry card, one classification, one rule, one term
		await stop(page, 's16');
		const deck = page.locator('#s16');
		await expect(deck).toContainText('cards due now');
		await deck.getByRole('button', { name: 'Start', exact: true }).click();
		await expect(deck).toContainText('Journalize it');
		await deck.locator('select').nth(0).selectOption('637');
		await deck.locator('select').nth(1).selectOption('128');
		await deck.locator('input').fill('100');
		await deck.getByRole('button', { name: 'Check entry' }).click();
		await page.waitForTimeout(300);
		await deck.screenshot({ path: `${OUT}/ch3-state-deck-entry.png` });
		// skip through remaining entries via Show me is gated by tries; instead answer the next entry cards correctly by reading targets is unfair — reveal path: two wrong tries then Show me
		for (let n = 0; n < 5; n++) {
			await deck.locator('select').nth(0).selectOption('101');
			await deck.locator('select').nth(1).selectOption('101');
			await deck.locator('input').fill('1');
			await deck.getByRole('button', { name: 'Check entry' }).click();
			await deck.getByRole('button', { name: 'Check entry' }).click();
			await deck.getByRole('button', { name: 'Show me' }).click();
			await page.waitForTimeout(250);
		}
		await expect(deck).toContainText('Which kind?');
		await deck.getByRole('button', { name: 'Prepaid expense', exact: true }).click();
		await deck.getByRole('button', { name: 'Next' }).click();
		await deck.screenshot({ path: `${OUT}/ch3-state-deck-classification.png` });

		// Notes drawer shows the paired term card
		await page.getByRole('button', { name: /^Notes, / }).click();
		await expect(page.getByRole('complementary', { name: /Notes for chapter 3/ })).toContainText(
			'Fiscal year'
		);
		await page.screenshot({ path: `${OUT}/ch3-state-notes-drawer.png` });
		await page.keyboard.press('Escape');

		// /notes groups by objective and links back to the stop; /review lists due cards
		await page.goto('/notes');
		await expect(page.locator('main')).toContainText('C1');
		await expect(page.getByRole('link', { name: 'Back to the stop' }).first()).toHaveAttribute(
			'href',
			/\/ch\/3#s\d\d/
		);
		await page.screenshot({ path: `${OUT}/notes-page.png`, fullPage: true });
		await page.goto('/review');
		await expect(page.getByRole('heading', { level: 1 })).toContainText('cards due');
		await page.screenshot({ path: `${OUT}/review-page.png` });
		await page.goto('/study?ch=3');
		await expect(page.locator('main, .sheet').first()).toContainText('Fiscal year');
		await page.screenshot({ path: `${OUT}/study-sheet.png`, fullPage: true });
	});

	test('ch3 dark mode hero', async ({ page }) => {
		await page.emulateMedia({ colorScheme: 'dark' });
		await page.setViewportSize({ width: 1440, height: 900 });
		await openCh3(page);
		await page.screenshot({ path: `${OUT}/ch3-desktop-dark.png` });
	});
});
