import { Page, expect } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  async getName() {
    return this.page.locator('div.product-name h1').innerText();
  }
  async getPriceText() {
    // price text is within span.price-value-XXX
    return this.page.locator('span.price-value-31').first().innerText();
  }
  async addToCart() {
    // Click the specific Add to cart button by id
    const addBtn = this.page.locator('#add-to-cart-button-31');
    await addBtn.scrollIntoViewIfNeeded();
    await addBtn.click();

    // Verify success bar appears (keeps original assertion)
    const successBar = this.page.locator('.bar-notification.success');
    await expect(successBar).toBeVisible();
    await expect(successBar.getByText('The product has been added')).toBeVisible(); 
  }
}