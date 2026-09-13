/**
 * Chapter 11 screens at 390/768/1440, plus interactive states for its three
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
	{ path: '/ch/11', slug: 'ch11-home' },
	{ path: '/ch/11/learn/corporate-organization', slug: 'ch11-learn-corporate-organization' },
	{ path: '/ch/11/learn/equity-composition', slug: 'ch11-learn-equity-composition' },
	{ path: '/ch/11/learn/cash-dividends', slug: 'ch11-learn-cash-dividends' },
	{ path: '/ch/11/learn/stock-dividends-and-splits', slug: 'ch11-learn-stock-dividends-and-splits' },
	{ path: '/ch/11/learn/preferred-dividends', slug: 'ch11-learn-preferred-dividends' },
	{ path: '/ch/11/learn/statement-of-stockholders-equity', slug: 'ch11-learn-statement-of-stockholders-equity' },
	{ path: '/ch/11/learn/per-share-ratios', slug: 'ch11-learn-per-share-ratios' },
	{ path: '/ch/11/lab/equity-composition', slug: 'ch11-lab-equity-composition' },
	{ path: '/ch/11/lab/preferred-dividend-allocator', slug: 'ch11-lab-preferred-dividend-allocator' },
	{ path: '/ch/11/lab/statement-of-stockholders-equity', slug: 'ch11-lab-statement-of-stockholders-equity' },
	{ path: '/ch/11/practice', slug: 'ch11-practice' },
	{ path: '/ch/11/recall', slug: 'ch11-recall' },
	{ path: '/ch/11/notes', slug: 'ch11-notes' },
	{ path: '/ch/11/reference', slug: 'ch11-reference' }
];

async function settle(page: Page) {
	await page.waitForLoadState('networkidle');
	await page.waitForTimeout(250);
}
async function shot(page: Page, slug: string, viewport: string, state = 'initial') {
	await page.screenshot({ path: `${OUT}/${slug}__${viewport}__${state}.png`, fullPage: true });
}

test.describe('@screens ch11 every route, every viewport', () => {
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

test.describe('ch11 interactive states (desktop)', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
	});

	test('equity composition: step to buying treasury shares', async ({ page }) => {
		await page.goto('/ch/11/lab/equity-composition');
		await settle(page);
		const next = page.getByRole('button', { name: 'Next →' });
		for (let i = 0; i < 4; i++) await next.click();
		await expect(page.getByText('$350,000', { exact: true }).first()).toBeVisible();
		await shot(page, 'ch11-lab-equity-composition', 'desktop', 'step-buy-treasury');
	});

	test('preferred dividend allocator: declare $20,000', async ({ page }) => {
		await page.goto('/ch/11/lab/preferred-dividend-allocator');
		await settle(page);
		await page.locator('#declared-slider').fill('20000');
		await expect(page.getByText('$11,000', { exact: true }).first()).toBeVisible();
		await shot(page, 'ch11-lab-preferred-dividend-allocator', 'desktop', 'declared-20000');
	});

	test('statement of stockholders equity: move to the net income row', async ({ page }) => {
		await page.goto('/ch/11/lab/statement-of-stockholders-equity');
		await settle(page);
		await page.locator('#row-slider').fill('6');
		await expect(page.getByText('$216,000', { exact: true }).first()).toBeVisible();
		await shot(page, 'ch11-lab-statement-of-stockholders-equity', 'desktop', 'net-income-row');
	});

	test('practice: equity classification sort complete', async ({ page }) => {
		await page.goto('/ch/11/practice');
		await settle(page);
		const correctLabels = [
			'Total equity goes up',
			'Total equity goes down',
			'No change',
			'No change',
			'No change',
			'Total equity goes down',
			'Total equity goes up',
			'No change',
			'Total equity goes up'
		];
		const items = page.locator('ol > li');
		for (let i = 0; i < correctLabels.length; i++) {
			await items.nth(i).getByRole('button', { name: correctLabels[i], exact: true }).click();
		}
		await expect(page.getByText('What you just proved').first()).toBeVisible();
		await shot(page, 'ch11-practice', 'desktop', 'sort-complete');
	});

	test('recall deck: start and answer a card', async ({ page }) => {
		await page.goto('/ch/11/recall');
		await settle(page);
		await page.getByRole('button', { name: 'Start', exact: true }).click();
		await expect(page.locator('.deck')).toBeVisible();
		await shot(page, 'ch11-recall', 'desktop', 'deck-started');
	});
});
