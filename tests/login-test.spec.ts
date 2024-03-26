import { test } from '../fixtures/my-fixtures';
import  userData  from "../data/users-data.json";
import repo from "../data/common-data.json";

test.describe('Login Test', () => {
test.beforeEach(async({loginPage}) => {
  loginPage.goto();
});


test('Verify that user can login specific repository successfully via Dashboard login page with correct credentials', async ({loginPage, homePage}) => {
  await loginPage.displayUser();
  await loginPage.login(userData.administrator.username, userData.administrator.password, repo.repository);
  await homePage.checkHomePageDisplay();
});

test('Verify that user fails to login specific repository sucessfully via Dashboard login page with incorrect credentials', async ({loginPage}) => {
  await loginPage.displayUser();
  await loginPage.login(userData.invalidaccount.username, userData.invalidaccount.password, repo.repository);
  await loginPage.checkErrorMessageDisplay();
});
});