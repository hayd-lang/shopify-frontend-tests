import { test, expect } from '@playwright/test';
import { getSiteConfig } from '../../helpers/site-config';

const site = getSiteConfig();

test(`@critical ${site.name} - cookie banner exists`, async ({ page, context }) => {
  test.skip(
    site.enabledTests && !site.enabledTests.includes('cookie'),
    `${site.name} cookie test is disabled`
  );

  await context.clearCookies();

  await page.goto(site.baseUrl, {
    waitUntil: 'commit',
    timeout: 30000,
  });

  const cookieBanner = page.locator('popup-message.ai-popup-overlay').first();

  await expect(cookieBanner).toBeAttached({
    timeout: 7000,
  });

  await expect(page.locator('body')).toContainText(/הסכמת Cookies|Cookies/i, {
    timeout: 7000,
  });
});