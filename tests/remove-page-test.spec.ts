import { LoginPage } from '../pages/login-page';
import { SettingMenuItem } from '../enum/setting-menu-item';
import { PageDashboard } from '../models/page-dashboard';
import { test } from "../fixtures/my-fixtures";
import { NewPage } from "../pages/new-page";
import { Utils } from "../utils/utils";
import  userData  from "../data/users-data.json";
import repo from "../data/common-data.json";

test.describe('Remove Page Test', () => {
    let pageDashboard;
    let currentDatetime = Utils.getCurrentDateTime();

    test.beforeEach(async( {loginPage, homePage, newPage} ) => {
        pageDashboard = new PageDashboard(currentDatetime,undefined,undefined,undefined,true);
        await loginPage.goto();
        await loginPage.login(userData.administrator.username, userData.administrator.password, repo.repository);
        await homePage.selectSettingMenuItem(SettingMenuItem.ADD_PAGE);
        await newPage.createNewPage(pageDashboard);
    });

    test('Verify that user can remove any main parent page except "Overview" page successfully and the order of pages stays persistent as long as there is not children page under it', async ({homePage, newPage}) => {
        let parentPage = new PageDashboard(currentDatetime + "_parent");
        let childPage = new PageDashboard(currentDatetime + "_child", currentDatetime + "_parent");

        await homePage.selectSettingMenuItem(SettingMenuItem.ADD_PAGE);
        await newPage.createNewPage(parentPage);
        await homePage.selectSettingMenuItem(SettingMenuItem.ADD_PAGE);
        await newPage.createNewPage(childPage);

        await homePage.gotoPage(pageDashboard.getPageName());
        await homePage.deleteCurrentPage();
        await homePage.checkPageNameNotDisplay(pageDashboard.getPageName());
        

        await homePage.gotoPage(parentPage.getPageName());
        await homePage.deleteCurrentPage();
        await homePage.checkParentPageCannotBeRemovedWhenPageHasChildPage(parentPage.getPageName());
        
        await homePage.gotoChildPages(parentPage.getPageName(), childPage.getPageName());
        await homePage.deleteCurrentPage();
        await homePage.gotoPage(parentPage.getPageName());
        await homePage.deleteCurrentPage();
        await homePage.checkPageNameNotDisplay(parentPage.getPageName());
        
        
    });

});
