# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login\login.spec.js >> Login page >> rejects a random, non-existent account
- Location: tests\login\login.spec.js:9:3

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#email') to be visible

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - heading "404 Not Found" [level=1] [ref=e3]
  - separator [ref=e4]
  - generic [ref=e5]: nginx/1.18.0 (Ubuntu)
```

# Test source

```ts
  1  | const { BasePage } = require('./base.page');
  2  | 
  3  | class LoginPage extends BasePage {
  4  |   /**
  5  |    * @param {import('@playwright/test').Page} page
  6  |    */
  7  |   constructor(page) {
  8  |     super(page);
  9  |     this.emailInput = page.locator('#email');
  10 |     this.passwordInput = page.locator('#password-input');
  11 |     this.captchaInput = page.locator('#captcha');
  12 |     this.captchaText = page.locator('div.form-control.pe-2.fs-20');
  13 |     this.captchaRefreshButton = this.captchaText.locator('..').getByRole('button');
  14 |     this.submitButton = page.getByRole('button', { name: 'Sign In' });
  15 |     this.forgotPasswordLink = page.getByRole('link', { name: /forgot password/i });
  16 |     this.captchaValidationError = page.getByText('Invalid Captcha');
  17 |   }
  18 | 
  19 |   async open() {
  20 |     await this.goto('/login');
> 21 |     await this.emailInput.waitFor({ state: 'visible' });
     |                           ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  22 |   }
  23 | 
  24 |   async readCaptcha() {
  25 |     return (await this.captchaText.innerText()).trim();
  26 |   }
  27 | 
  28 |   async refreshCaptcha() {
  29 |     await this.captchaRefreshButton.click();
  30 |   }
  31 | 
  32 |   /**
  33 |    * Fills the form and submits. The captcha value is always read live from the
  34 |    * page right before submit so it is never hardcoded or stale.
  35 |    */
  36 |   async login(email, password) {
  37 |     await this.emailInput.fill(email);
  38 |     await this.passwordInput.fill(password);
  39 |     const captcha = await this.readCaptcha();
  40 |     await this.captchaInput.fill(captcha);
  41 |     await this.submitButton.click();
  42 |   }
  43 | 
  44 |   async submitWithoutFilling() {
  45 |     await this.submitButton.click();
  46 |   }
  47 | 
  48 |   /** Submits with a deliberately wrong captcha to trigger client-side validation. */
  49 |   async submitWithWrongCaptcha(email, password) {
  50 |     await this.emailInput.fill(email);
  51 |     await this.passwordInput.fill(password);
  52 |     await this.captchaInput.fill('wrongcaptcha');
  53 |     await this.submitButton.click();
  54 |   }
  55 | }
  56 | 
  57 | module.exports = { LoginPage };
  58 | 
```