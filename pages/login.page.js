const { BasePage } = require('./base.page');

class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password-input');
    this.captchaInput = page.locator('#captcha');
    this.captchaText = page.locator('div.form-control.pe-2.fs-20');
    this.captchaRefreshButton = this.captchaText.locator('..').getByRole('button');
    this.submitButton = page.getByRole('button', { name: 'Sign In' });
    this.forgotPasswordLink = page.getByRole('link', { name: /forgot password/i });
    this.captchaValidationError = page.getByText('Invalid Captcha');
  }

  async open() {
    await this.goto('login');
    await this.emailInput.waitFor({ state: 'visible' });
  }

  async readCaptcha() {
    return (await this.captchaText.innerText()).trim();
  }

  async refreshCaptcha() {
    await this.captchaRefreshButton.click();
  }

  /**
   * Fills the form and submits. The captcha value is always read live from the
   * page right before submit so it is never hardcoded or stale.
   */
  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    const captcha = await this.readCaptcha();
    await this.captchaInput.fill(captcha);
    await this.submitButton.click();
  }

  async submitWithoutFilling() {
    await this.submitButton.click();
  }

  /** Submits with a deliberately wrong captcha to trigger client-side validation. */
  async submitWithWrongCaptcha(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.captchaInput.fill('wrongcaptcha');
    await this.submitButton.click();
  }

  /** Locator for a plain-text field validation message (e.g. "Please Enter Your Email"). */
  getFieldMessage(text) {
    return this.page.getByText(text, { exact: true });
  }
}

module.exports = { LoginPage };
