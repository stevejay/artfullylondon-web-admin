// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import { signIn } from "./auth-service";

// -- This is a parent command --
Cypress.Commands.add("login", () => {
  // long timeout as sometimes the amplify call can take a while.
  cy.visit("/").then({ timeout: 10000 }, () =>
    signIn(
      Cypress.env("COGNITO_SIGN_IN_USERNAME"),
      Cypress.env("COGNITO_SIGN_IN_PASSWORD")
    )
  );
});
