/**
 * Chapter 2 screens at 390/768/1440, plus a handful of interactive states
 * for the double-entry machine and its two secondary instruments. Filenames
 * follow `<route>__<viewport>__<state>.png` for scripts/contact-sheet.mjs.
 * Nothing here is "done" until every image has a real, looked-at verdict in
 * docs/screenshots/REVIEW.md — see .claude/skills/visual-review/SKILL.md.
 */
import { test, expect, type Page } from '@playwright/test';

const OUT = 'docs/screenshots';
const VIEWPORTS = [
	{ name: 'mobile', width: 390, height: 844 },
	{ name: 'tablet', width: 768, height: 1024 },
	{ name: 'desktop', width: 1440, height: 900 }
];

const ROUTES: { path: string; slug: string }[] = [
	{ path: '/ch/2', slug: 'ch2-home' },
	{ path: '/ch/2/learn/accounts', slug: 'ch2-learn-accounts' },
	{ path: '/ch/2/learn/rule', slug: 'ch2-learn-rule' },
	{ path: '/ch/2/learn/four-steps', slug: 'ch2-learn-four-steps' },
	{ path: '/ch/2/learn/trial-balance', slug: 'ch2-learn-trial-balance' },
	{ path: '/ch/2/learn/debt-ratio', slug: 'ch2-learn-debt-ratio' },
	{ path: '/ch/2/lab/double-entry-machine', slug: 'ch2-lab-double-entry-machine' },
	{ path: '/ch/2/lab/t-account-trainer', slug: 'ch2-lab-t-account-trainer' },
	{ path: '/ch/2/lab/trial-balance-error-finder', slug: 'ch2-lab-trial-balance-error-finder' },
	{ path: '/ch/2/practice', slug: 'ch2-practice' },
	{ path: '/ch/2/recall', slug: 'ch2-recall' },
	{ path: '/ch/2/notes', slug: 'ch2-notes' },
	{ path: '/ch/2/reference', slug: 'ch2-reference' }
];

async function settle(page: Page) {
	await page.waitForLoadState('networkidle');
	await page.waitForTimeout(250);
}
async function shot(page: Page, slug: string, viewport: string, state = 'initial') {
	await page.screenshot({ path: `${OUT}/${slug}__${viewport}__${state}.png`, fullPage: true });
}

test.describe('@screens ch2 every route, every viewport', () => {
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

test.describe('ch2 interactive states (desktop)', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
	});

	test('double-entry machine: post entry 1, jump to the compound entry 8', async ({ page }) => {
		await page.goto('/ch/2/lab/double-entry-machine');
		await settle(page);
		for (let i = 0; i < 3; i++) await page.getByRole('button', { name: 'Next →' }).click();
		await expect(page.getByText('No accounts posted yet.')).toHaveCount(0);
		await shot(page, 'ch2-lab-double-entry-machine', 'desktop', 'entry-1-posted');

		await page.getByRole('button', { name: '8', exact: true }).click();
		for (let i = 0; i < 3; i++) await page.getByRole('button', { name: 'Next →' }).click();
		await expect(page.getByText('Rental revenue').first()).toBeVisible();
		await expect(page.getByRole('button', { name: /Pin this state/ })).toBeVisible();
		await shot(page, 'ch2-lab-double-entry-machine', 'desktop', 'entry-8-compound-posted');
	});

	test('t-account trainer: guess the normal side', async ({ page }) => {
		await page.goto('/ch/2/lab/t-account-trainer');
		await settle(page);
		await page.getByRole('button', { name: 'Accounts payable', exact: true }).click();
		await page.getByRole('button', { name: 'Credit', exact: true }).click();
		await expect(page.getByText('credit balance', { exact: false }).first()).toBeVisible();
		await shot(page, 'ch2-lab-t-account-trainer', 'desktop', 'accounts-payable-guessed');
	});

	test('trial balance error finder: plant the transposition', async ({ page }) => {
		await page.goto('/ch/2/lab/trial-balance-error-finder');
		await settle(page);
		await page.getByRole('button', { name: /Utilities posted as 320/ }).click();
		await expect(page.getByText('$45,390')).toBeVisible();
		await shot(page, 'ch2-lab-trial-balance-error-finder', 'desktop', 'transposition-caught');
	});

	test('learn debt-ratio: touch the bar', async ({ page }) => {
		await page.goto('/ch/2/learn/debt-ratio');
		await settle(page);
		await page.getByRole('button', { name: /Liabilities/ }).click();
		await expect(page.getByRole('button', { name: /Pin this state/ })).toBeVisible();
		await shot(page, 'ch2-learn-debt-ratio', 'desktop', 'touched');
	});

	test('practice: sort drill complete, entry drill in progress', async ({ page }) => {
		await page.goto('/ch/2/practice');
		await settle(page);
		const answers = [
			'Debit-normal',
			'Debit-normal',
			'Debit-normal',
			'Debit-normal',
			'Credit-normal',
			'Credit-normal',
			'Credit-normal',
			'Debit-normal',
			'Credit-normal',
			'Credit-normal',
			'Debit-normal',
			'Debit-normal'
		];
		const items = page.locator('ol > li');
		for (let i = 0; i < answers.length; i++) {
			await items.nth(i).getByRole('button', { name: answers[i], exact: true }).click();
		}
		await expect(page.getByText('DEBT — Expenses, Assets, Dividends').last()).toBeVisible();
		await shot(page, 'ch2-practice', 'desktop', 'sort-complete');
	});

	test('recall deck: start and answer an entry card', async ({ page }) => {
		await page.goto('/ch/2/recall');
		await settle(page);
		await page.getByRole('button', { name: 'Start', exact: true }).click();
		await expect(page.getByText('Journalize it')).toBeVisible();
		await shot(page, 'ch2-recall', 'desktop', 'deck-started');
	});
});
