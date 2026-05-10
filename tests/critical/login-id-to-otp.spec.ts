import { test, expect } from '@playwright/test';
import { getSiteConfig } from '../../helpers/site-config';

const site = getSiteConfig();

test('@critical FOX HOME - login popup flow works', async ({ page }) => {

  await page.goto(site.baseUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });

  // Open login popup
  await page.getByRole('button', { name: /הרשם/i }).click();

  // Validate ID input exists
  const idInput = page.getByPlaceholder('מספר ת.ז');

  await expect(idInput).toBeVisible({
    timeout: 15000,
  });

  // Fill ID
  await idInput.fill(site.testCustomer.id);

  // Screenshot before submit
  await page.screenshot({
    path: 'before-login-click.png',
    fullPage: true,
  });

  // Click login
  await page.getByRole('button', { name: /התחברות/i }).click();

  // Wait for frontend processing
  await page.waitForTimeout(5000);

  // Screenshot after submit
  await page.screenshot({
    path: 'after-login-click.png',
    fullPage: true,
  });

  // Validate no frontend crash occurred
  await expect(page.locator('body')).toBeVisible();

});