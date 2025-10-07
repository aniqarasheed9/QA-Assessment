import { Page, expect } from '@playwright/test';

export class ProductListPage {
  constructor(private page: Page) {}

  async openProductByName(name: string) {
    await expect(this.page.getByRole('heading', { name: /notebooks/i })).toBeVisible();
    await this.page.getByRole('link', { name, exact: true }).click();
  }
}