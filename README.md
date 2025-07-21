# Favbet UI Automation Suite

A Playwright + TypeScript rewrite of the original Java/TestNG UI framework that drives favbet.ua through real Chrome and produces detailed HTML, JUnit, and Allure reports. Runs locally or in any CI runner with one Docker command.

---

## Tech Stack

| Area             | Choice                              | Reason                                                              |
| ---------------- | ----------------------------------- | ------------------------------------------------------------------- |
| Language         | TypeScript 5                        | strict typing, fast feedback                                        |
| Runner / Browser | Playwright 1.45                     | auto‑waits, parallel workers, first‑class WebKit & mobile emulation |
| Package Mgr      | npm 10                              | zero‑config lockfile, CI‑friendly                                   |
| Reporting        | Playwright HTML, JUnit XML, Allure  | human view, CI view, trend view                                     |
| Container        | Official Microsoft Playwright image | browsers pre‑installed, reproducible results                        |

---

## Quick Start

```bash
# clone and install
git clone https://github.com/<org>/favbet-ui-test.git
cd favbet-ui-test
npm ci

# run headed Chrome (debug‑friendly)
npm run test

# view the HTML report
npx playwright show-report
```

### Headless / CI run

```bash
npm run test:ci          # headless, retries enabled
```

### One‑line Docker run

```bash
docker build -t favbet-ui .
docker run --rm favbet-ui
```

The container exits with status 0 on success or 1 on the first failing test.

---

## Repository Layout

```
.
├─ src
│  ├─ locators.ts        # single source of truth for selectors
│  ├─ pages/             # Page Objects
│  │   ├─ BasePage.ts
│  │   ├─ HomePage.ts
│  │   └─ …
│  └─ tests/
│      └─ ui-suite.spec.ts   # T001–T003 combined
├─ playwright.config.ts
├─ Dockerfile
└─ README.md
```

---

## NPM Scripts

| Script                  | Description                        |
| ----------------------- | ---------------------------------- |
| `npm run test`          | headed Chrome, no retries          |
| `npm run test:ci`       | headless, retries set by `CI=true` |
| `npm run lint`          | ESLint plus Prettier check         |
| `npm run report:allure` | generate and open Allure dashboard |

---

## Configuration Highlights

| Setting  | File                   | Default                     |
| -------- | ---------------------- | --------------------------- |
| Base URL | `playwright.config.ts` | `https://www.favbet.ua/en/` |
| Channel  | `use.channel`          | `chrome`                    |
| Workers  | `workers`              | 5                           |
| Retries  | `retries`              | 2 when `CI=true`            |

Environment variables override any value, for example:

```bash
BASE_URL=https://staging.favbet.local \
npx playwright test --workers=3 --headed
```

---

## Troubleshooting

| Issue                            | Resolution                                                                                                                                        |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare "Are you human?"      | The suite runs headed Chrome with a real user‑agent. If a CAPTCHA still appears in CI, allow‑list your runner’s IP or use a trusted staging host. |
| Tests run twice                  | Remove the old standalone spec files or set `testMatch` to the combined file.                                                                     |
| `Cannot navigate to invalid URL` | Check `baseURL` and ensure `open()` receives a path such as `/` not an empty string.                                                              |

---

## Contributing Guidelines

1. Fork and branch from `main`.
2. Keep one logical change per pull‑request.
3. Run `npm run lint` and `npm run test` before pushing.
4. Extend `ui-suite.spec.ts` or create a new spec file; keep a clear `test.step` log for every verification.

---

## License

MIT License. Feel free to use, modify, and distribute.
