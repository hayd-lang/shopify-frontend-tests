import { test, expect } from '@playwright/test';
import { getSiteConfig } from '../../helpers/site-config';

const site = getSiteConfig();

test('@critical FOX HOME - login popup ID step triggers OTP screen', async ({ page }) => {

  await page.goto(site.baseUrl);

  await page.getByRole('button', { name: /הרשם/i }).click();

  const idInput = page.getByPlaceholder('מספר ת.ז');
  await expect(idInput).toBeVisible();

  await idInput.fill(site.testCustomer.id);

  await page.getByRole('button', { name: /התחברות/i }).click();

  await expect(
    page.getByRole('heading', { name: /מה הקוד שקיבלת/i })
  ).toBeVisible();

  await expect(
    page.getByPlaceholder('Code')
  ).toBeVisible();

});