import { BasePage } from './BasePage';
import { LOC } from '../locators';
import { expect } from '@playwright/test';

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

async selectFirstFavorite(): Promise<string> {
  const row     = this.page.locator(LOC.live.rows).first();
  const favStar = row.locator(LOC.live.favStar);
  const starIcon = row.locator(LOC.live.favStarIcon);   // svg <path>

  const title = await row
    .locator(LOC.live.cardTitle)
    .allInnerTexts()
    .then(p => p.map(t => t.trim()).filter(Boolean).join(' - '));

  const isSelected = async () => {
    const fill = await starIcon.getAttribute('fill');
    return fill !== null && fill.toLowerCase() !== 'none';
  };

  if (!(await isSelected())) {
    await favStar.click({ force: true });
    await expect(async () => {
      expect(await isSelected()).toBe(true);
    }).toPass({ timeout: 5000 });
  }

  return title;
}


}
