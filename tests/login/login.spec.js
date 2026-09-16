const { test, expect } = require('../../fixtures/test-fixtures');
const { randomInvalidCredentials } = require('../../utils/test-data');

test.describe('Login page', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test(
    'rejects a random, non-existent account',
    { tag: ['@regression'] },
    async ({ loginPage }) => {
      const { email, password } = randomInvalidCredentials();

      await loginPage.login(email, password);

      await expect(loginPage.getAlert()).toBeVisible();
      await expect(loginPage.getAlert()).toContainText(/user not found/i);
    }
  );

  test(
    'rejects an incorrect captcha before hitting the API',
    { tag: ['@regression'] },
    async ({ loginPage }) => {
      const { email, password } = randomInvalidCredentials();

      await loginPage.submitWithWrongCaptcha(email, password);

      await expect(loginPage.captchaValidationError).toBeVisible();
    }
  );

  test(
    'captcha can be refreshed and changes value',
    { tag: ['@regression'] },
    async ({ loginPage }) => {
      const before = await loginPage.readCaptcha();
      await loginPage.refreshCaptcha();
      await expect
        .poll(() => loginPage.readCaptcha(), { timeout: 5000 })
        .not.toBe(before);
    }
  );

  test(
    'logs in successfully with valid credentials',
    { tag: ['@smoke', '@regression'] },
    async ({ loginPage, config, page }) => {
      test.skip(
        !config.credentials.email || !config.credentials.password,
        'LOGIN_EMAIL / LOGIN_PASSWORD not configured for this environment'
      );

      await loginPage.login(config.credentials.email, config.credentials.password);

      await expect(page).not.toHaveURL(/\/login$/);
    }
  );
});
