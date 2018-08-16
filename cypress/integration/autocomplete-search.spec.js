describe("autocomplete search", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("should implement an autocomplete search", () => {
    cy.get('nav button[data-test="open quicksearch"]').trigger("click");
    cy.get('section[data-test="modal"]').as("modal");
    cy.focused().should("have.attr", "data-test", "search term");
    cy.get("@modal")
      .get('input[data-test="search term"]')
      .type("carrie")
      .should("have.value", "carrie");
    cy.get("@modal")
      .get('ul[data-test="autocomplete list"] li a')
      .first()
      .click();
    cy.url().should("include", "/talent/carrie-cracknell");
    cy.contains("main article header h1", "Carrie Cracknell", {
      timeout: 15000
    });
  });
});
