import { Message } from './../constant/message';
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage{

  private readonly repoCbx: Locator;
  private readonly usernameTxt: Locator;
  private readonly passwordTxt: Locator;
  private readonly loginBtn: Locator;

  constructor(readonly page: Page){
    super(page);
    this.repoCbx= this.page.locator('#repository');
    this.usernameTxt = this.page.locator('#username');
    this.passwordTxt = this.page.locator('#password');
    this.loginBtn = this.page.locator('.btn-login');
  };

  async goto(){
    await this.page.goto('/TADashboard/login.jsp');
  }

  async login(username: string, password: string, repository: string): Promise<void>{
    await this.repoCbx.selectOption(repository);
    await this.usernameTxt.fill(username);
    await this.passwordTxt.fill(password);
    await this.loginBtn.click();
  }

  async displayUser(){
    await expect(this.usernameTxt).toBeVisible;
    await expect(this.passwordTxt).toBeVisible;
  }

  async checkErrorMessageDisplay(){
    expect(this.page.once('dialog', dialog => {
      `${dialog.message()} = ${Message.LOGIN_FAILED_MESSAGE}`;
    }));
  }

}