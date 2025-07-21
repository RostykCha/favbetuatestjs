import { test, expect } from '@playwright/test';

test('repo boots', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/i);
});
