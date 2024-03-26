import { Page, Locator} from '@playwright/test';
import { BasePage } from './base-page';
import { format } from 'util';

export class CreateDataProfileBase extends BasePage{
    private readonly nextButton: Locator;
    private readonly finishButton: Locator;
    private readonly cancelButton: Locator;

     private readonly dataProfileTabItemStr: string = '//table//ul[@id="wstep"]/li[text()="%s"]';

    constructor(page: Page){
        super(page);
        this.nextButton = this.page.locator('//input[@value="Next"]');
        this.finishButton = this.page.locator('//input[@value="Finish"]');
        this.cancelButton = this.page.locator('//input[@value="Cancel"]');
    }

    async selectTabNameDataProfile(tabName: string){
        await this.page.locator(format(this.dataProfileTabItemStr, tabName)).click();
    }

    async submitFinishDataProfileData() {
        await this.finishButton.click();
    }

    async submitNextTabDataProfile(){
        await this.nextButton.click();
    }

    async submitCancelDataProfileData(){
        await this.cancelButton.click();
    }



}