import { test, expect } from '@playwright/test';
import { getSiteConfig } from '../../helpers/site-config';

const site = getSiteConfig();

test(`@critical ${site.name} - cookie banner exists`, async ({ page, context }) => {

  await context.clearCookies();

  await page.goto(site.baseUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });

  const cookieBanner = page
    .locator(site.selectors.cookieBanner)
    .first();

  await expect(cookieBanner).toBeAttached({
    timeout: 15000,
  });

  await expect(cookieBanner)
    .toContainText(/Cookies|קובצי Cookies|עוגיות/i);

});