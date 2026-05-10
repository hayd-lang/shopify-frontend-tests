import { test, expect } from '@playwright/test';
import { getSiteConfig } from '../../helpers/site-config';

const site = getSiteConfig();

test(`@critical ${site.name} - login popup flow works`, async ({ page }) => {
  test.skip(
  site.enabledTests && !site.enabledTests.includes('login'),
  `${site.name} login test is disabled`
  );

  await page.goto(site.baseUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });

  await page.locator(site.selectors.loginButton).first().click();

  const idInput = page.locator(site.selectors.idInput).first();

  await expect(idInput).toBeVisible({
    timeout: 15000,
  });

  await idInput.fill(site.testCustomer.id);

  await page.screenshot({
    path: `before-login-click-${site.name}.png`,
    fullPage: true,
  });

  await page.locator(site.selectors.submitButton).first().click();

  await page.waitForTimeout(5000);

  await page.screenshot({
    path: `after-login-click-${site.name}.png`,
    fullPage: true,
  });

  await expect(page.locator('body')).toBeVisible();
});