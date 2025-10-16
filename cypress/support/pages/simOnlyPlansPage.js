// cypress/support/pages/simOnlyPlansPage.js

class SimOnlyPlansPage {
  constructor() {
    this.url = 'https://www.vodafone.com.au/mobile/sim-only-phone-plans';
  }

  visit() {
    cy.visit(this.url);
  }

  /**
   * Get all visible "Add to Cart" labels from product cards
   * Returns a Cypress chainable that yields an array of strings
   */
  getAddToCartLabels() {
    return cy.get('button, a') // get clickable elements
      .filter(':visible')
      .filter(':contains("Add to Cart")') // filter by text
      .then(($buttons) => {
        const labels = [];
        $buttons.each((index, el) => {
          labels.push(el.innerText.trim());
        });
        cy.log('UI Labels:', JSON.stringify(labels));
        return labels;
      });
  }
}

export default SimOnlyPlansPage;
