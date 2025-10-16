// cypress/e2e/compare_ui_api_labels.cy.js

import SimOnlyPlansPage from '../support/pages/simOnlyPlansPage';

describe('Compare UI Labels vs. API Response Labels', () => {
  const page = new SimOnlyPlansPage();
  const apiUrl = 'https://api-prod.prod.cms.df.services.vodafone.com.au/plan/postpaid-simo?serviceType=New';

  it('should compare UI Add to Cart labels with API CTA labels', () => {
    // Step 1: Visit the Vodafone SIM-only plans page
    page.visit();

    // Step 2: Retrieve UI labels
    page.getAddToCartLabels().then((uiLabels) => {
      // Step 3: Fetch API response
      cy.request(apiUrl).then((response) => {
        expect(response.status).to.eq(200);

        // Step 4: Extract CTA labels from API response
        const plans = response.body?.plans || [];
        const apiLabels = plans
          .map((plan) => plan?.ctaLabel?.trim())
          .filter(Boolean);

        cy.log('API CTA Labels:', JSON.stringify(apiLabels));

        // Step 5: Compare each CTA label with UI labels
        apiLabels.forEach((apiLabel) => {
          cy.log(`Checking if UI contains: "${apiLabel}"`);
          expect(uiLabels).to.include(apiLabel);
        });
      });
    });
  });
});
