import { DisplayFields } from './../models/display-field';
import { ChoosePanelPage } from './../pages/choose-panle-page';
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { HomePage } from '../pages/home-page';
import { NewPage } from '../pages/new-page';
import { DataProfile } from '../pages/data-profile-page';
import { GeneralSettigTab } from '../pages/general-settings-page';
import { DisplayFieldsTab } from '../pages/display-fields-page';
import { SortFieldsTab }    from '../pages/sort-fields-page';

type MyFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    newPage: NewPage;
    choosePanelPage: ChoosePanelPage;
    dataProfile: DataProfile;
    generalSetting: GeneralSettigTab;
    displayField: DisplayFieldsTab;
    sortField: SortFieldsTab;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage: async ({ page }, use) => {
        const homepage = new HomePage(page);
        await use(homepage);
    },

    newPage: async ({ page }, use) => {
        const newPage = new NewPage(page);
        await use(newPage);
    },

    choosePanelPage: async ({ page }, use) => {
        const choosePanelPage = new ChoosePanelPage(page);
        await use(choosePanelPage);
    },

    dataProfile: async ({page}, use) => {
        const dataProfile = new DataProfile(page);
        await use(dataProfile);
    },

    generalSetting: async ({page}, use) => {
        const generalSetting = new GeneralSettigTab(page);
        await use(generalSetting);
    },

    displayField: async({page}, use) => {
        const displayfield = new DisplayFieldsTab(page);
        await use(displayfield);
    },

    sortField: async({page}, use) =>{
        const sortfield = new SortFieldsTab(page);
        await use(sortfield);
    }




});


export {expect} from '@playwright/test';

