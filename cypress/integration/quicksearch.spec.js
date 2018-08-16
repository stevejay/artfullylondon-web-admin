describe("quicksearch", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("should implement quicksearch", () => {
    cy.get('nav button[data-test="open quicksearch"]').trigger("click");
    cy.get('section[data-test="modal"]').as("modal");
    cy.get("@modal")
      .get('input[data-test="search term"]')
      .type("carrie{enter}");
    cy.url().should("include", "/search");
    cy.contains("main article header h1", "Search");
    cy.get('main article form[data-test="basic search"]').as("basicSearchForm");
    cy.get("@basicSearchForm")
      .get('input[name="term"]')
      .should("have.value", "carrie");
    cy.get("@basicSearchForm")
      .get('input[name="entityType"]')
      .should("have.value", "in all");
    cy.contains(
      'main article section[data-test="search results"] article header h2',
      "Carrie Cracknell",
      { timeout: 15000 }
    );
  });
});
