import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async open() {
    // Hover the *header* cart link to open the flyout mini-cart
    const headerCartLink = this.page.locator('#topcartlink'); // unique id on the header cart
    await headerCartLink.hover();

    // Wait for the flyout mini-cart to appear
    const flyout = this.page.locator('#flyout-cart');
    await flyout.waitFor({ state: 'visible' });

    const goToCartBtn = flyout.getByRole('button', { name: 'Go to cart' });
    await expect(goToCartBtn).toBeVisible();
    await goToCartBtn.click();

    // Verify the Shopping cart page loaded
    await expect(this.page).toHaveURL(/\/cart/);
    await expect(this.page.getByRole('heading', { name: 'Shopping cart' })).toBeVisible();
  }

  async productRowByName(name: string) {
    return this.page.locator('table.cart tr').filter({ hasText: name }).first();
  }

  async getUnitPrice(name: string) {
    const row = await this.productRowByName(name);
    return row.locator('.product-unit-price').innerText();
  }

  async getSubtotalText() {
  return this.page.locator("(//span[@class='product-price'])[1]").innerText();
  }


  async getTaxText() {
    const tax = this.page.locator('.cart-total .tax-value .value-summary');
    return (await tax.count()) ? await tax.innerText() : '$0.00';
  }

  async getTotalText() {
    return this.page.locator("//span[@class='nobr' and normalize-space()='Total:']/../following-sibling::td//strong").innerText();
  }

  async agreeAndCheckout() {
    await this.page.locator('#termsofservice').check();
    await this.page.getByRole('button', { name: 'Checkout' }).click();
  }
}