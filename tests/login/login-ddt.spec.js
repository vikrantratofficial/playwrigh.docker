const path = require('path');
const { test, expect } = require('../../fixtures/test-fixtures');
const { readCsv } = require('../../utils/csv-reader');

const csvPath = path.resolve(__dirname, '../../utils/data/login-data.csv');
const loginCases = readCsv(csvPath);

/** Builds a {{TOKEN}} -> value map from config: ENV_EMAIL/ENV_PASSWORD plus one pair per role. */
function buildTokenMap(config) {
  const tokens = {
    ENV_EMAIL: config.credentials.email,
    ENV_PASSWORD: config.credentials.password,
  };
  for (const [role, creds] of Object.entries(config.credentials.byRole)) {
    tokens[`${role}_EMAIL`] = creds.email;
    tokens[`${role}_PASSWORD`] = creds.password;
  }
  return tokens;
}

/** Replaces every {{TOKEN}} in rawValue using the token map; unknown tokens are left untouched. */
function resolveValue(rawValue, tokenMap) {
  return rawValue.replace(/\{\{(\w+)\}\}/g, (match, tokenName) =>
    tokenName in tokenMap ? tokenMap[tokenName] : match
  );
}

/** Reads the CSV "tags" column (e.g. "@smoke @regression") into a tag array for Playwright. */
function parseTags(rawTags) {
  return (rawTags || '').split(' ').map((t) => t.trim()).filter(Boolean);
}

test.describe('Login page — data-driven (CSV)', () => {
  for (const testCase of loginCases) {
    test(
      `${testCase.description}`,
      { tag: parseTags(testCase.tags) },
      async ({ loginPage, config, page }) => {
        const tokenMap = buildTokenMap(config);
        const usesToken = /\{\{(\w+)\}\}/.test(testCase.email + testCase.password);
        const email = resolveValue(testCase.email, tokenMap);
        const password = resolveValue(testCase.password, tokenMap);

        test.skip(
          usesToken && (!email || !password),
          `Credentials referenced by this row are not configured for this environment`
        );

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
      }
    );
  }
});
