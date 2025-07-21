import { Page, expect } from '@playwright/test';
import { LOC } from '../locators';

import type LoginPage      from './LoginPage';
import type RegisterPage   from './RegisterPage';
import type LivePage       from './LivePage';
import type FavoritesPage  from './FavoritesPage';
import type SettingsPage   from './SettingsPage';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(url: string, titleRe: RegExp): Promise<this> {
    await this.page.goto(url);
    await expect(this.page).toHaveTitle(titleRe);
    return this;
  }

  /** Common nav helper based on `require` to stay in CJS */
  protected async gotoPage<T>(
    clickLocator: string,
    modulePath: string,
    exportName: string
  ): Promise<T> {
    await this.page.locator(clickLocator).click();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require(modulePath);
    const Ctor = (mod[exportName] ?? mod.default) as new (p: Page) => T;
    return new Ctor(this.page);
  }

  /* navigation shortcuts */
  navigateToLoginPage(): Promise<LoginPage> {
    return this.gotoPage(LOC.auth.loginLink,    './LoginPage',    'default');
  }
  navigateToRegisterPage(): Promise<RegisterPage> {
    return this.gotoPage(LOC.auth.registerLink, './RegisterPage', 'default');
  }
  navigateToLivePage(): Promise<LivePage> {
    return this.gotoPage(LOC.home.liveMenu,     './LivePage',     'default');
  }
  navigateToFavoritesPage(): Promise<FavoritesPage> {
    return this.gotoPage(LOC.menu.favourites,   './FavoritesPage','default');
  }
  navigateToSettingsPage(): Promise<SettingsPage> {
    return this.gotoPage(LOC.menu.settings,     './SettingsPage', 'default');
  }

  async closeNotificationIfPresent(): Promise<this> {
    const pop = this.page.locator(LOC.notification.close);
    if (await pop.isVisible({ timeout: 2000 })) {
      await pop.click();
      await pop.waitFor({ state: 'hidden', timeout: 2000 });
    }
    return this;
  }
}
