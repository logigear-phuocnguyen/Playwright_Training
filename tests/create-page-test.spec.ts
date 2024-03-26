import { SettingMenuItem } from '../enum/setting-menu-item';
import { PageDashboard } from '../models/page-dashboard';
import { test } from "../fixtures/my-fixtures";
import { Utils } from "../utils/utils";
import  userData  from "../data/users-data.json";
import repo from "../data/common-data.json";

test.describe('Create NewPage Test', () => {
    let pageDashboard;
    let currentDatetime = Utils.getCurrentDateTime();

    test.beforeEach(async( {loginPage, homePage, newPage} ) => {
        pageDashboard = new PageDashboard(currentDatetime,undefined,undefined,undefined,true);
        await loginPage.goto();
        await loginPage.login(userData.administrator.username, userData.administrator.password, repo.repository);
        await homePage.selectSettingMenuItem(SettingMenuItem.ADD_PAGE);
        await newPage.createNewPage(pageDashboard);

    });

    test('Verify that "Public" page can be visible and accessed by all users of working repository', async ({homePage, loginPage}) => {
        await homePage.checkPageNameDisplay(pageDashboard.getPageName());
        await homePage.gotoPage(pageDashboard.getPageName());
        await homePage.checkPageOpened(pageDashboard.getPageName());
        await homePage.logout();

        //login with user john
        await loginPage.login(userData.john.username, userData.john.password, repo.repository);
        await homePage.checkPageNameDisplay(pageDashboard.getPageName());
        await homePage.gotoPage(pageDashboard.getPageName());
        await homePage.checkPageOpened(pageDashboard.getPageName());
        await homePage.logout();

        //login with user mary
        await loginPage.login(userData.mary.username, userData.mary.password, repo.repository);
        await homePage.checkPageNameDisplay(pageDashboard.getPageName());
        await homePage.gotoPage(pageDashboard.getPageName());
        await homePage.checkPageOpened(pageDashboard.getPageName());
        await homePage.logout();

        //login with user peter
        await loginPage.login(userData.peter.username, userData.peter.password, repo.repository);
        await homePage.checkPageNameDisplay(pageDashboard.getPageName());
        await homePage.gotoPage(pageDashboard.getPageName());
        await homePage.checkPageOpened(pageDashboard.getPageName());
        await homePage.logout();

        //login with user susan
        await loginPage.login(userData.susan.username, userData.susan.password, repo.repository);
        await homePage.checkPageNameDisplay(pageDashboard.getPageName());
        await homePage.gotoPage(pageDashboard.getPageName());
        await homePage.checkPageOpened(pageDashboard.getPageName());
        await homePage.logout();

        //login with user admin
        await loginPage.login(userData.administrator.username, userData.administrator.password, repo.repository);
        await homePage.gotoPage(pageDashboard.getPageName());
    });

    test.afterEach(async ({homePage}) => {
        await homePage.gotoPage(pageDashboard.getPageName());
        await homePage.deleteCurrentPage();
        
    });
});