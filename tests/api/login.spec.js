const { test, expect } = require('../../fixtures/test-fixtures');
const { randomInvalidCredentials, randomWrongCaptcha } = require('../../utils/test-data');

test.describe('Login API', () => {
  test(
    'returns "User Not Found" for a non-existent account',
    { tag: ['@regression'] },
    async ({ apiClient }) => {
      const { email, password } = randomInvalidCredentials();

      const response = await apiClient.login(email, password, randomWrongCaptcha());
      const body = await response.json();

      expect(response.status()).toBe(200);
      expect(body.status).toContain('406');
      expect(body.message).toMatch(/user not found/i);
    }
  );

  test(
    'logs in successfully via API with valid credentials',
    { tag: ['@smoke', '@regression'] },
    async ({ apiClient, config }) => {
      test.skip(
        !config.credentials.email || !config.credentials.password,
        'LOGIN_EMAIL / LOGIN_PASSWORD not configured for this environment'
      );

      const response = await apiClient.login(
        config.credentials.email,
        config.credentials.password,
        randomWrongCaptcha()
      );

      expect(response.status()).toBe(200);
    }
  );
});
