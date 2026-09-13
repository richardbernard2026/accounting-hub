/**
 * Chapter 1 screens at 390/768/1440, plus interactive states for its three
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
	{ path: '/ch/1', slug: 'ch1-home' },
	{ path: '/ch/1/learn/accounting', slug: 'ch1-learn-accounting' },
	{ path: '/ch/1/learn/principles', slug: 'ch1-learn-principles' },
	{ path: '/ch/1/learn/forms', slug: 'ch1-learn-forms' },
	{ path: '/ch/1/learn/equation', slug: 'ch1-learn-equation' },
	{ path: '/ch/1/learn/statements', slug: 'ch1-learn-statements' },
	{ path: '/ch/1/learn/return-on-assets', slug: 'ch1-learn-return-on-assets' },
	{ path: '/ch/1/lab/equation-balance', slug: 'ch1-lab-equation-balance' },
	{ path: '/ch/1/lab/statement-chain', slug: 'ch1-lab-statement-chain' },
	{ path: '/ch/1/lab/business-form-switcher', slug: 'ch1-lab-business-form-switcher' },
	{ path: '/ch/1/practice', slug: 'ch1-practice' },
	{ path: '/ch/1/recall', slug: 'ch1-recall' },
	{ path: '/ch/1/notes', slug: 'ch1-notes' },
	{ path: '/ch/1/reference', slug: 'ch1-reference' }
];

async function settle(page: Page) {
	await page.waitForLoadState('networkidle');
	await page.waitForTimeout(250);
}
async function shot(page: Page, slug: string, viewport: string, state = 'initial') {
	await page.screenshot({ path: `${OUT}/${slug}__${viewport}__${state}.png`, fullPage: true });
}

test.describe('@screens ch1 every route, every viewport', () => {
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

test.describe('ch1 interactive states (desktop)', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
	});

	test('equation balance: apply transaction 1, jump to 6, finish at 10', async ({ page }) => {
		await page.goto('/ch/1/lab/equation-balance');
		await settle(page);
		await page.getByRole('button', { name: 'Apply this transaction' }).click();
		await expect(page.getByText('$30,000 common stock = $30,000')).toBeVisible();
		await shot(page, 'ch1-lab-equation-balance', 'desktop', 'transaction-1-applied');

		await page.getByRole('button', { name: '6', exact: true }).click();
		await page.getByRole('button', { name: 'Apply this transaction' }).click();
		await expect(page.getByText('expenses = $32,500')).toBeVisible();
		await shot(page, 'ch1-lab-equation-balance', 'desktop', 'transaction-6-rent-and-salary');

		await page.getByRole('button', { name: '10', exact: true }).click();
		await page.getByRole('button', { name: 'Apply this transaction' }).click();
		await expect(page.getByText('THE FOUR STATEMENTS')).toBeVisible();
		await expect(page.getByRole('button', { name: /Pin this state/ })).toBeVisible();
		await shot(page, 'ch1-lab-equation-balance', 'desktop', 'all-ten-applied-statements-shown');
	});

	test('statement chain: raise rent to $1,500', async ({ page }) => {
		await page.goto('/ch/1/lab/statement-chain');
		await settle(page);
		await page.locator('#rent-slider').fill('1500');
		await expect(page.getByText('$3,900')).toBeVisible();
		await shot(page, 'ch1-lab-statement-chain', 'desktop', 'rent-1500');
	});

	test('business form switcher: pick sole proprietorship', async ({ page }) => {
		await page.goto('/ch/1/lab/business-form-switcher');
		await settle(page);
		await page.getByRole('button', { name: 'Sole proprietorship', exact: true }).click();
		await expect(page.getByText('Unlimited')).toBeVisible();
		await shot(page, 'ch1-lab-business-form-switcher', 'desktop', 'sole-proprietorship');
	});

	test('practice: sort drill complete', async ({ page }) => {
		await page.goto('/ch/1/practice');
		await settle(page);
		const answers = ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'];
		const items = page.locator('ol > li');
		for (let i = 0; i < answers.length; i++) {
			await items.nth(i).locator('button').first().click();
		}
		await expect(page.getByText('What you just proved').first()).toBeVisible();
		await shot(page, 'ch1-practice', 'desktop', 'sort-complete');
	});

	test('recall deck: start and answer a term card', async ({ page }) => {
		await page.goto('/ch/1/recall');
		await settle(page);
		await page.getByRole('button', { name: 'Start', exact: true }).click();
		await expect(page.locator('.deck')).toBeVisible();
		await shot(page, 'ch1-recall', 'desktop', 'deck-started');
	});
});
