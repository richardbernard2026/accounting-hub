/**
 * Chapter 13 screens at 390/768/1440, plus interactive states for its three
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
	{ path: '/ch/13', slug: 'ch13-home' },
	{ path: '/ch/13/learn/building-blocks', slug: 'ch13-learn-building-blocks' },
	{ path: '/ch/13/learn/three-lenses', slug: 'ch13-learn-three-lenses' },
	{ path: '/ch/13/learn/ratio-builder', slug: 'ch13-learn-ratio-builder' },
	{ path: '/ch/13/learn/solvency', slug: 'ch13-learn-solvency' },
	{ path: '/ch/13/learn/profitability', slug: 'ch13-learn-profitability' },
	{ path: '/ch/13/learn/market-prospects', slug: 'ch13-learn-market-prospects' },
	{ path: '/ch/13/lab/three-lenses', slug: 'ch13-lab-three-lenses' },
	{ path: '/ch/13/lab/ratio-builder', slug: 'ch13-lab-ratio-builder' },
	{ path: '/ch/13/lab/return-on-assets-taken-apart', slug: 'ch13-lab-return-on-assets-taken-apart' },
	{ path: '/ch/13/practice', slug: 'ch13-practice' },
	{ path: '/ch/13/recall', slug: 'ch13-recall' },
	{ path: '/ch/13/notes', slug: 'ch13-notes' },
	{ path: '/ch/13/reference', slug: 'ch13-reference' }
];

async function settle(page: Page) {
	await page.waitForLoadState('networkidle');
	await page.waitForTimeout(250);
}
async function shot(page: Page, slug: string, viewport: string, state = 'initial') {
	await page.screenshot({ path: `${OUT}/${slug}__${viewport}__${state}.png`, fullPage: true });
}

test.describe('@screens ch13 every route, every viewport', () => {
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

test.describe('ch13 interactive states (desktop)', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
	});

	test('three lenses: switch to horizontal', async ({ page }) => {
		await page.goto('/ch/13/lab/three-lenses');
		await settle(page);
		await page.getByRole('button', { name: 'Horizontal', exact: true }).click();
		await expect(page.getByText('24.1%', { exact: true }).first()).toBeVisible();
		await shot(page, 'ch13-lab-three-lenses', 'desktop', 'horizontal');
	});

	test('ratio builder: build the debt ratio', async ({ page }) => {
		await page.goto('/ch/13/lab/ratio-builder');
		await settle(page);
		await page.getByRole('button', { name: 'Debt ratio', exact: true }).click();
		const numeratorSection = page.locator('.kicker:text-is("Numerator") + div');
		const denominatorSection = page.locator('.kicker:text-is("Denominator") + div');
		await numeratorSection.getByRole('button', { name: 'Total liabilities', exact: true }).click();
		await denominatorSection.getByRole('button', { name: 'Total assets', exact: true }).click();
		await expect(page.getByText('$250,000 ÷ $600,000 = 41.7%', { exact: true }).first()).toBeVisible();
		await shot(page, 'ch13-lab-ratio-builder', 'desktop', 'debt-ratio-built');
	});

	test('return on assets taken apart: move both sliders', async ({ page }) => {
		await page.goto('/ch/13/lab/return-on-assets-taken-apart');
		await settle(page);
		await page.locator('#margin-slider').fill('15');
		await page.locator('#turnover-slider').fill('1.5');
		await expect(page.getByText('22.5%', { exact: true }).first()).toBeVisible();
		await shot(page, 'ch13-lab-return-on-assets-taken-apart', 'desktop', 'margin-15-turnover-1.5');
	});

	test('practice: building-block classification sort complete', async ({ page }) => {
		await page.goto('/ch/13/practice');
		await settle(page);
		const correctLabels = [
			'Liquidity and efficiency',
			'Liquidity and efficiency',
			'Liquidity and efficiency',
			'Liquidity and efficiency',
			'Liquidity and efficiency',
			'Liquidity and efficiency',
			'Solvency',
			'Solvency',
			'Solvency',
			'Solvency',
			'Profitability',
			'Profitability',
			'Profitability',
			'Profitability',
			'Market prospects',
			'Market prospects'
		];
		const items = page.locator('ol').first().locator('> li');
		for (let i = 0; i < correctLabels.length; i++) {
			await items.nth(i).getByRole('button', { name: correctLabels[i], exact: true }).click();
		}
		await expect(page.getByText('What you just proved').first()).toBeVisible();
		await shot(page, 'ch13-practice', 'desktop', 'sort-complete');
	});

	test('recall deck: start and answer a card', async ({ page }) => {
		await page.goto('/ch/13/recall');
		await settle(page);
		await page.getByRole('button', { name: 'Start', exact: true }).click();
		await expect(page.locator('.deck')).toBeVisible();
		await shot(page, 'ch13-recall', 'desktop', 'deck-started');
	});
});
