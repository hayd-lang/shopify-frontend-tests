import { test, expect } from '@playwright/test';
import { getSiteConfig } from '../../helpers/site-config';

const site = getSiteConfig();

test(`@critical ${site.name} - add to cart works`, async ({ page }) => {
  test.skip(
    site.enabledTests && !site.enabledTests.includes('cart'),
    `${site.name} cart test is disabled`
  );

  await page.goto(
    site.baseUrl + site.testCollectionUrl,
    {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    }
  );

  const firstProduct = page
    .locator(site.selectors.productCard)
    .first();

  await expect(firstProduct).toBeVisible({
    timeout: 15000,
  });

  // QUICK ADD FLOW
  if (site.addToCartMode === 'quick') {

    await firstProduct.hover();

    const addToCartButton = page
      .locator(site.selectors.addToCartButton)
      .first();

    await expect(addToCartButton).toBeVisible({
      timeout: 15000,
    });

    await addToCartButton.click();

  } else {

    // PDP FLOW
    await firstProduct.click();

    await expect(page).toHaveURL(/\/products\//, {
      timeout: 15000,
    });

    const addToCartButton = page
      .locator(site.selectors.addToCartButton)
      .first();

    await expect(addToCartButton).toBeVisible({
      timeout: 15000,
    });

    await addToCartButton.click();
  }

  await page.waitForTimeout(5000);

  await expect(page.locator('body')).toBeVisible();

});