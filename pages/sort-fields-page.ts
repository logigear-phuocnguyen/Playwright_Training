import { SortFields } from "../models/sort-fields";
import { Locator, Page, expect} from "@playwright/test"
import { CreateDataProfileBase } from "./create-data-profile-page";
import { format } from "util";


export class SortFieldsTab extends CreateDataProfileBase {
    private readonly fieldDynamicStr: string = "//label[contains(.,'%s')]/input";
    private readonly fieldAddedDynamicStr: string = "(//input[@name='chkSortFields'])[%s]/following-sibling::span[2]";
    private readonly fieldSelect: Locator;
    private readonly addLevelButton: Locator;

    constructor(page: Page){
        super(page);
        this.fieldSelect = this.page.locator('//select[@id="cbbFields"]');
        this.addLevelButton = this.page.locator("//input[@id='btnAddSortField']");
    }

    async addLevelFieldSortField(sortFields: SortFields){
        for(let i = 0; i < sortFields.getFields().length; i++) {
            await this.fieldSelect.selectOption(sortFields.getFields()[i]);
            await this.addLevelButton.click();
        }
    }

    async checkFieldsAddedInSortFields(sortFields: SortFields){
        let isEquals = true;

        for(let i = 0; i < sortFields.getFields().length; i++ ){
            const fieldLabel = (await this.page.locator(format(this.fieldAddedDynamicStr, i + 1)).textContent() || '');
            if(!sortFields.getFields().includes(fieldLabel)){
                isEquals = false;
                break;
            }
        }

        await expect(isEquals).toBe(true);
    }

}