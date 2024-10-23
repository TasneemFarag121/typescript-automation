declare namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      getIframeBody(iframeSelector : string): Chainable<Element>;
      IframeBody(iframeSelector :string) :Chainable<Element>;
    }
  }