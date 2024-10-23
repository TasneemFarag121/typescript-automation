import { String } from "typescript-string-operations";

export default class loyaltyRulesPage {

    constructor() { }

    // Private Elements Selecotors
    private elementSelectors = {
        fromDate: '#id_form-0-from_date',
        toDate: '#id_form-0-to_date',
        points: '#id_form-0-points',
        amount: '#id_form-0-amount',
        departments: '#lookup_form-0-departments',
        autoCompleteSearchResultList: '.ac_results ul li',
        delete: '#id_form-0-DELETE',
        save: '.pull-right > .btn',
        genericErrorSelector: '[data-cy="form-0-{0}"] .errorlist li',
        departmentSearch: '#lookup_id_form-0-departments',

    }

    //Fields Elements
    get fromDate() {
        return cy.get(this.elementSelectors.fromDate);
    }
    get toDate() {
        return cy.get(this.elementSelectors.toDate);
    }

    get points() {
        return cy.get(this.elementSelectors.points);
    }

    get amount() {
        return cy.get(this.elementSelectors.amount);

    }

    get department() {
        return cy.get(this.elementSelectors.departments)
    }
    get autoCompleteSearchResults() {
        return cy.get(this.elementSelectors.autoCompleteSearchResultList);
    }

    get deleteCheckBox() {
        return cy.get(this.elementSelectors.delete);
    }

    get departmentSearchIcon() {
        return cy.get(this.elementSelectors.departmentSearch);
    }


    save() {
        cy.get(this.elementSelectors.save).click();
    }


    addValueInDepartmentField(value: string) {
        this.department.type(value);

    }

    addValueInToDateField(value: string) {
        this.toDate.type(value);
    }

    addValueInFromDateField(value: string) {
        this.fromDate.type(value);
    }

    addValueInPointsField(value: string) {
        this.points.type(value);
    }

    addValueInAmountField(value: string) {
        this.amount.type(value);
    }

    getValidationMessage(field: string) {
        if (field === 'amount') {
            return this.amount.invoke('prop', 'validationMessage')

        }

        else if (field === 'points') {
            this.points.invoke('prop', 'validationMessage');
        }



    }


    selectFirstDepartmentSelection() {
        this.autoCompleteSearchResults.should('be.visible');
        this.autoCompleteSearchResults.first().click();
    }
    clickDepartmentSearchIcon() {

        this.departmentSearchIcon.click();

    }


    load() {
        cy.visit('/loyalty/loyaltyrule/?tenant_id=240');
    }


    delete() {
        // I want to replace this with if you are on the same loyalty page do the action of delete other wise ignore 
        cy.url().then((url) => {
            if (url.includes('/loyalty')) {
                cy.get(this.elementSelectors.delete).click();
                cy.get(this.elementSelectors.save).click();
            }
        });
    }

    getErrorMessage(elementName: string) {
        const fieldName = elementName.toLowerCase().replace(' ', '_') // i can add regex here to match any value i want
        return cy.get(String.format(this.elementSelectors.genericErrorSelector, fieldName))
    }


}