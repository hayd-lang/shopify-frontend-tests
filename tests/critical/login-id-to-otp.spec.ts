import { test, expect } from '@playwright/test';
import { getSiteConfig } from '../../helpers/site-config';

const site = getSiteConfig();

test('@critical FOX HOME - login popup ID step triggers OTP screen', async ({ page }) => {

  await page.goto(site.baseUrl);

  // Open login popup
  await page.getByRole('button', { name: /הרשם/i }).click();

  // Wait for ID input
  const idInput = page.getByPlaceholder('מספר ת.ז');

  await expect(idInput).toBeVisible({
    timeout: 15000
  });

  // Fill ID
  await idInput.fill(site.testCustomer.id);

  // Click login button
  await page.getByRole('button', { name: /התחברות/i }).click();

  // Give popup/backend time to transition
  await page.waitForTimeout(3000);

  // Validate OTP step appeared
  const otpHeading = page.getByRole('heading', {
    name: /מה הקוד שקיבלת/i
  });

  await expect(otpHeading).toBeVisible({
    timeout: 15000
  });

  // Validate OTP input exists
  const otpInput = page.getByPlaceholder('Code');

  await expect(otpInput).toBeVisible({
    timeout: 15000
  });

});