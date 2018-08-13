// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import * as amplify from "./amplify";

// -- This is a parent command --
Cypress.Commands.add("login", () => {
  // long timeout as sometimes the amplify call can take a while.
  cy.visit("/").then({ timeout: 10000 }, () =>
    amplify.signIn(
      Cypress.env("COGNITO_SIGN_IN_USERNAME"),
      Cypress.env("COGNITO_SIGN_IN_PASSWORD")
    )
  );
});
