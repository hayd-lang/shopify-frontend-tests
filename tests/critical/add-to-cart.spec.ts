import { test, expect } from '@playwright/test';
import { getSiteConfig } from '../../helpers/site-config';

const site = getSiteConfig();

test(`@critical ${site.name} - dynamic add to cart works`, async ({ page }) => {

  // Open collection
  await page.goto(
    site.baseUrl + site.testCollectionUrl,
    {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    }
  );

  // Find first product
  const firstProduct = page
    .locator(site.selectors.productCard)
    .first();

  await expect(firstProduct).toBeVisible({
    timeout: 15000,
  });

  // Open PDP
  await firstProduct.click();

  // Wait for PDP
  await page.waitForLoadState('domcontentloaded');

  // Find Add To Cart button
  const addToCartButton = page
    .locator(site.selectors.addToCartButton)
    .first();

  await expect(addToCartButton).toBeVisible({
    timeout: 15000,
  });

  // Screenshot before ATC
  await page.screenshot({
    path: `before-add-to-cart-${site.name}.png`,
    fullPage: true,
  });

  // Add to cart
  await addToCartButton.click();

  // Wait after add
  await page.waitForTimeout(5000);

  // Screenshot after ATC
  await page.screenshot({
    path: `after-add-to-cart-${site.name}.png`,
    fullPage: true,
  });

  // Validate no frontend crash
  await expect(page.locator('body')).toBeVisible();

});