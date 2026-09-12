/**
 * Captures every module route at 390, 768, and 1440px, then drives the
 * interactive states (term capture, pins, drills, hover). Filenames follow
 * `<route>__<viewport>__<state>.png` so scripts/contact-sheet.mjs can group
 * and label them. Nothing here is "done" until a person has looked at every
 * image and written a verdict — see .claude/skills/visual-review/SKILL.md.
 */
import { test, expect, type Page } from '@playwright/test';

const OUT = 'docs/screenshots';
const VIEWPORTS = [
	{ name: 'mobile', width: 390, height: 844 },
	{ name: 'tablet', width: 768, height: 1024 },
	{ name: 'desktop', width: 1440, height: 900 }
];

/** Every route SPEC-v3 §8 requires a capture of, one row per module. */
const ROUTES: { path: string; slug: string }[] = [
	{ path: '/', slug: 'index' },
	{ path: '/review', slug: 'review' },
	{ path: '/notes', slug: 'all-notes' },
	{ path: '/study', slug: 'study-sheet' },
	{ path: '/ch/3', slug: 'ch3-home' },
	{ path: '/ch/3/learn/periods', slug: 'ch3-learn-periods' },
	{ path: '/ch/3/learn/types', slug: 'ch3-learn-types' },
	{ path: '/ch/3/learn/entries', slug: 'ch3-learn-entries' },
	{ path: '/ch/3/learn/skipped', slug: 'ch3-learn-skipped' },
	{ path: '/ch/3/learn/statements', slug: 'ch3-learn-statements' },
	{ path: '/ch/3/learn/margin', slug: 'ch3-learn-margin' },
	{ path: '/ch/3/learn/appendix', slug: 'ch3-learn-appendix' },
	{ path: '/ch/3/lab/timeline', slug: 'ch3-lab-timeline' },
	{ path: '/ch/3/lab/worksheet', slug: 'ch3-lab-worksheet' },
	{ path: '/ch/3/lab/statement-links', slug: 'ch3-lab-statement-links' },
	{ path: '/ch/3/lab/accrual-vs-cash', slug: 'ch3-lab-accrual-vs-cash' },
	{ path: '/ch/3/lab/profit-margin', slug: 'ch3-lab-profit-margin' },
	{ path: '/ch/3/lab/prepaid-alternatives', slug: 'ch3-lab-prepaid-alternatives' },
	{ path: '/ch/3/practice', slug: 'ch3-practice' },
	{ path: '/ch/3/recall', slug: 'ch3-recall' },
	{ path: '/ch/3/notes', slug: 'ch3-notes' },
	{ path: '/ch/3/reference', slug: 'ch3-reference' }
];

async function settle(page: Page) {
	await page.waitForLoadState('networkidle');
	await page.waitForTimeout(250);
}
async function shot(page: Page, slug: string, viewport: string, state = 'initial') {
	await page.screenshot({ path: `${OUT}/${slug}__${viewport}__${state}.png`, fullPage: true });
}

test.describe('@screens every route, every viewport', () => {
	for (const v of VIEWPORTS) {
		for (const r of ROUTES) {
			test(`${r.slug} ${v.name}`, async ({ page }) => {
				await page.setViewportSize({ width: v.width, height: v.height });
				await page.goto(r.path);
				// The adjustment timeline sweeps on mount wherever it's embedded (chapter
				// home, lab, and the "types" lesson) — wait for it so screens don't catch
				// an arbitrary mid-animation frame.
				await page.locator('[data-sweep-done="true"]').waitFor({ timeout: 10_000 }).catch(() => {});
				await settle(page);
				await shot(page, r.slug, v.name);
			});
		}
	}
});

