import { HomePage } from './../pages/home-page';
import { test } from '../fixtures/my-fixtures'
import  userData  from "../data/users-data.json";
import repo from "../data/common-data.json";

test.describe('Data Profile Test', () => {
    test.beforeEach( async({loginPage}) => {
        await loginPage.goto();
        await loginPage.login(userData.administrator.username, userData.administrator.password, repo.repository);
    });

    test('Verify that all Pre-set Data Profiles are populated correctly', async ({homePage, dataProfile}) => {
        await homePage.gotoDataprofilePage();
        await dataProfile.checkAllPresetDataProfileArePopulatedCorrectly();
    });

    test('Verify that Data Profiles are listed alphabetically', async({ homePage, dataProfile }) => {
        await homePage.gotoDataprofilePage();
        await dataProfile.checkDataProfileAreListedAlphabetically();
    });
})