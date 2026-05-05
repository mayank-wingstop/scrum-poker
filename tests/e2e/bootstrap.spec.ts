import { test, expect } from '@playwright/test';

test('smoke — page title contains Scrum Poker', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Scrum Poker/);
});

test('smoke — heading is visible on load', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Scrum Poker' })).toBeVisible();
});
