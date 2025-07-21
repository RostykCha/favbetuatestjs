import { BasePage } from './BasePage';
import { LOC } from '../locators';

export default class LivePage extends BasePage {
  async selectAllAvailableFavorites(): Promise<string[]> {
    const rows = this.page.locator(LOC.live.rows);
    const titles: string[] = [];
    for (let i = 0; i < await rows.count(); i++) {
      const row = rows.nth(i);
      const title = (await row.locator(LOC.live.cardTitle).allInnerTexts()).join(' - ').trim();
      titles.push(title);
      const favStar = row.locator(LOC.live.favStar);
      if (!(await favStar.isChecked?.() || await favStar.getAttribute('aria-pressed') === 'true')) {
        await favStar.click({ force: true });
      }
    }
    return titles;
  }


}
