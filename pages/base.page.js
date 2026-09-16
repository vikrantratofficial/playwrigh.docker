class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path);
  }

  getAlert() {
    return this.page.getByRole('alert');
  }

  async getAlertText() {
    return (await this.getAlert().innerText()).trim();
  }
}

module.exports = { BasePage };
