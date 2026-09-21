# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login\login-ddt.spec.js >> Login page — data-driven (CSV) >> non-existent account is rejected
- Location: tests\login\login-ddt.spec.js:35:5

# Error details

```
TypeError: Cannot convert undefined or null to object
```

# Test source

```ts
  1  | const path = require('path');
  2  | const { test, expect } = require('../../fixtures/test-fixtures');
  3  | const { readCsv } = require('../../utils/csv-reader');
  4  | 
  5  | const csvPath = path.resolve(__dirname, '../../utils/data/login-data.csv');
  6  | const loginCases = readCsv(csvPath);
  7  | 
  8  | /** Builds a {{TOKEN}} -> value map from config: ENV_EMAIL/ENV_PASSWORD plus one pair per role. */
  9  | function buildTokenMap(config) {
  10 |   const tokens = {
  11 |     ENV_EMAIL: config.credentials.email,
  12 |     ENV_PASSWORD: config.credentials.password,
  13 |   };
> 14 |   for (const [role, creds] of Object.entries(config.credentials.byRole)) {
     |                                      ^ TypeError: Cannot convert undefined or null to object
  15 |     tokens[`${role}_EMAIL`] = creds.email;
  16 |     tokens[`${role}_PASSWORD`] = creds.password;
  17 |   }
  18 |   return tokens;
  19 | }
  20 | 
  21 | /** Replaces every {{TOKEN}} in rawValue using the token map; unknown tokens are left untouched. */
  22 | function resolveValue(rawValue, tokenMap) {
  23 |   return rawValue.replace(/\{\{(\w+)\}\}/g, (match, tokenName) =>
  24 |     tokenName in tokenMap ? tokenMap[tokenName] : match
  25 |   );
  26 | }
  27 | 
  28 | /** Reads the CSV "tags" column (e.g. "@smoke @regression") into a tag array for Playwright. */
  29 | function parseTags(rawTags) {
  30 |   return (rawTags || '').split(' ').map((t) => t.trim()).filter(Boolean);
  31 | }
  32 | 
  33 | test.describe('Login page — data-driven (CSV)', () => {
  34 |   for (const testCase of loginCases) {
  35 |     test(
  36 |       `${testCase.description}`,
  37 |       { tag: parseTags(testCase.tags) },
  38 |       async ({ loginPage, config, page }) => {
  39 |         const tokenMap = buildTokenMap(config);
  40 |         const usesToken = /\{\{(\w+)\}\}/.test(testCase.email + testCase.password);
  41 |         const email = resolveValue(testCase.email, tokenMap);
  42 |         const password = resolveValue(testCase.password, tokenMap);
  43 | 
  44 |         test.skip(
  45 |           usesToken && (!email || !password),
  46 |           `Credentials referenced by this row are not configured for this environment`
  47 |         );
  48 | 
  49 |         await loginPage.open();
  50 |         await loginPage.login(email, password);
  51 | 
  52 |         switch (testCase.expectedOutcome) {
  53 |           case 'success':
  54 |             await expect(page).not.toHaveURL(/\/login$/);
  55 |             break;
  56 | 
  57 |           case 'fieldError':
  58 |             await expect(loginPage.getFieldMessage(testCase.expectedMessage)).toBeVisible();
  59 |             break;
  60 | 
  61 |           case 'alertError':
  62 |             await expect(loginPage.getAlert()).toBeVisible();
  63 |             await expect(loginPage.getAlert()).toContainText(testCase.expectedMessage);
  64 |             break;
  65 | 
  66 |           default:
  67 |             throw new Error(`Unknown expectedOutcome "${testCase.expectedOutcome}" in login-data.csv`);
  68 |         }
  69 |       }
  70 |     );
  71 |   }
  72 | });
  73 | 
```