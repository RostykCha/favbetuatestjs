import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { LOC } from '../locators';
import YoutubePage from './YouTubePage';

export default class HomePage extends BasePage {
  async open(): Promise<this> {
    await this.goto(LOC.url, /Favbet/i);
    return this;
  }

  async openHomePage(): Promise<this> {
    return this.open();
  }

  async openYoutubeFromFooter(): Promise<YoutubePage> {
    await this.page.locator(LOC.youtube.icon).click();
    return new YoutubePage(this.page);
  }
}