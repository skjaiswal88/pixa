import { test, expect } from '@playwright/test';

test('landing page has correct title and navigation', async ({ page }) => {
    await page.goto('/');

    // Expect the page to title
    await expect(page).toHaveTitle(/Pixa/);

    // Expect the main heading to be visible
    await expect(page.getByRole('heading', { name: /Unleash Your Creative Vision/i })).toBeVisible();

    // Check if sign-in link is present (when not logged in)
    await expect(page.getByRole('link', { name: /Login/i })).toBeVisible();
});
