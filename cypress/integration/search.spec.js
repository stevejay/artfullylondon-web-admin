import fetchStub from "../stubs/fetch";
import searchAll from "../fixtures/search-all";
import getTalentForEdit from "../fixtures/get-talent-for-edit";

describe("search page", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/search", {
      onBeforeLoad: win => fetchStub(win, [searchAll, getTalentForEdit])
    });
  });

  it("should have expected initial search values", () => {
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
    cy.get('main article section[data-test="search results"]').as(
      "searchResults"
    );
    cy.get("@searchResults")
      .get("article header h2")
      .contains("Carrie Cracknell");
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
    cy.get('main article section[data-test="search results"]').as(
      "searchResults"
    );
    cy.get("@searchResults")
      .get("article header h2")
      .contains("Carrie Cracknell");
  });

  it("should show the full entity when a search result is clicked", () => {
    cy.get('main article form[data-test="basic search"]').as("basicSearchForm");
    cy.get("@basicSearchForm")
      .get('input[name="term"]')
      .type("carrie");
    cy.get("@basicSearchForm")
      .get('button[data-test="submit"]')
      .click();
    cy.get('main article section[data-test="search results"]').as(
      "searchResults"
    );
    cy.get("@searchResults")
      .get("article header h2")
      .click();
    cy.url().should("include", "/talent/carrie-cracknell-theatre-director");
    cy.get("main article header h1").contains("Carrie Cracknell");
  });
});
