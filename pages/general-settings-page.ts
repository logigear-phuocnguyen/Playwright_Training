import { GeneralSetting } from "../models/general-Settings";
import { Locator, Page} from "@playwright/test"
import { CreateDataProfileBase } from "./create-data-profile-page";


export class GeneralSettigTab extends CreateDataProfileBase {
    private readonly nameText: Locator;
    private readonly iteamTypeSelect: Locator;
    private readonly relatedDataSelect: Locator;
    private readonly isDistinctCheckbox: Locator;

    constructor(page: Page){
        super(page);
        this.nameText = this.page.locator('#txtProfileName');
        this.iteamTypeSelect = this.page.locator('//select[@id="cbbEntityType"]');
        this.relatedDataSelect = this.page.locator('#cbbSubReport');
        this.isDistinctCheckbox = this.page.locator('#chkDistinct');
    }

    async fillDataGeneralSettingsDataProfile(generalsetting: GeneralSetting){
        await this.nameText.fill(generalsetting.getName());
        await this.iteamTypeSelect.selectOption(generalsetting.getItemType());
        await this.relatedDataSelect.selectOption(generalsetting.getRelatedData());
        if(generalsetting.getIsDistinct()){
            await this.isDistinctCheckbox.check();
        }
    }

}