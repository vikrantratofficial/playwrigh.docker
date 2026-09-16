class ApiClient {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   * @param {{apiBaseUrl: string, apiBasicAuth: {user: string, password: string}}} config
   */
  constructor(request, config) {
    this.request = request;
    this.baseUrl = config.apiBaseUrl;
    this.authHeader = {
      Authorization:
        'Basic ' +
        Buffer.from(`${config.apiBasicAuth.user}:${config.apiBasicAuth.password}`).toString('base64'),
    };
  }

  async login(email, password, captcha) {
    return this.request.post(`${this.baseUrl}/user-master/login`, {
      headers: this.authHeader,
      data: { email, password, captcha },
    });
  }
}

module.exports = { ApiClient };
