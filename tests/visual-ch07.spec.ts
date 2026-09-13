/**
 * Chapter 7 screens at 390/768/1440, plus interactive states for its three
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
	{ path: '/ch/7', slug: 'ch7-home' },
	{ path: '/ch/7/learn/receivables-basics', slug: 'ch7-learn-receivables-basics' },
	{ path: '/ch/7/learn/two-methods', slug: 'ch7-learn-two-methods' },
	{ path: '/ch/7/learn/aging', slug: 'ch7-learn-aging' },
	{ path: '/ch/7/learn/sales-vs-receivables', slug: 'ch7-learn-sales-vs-receivables' },
	{ path: '/ch/7/learn/notes-receivable', slug: 'ch7-learn-notes-receivable' },
	{ path: '/ch/7/learn/turnover', slug: 'ch7-learn-turnover' },
	{ path: '/ch/7/lab/aging-schedule', slug: 'ch7-lab-aging-schedule' },
	{ path: '/ch/7/lab/sales-vs-receivables-method', slug: 'ch7-lab-sales-vs-receivables-method' },
	{ path: '/ch/7/lab/note-calculator', slug: 'ch7-lab-note-calculator' },
	{ path: '/ch/7/practice', slug: 'ch7-practice' },
	{ path: '/ch/7/recall', slug: 'ch7-recall' },
	{ path: '/ch/7/notes', slug: 'ch7-notes' },
	{ path: '/ch/7/reference', slug: 'ch7-reference' }
];

async function settle(page: Page) {
	await page.waitForLoadState('networkidle');
	await page.waitForTimeout(250);
}
async function shot(page: Page, slug: string, viewport: string, state = 'initial') {
	await page.screenshot({ path: `${OUT}/${slug}__${viewport}__${state}.png`, fullPage: true });
}

test.describe('@screens ch7 every route, every viewport', () => {
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

test.describe('ch7 interactive states (desktop)', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
	});

	test('aging schedule: move to fully aged, switch to debit balance', async ({ page }) => {
		await page.goto('/ch/7/lab/aging-schedule');
		await settle(page);
		await page.locator('#aging-slider').fill('100');
		await expect(page.getByText('$5,150', { exact: true }).first()).toBeVisible();
		await shot(page, 'ch7-lab-aging-schedule', 'desktop', 'fully-aged');

		await page.getByRole('button', { name: '$350 debit', exact: true }).click();
		await expect(page.getByText('$5,500', { exact: true })).toBeVisible();
		await shot(page, 'ch7-lab-aging-schedule', 'desktop', 'debit-balance');
	});

	test('sales versus receivables method: switch to receivables method', async ({ page }) => {
		await page.goto('/ch/7/lab/sales-vs-receivables-method');
		await settle(page);
		await page.getByRole('button', { name: 'Percent of receivables', exact: true }).click();
		await expect(page.getByText('$5,150', { exact: true }).first()).toBeVisible();
		await shot(page, 'ch7-lab-sales-vs-receivables-method', 'desktop', 'receivables-method');
	});

	test('note calculator: change principal and days', async ({ page }) => {
		await page.goto('/ch/7/lab/note-calculator');
		await settle(page);
		const sliders = page.locator('input[type="range"]');
		await sliders.nth(0).fill('20000');
		await sliders.nth(2).fill('180');
		await expect(page.getByText('$20,000', { exact: true })).toBeVisible();
		await shot(page, 'ch7-lab-note-calculator', 'desktop', 'changed');
	});

	test('practice: asset-effect sort complete', async ({ page }) => {
		await page.goto('/ch/7/practice');
		await settle(page);
		const correctLabels = [
			'Total assets go down',
			'No change in total assets',
			'Total assets go down',
			'No change in total assets',
			'No change in total assets',
			'No change in total assets',
			'Total assets go up',
			'Total assets go up'
		];
		const items = page.locator('ol > li');
		for (let i = 0; i < correctLabels.length; i++) {
			await items.nth(i).getByRole('button', { name: correctLabels[i], exact: true }).click();
		}
		await expect(page.getByText('What you just proved').first()).toBeVisible();
		await shot(page, 'ch7-practice', 'desktop', 'sort-complete');
	});

	test('recall deck: start and answer a card', async ({ page }) => {
		await page.goto('/ch/7/recall');
		await settle(page);
		await page.getByRole('button', { name: 'Start', exact: true }).click();
		await expect(page.locator('.deck')).toBeVisible();
		await shot(page, 'ch7-recall', 'desktop', 'deck-started');
	});
});
