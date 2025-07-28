import { BasePage } from './BasePage';
import { LOC } from '../locators';
import { expect } from '@playwright/test';

export default class FavoritesPage extends BasePage {
  async getAllFavorites(): Promise<string[]> {
    return (await this.page.locator(LOC.favourites.tableRows).allInnerTexts()).map(t => t.trim());
  }

  async removeFavoriteByName(name: string): Promise<void> {
    await this.page.locator(LOC.favourites.removeBtn(name)).click();
  }

  async refreshWaitForTableBody(): Promise<void> {
    await this.page.reload();
    await this.page.locator(LOC.live.tableBody).waitFor();
  }

async removeFirstFavorite(): Promise<void> {
  const rows = this.page.locator(LOC.favourites.tableRows);
  const before = await rows.count();
  if (before === 0) {
    console.warn('No favourites present – nothing to remove');
    return;
  }

  await rows.first().locator(LOC.favourites.toggle).click({ force: true });
  await expect(rows).toHaveCount(before - 1, { timeout: 7000 });
}
}
