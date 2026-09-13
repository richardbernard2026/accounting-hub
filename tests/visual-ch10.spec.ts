/**
 * Chapter 10 screens at 390/768/1440, plus interactive states for its three
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
	{ path: '/ch/10', slug: 'ch10-home' },
	{ path: '/ch/10/learn/discount-par-premium', slug: 'ch10-learn-discount-par-premium' },
	{ path: '/ch/10/learn/pricing-a-bond', slug: 'ch10-learn-pricing-a-bond' },
	{ path: '/ch/10/learn/straight-line-amortization', slug: 'ch10-learn-straight-line-amortization' },
	{ path: '/ch/10/learn/effective-interest-amortization', slug: 'ch10-learn-effective-interest-amortization' },
	{ path: '/ch/10/learn/installment-notes', slug: 'ch10-learn-installment-notes' },
	{ path: '/ch/10/learn/early-retirement', slug: 'ch10-learn-early-retirement' },
	{ path: '/ch/10/learn/debt-to-equity', slug: 'ch10-learn-debt-to-equity' },
	{ path: '/ch/10/lab/bond-price-and-carrying-value', slug: 'ch10-lab-bond-price-and-carrying-value' },
	{ path: '/ch/10/lab/installment-note-schedule', slug: 'ch10-lab-installment-note-schedule' },
	{ path: '/ch/10/lab/early-retirement', slug: 'ch10-lab-early-retirement' },
	{ path: '/ch/10/practice', slug: 'ch10-practice' },
	{ path: '/ch/10/recall', slug: 'ch10-recall' },
	{ path: '/ch/10/notes', slug: 'ch10-notes' },
	{ path: '/ch/10/reference', slug: 'ch10-reference' }
];

async function settle(page: Page) {
	await page.waitForLoadState('networkidle');
	await page.waitForTimeout(250);
}
async function shot(page: Page, slug: string, viewport: string, state = 'initial') {
	await page.screenshot({ path: `${OUT}/${slug}__${viewport}__${state}.png`, fullPage: true });
}

test.describe('@screens ch10 every route, every viewport', () => {
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

test.describe('ch10 interactive states (desktop)', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
	});

	test('bond price and carrying value: move market rate to 10%', async ({ page }) => {
		await page.goto('/ch/10/lab/bond-price-and-carrying-value');
		await settle(page);
		await page.locator('#market-rate-slider').fill('10');
		await expect(page.getByText('$93,537', { exact: true }).first()).toBeVisible();
		await shot(page, 'ch10-lab-bond-price-and-carrying-value', 'desktop', 'market-10');
	});

	test('installment note schedule: move to payment 3', async ({ page }) => {
		await page.goto('/ch/10/lab/installment-note-schedule');
		await settle(page);
		await page.locator('#payment-slider').fill('3');
		await expect(page.getByText('$0', { exact: true }).first()).toBeVisible();
		await shot(page, 'ch10-lab-installment-note-schedule', 'desktop', 'payment-3');
	});

	test('early retirement: call at 103,000', async ({ page }) => {
		await page.goto('/ch/10/lab/early-retirement');
		await settle(page);
		await page.locator('#call-price-slider').fill('103000');
		await expect(page.getByText('$7,000', { exact: true }).first()).toBeVisible();
		await shot(page, 'ch10-lab-early-retirement', 'desktop', 'call-103000');
	});

	test('practice: bond pricing classification sort complete', async ({ page }) => {
		await page.goto('/ch/10/practice');
		await settle(page);
		const correctLabels = [
			'Sells at a discount',
			'Sells at a premium',
			'Sells at par',
			'Sells at a discount',
			'Sells at a premium',
			'Sells at a discount',
			'Sells at a discount',
			'Sells at a premium'
		];
		const items = page.locator('ol > li');
		for (let i = 0; i < correctLabels.length; i++) {
			await items.nth(i).getByRole('button', { name: correctLabels[i], exact: true }).click();
		}
		await expect(page.getByText('What you just proved').first()).toBeVisible();
		await shot(page, 'ch10-practice', 'desktop', 'sort-complete');
	});

	test('recall deck: start and answer a card', async ({ page }) => {
		await page.goto('/ch/10/recall');
		await settle(page);
		await page.getByRole('button', { name: 'Start', exact: true }).click();
		await expect(page.locator('.deck')).toBeVisible();
		await shot(page, 'ch10-recall', 'desktop', 'deck-started');
	});
});
