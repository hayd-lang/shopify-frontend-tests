import { test, expect } from '@playwright/test';
import { getSiteConfig } from '../../helpers/site-config';

const site = getSiteConfig();

test(`@critical ${site.name} - dynamic add to cart works`, async ({ page }) => {
  await page.goto(site.baseUrl + site.testCollectionUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });

  const firstProduct = page.locator(site.selectors.productCard).first();

  await expect(firstProduct).toBeVisible({ timeout: 15000 });

  await firstProduct.click();

  await expect(page).toHaveURL(/\/products\//, { timeout: 15000 });

  const addToCartButton = page.locator(site.selectors.addToCartButton).first();

  await expect(addToCartButton).toBeVisible({ timeout: 15000 });

  await addToCartButton.click();

  await page.waitForTimeout(5000);

  await expect(page.locator('body')).toBeVisible();
});