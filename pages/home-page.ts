import { Utils } from './../utils/utils';
import { Page, Locator, expect } from '@playwright/test';
import { BasePage} from './base-page';
import { format } from 'util';
import { SettingMenuItem } from '../enum/setting-menu-item';
import { Message } from '../constant/message';
import { Timeout } from '../constant/timeout';
import { AdministerMenuItem } from '../enum/administer-menu-item';


export class HomePage extends BasePage {
    
    private readonly globalSettingsButton: Locator;
    private readonly choosePanelButton: Locator;
    private readonly confirmDeleteButton: Locator;
    
    private readonly settingMenuItem: string = "//li[@class='mn-setting']//a[.='%s']";
    private readonly pageTabDynamic: string = "//div[@id='main-menu']//li/a[.='%s']";
    private readonly administerMenuItem: string = "//div[@id='header']//ul[@class='head-menu']//ul[@id='ulAdminister']//a[.='%s']";

    constructor(page: Page) {
        super(page);
        this.globalSettingsButton = this.page.locator('//div[@id="main-menu"]//li[@class="mn-setting"]/a');
        this.choosePanelButton = this.page.getByRole('link', { name: 'Choose Panels' });
        this.confirmDeleteButton = this.page.locator("//a[@class='delete']");
    }

    async openChoosePanel(): Promise<void> {
        await this.choosePanelButton.click();
    }

    async gotoDataprofilePage() {
        await this.administerTab.hover();
        await this.page.locator(format(this.administerMenuItem, AdministerMenuItem.DATA_PROFILES)).click();
    }

    async selectSettingMenuItem(item: string) {
        await this.globalSettingsButton.click();
        await this.page.locator(format(this.settingMenuItem, item)).click();
    }

    async selectAdministerMenuItem(item: string) {
        await this.administerTab.hover();
        await this.page.locator(format(this.administerMenuItem, item)).click();
    }

    async checkHomePageDisplay() {
        await expect(this.page).toHaveTitle(/Execution Dashboard/);   
    }

    async checkPageNameDisplay(pageName: string) {
        await expect(this.page.locator(format(this.pageTabDynamic, pageName))).toBeVisible();
    }

    async checkPageNameNotDisplay(pageName: string) {
        await expect(this.page.locator(format(this.pageTabDynamic, pageName))).toBeHidden();
    }


    async checkPageOpened(pageName: string) {
        await expect(this.page.locator(format(this.pageTabDynamic, pageName))).toHaveClass('active');;
    }

    async gotoPage(pageName: string) {
        await Utils.wait(Timeout.SHORT_TIME);
        await this.page.locator(format(this.pageTabDynamic, pageName)).click();
    }

    async gotoChildPages(parentPage: string, childPage: string) {
        await this.page.locator(format(this.pageTabDynamic, parentPage)).hover();
        await Utils.wait(Timeout.SHORT_TIME);
        await this.page.locator(format(this.pageTabDynamic, childPage)).waitFor({ state: 'visible'});
        await this.page.locator(format(this.pageTabDynamic, childPage)).click();
    }

    async deleteCurrentPage() {
        await this.globalSettingsButton.click();
        await this.page.once('dialog', async dialog => {
            dialog.accept();
        });
        await this.confirmDeleteButton.click(); 
    }

    async checkParentPageCannotBeRemovedWhenPageHasChildPage(parentPage: string){
          expect(this.page.once('dialog', dialog => {
            `${dialog.message()} = ${format(Message.REMOVE_PAGE_WARNING, parentPage)}`;
            dialog.accept();
          }));
    }

}