import { BasePage } from './BasePage';
import { LOC } from '../locators';
import ProfilePage from './ProfilePage';

export default class LoginPage extends BasePage {
  async loginUser(user: { email: string; pass: string }): Promise<ProfilePage> {
    await this.page.fill(LOC.login.email, user.email);
    await this.page.fill(LOC.login.pass,  user.pass);
    await this.page.click(LOC.login.submit);
    await this.page.locator(LOC.profile.icon).waitFor();
    return new ProfilePage(this.page);
  }
}
