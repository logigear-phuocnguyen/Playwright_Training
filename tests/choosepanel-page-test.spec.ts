import { test } from "../fixtures/my-fixtures";
import  userData  from "../data/users-data.json";
import repo from "../data/common-data.json";
import { PanelItem } from "../enum/choose-panel-preset";
import { Panels } from "../constant/panels";



test.describe("ChoosePanel Test", () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login(userData.administrator.username, userData.administrator.password, repo.repository);
    });


    test('Verify that when "Choose panels" form is expanded al pre-set panels are populated and sorted correctly', async({homePage, choosePanelPage}) =>{
        await homePage.openChoosePanel();
        await choosePanelPage.checkChoosePanelDisplayed();
        await choosePanelPage.checkAllPresetPanelsDisplayed();

        await choosePanelPage.checkPreSetPanelDataSortedCorrectly(PanelItem.CHARTS, Panels.CHARTS);
        await choosePanelPage.checkPreSetPanelDataSortedCorrectly(PanelItem.INDICATOR, Panels.INDICATOR);
        await choosePanelPage.checkPreSetPanelDataSortedCorrectly(PanelItem.REPORTS, Panels.REPORTS);
        await choosePanelPage.checkPreSetPanelDataSortedCorrectly(PanelItem.HEAT_MAPS, Panels.HEATMAPS);
    });


    test('Verify that when "Add New Panel" form is on focused all other control/form is disabled or locked', async({homePage, choosePanelPage}) => {
        await homePage.openChoosePanel();
        await choosePanelPage.addNewPanel();
        await choosePanelPage.checkAddNewPanelFormFocused();
        await choosePanelPage.checkCreateNewPanelControlIsLocked();
    });


});