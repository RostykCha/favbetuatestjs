import { BasePage } from './BasePage';
import { LOC } from '../locators';

export default class RegisterPage extends BasePage {
  async registerUser(user: { email: string; pass: string }): Promise<this> {
    await this.page.fill(LOC.register.email, user.email);
    await this.page.fill(LOC.register.pass,  user.pass);
    await this.page.click(LOC.register.submit);
    return this;
  }
}
