import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle(/Demo Web Shop/i);
  }

  async openRegister() {
    await this.page.getByRole('link', { name: 'Register' }).click();
  }

  async openLogin() {
    await this.page.getByRole('link', { name: 'Log in' }).click();
  }

  async goToNotebooks() {
  await this.page.getByRole('link', { name: 'Computers', exact: true }).first().hover();
  await this.page.getByRole('link', { name: 'Notebooks', exact: true }).click();
  }

  async cartQty() {
    const text = await this.page.locator('#topcartlink .cart-qty').innerText();
    // text like "(1)"
    const num = parseInt(text.replace(/[^0-9]/g, ''), 10) || 0;
    return num;
  }
}