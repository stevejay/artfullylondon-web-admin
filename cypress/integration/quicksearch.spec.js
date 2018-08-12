import fetchStub from "../stubs/fetch";
import entityCounts from "../fixtures/entity-counts";
import autocompleteSearch from "../fixtures/autocomplete-search";
import searchAll from "../fixtures/search-all";
import getTalentForEdit from "../fixtures/get-talent-for-edit";

describe("quicksearch", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/", {
      onBeforeLoad: win =>
        fetchStub(win, [
          entityCounts,
          autocompleteSearch,
          searchAll,
          getTalentForEdit
        ])
    });
  });

  it("should implement quicksearch", () => {
    cy.get('nav button[data-test="open quicksearch"]').trigger("click");
    cy.get('section[data-test="modal"]').as("modal");
    cy.get("@modal")
      .get('input[data-test="search term"]')
      .type("carrie{enter}");
    cy.url().should("include", "/search");
    cy.get("main article header h1").contains("Search");
    cy.get('main article form[data-test="basic search"]').as("basicSearchForm");
    cy.get("@basicSearchForm")
      .get('input[name="term"]')
      .should("have.value", "carrie");
    cy.get("@basicSearchForm")
      .get('input[name="entityType"]')
      .should("have.value", "in all");
    cy.get('main article section[data-test="search results"]').as(
      "searchResults"
    );
    cy.get("@searchResults")
      .get("article header h2")
      .contains("Carrie Cracknell");
  });
});
