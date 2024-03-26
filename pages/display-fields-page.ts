import { DisplayFields } from "../models/display-field";
import { Locator, Page} from "@playwright/test"
import { CreateDataProfileBase } from "./create-data-profile-page";
import { format } from "util";


export class DisplayFieldsTab extends CreateDataProfileBase {
    private readonly fieldDynamicStr: string = "//label[contains(.,'%s')]/input";

    constructor(page: Page){
        super(page);
    }

    async fillDataDisplayFieldsDataProfile(displayField: DisplayFields){
        for(let i = 0; i < displayField.getFields().length; i++) {
            await this.page.locator(format(this.fieldDynamicStr, displayField.getFields()[i])).check();
        }
    }

}