test.describe('interactive states (desktop)', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
	});

	test('lab timeline: scrub, pin, dark mode', async ({ page }) => {
		await page.goto('/ch/3/lab/timeline');
		await page.locator('[data-sweep-done="true"]').waitFor();
		await settle(page);
		await page.getByRole('button', { name: /\(f\)\s*Accrued consulting revenue/ }).click();
		await page.locator('#period-end').fill('20');
		await page.waitForTimeout(250);
		await expect(page.locator('aside p', { hasText: '9 of 30 days delivered' }).first()).toBeVisible();
		await shot(page, 'ch3-lab-timeline', 'desktop', 'dec20-lane-f');
		await page.getByRole('button', { name: /Pin this state/ }).click();
		await expect(page.locator('header').getByRole('link', { name: /^Notes/ })).toContainText('1');
		await shot(page, 'ch3-lab-timeline', 'desktop', 'pinned');

		await page.emulateMedia({ colorScheme: 'dark' });
		await page.reload();
		await page.locator('[data-sweep-done="true"]').waitFor();
		await settle(page);
		await shot(page, 'ch3-lab-timeline', 'desktop', 'dark');
		await page.emulateMedia({ colorScheme: 'light' });
	});

	test('lab accrual-vs-cash: select a year', async ({ page }) => {
		await page.goto('/ch/3/lab/accrual-vs-cash');
		await settle(page);
		await page.getByRole('button', { name: '2026', exact: true }).click();
		await expect(page.getByText('the accrual basis charges only')).toBeVisible();
		await shot(page, 'ch3-lab-accrual-vs-cash', 'desktop', 'year-2026-selected');
	});

	test('lab worksheet: trace an adjustment', async ({ page }) => {
		await page.goto('/ch/3/lab/worksheet');
		await settle(page);
		await page.getByRole('button', { name: '(c)', exact: true }).click();
		await expect(page.getByText('Adjustment (c)')).toBeVisible();
		await shot(page, 'ch3-lab-worksheet', 'desktop', 'trace-c');
	});

	test('lab statement-links: hover a line', async ({ page }) => {
		await page.goto('/ch/3/lab/statement-links');
		await settle(page);
		await page.locator('tr', { hasText: /^403/ }).first().hover();
		await page.waitForTimeout(150);
		await expect(page.getByText('is a revenue: it lands on the income statement')).toBeVisible();
		await shot(page, 'ch3-lab-statement-links', 'desktop', 'hover-403');
	});

	test('lab profit-margin: move the sliders', async ({ page }) => {
		await page.goto('/ch/3/lab/profit-margin');
		await settle(page);
		await page.locator('input[type=range]').first().fill('4000');
		await expect(page.getByRole('button', { name: /Pin this state/ })).toBeVisible();
		await shot(page, 'ch3-lab-profit-margin', 'desktop', 'moved');
	});

	test('lab prepaid-alternatives: switch to expense-first', async ({ page }) => {
		await page.goto('/ch/3/lab/prepaid-alternatives');
		await settle(page);
		const dec26Debit = page
			.locator('.eyebrow', { hasText: 'Dec 26' })
			.locator('xpath=following-sibling::*[1]')
			.locator('td.dr:not(.amt)');
		await expect(dec26Debit).toHaveText('Prepaid insurance');
		await page.getByRole('button', { name: 'Expense first' }).click();
		await expect(dec26Debit).toHaveText('Insurance expense');
		await shot(page, 'ch3-lab-prepaid-alternatives', 'desktop', 'expense-first');
	});

	test('learn: term capture in place, previous/next', async ({ page }) => {
		await page.goto('/ch/3/learn/periods');
		await settle(page);
		await page.getByRole('button', { name: /^fiscal year$/i }).first().click();
		const dlg = page.getByRole('dialog', { name: 'Define Fiscal year' });
		await expect(dlg).toBeVisible();
		await expect(dlg).not.toContainText('twelve consecutive months');
		await shot(page, 'ch3-learn-periods', 'desktop', 'term-panel-open');
		await dlg.locator('textarea').fill('Any 12 months a company picks as its reporting year.');
		await dlg.getByRole('button', { name: 'Compare' }).click();
		await expect(dlg).toContainText('twelve consecutive months');
		await dlg.getByRole('button', { name: 'Save both' }).click();
		await page.waitForTimeout(500);
		await expect(page.locator('header').getByRole('link', { name: /^Notes/ })).toContainText('1');
		await page.getByRole('link', { name: /The four types of adjustments →/ }).click();
		await settle(page);
		await expect(page).toHaveURL(/\/ch\/3\/learn\/types$/);
		await page.locator('[data-sweep-done="true"]').waitFor({ timeout: 10_000 }).catch(() => {});
		await shot(page, 'ch3-learn-types', 'desktop', 'via-next-nav');
	});

	test('learn: select a sentence to capture a line', async ({ page }) => {
		await page.goto('/ch/3/learn/types');
		await page.locator('[data-sweep-done="true"]').waitFor({ timeout: 10_000 }).catch(() => {});
		await settle(page);
		const p = page.locator('.prose-col p').first();
		await p.scrollIntoViewIfNeeded();
		const box = (await p.boundingBox())!;
		await page.mouse.move(box.x + 2, box.y + 8);
		await page.mouse.down();
		await page.mouse.move(box.x + box.width * 0.6, box.y + 8, { steps: 8 });
		await page.mouse.up();
		await page.waitForTimeout(400);
		await expect(page.getByRole('dialog', { name: 'Save a note' })).toBeVisible();
		await shot(page, 'ch3-learn-types', 'desktop', 'line-capture-popover');
	});

	test('go deeper expander', async ({ page }) => {
		await page.goto('/ch/3/learn/periods');
		await settle(page);
		await page.locator('summary').click();
		await expect(page.locator('details')).toHaveAttribute('open', '');
		await shot(page, 'ch3-learn-periods', 'desktop', 'go-deeper-open');
	});

	test('learn what-goes-wrong: switch category', async ({ page }) => {
		await page.goto('/ch/3/learn/skipped');
		await settle(page);
		await page.getByRole('button', { name: 'Accrued expense', exact: true }).click();
		await expect(page.getByText('Salaries Payable shows 0 instead of 210')).toBeVisible();
		await shot(page, 'ch3-learn-skipped', 'desktop', 'accrued-expense-selected');
	});

	test('practice: sort drill complete, entry drill in progress', async ({ page }) => {
		await page.goto('/ch/3/practice');
		await settle(page);
		const answers = ['Prepaid expense', 'Accrued expense', 'Unearned revenue', 'Accrued revenue', 'Prepaid expense', 'Accrued expense', 'Unearned revenue', 'Accrued revenue'];
		const items = page.locator('ol > li');
		for (let i = 0; i < answers.length; i++) {
			await items.nth(i).getByRole('button', { name: answers[i], exact: true }).click();
		}
		await expect(page.getByText('What you just proved').first()).toBeVisible();
		await shot(page, 'ch3-practice', 'desktop', 'sort-complete');

		await page.locator('select').nth(0).selectOption('637');
		await page.locator('select').nth(1).selectOption('128');
		await page.locator('input').first().fill('100');
		await page.getByRole('button', { name: 'Check entry' }).click();
		await expect(page.getByText('1 of 6 solved')).toBeVisible();
		await shot(page, 'ch3-practice', 'desktop', 'entry-solved-1');
	});

	test('recall deck: start and answer an entry card', async ({ page }) => {
		await page.goto('/ch/3/recall');
		await settle(page);
		await page.getByRole('button', { name: 'Start', exact: true }).click();
		await expect(page.getByText('Journalize it')).toBeVisible();
		await shot(page, 'ch3-recall', 'desktop', 'deck-started');
	});

	test('reference: write a term inline', async ({ page }) => {
		await page.goto('/ch/3/reference');
		await settle(page);
		await page.getByRole('button', { name: 'Write it in your words' }).first().click();
		await page.locator('textarea').first().fill('An accounting period that need not follow the calendar.');
		await shot(page, 'ch3-reference', 'desktop', 'term-inline-capture');
	});

	test('notes page groups by objective with a link back', async ({ page }) => {
		await page.goto('/ch/3/lab/worksheet');
		await settle(page);
		await page.getByRole('button', { name: '(a)', exact: true }).click();
		await page.getByRole('button', { name: /Pin this state/ }).click();
		await page.goto('/ch/3/notes');
		await settle(page);
		await expect(page.getByRole('link', { name: 'Back to this screen' }).first()).toHaveAttribute(
			'href',
			'/ch/3/lab/worksheet'
		);
		await shot(page, 'ch3-notes', 'desktop', 'grouped-with-backlinks');
	});

	test('chapter home: progress badges after activity', async ({ page }) => {
		await page.goto('/ch/3/learn/periods');
		await settle(page);
		await page.goto('/ch/3');
		await settle(page);
		await shot(page, 'ch3-home', 'desktop', 'after-one-lesson');
	});
});
