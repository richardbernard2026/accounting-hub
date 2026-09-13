/**
 * Chapter 9 screens at 390/768/1440, plus interactive states for its three
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
	{ path: '/ch/9', slug: 'ch9-home' },
	{ path: '/ch/9/learn/current-liabilities', slug: 'ch9-learn-current-liabilities' },
	{ path: '/ch/9/learn/sales-tax-and-unearned-revenue', slug: 'ch9-learn-sales-tax-and-unearned-revenue' },
	{ path: '/ch/9/learn/payroll', slug: 'ch9-learn-payroll' },
	{ path: '/ch/9/learn/notes-payable', slug: 'ch9-learn-notes-payable' },
	{ path: '/ch/9/learn/warranty', slug: 'ch9-learn-warranty' },
	{ path: '/ch/9/learn/times-interest-earned', slug: 'ch9-learn-times-interest-earned' },
	{ path: '/ch/9/lab/payroll-waterfall', slug: 'ch9-lab-payroll-waterfall' },
	{ path: '/ch/9/lab/warranty-accrual', slug: 'ch9-lab-warranty-accrual' },
	{ path: '/ch/9/lab/note-across-year-end', slug: 'ch9-lab-note-across-year-end' },
	{ path: '/ch/9/practice', slug: 'ch9-practice' },
	{ path: '/ch/9/recall', slug: 'ch9-recall' },
	{ path: '/ch/9/notes', slug: 'ch9-notes' },
	{ path: '/ch/9/reference', slug: 'ch9-reference' }
];

async function settle(page: Page) {
	await page.waitForLoadState('networkidle');
	await page.waitForTimeout(250);
}
async function shot(page: Page, slug: string, viewport: string, state = 'initial') {
	await page.screenshot({ path: `${OUT}/${slug}__${viewport}__${state}.png`, fullPage: true });
}

test.describe('@screens ch9 every route, every viewport', () => {
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

test.describe('ch9 interactive states (desktop)', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
	});

	test('payroll waterfall: move gross pay to 20,000', async ({ page }) => {
		await page.goto('/ch/9/lab/payroll-waterfall');
		await settle(page);
		await page.locator('#gross-pay-slider').fill('20000');
		await expect(page.getByText('$20,000', { exact: true }).first()).toBeVisible();
		await shot(page, 'ch9-lab-payroll-waterfall', 'desktop', 'gross-20000');
	});

	test('warranty accrual: use some repair parts', async ({ page }) => {
		await page.goto('/ch/9/lab/warranty-accrual');
		await settle(page);
		const sliders = page.locator('input[type="range"]');
		await sliders.nth(2).fill('1500');
		await expect(page.getByText('$6,500', { exact: true })).toBeVisible();
		await shot(page, 'ch9-lab-warranty-accrual', 'desktop', 'repairs-1500');
	});

	test('note across year end: move to day 45', async ({ page }) => {
		await page.goto('/ch/9/lab/note-across-year-end');
		await settle(page);
		await page.locator('#year-end-slider').fill('45');
		await expect(page.getByText('$150', { exact: true }).first()).toBeVisible();
		await shot(page, 'ch9-lab-note-across-year-end', 'desktop', 'day-45');
	});

	test('practice: liability classification sort complete', async ({ page }) => {
		await page.goto('/ch/9/practice');
		await settle(page);
		const correctLabels = [
			'Known liability',
			'Known liability',
			'Known liability',
			'Known liability',
			'Known liability',
			'Estimated liability',
			'Estimated liability',
			'Contingent — record it',
			'Contingent — disclose in notes',
			'No entry, no disclosure'
		];
		const items = page.locator('ol > li');
		for (let i = 0; i < correctLabels.length; i++) {
			await items.nth(i).getByRole('button', { name: correctLabels[i], exact: true }).click();
		}
		await expect(page.getByText('What you just proved').first()).toBeVisible();
		await shot(page, 'ch9-practice', 'desktop', 'sort-complete');
	});

	test('recall deck: start and answer a card', async ({ page }) => {
		await page.goto('/ch/9/recall');
		await settle(page);
		await page.getByRole('button', { name: 'Start', exact: true }).click();
		await expect(page.locator('.deck')).toBeVisible();
		await shot(page, 'ch9-recall', 'desktop', 'deck-started');
	});
});
