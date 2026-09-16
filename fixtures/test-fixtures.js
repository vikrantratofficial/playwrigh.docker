const base = require('@playwright/test');
const { config } = require('../config/env.config');
const { LoginPage } = require('../pages/login.page');
const { ApiClient } = require('../api/api-client');

const test = base.test.extend({
  config: async ({}, use) => {
    await use(config);
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  apiClient: async ({ request }, use) => {
    await use(new ApiClient(request, config));
  },
});

const expect = base.expect;

module.exports = { test, expect };
