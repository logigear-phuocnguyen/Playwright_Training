import { Page, Locator } from "@playwright/test";

export abstract class BasePage {

    readonly page: Page;
    readonly accountTab: Locator;
    readonly logoutButton: Locator;
    readonly repositorySelect: Locator;
    readonly administerTab: Locator;


    constructor(page: Page) { 
        this.page = page;
        this.accountTab = this.page.locator('//a[@href="#Welcome"]');
        this.logoutButton = this.page.locator('//a[@href="logout.do"]');
        this.repositorySelect = this.page.locator('//a[@href="#Repository"]');
        this.administerTab = this.page.getByRole('link', { name: 'Administer' });
    }

    async logout(): Promise<void> {
        await this.accountTab.click();
        await this.logoutButton.click();
    }



}