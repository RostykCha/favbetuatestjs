import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { LOC } from '../locators';
import YoutubePage from './YouTubePage';
import { Page } from '@playwright/test';

export default class HomePage extends BasePage {
  async open(): Promise<this> {
    await this.goto(LOC.url, /Favbet/i);
    return this;
  }

  async openHomePage(): Promise<this> {
    return this.open();
  }

  async openYoutubeFromFooter(): Promise<YoutubePage> {
    // 1) Click the footer link while *simultaneously* listening for a popup.
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup').catch(() => null),   // resolves to Page or null
      this.page.locator(LOC.footer.youtube).click()
    ]);

    // 2) If no popup => navigation occurred in the same tab.
    const ytPage: Page = popup ?? this.page;

    // 3) Make sure the new page (or same tab) is fully loaded.
    await ytPage.waitForLoadState('load');
    await ytPage.bringToFront();                           // guarantee focus

    // 4) Wrap in our Page‑Object.
    return new YoutubePage(ytPage);
  }

}