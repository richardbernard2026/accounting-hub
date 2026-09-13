/**
 * Chapter 6 screens at 390/768/1440, plus interactive states for its three
 * instruments. Filenames follow `<route>__<viewport>__<state>.png` for
 * scripts/contact-sheet.mjs. Nothing here is "done" until every image has a
 * real, looked-at verdict in docs/screenshots/REVIEW.md.
 */
import { test, expect, type Page } from '@playwright/test';

const OUT = 'docs/screenshots';
const VIEWPORTS = [
	{ name: 'mobile', width: 390, height: 844 },
	{ name: 'tablet', width: 768, height: 1024 },
	{ name: 'desktop', width: 1440, height: 900 }
];

const ROUTES: { path: string; slug: string }[] = [
	{ path: '/ch/6', slug: 'ch6-home' },
	{ path: '/ch/6/learn/internal-control', slug: 'ch6-learn-internal-control' },
	{ path: '/ch/6/learn/control-principles', slug: 'ch6-learn-control-principles' },
	{ path: '/ch/6/learn/cash-and-equivalents', slug: 'ch6-learn-cash-and-equivalents' },
	{ path: '/ch/6/learn/petty-cash', slug: 'ch6-learn-petty-cash' },
	{ path: '/ch/6/learn/bank-reconciliation', slug: 'ch6-learn-bank-reconciliation' },
	{ path: '/ch/6/learn/days-sales-uncollected', slug: 'ch6-learn-days-sales-uncollected' },
	{ path: '/ch/6/lab/bank-reconciliation', slug: 'ch6-lab-bank-reconciliation' },
	{ path: '/ch/6/lab/control-failure-diagnostic', slug: 'ch6-lab-control-failure-diagnostic' },
	{ path: '/ch/6/lab/petty-cash-cycle', slug: 'ch6-lab-petty-cash-cycle' },
	{ path: '/ch/6/practice', slug: 'ch6-practice' },
	{ path: '/ch/6/recall', slug: 'ch6-recall' },
	{ path: '/ch/6/notes', slug: 'ch6-notes' },
	{ path: '/ch/6/reference', slug: 'ch6-reference' }
];

async function settle(page: Page) {
	await page.waitForLoadState('networkidle');
	await page.waitForTimeout(250);
}
async function shot(page: Page, slug: string, viewport: string, state = 'initial') {
	await page.screenshot({ path: `${OUT}/${slug}__${viewport}__${state}.png`, fullPage: true });
}

test.describe('@screens ch6 every route, every viewport', () => {
	for (const v of VIEWPORTS) {
		for (const r of ROUTES) {
			test(`${r.slug} ${v.name}`, async ({ page }) => {
				await page.setViewportSize({ width: v.width, height: v.height });
				await page.goto(r.path);
				await settle(page);
				await shot(page, r.slug, v.name);
			});
		}
	}
});

test.describe('ch6 interactive states (desktop)', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
	});

	test('bank reconciliation: sort all seven items', async ({ page }) => {
		await page.goto('/ch/6/lab/bank-reconciliation');
		await settle(page);
		// Items are processed top-to-bottom in the same order as reconItems; clicking
		// the correct side for whichever item is currently first always succeeds and
		// removes it from the unsorted tray, so `.first()` always targets the next one.
		const sides = ['Bank side', 'Bank side', 'Book side', 'Book side', 'Book side', 'Book side', 'Book side'];
		for (const side of sides) {
			await page.getByRole('button', { name: side, exact: true }).first().click();
		}
		await expect(page.getByText('Matched: $1,695 = $1,695')).toBeVisible();
		await shot(page, 'ch6-lab-bank-reconciliation', 'desktop', 'all-sorted');
	});

	test('control failure diagnostic: answer first scenario', async ({ page }) => {
		await page.goto('/ch/6/lab/control-failure-diagnostic');
		await settle(page);
		await page.getByRole('button', { name: 'Establish responsibilities', exact: true }).click();
		await expect(page.getByText('Right.')).toBeVisible();
		await shot(page, 'ch6-lab-control-failure-diagnostic', 'desktop', 'first-answered');
	});

	test('petty cash cycle: apply all three steps', async ({ page }) => {
		await page.goto('/ch/6/lab/petty-cash-cycle');
		await settle(page);
		for (let i = 0; i < 3; i++) {
			await page.getByRole('button', { name: 'Apply this step' }).click();
			if (i < 2) await page.getByRole('button', { name: 'Next →' }).click();
		}
		await expect(page.getByText('Receipts and shortage')).toBeVisible();
		await shot(page, 'ch6-lab-petty-cash-cycle', 'desktop', 'all-applied');
	});

	test('practice: reconciliation sort complete', async ({ page }) => {
		await page.goto('/ch/6/practice');
		await settle(page);
		const correctLabels = [
			'Add to bank balance',
			'Subtract from bank balance',
			'Add to bank balance',
			'Add to book balance (entry)',
			'Add to book balance (entry)',
			'Subtract from book balance (entry)',
			'Subtract from book balance (entry)',
			'Add to book balance (entry)',
			'Add to book balance (entry)'
		];
		const items = page.locator('ol > li');
		for (let i = 0; i < correctLabels.length; i++) {
			await items.nth(i).getByRole('button', { name: correctLabels[i], exact: true }).click();
		}
		await expect(page.getByText('What you just proved').first()).toBeVisible();
		await shot(page, 'ch6-practice', 'desktop', 'sort-complete');
	});

	test('recall deck: start and answer a card', async ({ page }) => {
		await page.goto('/ch/6/recall');
		await settle(page);
		await page.getByRole('button', { name: 'Start', exact: true }).click();
		await expect(page.locator('.deck')).toBeVisible();
		await shot(page, 'ch6-recall', 'desktop', 'deck-started');
	});
});
