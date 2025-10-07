import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillBilling(details: any) {
    await expect(this.page.getByRole('heading', { name: 'Checkout' })).toBeVisible();
    // Select 'New Address' if available
    const dropdown = this.page.locator('select#billing-address-select');
    if (await dropdown.count()) {
      const txt = await dropdown.innerText();
      if (txt.toLowerCase().includes('new address')) {
        await dropdown.selectOption({ label: /new address/i });
      }
    }
    await this.page.locator('#BillingNewAddress_FirstName').fill(details.firstName);
    await this.page.locator('#BillingNewAddress_LastName').fill(details.lastName);
    await this.page.locator('#BillingNewAddress_Email').fill(details.email);
    await this.page.locator('#BillingNewAddress_CountryId').selectOption({ label: 'United States' });
    await this.page.locator('#BillingNewAddress_City').fill(details.city);
    await this.page.locator('#BillingNewAddress_Address1').fill(details.address1);
    await this.page.locator('#BillingNewAddress_ZipPostalCode').fill(details.zip);
    await this.page.locator('#BillingNewAddress_PhoneNumber').fill(details.phone);
    await this.page.getByRole('button', { name: 'Continue' }).first().click();
  }

  async shippingAddressContinue() {
    const continueShippingBtn = this.page.locator("//input[@type='button' and @onclick='Shipping.save()']");
    await continueShippingBtn.click();
  }

  async shippingMethodContinue() {
    const continueShippingMethod = this.page.locator("//input[@type='button' and @onclick='ShippingMethod.save()']");
    await continueShippingMethod.click();
  }

  async paymentMethodContinue() {
    // Choose Check/Money Order if present; otherwise first option
    const checkMoney = this.page.getByRole('radio', { name: /check|money order/i });
    if (await checkMoney.count()) {
      await checkMoney.first().check();
    } else {
      await this.page.getByRole('radio').first().check();
    }
    const continuePaymentMethod = this.page.locator("//input[@type='button' and @onclick='PaymentMethod.save()']");
    await continuePaymentMethod.click();
  }

  async paymentInfoContinue() {
    const continuePaymentInfo = this.page.locator("//input[@type='button' and @onclick='PaymentInfo.save()']");
    await continuePaymentInfo.click();
  }

  async confirmOrder() {
    const continueConfirmOrder = this.page.locator("//input[@type='button' and @onclick='ConfirmOrder.save()']");
    await continueConfirmOrder.click();
  }
}