
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from './pages/LoginPage';
import loyaltyRulesPage from './pages/LoyaltyRulesPage';
import SearchDepartmentIframe from './iframes/SearchDepartmentIframe';

const loginPage = new LoginPage();;
const loyaltyPage = new loyaltyRulesPage();
const searchDepartmentIframe = new SearchDepartmentIframe();

// afterEach(() => {
//     loyaltyPage.delete();
//     // If Iframe is open , close it first 

// });


Given(`the admin is login using username , password`, () => {
    // [Given] Sets up the initial state of the system.
    loginPage.load();
    loginPage.signIn();

});

Given(`the admin is on the kwentra loyalty page URL`, () => {
    // [Given] Sets up the initial state of the system.
    loyaltyPage.load();
});

When(`the admin fills the From Date with {string}`, (fromDate: string) => {
    // [When] Describes the action or event that triggers the scenario.
    if (fromDate) {
        loyaltyPage.addValueInFromDateField(fromDate)
        //LoyaltyPage.enterInFromDateField(fromDate)
    }

});

When(`the admin fills the To Date with {string}`, (toDate: string) => {
    // [When] Describes the action or event that triggers the scenario.
    if (toDate) {
        loyaltyPage.addValueInToDateField(toDate)
    }

});

When(`the admin fills the Points field with {string}`, (points: string) => {
    // [When] Describes the action or event that triggers the scenario.
    if (points) {
        loyaltyPage.addValueInPointsField(points)
    }


})

When(`the admin fills the Department field with {string}`, (department: string) => {
    // [When] Describes the action or event that triggers the scenario.
    // Only perform the type and visibility assertion if the department is not empty
    if (department) {
        loyaltyPage.addValueInDepartmentField(department);
    }
});

When(`The admin clicks on the first item at the visibile auto complete search result list`, () => {
    // [When] Describes the action or event that triggers the scenario.
    // Only perform the type and visibility assertion if the department is not empty

    loyaltyPage.selectFirstDepartmentSelection();

});


When(`the admin fills the Amount with {string}`, (amount: string) => {
    // [When] Describes the action or event that triggers the scenario.
    if (amount) {

        loyaltyPage.addValueInAmountField(amount)
    }

});


When('the admin clicks on search department icon' ,()=>{

    loyaltyPage.clickDepartmentSearchIcon();

});


When('the department search window loaded and the admin type {string} in code text box' ,(departmentCode: string)=>{
    searchDepartmentIframe.addValueInDepartmentCodeOfIFrame(departmentCode);
    


});
When('the admin clicks on Search button in the department search window' ,(departmentCode: string)=>{
    searchDepartmentIframe.clickSearchInIframe();


});
 


When(`the admin clicks on the Save button`, () => {
    // [When] Describes the action or event that triggers the scenario.
    loyaltyPage.save()

});


Then(`error message says {string} displayed against the field left empty {string}`, (errorMessage: string, field: string) => {
    // [Then] Describes the expected outcome or result of the scenario.
    // Replace field with its corresponding locator
    loyaltyPage.getErrorMessage(field).should('have.text', errorMessage);

    //Later - Mocha JS
});



Then(`a native JavaScript error message saying {string} should be displayed against the {string} field only if it has a negative value`, (errorValidationMessage: string,field : string) => {
    console.log('filed:', field)
    console.log(loyaltyPage.getValidationMessage(field))    
    loyaltyPage.getValidationMessage(field).then(msg=>{
        expect(errorValidationMessage).eql(msg)
    })
        
});

Then(`error message says {string} should be diplayed against the To Date field`, (errorMessage: string) => {
    // [Then] Describes the expected outcome or result of the scenario.
    // loyaltyPage.getErrorMessage('To Date').should('have.text', errorMessage);
    

});

Then(`error message says {string} should be diplayed against the Points field`, (errorMessage: string) => {
    // [Then] Describes the expected outcome or result of the scenario.
    loyaltyPage.getErrorMessage('Points').should("have.text", errorMessage);

});

Then(`the search result is displayed with single record having the department code`, () => {
    // [Then] Describes the expected outcome or result of the scenario.
    searchDepartmentIframe.assertOnDepartmentSearchResult();

});

