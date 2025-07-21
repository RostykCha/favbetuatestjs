// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  testMatch: '**/ui-suite.spec.ts', 
  workers: 5,
  retries: process.env.CI ? 2 : 0,
  timeout: 40_000,

  reporter: [
    ['list'],
    ['html',  { open: 'never' }],
    ['junit', { outputFile: 'results/ui.xml' }],
    ['allure-playwright']
  ],

  use: {
    baseURL: 'https://www.favbet.ua/en/',
    headless: false,
    channel: 'chrome',
    viewport: { width: 1280, height: 800 },
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
      'AppleWebKit/537.36 (KHTML, like Gecko) ' +
      'Chrome/125.0.0.0 Safari/537.36',
    launchOptions: {
      args: [
        '--disable-blink-features=AutomationControlled',
        '--start-maximized'
      ]
    },
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    expect: { timeout: 50000 } 
  },

  projects: [
    {
      name: 'chromium-desktop',
      use: {}     // inherits everything from the top‑level "use"
    }
  ]
});
