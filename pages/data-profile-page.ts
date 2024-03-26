import { Timeout } from './../constant/timeout';
import { Utils } from './../utils/utils';
import { DataProfilePreset } from './../constant/data-profile';
import { Page, Locator, expect} from '@playwright/test'
import { BasePage } from './base-page';
import { format } from 'util';
import { DataProfileItemType } from '../enum/data-profile-tem';

export class DataProfile extends BasePage{
    private readonly dataProfileTable: Locator;
    private readonly addNewDataProfileButton: Locator;
    private readonly deleteProfileButton: Locator;

    private readonly saveAsDataProfileStr: string = "//a[.='%s']/parent::td//following-sibling::td/a[.='Save as']";
    private readonly editDataProfileStr: string = "//a[.='%s']/parent::td//following-sibling::td/a[.='Edit']";
    private readonly deleteDataProfileStr: string = "//a[.='%s']/parent::td//following-sibling::td/a[.='Delete']";
    private readonly TDPositionOnTHName: string = "//td[count(//th[text()='%s']/preceding-sibling::th)+1]";

    constructor(readonly page: Page) {
        super(page)
        this.dataProfileTable = this.page.locator('//table[@class="GridView"]');
        this.addNewDataProfileButton = this.page.locator('//div[@class="panel_tag2"]/a[.="Add New"]');
        this.deleteProfileButton = this.page.locator('//div[@class="panel_tag2"]/a[.="Delete"]');
    }


    async gotoAddNewDataProfile(){
        await this.addNewDataProfileButton.click();
    }

    async getColumnDataByColumnHeader() {
        const cellLocators = (format(this.TDPositionOnTHName,DataProfileItemType.DATA_PROFILE));
        const elements = this.dataProfileTable.locator(cellLocators);
        const data = await elements.locator(':scope').allInnerTexts();
        return data;
    }

    async checkAllPresetDataProfileArePopulatedCorrectly(){
        await Utils.wait(Timeout.SHORT_TIME);
        let isAllPresetDisplay = true;
    
        await  this.getColumnDataByColumnHeader().then((data: string[]) => {
            for(const val of DataProfilePreset.PRESETDATAPROFILE){
                if(!data.includes(Utils.replaceWhiteSpaceToNbsb(val))){
                    isAllPresetDisplay = false;
                    break;
                }
            }
        });

        await expect(isAllPresetDisplay).toBe(true);
    }

    async checkDataProfileAreListedAlphabetically(){
        const presetTableData = this.dataProfileTable.locator(format(this.TDPositionOnTHName, DataProfileItemType.DATA_PROFILE));
        await presetTableData.allInnerTexts().then((data: string[]) => {
            expect(Utils.isArraySorted(data)).toBe(true);
        });
    }
}