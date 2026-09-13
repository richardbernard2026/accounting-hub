/**
 * Chapter 12 screens at 390/768/1440, plus interactive states for its three
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
	{ path: '/ch/12', slug: 'ch12-home' },
	{ path: '/ch/12/learn/three-activities', slug: 'ch12-learn-three-activities' },
	{ path: '/ch/12/learn/indirect-method', slug: 'ch12-learn-indirect-method' },
	{ path: '/ch/12/learn/direct-vs-indirect', slug: 'ch12-learn-direct-vs-indirect' },
	{ path: '/ch/12/learn/balance-sheet-change-reader', slug: 'ch12-learn-balance-sheet-change-reader' },
	{ path: '/ch/12/learn/investing-and-financing', slug: 'ch12-learn-investing-and-financing' },
	{ path: '/ch/12/learn/free-cash-flow', slug: 'ch12-learn-free-cash-flow' },
	{ path: '/ch/12/lab/indirect-method-waterfall', slug: 'ch12-lab-indirect-method-waterfall' },
	{ path: '/ch/12/lab/direct-vs-indirect', slug: 'ch12-lab-direct-vs-indirect' },
	{ path: '/ch/12/lab/balance-sheet-change-reader', slug: 'ch12-lab-balance-sheet-change-reader' },
	{ path: '/ch/12/practice', slug: 'ch12-practice' },
	{ path: '/ch/12/recall', slug: 'ch12-recall' },
	{ path: '/ch/12/notes', slug: 'ch12-notes' },
	{ path: '/ch/12/reference', slug: 'ch12-reference' }
];

async function settle(page: Page) {
	await page.waitForLoadState('networkidle');
	await page.waitForTimeout(250);
}
async function shot(page: Page, slug: string, viewport: string, state = 'initial') {
	await page.screenshot({ path: `${OUT}/${slug}__${viewport}__${state}.png`, fullPage: true });
}

test.describe('@screens ch12 every route, every viewport', () => {
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

test.describe('ch12 interactive states (desktop)', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
	});

	test('indirect waterfall: turn off the gain adjustment', async ({ page }) => {
		await page.goto('/ch/12/lab/indirect-method-waterfall');
		await settle(page);
		await page
			.locator('tr', { hasText: 'Subtract gain on retirement of notes' })
			.getByRole('button', { name: 'On', exact: true })
			.click();
		await expect(page.getByText('$36,000', { exact: true }).first()).toBeVisible();
		await shot(page, 'ch12-lab-indirect-method-waterfall', 'desktop', 'gain-off');
	});

	test('direct versus indirect: switch to direct', async ({ page }) => {
		await page.goto('/ch/12/lab/direct-vs-indirect');
		await settle(page);
		await page.getByRole('button', { name: 'Direct', exact: true }).click();
		await expect(page.getByText('$570,000', { exact: true }).first()).toBeVisible();
		await shot(page, 'ch12-lab-direct-vs-indirect', 'desktop', 'direct');
	});

	test('balance sheet change reader: inventory decrease', async ({ page }) => {
		await page.goto('/ch/12/lab/balance-sheet-change-reader');
		await settle(page);
		await page.getByRole('button', { name: 'Merchandise inventory', exact: true }).click();
		await page.getByRole('button', { name: 'Decrease', exact: true }).click();
		await expect(page.getByText('+$1,000', { exact: true }).first()).toBeVisible();
		await shot(page, 'ch12-lab-balance-sheet-change-reader', 'desktop', 'inventory-decrease');
	});

	test('practice: cash flow classification sort complete', async ({ page }) => {
		await page.goto('/ch/12/practice');
		await settle(page);
		const correctLabels = [
			'Operating',
			'Operating',
			'Operating',
			'Operating',
			'Investing',
			'Investing',
			'Investing',
			'Investing',
			'Financing',
			'Financing',
			'Financing',
			'Noncash investing and financing',
			'Noncash investing and financing'
		];
		const items = page.locator('ol').first().locator('> li');
		for (let i = 0; i < correctLabels.length; i++) {
			await items.nth(i).getByRole('button', { name: correctLabels[i], exact: true }).click();
		}
		await expect(page.getByText('What you just proved').first()).toBeVisible();
		await shot(page, 'ch12-practice', 'desktop', 'sort-complete');
	});

	test('recall deck: start and answer a card', async ({ page }) => {
		await page.goto('/ch/12/recall');
		await settle(page);
		await page.getByRole('button', { name: 'Start', exact: true }).click();
		await expect(page.locator('.deck')).toBeVisible();
		await shot(page, 'ch12-recall', 'desktop', 'deck-started');
	});
});
