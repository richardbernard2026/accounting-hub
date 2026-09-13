/**
 * Chapter 4 screens at 390/768/1440, plus interactive states for its three
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
	{ path: '/ch/4', slug: 'ch4-home' },
	{ path: '/ch/4/learn/merchandisers', slug: 'ch4-learn-merchandisers' },
	{ path: '/ch/4/learn/purchases', slug: 'ch4-learn-purchases' },
	{ path: '/ch/4/learn/discount-decision', slug: 'ch4-learn-discount-decision' },
	{ path: '/ch/4/learn/sales', slug: 'ch4-learn-sales' },
	{ path: '/ch/4/learn/income-statement', slug: 'ch4-learn-income-statement' },
	{ path: '/ch/4/learn/acid-test', slug: 'ch4-learn-acid-test' },
	{ path: '/ch/4/lab/merchandise-flow', slug: 'ch4-lab-merchandise-flow' },
	{ path: '/ch/4/lab/discount-decision', slug: 'ch4-lab-discount-decision' },
	{ path: '/ch/4/lab/income-statement-formats', slug: 'ch4-lab-income-statement-formats' },
	{ path: '/ch/4/practice', slug: 'ch4-practice' },
	{ path: '/ch/4/recall', slug: 'ch4-recall' },
	{ path: '/ch/4/notes', slug: 'ch4-notes' },
	{ path: '/ch/4/reference', slug: 'ch4-reference' }
];

async function settle(page: Page) {
	await page.waitForLoadState('networkidle');
	await page.waitForTimeout(250);
}
async function shot(page: Page, slug: string, viewport: string, state = 'initial') {
	await page.screenshot({ path: `${OUT}/${slug}__${viewport}__${state}.png`, fullPage: true });
}

test.describe('@screens ch4 every route, every viewport', () => {
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

test.describe('ch4 interactive states (desktop)', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
	});

	test('merchandise flow: buy, pay, sell, return, collect', async ({ page }) => {
		await page.goto('/ch/4/lab/merchandise-flow');
		await settle(page);
		await page.getByRole('button', { name: 'Apply this step' }).click();
		await expect(page.getByText('10 units', { exact: true })).toBeVisible();
		await shot(page, 'ch4-lab-merchandise-flow', 'desktop', 'step-1-bought');

		await page.getByRole('button', { name: 'Next →' }).click(); // move to step 2 (pay)
		await page.getByRole('button', { name: 'Apply this step' }).click();
		await expect(page.getByText('$49 each')).toBeVisible();
		await shot(page, 'ch4-lab-merchandise-flow', 'desktop', 'step-2-paid');

		await page.getByRole('button', { name: 'Next →' }).click(); // move to step 3 (sell)
		await page.getByRole('button', { name: 'Apply this step' }).click();
		await expect(page.getByText('Price entry', { exact: true })).toBeVisible();
		await expect(page.getByText('Cost entry', { exact: true })).toBeVisible();
		await shot(page, 'ch4-lab-merchandise-flow', 'desktop', 'step-3-sold');

		await page.getByRole('button', { name: '5', exact: true }).click();
		await page.getByRole('button', { name: 'Apply this step' }).click();
		await expect(page.getByText('The sale, netted out')).toBeVisible();
		await shot(page, 'ch4-lab-merchandise-flow', 'desktop', 'step-5-done');
	});

	test('discount decision: move payment day to 30', async ({ page }) => {
		await page.goto('/ch/4/lab/discount-decision');
		await settle(page);
		await page.locator('#pay-day-slider').fill('30');
		await expect(page.getByText('37.2%', { exact: true })).toBeVisible();
		await shot(page, 'ch4-lab-discount-decision', 'desktop', 'day-30');
	});

	test('income statement formats: toggle to single-step', async ({ page }) => {
		await page.goto('/ch/4/lab/income-statement-formats');
		await settle(page);
		await page.getByRole('button', { name: 'Single-step' }).click();
		await expect(page.getByText('Revenues (net sales + interest revenue)')).toBeVisible();
		await shot(page, 'ch4-lab-income-statement-formats', 'desktop', 'single-step');
	});

	test('practice: classification drill complete', async ({ page }) => {
		await page.goto('/ch/4/practice');
		await settle(page);
		const correctLabels = [
			'Net sales',
			'Net sales',
			'Cost of goods sold',
			'Cost of goods sold',
			'Selling expense',
			'Selling expense',
			'Selling expense',
			'General and administrative expense',
			'General and administrative expense',
			'Other revenues and gains',
			'Other revenues and gains',
			'Other expenses and losses',
			'Not on the income statement'
		];
		const items = page.locator('ol > li');
		for (let i = 0; i < correctLabels.length; i++) {
			await items.nth(i).getByRole('button', { name: correctLabels[i], exact: true }).click();
		}
		await expect(page.getByText('What you just proved').first()).toBeVisible();
		await shot(page, 'ch4-practice', 'desktop', 'sort-complete');
	});

	test('recall deck: start and answer a card', async ({ page }) => {
		await page.goto('/ch/4/recall');
		await settle(page);
		await page.getByRole('button', { name: 'Start', exact: true }).click();
		await expect(page.locator('.deck')).toBeVisible();
		await shot(page, 'ch4-recall', 'desktop', 'deck-started');
	});
});
