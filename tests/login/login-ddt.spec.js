const path = require('path');
const { test, expect } = require('../../fixtures/test-fixtures');
const { readCsv } = require('../../utils/csv-reader');

const csvPath = path.resolve(__dirname, '../../utils/data/login-data.csv');
const loginCases = readCsv(csvPath);

/** Resolves {{ENV_EMAIL}} / {{ENV_PASSWORD}} placeholders against the active env config. */
function resolveValue(rawValue, config) {
  return rawValue
    .replace('{{ENV_EMAIL}}', config.credentials.email)
    .replace('{{ENV_PASSWORD}}', config.credentials.password);
}

test.describe('Login page — data-driven (CSV)', () => {
  for (const testCase of loginCases) {
    test(`${testCase.description}`, async ({ loginPage, config, page }) => {
      const usesEnvCredentials =
        testCase.email.includes('{{ENV_EMAIL}}') || testCase.password.includes('{{ENV_PASSWORD}}');
      test.skip(
        usesEnvCredentials && (!config.credentials.email || !config.credentials.password),
        'LOGIN_EMAIL / LOGIN_PASSWORD not configured for this environment'
      );

      const email = resolveValue(testCase.email, config);
      const password = resolveValue(testCase.password, config);

      await loginPage.open();
      await loginPage.login(email, password);

      switch (testCase.expectedOutcome) {
        case 'success':
          await expect(page).not.toHaveURL(/\/login$/);
          break;

        case 'fieldError':
          await expect(loginPage.getFieldMessage(testCase.expectedMessage)).toBeVisible();
          break;

        case 'alertError':
          await expect(loginPage.getAlert()).toBeVisible();
          await expect(loginPage.getAlert()).toContainText(testCase.expectedMessage);
          break;

        default:
          throw new Error(`Unknown expectedOutcome "${testCase.expectedOutcome}" in login-data.csv`);
      }
    });
  }
});
