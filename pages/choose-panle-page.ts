import { Timeout } from './../constant/timeout';
import { Utils } from './../utils/utils';
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { format } from 'util';

export class ChoosePanelPage extends BasePage{
    private readonly panelTitle: Locator;
    private readonly chartsTitle: Locator;
    private readonly indicatorTitle: Locator;
    private readonly reportsTitle: Locator;
    private readonly heatmapTitle: Locator;
    private readonly createNewPanelButton: Locator;
    private readonly hideButton: Locator;
    private readonly addNewPanelForm: Locator;

    private readonly strTable: string = '//div[text()="%s"]//following-sibling::table';

    constructor(readonly page: Page){
        super(page);
        this.panelTitle = this.page.locator('.phead');
        this.chartsTitle = this.page.getByText('Charts', { exact: true });
        this.indicatorTitle = this.page.getByText('Indicators');
        this.reportsTitle = this.page.getByText('Reports');
        this.heatmapTitle = this.page.getByText('Heat Maps');
        this.createNewPanelButton = this.page.locator('//span[text()="Create new panel"]');
        this.hideButton = this.page.locator('#btnHidePanel');
        this.addNewPanelForm = this.page.locator('.ui-dialog-container');

    }


    async checkAllPresetPanelsDisplayed(){
        await expect(this.chartsTitle).toBeVisible();
        await expect(this.indicatorTitle).toBeVisible();
        await expect(this.reportsTitle).toBeVisible();
        await expect(this.heatmapTitle).toBeVisible();
    }

    async checkChoosePanelDisplayed(){
        await expect(this.panelTitle).toBeVisible();
    }

    async addNewPanel(){
        await this.createNewPanelButton.click();
    }

    async checkAddNewPanelFormFocused(){
        await expect(this.addNewPanelForm).toBeFocused;
    }


    async checkCreateNewPanelControlIsLocked(){
        let isLocked = true;
        try{
            await this.createNewPanelButton.click({timeout: 3000});
            isLocked = false;
        } catch(err){
            console.log("Log: " + err);
        }

        await expect(isLocked).toBe(true)
    }

    async checkPreSetPanelDataSortedCorrectly(tableName: String, tableDataPanel: string[]){
        let isEqual = true;
        const preSetTable: Locator = this.page.locator(format(this.strTable, tableName));
        const tableRows = preSetTable.locator('tr');
        const tableData: string[] = [];
        for(const row of await tableRows.all()){
            const rowCells = await row.locator('td');
            for(const cell of await rowCells.all()){
                const cellText = (await cell.textContent() || '');
                if(cellText != ''){
                    tableData.push(cellText.trim());
                }
            }
        }

        for(const element of tableDataPanel){
            if(!tableData.includes(Utils.replaceWhiteSpaceToNbsb(element))){
                isEqual = false;
                break;
            }
        }

        await expect(Utils.isArraySorted(tableData) && isEqual).toBe(true);   
    }
}