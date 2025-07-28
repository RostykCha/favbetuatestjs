/* src/pages/SettingsPage.ts */
import { expect } from '@playwright/test';
import { LOC } from '../locators';
import { BasePage } from './BasePage';

export default class SettingsPage extends BasePage {
  /* ----- language ----- */

  async changeToUkrainianAndVerify(): Promise<this> {
    // Use direct locator strings as fallback
    const langDropdown = 'div[data-role="settings-language-select-trigger"]';
    const langUaOption = 'div[data-role="option-uk"]';
    
    await this.page.locator(langDropdown).click();
    await this.page.locator(langUaOption).click();
    await expect(this.page.locator(langDropdown))
      .toHaveText(/Українська|Ukrainian/i, { timeout: 3_000 });
    return this;
  }

  async changeToEnglishAndVerify(): Promise<this> {
    // Use direct locator strings as fallback
    const langDropdown = 'div[data-role="settings-language-select-trigger"]';
    const langEnOption = 'div[data-role="option-en"]';
    
    await this.page.locator(langDropdown).click();
    await this.page.locator(langEnOption).click();
    await expect(this.page.locator(langDropdown))
      .toHaveText(/English|Англійська/i, { timeout: 3_000 });
    return this;
  }

  /* ----- theme ----- */

  async changeToDarkThemeAndVerify(): Promise<this> {
    const themeDarkButton = 'div[data-role="settings-color-scheme-switcher-dark"]';
    const bodyDarkClass = 'body.dark';
    
    await this.page.locator(themeDarkButton).click();
    await expect(this.page.locator(bodyDarkClass))
      .toBeVisible({ timeout: 3_000 });
    return this;
  }

  async changeToLightThemeAndVerify(): Promise<this> {
    const themeLightButton = 'div[data-role="settings-color-scheme-switcher-light"]';
    const bodyLightClass = 'body.light';
    
    await this.page.locator(themeLightButton).click();
    await expect(this.page.locator(bodyLightClass))
      .toBeVisible({ timeout: 3_000 });
    return this;
  }
}