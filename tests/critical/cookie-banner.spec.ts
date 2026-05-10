import { test, expect } from '@playwright/test';
import { getSiteConfig } from '../../helpers/site-config';

const site = getSiteConfig();

test(`@critical ${site.name} - cookie banner is visible for new visitor`, async ({ page, context }) => {
  await context.clearCookies();

  await page.goto(site.baseUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });

  await expect(
    page.locator(
      '#onetrust-banner-sdk, .cookie, [class*="cookie"], [id*="cookie"], text=/Cookies|עוגיות|קוקיז/i'
    ).first()
  ).toBeVisible({
    timeout: 15000,
  });
});