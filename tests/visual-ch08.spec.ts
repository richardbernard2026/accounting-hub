/**
 * Chapter 8 screens at 390/768/1440, plus interactive states for its three
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
	{ path: '/ch/8', slug: 'ch8-home' },
	{ path: '/ch/8/learn/plant-assets-and-cost', slug: 'ch8-learn-plant-assets-and-cost' },
	{ path: '/ch/8/learn/expenditures', slug: 'ch8-learn-expenditures' },
	{ path: '/ch/8/learn/depreciation-methods', slug: 'ch8-learn-depreciation-methods' },
	{ path: '/ch/8/learn/disposals', slug: 'ch8-learn-disposals' },
	{ path: '/ch/8/learn/change-in-estimate', slug: 'ch8-learn-change-in-estimate' },
	{ path: '/ch/8/learn/natural-resources-and-intangibles', slug: 'ch8-learn-natural-resources-and-intangibles' },
	{ path: '/ch/8/learn/turnover', slug: 'ch8-learn-turnover' },
	{ path: '/ch/8/lab/depreciation-curves', slug: 'ch8-lab-depreciation-curves' },
	{ path: '/ch/8/lab/disposal', slug: 'ch8-lab-disposal' },
	{ path: '/ch/8/lab/change-in-estimate', slug: 'ch8-lab-change-in-estimate' },
	{ path: '/ch/8/practice', slug: 'ch8-practice' },
	{ path: '/ch/8/recall', slug: 'ch8-recall' },
	{ path: '/ch/8/notes', slug: 'ch8-notes' },
	{ path: '/ch/8/reference', slug: 'ch8-reference' }
];

async function settle(page: Page) {
	await page.waitForLoadState('networkidle');
	await page.waitForTimeout(250);
}
async function shot(page: Page, slug: string, viewport: string, state = 'initial') {
	await page.screenshot({ path: `${OUT}/${slug}__${viewport}__${state}.png`, fullPage: true });
}

test.describe('@screens ch8 every route, every viewport', () => {
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

test.describe('ch8 interactive states (desktop)', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
	});

	test('depreciation curves: switch to double-declining-balance and book value', async ({ page }) => {
		await page.goto('/ch/8/lab/depreciation-curves');
		await settle(page);
		await page.getByRole('button', { name: 'Double-declining-balance', exact: true }).click();
		await expect(page.getByText('$4,000', { exact: true })).toBeVisible();
		await page.waitForTimeout(250); // let the button's transition-colors settle before capturing
		await shot(page, 'ch8-lab-depreciation-curves', 'desktop', 'ddb-expense');

		await page.getByRole('button', { name: 'Book value', exact: true }).click();
		await expect(page.getByText('Salvage value').first()).toBeVisible();
		await shot(page, 'ch8-lab-depreciation-curves', 'desktop', 'ddb-book-value');
	});

	test('disposal: move the sale price to 4,000', async ({ page }) => {
		await page.goto('/ch/8/lab/disposal');
		await settle(page);
		await page.locator('#proceeds-slider').fill('4000');
		await expect(page.getByText('Loss', { exact: true })).toBeVisible();
		await shot(page, 'ch8-lab-disposal', 'desktop', 'loss-4000');
	});

	test('change in estimate: move remaining life and salvage', async ({ page }) => {
		await page.goto('/ch/8/lab/change-in-estimate');
		await settle(page);
		const sliders = page.locator('input[type="range"]');
		await sliders.nth(0).fill('2');
		await sliders.nth(1).fill('0');
		await expect(page.getByText('$3,200', { exact: true }).first()).toBeVisible();
		await shot(page, 'ch8-lab-change-in-estimate', 'desktop', 'changed');
	});

	test('practice: capitalize-or-expense sort complete', async ({ page }) => {
		await page.goto('/ch/8/practice');
		await settle(page);
		const correctLabels = [
			"Add to the asset's cost",
			"Add to the asset's cost",
			"Add to the asset's cost",
			'Expense it now',
			'Expense it now',
			'Expense it now',
			"Add to the asset's cost",
			"Add to the asset's cost",
			"Add to the asset's cost",
			"Add to the asset's cost",
			'Expense it now'
		];
		const items = page.locator('ol > li');
		for (let i = 0; i < correctLabels.length; i++) {
			await items.nth(i).getByRole('button', { name: correctLabels[i], exact: true }).click();
		}
		await expect(page.getByText('What you just proved').first()).toBeVisible();
		await shot(page, 'ch8-practice', 'desktop', 'sort-complete');
	});

	test('recall deck: start and answer a card', async ({ page }) => {
		await page.goto('/ch/8/recall');
		await settle(page);
		await page.getByRole('button', { name: 'Start', exact: true }).click();
		await expect(page.locator('.deck')).toBeVisible();
		await shot(page, 'ch8-recall', 'desktop', 'deck-started');
	});
});
