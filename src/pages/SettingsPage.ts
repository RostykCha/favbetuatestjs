import { BasePage } from './BasePage';
import { LOC } from '../locators';
import { expect } from '@playwright/test';

export default class SettingsPage extends BasePage {
  async cnahgeToUkrainianAndVerify(): Promise<this> {
    await this.page.locator(LOC.settings.langDropdown).click();
    await this.page.click(LOC.settings.langUa);
    await expect(this.page.locator(LOC.settings.langDropdown)).toHaveText(/Україн/i);
    return this;
  }

  async cnahgeToEnglishAndVerify(): Promise<this> {
    await this.page.locator(LOC.settings.langDropdown).click();
    await this.page.click(LOC.settings.langEn);
    await expect(this.page.locator(LOC.settings.langDropdown)).toHaveText(/English/i);
    return this;
  }

  async changeToDarkThemeAndVerify(): Promise<this> {
    await this.page.click(LOC.settings.themeDark);
    await this.page.waitForFunction(LOC.settings.themeJs);
    return this;
  }

  async changeToLightThemeAndVerify(): Promise<this> {
    await this.page.click(LOC.settings.themeLight);
    await this.page.waitForFunction(LOC.settings.themeJs);
    return this;
  }
}
