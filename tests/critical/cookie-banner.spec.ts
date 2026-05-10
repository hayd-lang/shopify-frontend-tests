import { test, expect } from '@playwright/test';
import { getSiteConfig } from '../../helpers/site-config';

const site = getSiteConfig();

test(`@critical ${site.name} - cookie banner exists`, async ({ page, context }) => {
  await context.clearCookies();

  await page.goto(site.baseUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });

  const cookiePopup = page.locator('popup-message.ai-popup-overlay');

  await expect(cookiePopup).toBeAttached({
    timeout: 15000,
  });

  await expect(cookiePopup).toContainText(/הסכמת Cookies|Cookies/i);
});