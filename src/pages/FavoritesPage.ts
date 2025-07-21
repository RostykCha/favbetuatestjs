import { BasePage } from './BasePage';
import { LOC } from '../locators';

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
}
