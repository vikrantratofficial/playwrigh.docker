# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: order\create-order.spec.js >> Customer Order Creation >> creates an order end to end (basic details -> order details -> place order)
- Location: tests\order\create-order.spec.js:22:3

# Error details

```
Error: expect(page).not.toHaveURL(expected) failed

Expected pattern: not /\/login$/
Received string: "http://74.225.253.78:8800/UCCDEV/login"
Timeout: 5000ms

Call log:
  - Expect "not toHaveURL" with timeout 5000ms
    2 × locator resolved to <html lang="en" data-topbar="light" data-sidebar="dark" data-layout="vertical" data-sidebar-size="lg" data-preloader="disable" data-sidebar-image="none">…</html>
      - unexpected value "http://74.225.253.78:8800/UCCDEV/login"

```

```yaml
- img
- link "Logo":
  - /url: /UCCDEV
  - img "Logo"
- heading "First Logistic Management System." [level=5]
- text: Email
- textbox "Email":
  - /placeholder: Enter email
  - text: customer@amzbizsol.in
- link "Forgot password?":
  - /url: /UCCDEV/forgot-password
- text: Password
- textbox "Password":
  - /placeholder: Enter Password
  - text: Amazin@123
- button ""
- text: Captcha
- textbox "Captcha":
  - /placeholder: Enter Captcha
  - text: xxwrem
- text: xxwrem
- button ""
- button "Sign In" [disabled]:
  - status: Loading...
  - text: Sign In
- heading "Follow us on" [level=5]
- link "":
  - /url: https://www.facebook.com/AmazinAutomationSolution/
- link "":
  - /url: https://in.linkedin.com/company/amazin1453211
- contentinfo:
  - paragraph: © All Rights Reserved. FIRLO
```

# Test source

```ts
  1  | const { test, expect } = require('../../fixtures/test-fixtures');
  2  | 
  3  | /** Returns a date `daysFromNow` days ahead, as "YYYY-MM-DD" (never a hardcoded fixed date). */
  4  | function futureDateString(daysFromNow) {
  5  |   const date = new Date();
  6  |   date.setDate(date.getDate() + daysFromNow);
  7  |   return date.toISOString().split('T')[0];
  8  | }
  9  | 
  10 | test.describe('Customer Order Creation', () => {
  11 |   test.beforeEach(async ({ loginPage, config }) => {
  12 |     const { email, password } = config.credentials.byRole.CUSTOMER;
  13 |     test.skip(
  14 |       !email || !password,
  15 |       'CUSTOMER_EMAIL / CUSTOMER_PASSWORD not configured for this environment'
  16 |     );
  17 | 
  18 |     await loginPage.open();
  19 |     await loginPage.login(email, password);
  20 |   });
  21 | 
  22 |   test(
  23 |     'creates an order end to end (basic details -> order details -> place order)',
  24 |     { tag: ['@smoke', '@regression'] },
  25 |     async ({ page, customerOrderCreationPage }) => {
> 26 |       await expect(page).not.toHaveURL(/\/login$/);
     |                              ^ Error: expect(page).not.toHaveURL(expected) failed
  27 |       await expect(customerOrderCreationPage.heading).toBeVisible();
  28 | 
  29 |       const deliveryDate = futureDateString(30);
  30 |       await customerOrderCreationPage.createOrder({ quantity: 10, deliveryDate });
  31 | 
  32 |       await expect(customerOrderCreationPage.orderPlacedHeading).toBeVisible();
  33 | 
  34 |       const orderNumber = await customerOrderCreationPage.getOrderNumber();
  35 |       expect(orderNumber).toMatch(/^ORD-\d{4}-\d+$/);
  36 |     }
  37 |   );
  38 | });
  39 | 
```