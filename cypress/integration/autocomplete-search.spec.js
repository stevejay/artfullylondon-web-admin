import fetchStub from "../stubs/fetch";
import entityCounts from "../fixtures/entity-counts";
import autocompleteSearch from "../fixtures/autocomplete-search";
import getTalentForEdit from "../fixtures/get-talent-for-edit";

describe("autocomplete search", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/", {
      onBeforeLoad: win =>
        fetchStub(win, [entityCounts, autocompleteSearch, getTalentForEdit])
    });
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
    cy.get("main article header h1").contains("Carrie Cracknell");
  });
});
