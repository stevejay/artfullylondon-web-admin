const GENERAL_LOGIN_ERROR_MESSAGE = "Incorrect username or password";

describe("auth", function() {
  it("should reject an unknown user", () => {
    cy.visit("/");
    cy.get('[data-test="login"]').as("loginForm");
    cy.get("@loginForm")
      .get('input[name="username"]')
      .type("unknownuser");
    cy.get("@loginForm")
      .get('input[name="password"]')
      .type("somepassword{enter}");
    cy.get("@loginForm").should("contain", GENERAL_LOGIN_ERROR_MESSAGE);
  });

  it("should reject a wrong password", () => {
    cy.visit("/");
    cy.get('[data-test="login"]').as("loginForm");
    cy.get("@loginForm")
      .get('input[name="username"]')
      .type(Cypress.env("COGNITO_SIGN_IN_USERNAME"));
    cy.get("@loginForm")
      .get('input[name="password"]')
      .type("wrongpassword{enter}");
    cy.get("@loginForm").should("contain", GENERAL_LOGIN_ERROR_MESSAGE);
  });

  it("should authenticate on a valid username and password", () => {
    cy.visit("/");
    cy.get('[data-test="login"]').as("loginForm");
    cy.focused().should("have.attr", "name", "username");
    cy.get("@loginForm")
      .get('input[name="username"]')
      .type(Cypress.env("COGNITO_SIGN_IN_USERNAME"))
      .should("have.value", Cypress.env("COGNITO_SIGN_IN_USERNAME"));
    cy.get("@loginForm")
      .get('input[name="password"]')
      .type(Cypress.env("COGNITO_SIGN_IN_PASSWORD"))
      .should("have.value", Cypress.env("COGNITO_SIGN_IN_PASSWORD"));
    cy.get("@loginForm")
      .get('input[name="password"]')
      .type("{enter}");
    cy.get("main article header h1").contains("Dashboard");
  });

  it("should show the account page", () => {
    cy.visit("/");
    cy.login();
    cy.contains("main article header h1", "Dashboard", { timeout: 15000 });
    cy.useSidebarToNavigateTo("/account");
    cy.url().should("include", "/account");
    cy.contains("main article header h1", "Account");
    cy.get('main article dl div[data-test="username"]').within(() => {
      cy.contains("dd", Cypress.env("COGNITO_SIGN_IN_USERNAME"));
    });
    cy.get('main article dl div[data-test="groups"]').within(() => {
      cy.contains("dd", "editors");
    });
  });

  it("should allow a user to log out", () => {
    cy.visit("/");
    cy.login();
    cy.contains("main article header h1", "Dashboard", { timeout: 15000 });
    cy.get('nav button[data-test="open sidebar"]').click();
    cy.get('aside[data-test="sidebar"] button[data-test="logout"]').click();
    cy.get('form[data-test="login"]');
  });
});
