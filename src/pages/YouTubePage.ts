// src/pages/YoutubePage.ts
import { expect, Page, Frame } from '@playwright/test';
import { BasePage } from './BasePage';
import { LOC } from '../locators';

export default class YoutubePage extends BasePage {
  /** Click the consent button if it exists in any frame. */
  async acceptCookies(): Promise<this> {
    // helper searches a given context
   const clickIfVisible = async (ctx: Page | Frame): Promise<boolean> => {
  // 👉 pick the first match so strict‑mode sees exactly ONE element
  const btn = ctx.locator(LOC.youtube.acceptCookiesBtn).first();

  if (await btn.isVisible({ timeout: 1000 }).catch(() => false)) {
    await btn.click();          // now safe: only 1 element
    return true;
  }
  return false;
};

    // check main document first
    if (await clickIfVisible(this.page)) return this;

    // then recursively search every frame
    for (const fr of this.page.frames()) {
      if (await clickIfVisible(fr)) break;
    }
    return this;
  }

  async verifyYoutubeChannelName(): Promise<this> {
    await expect(this.page.locator(LOC.youtube.channelName)).toBeVisible({ timeout: 10_000 });
    return this;
  }

// src/pages/YoutubePage.ts
async getSearchInput() {
  // 1) channel layout: name="search_query"
  let input = this.page.locator('input[name="search_query"]').first();
  if (await input.count()) return input;

  // 2) standard layout: id="search"
  input = this.page.locator('input#search').first();
  if (await input.count()) return input;

  // 3) accessibility role (mobile / fallback)
  return this.page.getByRole('textbox', { name: 'Search' }).first();
}

async checkVideoIsPresent(title: string): Promise<this> {
  const input  = await this.getSearchInput();
  const toggle = this.page.locator('#icon-button[aria-label="Search"], button#search-icon-legacy').first();

  console.log('[YT] Ensuring search box is visible / focused');
  if (!(await input.isVisible().catch(() => false))) {
    await toggle.click({ force: true }).catch(() => {});
    await expect(input).toBeVisible({ timeout: 4_000 });
  }

  console.log('[YT] Typing query');
  await input.fill(title);

  console.log('[YT] Submitting search (Enter)');
  await input.press('Enter');

  console.log('[YT] Waiting for results');
  await this.page.waitForSelector('ytd-video-renderer a#video-title', { timeout: 10_000 });

  console.log('[YT] Scanning result titles');
  const match = this.page
    .locator('ytd-video-renderer a#video-title')
    .filter({ hasText: new RegExp(title, 'i') })
    .first();

  await expect(match).toBeVisible({ timeout: 10_000 });
  console.log('[YT] Video found ✔');
  return this;
}
}