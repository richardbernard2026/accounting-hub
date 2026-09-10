/**
 * Renders every chapter at three widths, drives it through its interactive
 * states, and writes screenshots to docs/screenshots. Also asserts the states
 * actually happened (popover appeared, note saved, drill completed).
 */
import { test, expect, type Page } from '@playwright/test';

const OUT = 'docs/screenshots';
const widths = [
	{ name: 'mobile', width: 375, height: 812 },
	{ name: 'tablet', width: 768, height: 1024 },
	{ name: 'desktop', width: 1440, height: 900 }
];

async function settle(page: Page) {
	await page.waitForLoadState('networkidle');
	await page.waitForTimeout(400);
}

test.describe('@screens index', () => {
	for (const w of widths) {
		test(`index ${w.name}`, async ({ page }) => {
			await page.setViewportSize({ width: w.width, height: w.height });
			await page.goto('/');
			await settle(page);
			await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
			await page.screenshot({ path: `${OUT}/index-${w.name}.png`, fullPage: true });
		});
	}
});

test.describe('@screens chapter 3', () => {
	for (const w of widths) {
		test(`ch3 ${w.name} initial`, async ({ page }) => {
			await page.setViewportSize({ width: w.width, height: w.height });
			await page.goto('/ch/3');
			await page.locator('[data-sweep-done="true"]').waitFor();
			await settle(page);
			await expect(page.getByText('Period end:')).toContainText('Dec 31');
			await page.screenshot({ path: `${OUT}/ch3-${w.name}.png`, fullPage: true });
			await page.screenshot({ path: `${OUT}/ch3-${w.name}-fold.png` });
		});
	}

	test('ch3 desktop interactive states', async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.goto('/ch/3');
		await page.locator('[data-sweep-done="true"]').waitFor();
		await settle(page);

		// 1. Scrub to Dec 20 and select lane (f): 9 days × 90 = 810
		await page.getByRole('button', { name: /\(f\)\s*Accrued consulting revenue/ }).click();
		await page.locator('#period-end').fill('20');
		await page.waitForTimeout(300);
		await expect(
			page.locator('aside p', { hasText: '9 of 30 days delivered' }).first()
		).toBeVisible();
		await expect(page.locator('aside').getByText('810').first()).toBeVisible();
		await expect(page.getByRole('button', { name: /Pin this state/ })).toBeVisible();
		await page.locator('.instrument').screenshot({ path: `${OUT}/ch3-timeline-dec20-lane-f.png` });

		// 2. Pin it → note count goes to 1
		await page.getByRole('button', { name: /Pin this state/ }).click();
		await expect(page.getByRole('button', { name: 'Open notes' })).toContainText('1');

		// 3. Select a sentence in C1 → capture popover
		const p = page.locator('#C1 .prose-col p').nth(1);
		await p.scrollIntoViewIfNeeded();
		const box = (await p.boundingBox())!;
		await page.mouse.move(box.x + 2, box.y + 8);
		await page.mouse.down();
		await page.mouse.move(box.x + box.width * 0.6, box.y + 8, { steps: 8 });
		await page.mouse.up();
		await page.waitForTimeout(400);
		await expect(page.getByRole('dialog', { name: 'Save a note' })).toBeVisible();
		await page.screenshot({ path: `${OUT}/ch3-capture-popover.png` });
		await page.getByRole('dialog').getByRole('button', { name: 'Save note' }).click();
		await page.waitForTimeout(800);
		await expect(page.getByRole('button', { name: 'Open notes' })).toContainText('2');

		// 4. Select a key term exactly → term flow with "Compare with the book"
		const found = await page.evaluate(() => {
			const el = [...document.querySelectorAll('#C1 .prose-col p')].find((p) =>
				p.textContent?.includes('revenue recognition principle')
			)!;
			const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
			let node: Text | null;
			while ((node = walker.nextNode() as Text | null)) {
				const i = node.data.indexOf('revenue recognition principle');
				if (i >= 0) {
					const r = document.createRange();
					r.setStart(node, i);
					r.setEnd(node, i + 'revenue recognition principle'.length);
					const s = getSelection()!;
					s.removeAllRanges();
					s.addRange(r);
					el.scrollIntoView({ block: 'center' });
					return true;
				}
			}
			return false;
		});
		expect(found).toBe(true);
		await page.waitForTimeout(400);
		await expect(page.getByRole('dialog')).toContainText('Key term');
		await page.getByRole('dialog').getByRole('button', { name: 'Compare with the book' }).click();
		await page
			.getByRole('dialog')
			.locator('textarea')
			.fill('Record revenue when the work is delivered, for what you expect to collect.');
		await page.screenshot({ path: `${OUT}/ch3-term-capture.png` });
		await page.getByRole('dialog').getByRole('button', { name: 'Save my wording' }).click();
		await page.waitForTimeout(800);

		// 5. Sort drill: answer all eight correctly → takeaway appears
		const kinds = [
			'Prepaid expense',
			'Accrued expense',
			'Unearned revenue',
			'Accrued revenue',
			'Prepaid expense',
			'Accrued expense',
			'Unearned revenue',
			'Accrued revenue'
		];
		const items = page.locator('#C2 ol > li');
		for (let i = 0; i < kinds.length; i++)
			await items.nth(i).getByRole('button', { name: kinds[i], exact: true }).click();
		await expect(page.getByText('What you just proved').first()).toBeVisible();
		await page.locator('#C2').screenshot({ path: `${OUT}/ch3-sort-drill-complete.png` });
		await page.locator('#C2').getByRole('button', { name: 'Keep this' }).click();

		// 6. Worksheet: trace (c)
		await page.locator('#P2').getByRole('button', { name: '(c)' }).click();
		await page.locator('#P2').scrollIntoViewIfNeeded();
		await page.locator('#P2').screenshot({ path: `${OUT}/ch3-worksheet-trace-c.png` });

		// 7. Statements: hover net income
		await page.locator('#P3').scrollIntoViewIfNeeded();
		await page.locator('#P3 tr.total', { hasText: 'Net income' }).first().hover();
		await page.waitForTimeout(200);
		await page.locator('#P3').screenshot({ path: `${OUT}/ch3-statements-hover-ni.png` });

		// 8. Term audit: open one
		await page.locator('#check').scrollIntoViewIfNeeded();
		await page.locator('#check').getByRole('button', { name: 'Write it' }).first().click();
		await page.waitForTimeout(400);
		await page.locator('#check').screenshot({ path: `${OUT}/ch3-term-audit.png` });

		// 9. Notes drawer
		await page.getByRole('button', { name: 'Open notes' }).click();
		await page.waitForTimeout(400);
		await expect(page.getByRole('complementary', { name: /Notes for chapter 3/ })).toBeVisible();
		await page.screenshot({ path: `${OUT}/ch3-notes-drawer.png` });
	});

	test('ch3 dark mode', async ({ page }) => {
		await page.emulateMedia({ colorScheme: 'dark' });
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.goto('/ch/3');
		await page.locator('[data-sweep-done="true"]').waitFor();
		await settle(page);
		await page.screenshot({ path: `${OUT}/ch3-desktop-dark.png` });
	});

	test('notes page lists a pinned state', async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.goto('/ch/3');
		await page.locator('[data-sweep-done="true"]').waitFor();
		await page.getByRole('button', { name: /\(d\)\s*Unearned consulting revenue/ }).click();
		await page.locator('#period-end').fill('29');
		await page.getByRole('button', { name: /Pin this state/ }).click();
		await page.goto('/notes');
		await settle(page);
		await expect(page.getByRole('heading', { level: 1 })).toContainText('1 note');
		await page.screenshot({ path: `${OUT}/notes-page.png`, fullPage: true });
	});
});
