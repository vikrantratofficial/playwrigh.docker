# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login\login.spec.js >> Login page >> rejects an incorrect captcha before hitting the API
- Location: tests\login\login.spec.js:18:3

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "http://74.225.253.78:8800/UCCDEV/login", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic [ref=e12]:
    - generic [ref=e13]:
      - link [ref=e15] [cursor=pointer]:
        - /url: /UCCDEV
        - img "Logo" [ref=e16]
      - heading "First Logistic Management System." [level=5] [ref=e17]
    - generic [ref=e19]:
      - generic [ref=e20]:
        - generic [ref=e21]: Email
        - textbox "Email" [ref=e22]:
          - /placeholder: Enter email
      - link "Forgot password?" [ref=e24] [cursor=pointer]:
        - /url: /UCCDEV/forgot-password
      - generic [ref=e25]: Password
      - generic [ref=e26]:
        - textbox "Password" [ref=e27]:
          - /placeholder: Enter Password
        - button "" [ref=e28] [cursor=pointer]
      - generic [ref=e30]: Captcha
      - generic [ref=e32]:
        - textbox "Captcha" [ref=e34]:
          - /placeholder: Enter Captcha
        - generic [ref=e35]:
          - generic [ref=e36]: 53b5b
          - button "" [ref=e37] [cursor=pointer]
      - button "Sign In" [ref=e40] [cursor=pointer]
      - generic [ref=e41]:
        - heading "Follow us on" [level=5] [ref=e43]
        - generic [ref=e44]:
          - link "" [ref=e45] [cursor=pointer]:
            - /url: https://www.facebook.com/AmazinAutomationSolution/
          - link "" [ref=e47] [cursor=pointer]:
            - /url: https://in.linkedin.com/company/amazin1453211
  - contentinfo [ref=e49]:
    - paragraph [ref=e54]: © All Rights Reserved. FIRLO
```

# Test source

```ts
  1  | class BasePage {
  2  |   /**
  3  |    * @param {import('@playwright/test').Page} page
  4  |    */
  5  |   constructor(page) {
  6  |     this.page = page;
  7  |   }
  8  | 
  9  |   async goto(path = '/') {
> 10 |     await this.page.goto(path);
     |                     ^ Error: page.goto: Test timeout of 30000ms exceeded.
  11 |   }
  12 | 
  13 |   getAlert() {
  14 |     return this.page.getByRole('alert');
  15 |   }
  16 | 
  17 |   async getAlertText() {
  18 |     return (await this.getAlert().innerText()).trim();
  19 |   }
  20 | }
  21 | 
  22 | module.exports = { BasePage };
  23 | 
```