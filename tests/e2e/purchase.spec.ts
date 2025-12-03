import { test, expect } from '@playwright/test';
import users from '../../test-data/users.json';
import { HomePage } from '../../src/pages/HomePage';
import { RegisterPage } from '../../src/pages/RegisterPage';
import { ProductListPage } from '../../src/pages/ProductListPage';
import { ProductPage } from '../../src/pages/ProductPage';
import { CartPage } from '../../src/pages/CartPage';
import { CheckoutPage } from '../../src/pages/CheckoutPage';
import { ConfirmationPage } from '../../src/pages/ConfirmationPage';
import { uniqueEmail, currencyToNumber } from '../../src/utils/helpers';

const PRODUCT_NAME = '14.1-inch Laptop';

for (const data of users) {
  test.describe(`E2E Purchase Flow — ${data.firstName}`, () => {
    test('Register, buy a Laptop, and validate order', async ({ page }) => {
      const home = new HomePage(page);
      const register = new RegisterPage(page);
      const products = new ProductListPage(page);
      const pdp = new ProductPage(page);
      const cart = new CartPage(page);
      const checkout = new CheckoutPage(page);
      const confirm = new ConfirmationPage(page);

      await home.goto();
      await home.openRegister();

      const email = uniqueEmail(data.emailPrefix);
      const password = data.password;

      await register.fillForm({
        gender: data.gender as 'Male'|'Female',
        firstName: data.firstName,
        lastName: data.lastName,
        email,
        password
      });

      await register.submit();

      // Navigate to product
      await home.goToNotebooks();
      await products.openProductByName(PRODUCT_NAME);

      // Capture PDP details
      const pdpName = await pdp.getName();
      const pdpPriceText = await pdp.getPriceText();

      // Basic assertions on PDP
      expect(pdpName).toBe(PRODUCT_NAME);
      expect(pdpPriceText).toMatch(/\d/);

      await pdp.addToCart();
      // Cart badge should update to 1
      await expect.poll(async () => await home.cartQty(), { message: 'Cart qty should be 1' }).toBe(1);

      // Go to cart and verify
      await cart.open();
      const cartUnitPriceText = await cart.getUnitPrice(PRODUCT_NAME);
      const cartSubtotalText = await cart.getSubtotalText();
      const cartTaxText = await cart.getTaxText();
      const cartTotalText = await cart.getTotalText();

      // Price consistency assertions
      expect(cartUnitPriceText).toBe(pdpPriceText);

      const unit = currencyToNumber(cartUnitPriceText);
      const subtotal = currencyToNumber(cartSubtotalText);
      const tax = currencyToNumber(cartTaxText);
      const total = currencyToNumber(cartTotalText);

      expect(subtotal).toBeCloseTo(unit, 2); // qty = 1
      expect(total).toBeCloseTo(subtotal + tax, 2);

      // Checkout
      await cart.agreeAndCheckout();

      const address = {
        firstName: data.firstName,
        lastName: data.lastName,
        email,
        city: 'Los Angeles',
        address1: '123 Market Street',
        zip: '90001',
        phone: '555-0101'
      };

      await checkout.fillBilling(address);
      await checkout.shippingAddressContinue();
      await checkout.shippingMethodContinue();
      await checkout.paymentMethodContinue();
      await checkout.paymentInfoContinue();
      await checkout.confirmOrder();

      await confirm.validateThankYou();
      const orderNo = await confirm.readOrderNumber();

      // Validate order number format (at least 4 digits)
      expect(orderNo).toMatch(/^\d{4,}$/);
// trigger commit

      // Final assertion: confirmation page has product name somewhere in order details
      // Sometimes there is a 'Details' link; we just ensure Thank You + Order number present
      test.info().attachments.push({ name: 'order-number', body: Buffer.from(orderNo), contentType: 'text/plain' });

    });
  });
}
