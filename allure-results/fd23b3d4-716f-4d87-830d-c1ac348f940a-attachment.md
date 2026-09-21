# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\login.spec.js >> Login API >> returns "User Not Found" for a non-existent account
- Location: tests\api\login.spec.js:5:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

# Test source

```ts
  1  | const { test, expect } = require('../../fixtures/test-fixtures');
  2  | const { randomInvalidCredentials, randomWrongCaptcha } = require('../../utils/test-data');
  3  | 
  4  | test.describe('Login API', () => {
  5  |   test('returns "User Not Found" for a non-existent account', async ({ apiClient }) => {
  6  |     const { email, password } = randomInvalidCredentials();
  7  | 
  8  |     const response = await apiClient.login(email, password, randomWrongCaptcha());
  9  |     const body = await response.json();
  10 | 
> 11 |     expect(response.status()).toBe(200);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  12 |     expect(body.status).toContain('406');
  13 |     expect(body.message).toMatch(/user not found/i);
  14 |   });
  15 | 
  16 |   test('logs in successfully via API with valid credentials', async ({ apiClient, config }) => {
  17 |     test.skip(
  18 |       !config.credentials.email || !config.credentials.password,
  19 |       'LOGIN_EMAIL / LOGIN_PASSWORD not configured for this environment'
  20 |     );
  21 | 
  22 |     const response = await apiClient.login(
  23 |       config.credentials.email,
  24 |       config.credentials.password,
  25 |       randomWrongCaptcha()
  26 |     );
  27 | 
  28 |     expect(response.status()).toBe(200);
  29 |   });
  30 | });
  31 | 
```