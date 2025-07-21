import { BasePage } from './BasePage';
import { LOC } from '../locators';
import { expect } from '@playwright/test';

export default class YoutubePage extends BasePage {
  async acceptCookies(): Promise<this> {
    const frames = this.page.frames();
    for (const frame of frames) {
      const btn = frame.locator(LOC.youtube.acceptCookiesBtn);
      if (await btn.isVisible({ timeout: 2000 })) {
        await btn.click();
        break;
      }
    }
    return this;
  }

  async verifyYoutubeChannelName(): Promise<this> {
    await expect(this.page.locator(LOC.youtube.channelName)).toBeVisible();
    return this;
  }

  async checkVideoIsPresent(title: string): Promise<this> {
    await this.page.fill(LOC.youtube.searchField, title);
    await this.page.keyboard.press('Enter');
    await expect(this.page.locator(LOC.youtube.videoTitles).filter({ hasText: title })).toBeVisible();
    return this;
  }
}
