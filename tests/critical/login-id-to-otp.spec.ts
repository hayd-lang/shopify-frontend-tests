import { test, expect } from '@playwright/test';
import { getSiteConfig } from '../../helpers/site-config';

const site = getSiteConfig();

test('@critical FOX HOME - login popup ID step triggers OTP screen', async ({ page }) => {
  await page.goto(site.baseUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });

  await page.getByRole('button', { name: /הרשם/i }).click();

  const idInput = page.getByPlaceholder('מספר ת.ז');

  await expect(idInput).toBeVisible({
    timeout: 15000,
  });

  await idInput.fill(site.testCustomer.id);

  await page.screenshot({
    path: 'before-login-click.png',
    fullPage: true,
  });

  await page.getByRole('button', { name: /התחברות/i }).click();

  await page.waitForTimeout(5000);

  await page.screenshot({
    path: 'after-login-click.png',
    fullPage: true,
  });

  const otpInput = page.getByPlaceholder('Code');

  await expect(otpInput).toBeVisible({
    timeout: 20000,
  });
});