# Playwright Automation Framework — Status Notes

_Last reviewed: 2026-09-15_

## Target application
UCC PLMS ("First Logistic Management System") login flow: `http://74.225.253.78:8800/UCCDEV/login`
UI is a React/Vite app; login posts JSON to a separate API host (`API_BASE_URL`) under `/user-master/login`,
authenticated with a static app-level Basic Auth header the frontend sends on every call.

## Architecture (MNC-standard layout)

```
config/
  env.config.js            # loads dotenv per ENV, validates required vars, exports typed config
  environments/
    .env.example            # committed template — copy to .env.<name> and fill in
    .env.uat                # real values, gitignored (blank creds by default)
pages/
  base.page.js              # shared Page Object behaviour (alerts, navigation)
  login.page.js             # Login POM — all selectors live here, nowhere else
fixtures/
  test-fixtures.js          # extends @playwright/test with `config`, `loginPage`, `apiClient`
api/
  api-client.js             # wraps Playwright's APIRequestContext for the login API
utils/
  test-data.js              # @faker-js/faker — generates random invalid credentials/captcha
tests/
  login/login.spec.js       # UI tests (scenario-based)
  login/login-ddt.spec.js   # UI tests (data-driven, reads utils/data/login-data.csv)
  api/login.spec.js         # API-level tests
```

## No-hardcode principles applied
- **URLs & credentials**: never inlined in tests — sourced from `config/env.config.js`, which reads
  `config/environments/.env.<ENV>` (`ENV=uat` by default). Missing required vars throw immediately
  with a clear message instead of silently using a fallback.
- **Captcha**: the app renders the captcha value as plain text in the DOM (not an image). `LoginPage`
  reads it live from the page right before submit — it is never hardcoded or pre-recorded.
- **Test data**: invalid-login tests use `@faker-js/faker` to generate a fresh random email/password
  every run, rather than a fixed string.
- **Selectors**: centralized in `pages/*.page.js` (Page Object Model) — test specs only call methods
  like `loginPage.login(email, password)`, never `page.locator('#email')` directly.
- **App-level Basic Auth secret** (`Amazin:...`, observed in the frontend's network calls) is stored as
  `API_BASIC_AUTH_USER` / `API_BASIC_AUTH_PASSWORD` env vars, not embedded in `api-client.js`.

## What's implemented
| Area | Status | Notes |
|---|---|---|
| Page Object Model | ✅ | `pages/base.page.js`, `pages/login.page.js` |
| Custom fixtures | ✅ | `fixtures/test-fixtures.js` injects `config`, `loginPage`, `apiClient` |
| Env-driven config | ✅ | `ENV=uat\|dev\|prod` selects `config/environments/.env.<ENV>`; missing files fail loudly |
| API testing | ✅ | `api/api-client.js` + `tests/api/login.spec.js`, using Playwright's native `request` fixture |
| Dynamic test data | ✅ | `@faker-js/faker` in `utils/test-data.js` — no static invalid-login strings |
| Reporting | ✅ | HTML reporter + Allure (`allure-playwright`, `allure-commandline`) |
| Multi-browser | ✅ | chromium, firefox, webkit all enabled in `playwright.config.js` |
| CI | ✅ | GitHub Actions runs tests against UAT, uploads both HTML and Allure results as artifacts |
| Docker | ✅ | `compose.yml` now loads `config/environments/.env.${ENV:-uat}`; real env files excluded from the image via `.dockerignore` |
| Secrets hygiene | ✅ | All real `.env.*` files gitignored/dockerignored; only `.env.example` is tracked |

## Verified test coverage (run 2026-09-15, UAT)
- UI: rejects a random non-existent account (asserts `role="alert"` → "User Not Found")
- UI: rejects an incorrect captcha client-side (asserts the "Invalid Captcha" message) before any API call fires
- UI: captcha refresh button produces a new captcha value
- UI: positive login — **skipped** until `LOGIN_EMAIL`/`LOGIN_PASSWORD` are filled in `config/environments/.env.uat`
- API: `POST /user-master/login` with a random invalid account returns `200` / `{status: "406 NOT_ACCEPTABLE", message: "User Not Found"}`
- API: positive login — **skipped** until valid credentials are configured

All 30 tests pass across chromium/firefox/webkit (run 2026-09-15, with valid UAT credentials now
configured — no more skips).

## Data-driven testing (DDT)
`tests/login/login-ddt.spec.js` reads `utils/data/login-data.csv` (via `utils/csv-reader.js`, using
`csv-parse`) and generates one Playwright test per row. Each row has:
`description, email, password, expectedOutcome (success|fieldError|alertError), expectedMessage`.
`{{ENV_EMAIL}}` / `{{ENV_PASSWORD}}` placeholders in the CSV are resolved against `config.credentials`
at runtime — real credentials never live in the CSV file, only in the gitignored `.env.uat`. Add a new
login scenario by adding a CSV row — no code change needed.

## npm scripts
- `npm test` / `npm run test:uat` — run everything against UAT
- `npm run test:dev` — run against a `dev` environment (needs `config/environments/.env.dev` created first)
- `npm run test:login` / `npm run test:api` — run just one suite
- `npm run test:headed` / `test:ui` / `test:debug` — interactive modes
- `npm run report:html` / `npm run report:allure` — view reports

## To unlock the positive-login tests
Fill in `config/environments/.env.uat`:
```
LOGIN_EMAIL=<a real UAT account email>
LOGIN_PASSWORD=<its password>
```
They're skipped, not hardcoded, until then.

## Suggested next steps
- Add more POMs/specs as more pages/flows of the app are in scope (dashboard, forms, etc.)
- Add a `storageState` auth fixture once a valid login exists, to skip repeated UI logins in other test suites
- Add `dev`/`prod` env files if those environments exist for this app
- Wire `LOGIN_EMAIL`/`LOGIN_PASSWORD` as GitHub Actions secrets so CI can also run the positive-login tests
