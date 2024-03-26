import { test } from "../fixtures/my-fixtures";
import  userData  from "../data/users-data.json";
import repo from "../data/common-data.json";
import  generalData  from "../data/general-setting-data.json";
import displayFieldData  from  "../data/display-fields-data.json";
import sortFieldData  from '../data/sort-fields-data.json';
import { GeneralSetting } from "../models/general-Settings";
import { DisplayFields } from "../models/display-field";
import { format } from "util";
import { Utils } from "../utils/utils";
import { SortFields } from "../models/sort-fields";

test.describe('Data Profile Test', () => {
    let generalDataObject;
    let displayDataObject;
    let sortDataObject;
    test.beforeEach( async({loginPage}) => {
        await loginPage.goto();
        await loginPage.login(userData.administrator.username, userData.administrator.password, repo.repository);
    });

    test('Verify that user is able to add levels of fields', async ({homePage, dataProfile, generalSetting, displayField, sortField}) => {
        generalDataObject = new GeneralSetting(format(generalData.Name, Utils.getCurrentDateTime()), generalData.ItemType.toLowerCase(), generalData.RelatedData.related, generalData.RelatedData.isDistinct);
        displayDataObject = new DisplayFields(displayFieldData.fields);
        sortDataObject = new SortFields(sortFieldData.fields);
        await homePage.gotoDataprofilePage();
        await dataProfile.gotoAddNewDataProfile();
        await generalSetting.fillDataGeneralSettingsDataProfile(generalDataObject);
        await generalSetting.submitNextTabDataProfile();
        await displayField.fillDataDisplayFieldsDataProfile(displayDataObject);
        await displayField.submitNextTabDataProfile();
        await sortField.addLevelFieldSortField(sortDataObject);
        await sortField.checkFieldsAddedInSortFields(sortDataObject);   

    });

    
})