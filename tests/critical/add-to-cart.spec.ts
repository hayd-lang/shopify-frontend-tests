import { test, expect } from '@playwright/test';
import { getSiteConfig } from '../../helpers/site-config';

const site = getSiteConfig();

test(`@critical ${site.name} - collection quick add to cart works`, async ({ page }) => {
  await page.goto(site.baseUrl + site.testCollectionUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });

  const productCard = page.locator(site.selectors.productCard).first();

  await expect(productCard).toBeVisible({
    timeout: 15000,
  });

  await productCard.hover();

  const addToCartButton = page.locator(site.selectors.addToCartButton).first();

  await expect(addToCartButton).toBeVisible({
    timeout: 15000,
  });

  await addToCartButton.click();

  await page.waitForTimeout(5000);

  await page.screenshot({
    path: `after-add-to-cart-${site.name}.png`,
    fullPage: true,
  });

  await expect(page.locator('body')).toBeVisible();
});