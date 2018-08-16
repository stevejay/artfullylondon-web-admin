// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import "cypress-testing-library/add-commands";

Cypress.Commands.add("login", () => {
  cy.get('[data-test="login"] input[name="username"]').type(
    Cypress.env("COGNITO_SIGN_IN_USERNAME")
  );
  cy.get('[data-test="login"] input[name="password"]').type(
    Cypress.env("COGNITO_SIGN_IN_PASSWORD") + "{enter}"
  );
});

Cypress.Commands.add("useSidebarToNavigateTo", href => {
  cy.get('nav button[data-test="open sidebar"]').click();
  cy.get(`aside[data-test="sidebar"] a[href="${href}"]`).click();
});
