export default class searchDepartmentIframe{

    private elementSelectors={
        iframe: '.cboxIframe',
        IframeDocument: '0.contentDocument.body',
        code: '#id_code',
        search: '.pull-right > [data-cy="search-btn"]',
        codeInFirstRowOfSearchResult: '.field-code.row-0 > a'

    }

    get code(){
        return cy.getIframeBody(this.elementSelectors.iframe).find(this.elementSelectors.code);
    }
    get search(){
        return cy.getIframeBody(this.elementSelectors.iframe).find(this.elementSelectors.search);
    }

    get codeInFirstRowOfSearchResult(){
        return cy.getIframeBody(this.elementSelectors.iframe).find(this.elementSelectors.codeInFirstRowOfSearchResult)
    }


    
    addValueInDepartmentCodeOfIFrame(departmentCode: string) {
        return cy.getIframeBody(this.elementSelectors.iframe).find(this.elementSelectors.code).type(departmentCode);
    }
    clickSearchInIframe(){
        return cy.getIframeBody(this.elementSelectors.iframe).find(this.elementSelectors.search).click();
    
    }

 

    assertOnDepartmentSearchResult()
    {
        cy.IframeBody(this.elementSelectors.iframe).find(this.elementSelectors.codeInFirstRowOfSearchResult).should('have.text','324234');
    }




}