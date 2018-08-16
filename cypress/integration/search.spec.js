describe("search page", () => {
  beforeEach(() => {
    cy.visit("/search");
    cy.login();
  });

  it("should have the correct initial search values", () => {
    cy.get('main article form[data-test="basic search"]').as("basicSearchForm");
    cy.get("@basicSearchForm")
      .get('input[name="term"]')
      .should("have.value", "");
    cy.get("@basicSearchForm")
      .get('input[name="entityType"]')
      .should("have.value", "in all");
  });

  it("should search all by default", () => {
    cy.get('main article form[data-test="basic search"]').as("basicSearchForm");
    cy.get("@basicSearchForm")
      .get('input[name="term"]')
      .type("carrie");
    cy.get("@basicSearchForm")
      .get('button[data-test="submit"]')
      .click();
    cy.contains(
      'main article section[data-test="search results"] article header h2',
      "Carrie Cracknell",
      { timeout: 15000 }
    );
  });

  it("should allow searching only talents", () => {
    cy.get('main article form[data-test="basic search"]').as("basicSearchForm");
    cy.get("@basicSearchForm")
      .get('input[name="term"]')
      .type("carrie");
    cy.get("@basicSearchForm")
      .get('input[name="entityType"]')
      .click();
    cy.get('button div[data-test="in talents"]').click();
    cy.get("@basicSearchForm")
      .get('input[name="entityType"]')
      .should("have.value", "in talents");
    cy.get("@basicSearchForm")
      .get('button[data-test="submit"]')
      .click();
    cy.contains(
      'main article section[data-test="search results"] article header h2',
      "Carrie Cracknell",
      { timeout: 15000 }
    );
  });

  it("should show the full entity when a search result is clicked", () => {
    cy.get('main article form[data-test="basic search"]').as("basicSearchForm");
    cy.get("@basicSearchForm")
      .get('input[name="term"]')
      .type("carrie cracknell");
    cy.get("@basicSearchForm")
      .get('button[data-test="submit"]')
      .click();
    cy.contains(
      'main article section[data-test="search results"] article header h2',
      "Carrie Cracknell",
      { timeout: 15000 }
    ).click();
    cy.url().should("include", "/talent/carrie-cracknell-theatre-director");
    cy.contains("main article header h1", "Carrie Cracknell", {
      timeout: 15000
    });
  });
});
