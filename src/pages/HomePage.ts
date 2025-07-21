import { BasePage } from './BasePage';
import { LOC } from '../locators';

export class HomePage extends BasePage {
  async open() {
    await this.goto('https://example.com', /Example/i);
  }

  async login(user: { email: string; pass: string }) {
    await this.page.fill(LOC.login.email, user.email);
    await this.page.fill(LOC.login.pass, user.pass);
    await this.page.click(LOC.login.submit);
  }

  async gotoLive(): Promise<LivePage> {
    // Placeholder stub for LivePage navigation
    return {} as LivePage;
  }
}

// Placeholder type for LivePage
type LivePage = unknown;
