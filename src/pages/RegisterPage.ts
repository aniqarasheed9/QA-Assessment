import { Page, expect } from '@playwright/test';

export class RegisterPage {
  constructor(private page: Page) {}

  async fillForm(details: {
    gender: 'Male'|'Female',
    firstName: string,
    lastName: string,
    email: string,
    password: string
  }) {
    await expect(this.page.getByRole('heading', { name: 'Register' })).toBeVisible();
    const genderId = details.gender === 'Male' ? '#gender-male' : '#gender-female';
    await this.page.locator(genderId).check();
    await this.page.locator('#FirstName').fill(details.firstName);
    await this.page.locator('#LastName').fill(details.lastName);
    await this.page.locator('#Email').fill(details.email);
    await this.page.locator('#Password').fill(details.password);
    await this.page.locator('#ConfirmPassword').fill(details.password);
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Register' }).click();
    await expect(this.page.getByText('Your registration completed')).toBeVisible();
  }
}