import { PageDashboard } from './../models/page-dashboard';
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class NewPage extends BasePage{
    private readonly pageNameTextbox: Locator;
    private readonly parentPage: Locator;
    private readonly numberOfColumn: Locator;
    private readonly displayAfter: Locator;
    private readonly isPublished: Locator;
    private readonly okButton: Locator;
    private readonly cancelButton: Locator;

    constructor(page: Page){
        super(page);
        this.pageNameTextbox = this.page.locator('#name');
        this.parentPage = this.page.locator('#parent');
        this.numberOfColumn = this.page.locator('#columnnumber');
        this.displayAfter = this.page.locator('#afterpage');
        this.isPublished = this.page.locator('#ispublic');
        this.okButton = this.page.locator('#OK');
        this.cancelButton = this.page.locator('#Cancel');
    }

    async fillDataNewPageForm(pageDashboard: PageDashboard){
        await this.pageNameTextbox.fill(pageDashboard.getPageName());
        if(pageDashboard.getParentPage() != "" && pageDashboard.getParentPage() != undefined)
        {
            await this.parentPage.selectOption(pageDashboard.getParentPage());
        }
        if(pageDashboard.getNumberOfColumns() != "" && pageDashboard.getNumberOfColumns() != undefined)
        {
            await this.numberOfColumn.selectOption(pageDashboard.getNumberOfColumns());
        }
        if(pageDashboard.getDisplayAfter() != "" && pageDashboard.getDisplayAfter() != undefined)
        {
            await this.displayAfter.selectOption(pageDashboard.getDisplayAfter());
        }
        if(pageDashboard.getIsPublished() != undefined)
        {
            await this.isPublished.setChecked(pageDashboard.getIsPublished());
        }
    }

    async submitDataNewPageForm(){
        await this.okButton.click();
    }


    async createNewPage(pageDashboard: PageDashboard){
        await this.fillDataNewPageForm(pageDashboard);
        await this.submitDataNewPageForm();
        
    }

}