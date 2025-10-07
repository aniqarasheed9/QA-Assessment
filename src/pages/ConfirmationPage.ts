import { Page, expect } from '@playwright/test';

export class ConfirmationPage {
  constructor(private page: Page) {}

  async validateThankYou() {
    await expect(this.page.getByRole('heading', { name: 'Thank you' })).toBeVisible();
  }

  async readOrderNumber(): Promise<string> {
    const text = await this.page.locator("(//div[@class='section order-completed']//li)[1]").innerText(); // e.g. "ORDER NUMBER: 12345"
    const match = text.match(/(\d{4,})/);
    if (!match) throw new Error('Order number not found');
    return match[1];
  }
}