/**
 * Chapter 5 screens at 390/768/1440, plus interactive states for its three
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
	{ path: '/ch/5', slug: 'ch5-home' },
	{ path: '/ch/5/learn/costing-methods', slug: 'ch5-learn-costing-methods' },
	{ path: '/ch/5/learn/cost-layers', slug: 'ch5-learn-cost-layers' },
	{ path: '/ch/5/learn/what-counts', slug: 'ch5-learn-what-counts' },
	{ path: '/ch/5/learn/inventory-errors', slug: 'ch5-learn-inventory-errors' },
	{ path: '/ch/5/learn/lower-of-cost-or-market', slug: 'ch5-learn-lower-of-cost-or-market' },
	{ path: '/ch/5/learn/turnover', slug: 'ch5-learn-turnover' },
	{ path: '/ch/5/lab/cost-layers', slug: 'ch5-lab-cost-layers' },
	{ path: '/ch/5/lab/inventory-error-seesaw', slug: 'ch5-lab-inventory-error-seesaw' },
	{ path: '/ch/5/lab/lower-of-cost-or-market', slug: 'ch5-lab-lower-of-cost-or-market' },
	{ path: '/ch/5/practice', slug: 'ch5-practice' },
	{ path: '/ch/5/recall', slug: 'ch5-recall' },
	{ path: '/ch/5/notes', slug: 'ch5-notes' },
	{ path: '/ch/5/reference', slug: 'ch5-reference' }
];

async function settle(page: Page) {
	await page.waitForLoadState('networkidle');
	await page.waitForTimeout(250);
}
async function shot(page: Page, slug: string, viewport: string, state = 'initial') {
	await page.screenshot({ path: `${OUT}/${slug}__${viewport}__${state}.png`, fullPage: true });
}

test.describe('@screens ch5 every route, every viewport', () => {
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

test.describe('ch5 interactive states (desktop)', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
	});

	test('cost layers: apply all six transactions, switch method', async ({ page }) => {
		await page.goto('/ch/5/lab/cost-layers');
		await settle(page);
		for (let i = 0; i < 6; i++) {
			await page.getByRole('button', { name: 'Apply this transaction' }).click();
			if (i < 5) await page.getByRole('button', { name: 'Next →' }).click();
		}
		await expect(page.getByText('Goods available for sale, every method:')).toBeVisible();
		await shot(page, 'ch5-lab-cost-layers', 'desktop', 'all-applied-fifo');

		await page.getByRole('button', { name: 'LIFO', exact: true }).click();
		await expect(page.getByRole('button', { name: 'LIFO', exact: true })).toHaveAttribute('aria-pressed', 'true');
		await page.waitForTimeout(250); // let the button's transition-colors settle before capturing
		await shot(page, 'ch5-lab-cost-layers', 'desktop', 'all-applied-lifo');
	});

	test('inventory error see-saw: move the overstatement to 4000', async ({ page }) => {
		await page.goto('/ch/5/lab/inventory-error-seesaw');
		await settle(page);
		await page.locator('#overstatement-slider').fill('4000');
		await expect(page.getByText('+$4,000')).toBeVisible();
		await shot(page, 'ch5-lab-inventory-error-seesaw', 'desktop', 'overstatement-4000');
	});

	test('lower of cost or market: drop the market price to 17', async ({ page }) => {
		await page.goto('/ch/5/lab/lower-of-cost-or-market');
		await settle(page);
		await page.locator('#market-slider').fill('17');
		await expect(page.getByText('+$300', { exact: true })).toBeVisible();
		await shot(page, 'ch5-lab-lower-of-cost-or-market', 'desktop', 'market-17');
	});

	test('practice: ownership sort complete', async ({ page }) => {
		await page.goto('/ch/5/practice');
		await settle(page);
		const correctLabels = [
			'Count it in our inventory',
			'Leave it out',
			'Leave it out',
			'Count it in our inventory',
			'Count it in our inventory',
			'Leave it out',
			'Count it in our inventory'
		];
		const items = page.locator('ol > li');
		for (let i = 0; i < correctLabels.length; i++) {
			await items.nth(i).getByRole('button', { name: correctLabels[i], exact: true }).click();
		}
		await expect(page.getByText('What you just proved').first()).toBeVisible();
		await shot(page, 'ch5-practice', 'desktop', 'sort-complete');
	});

	test('recall deck: start and answer a card', async ({ page }) => {
		await page.goto('/ch/5/recall');
		await settle(page);
		await page.getByRole('button', { name: 'Start', exact: true }).click();
		await expect(page.locator('.deck')).toBeVisible();
		await shot(page, 'ch5-recall', 'desktop', 'deck-started');
	});
});
