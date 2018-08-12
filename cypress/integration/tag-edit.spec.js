import fetchStub from "../stubs/fetch";
import audienceTags from "../fixtures/audience-tags";
import createTag from "../fixtures/create-tag";
import deleteTag from "../fixtures/delete-tag";

describe("tags", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/tag/audience", {
      onBeforeLoad: win => fetchStub(win, [audienceTags, createTag, deleteTag])
    });
  });

  it("should display the audience tags", () => {
    cy.get("main article header h1").contains("Audience Tags");
    cy.get('main article section[data-test="tag list"] ul').as("tagList");
    cy.get("@tagList")
      .get("li:nth-of-type(1)")
      .contains("16 plus");
    cy.get("@tagList")
      .get("li:nth-of-type(2)")
      .contains("adults only");
    cy.get("@tagList")
      .get("li:nth-of-type(3)")
      .contains("families");
  });

  it("should add an audience tag", () => {
    cy.get('main article form[data-test="add tag form"]').as("addTagForm");
    cy.get("@addTagForm")
      .get('input[name="label"]')
      .type("New Tag{enter}");
    cy.get('main article section[data-test="tag list"] ul').as("tagList");
    cy.get("@tagList")
      .get("li:nth-of-type(4)")
      .contains("new tag");
  });

  it("should delete an audience tag", () => {
    cy.get('main article section[data-test="tag list"] ul').as("tagList");
    cy.get("@tagList")
      .get("li:nth-of-type(1) button")
      .trigger("click");
    // TODO change from trigger to click when cypress v3.1.0+ is released
    // https://github.com/cypress-io/cypress/issues/2252
    // .click();
    cy.get("@tagList")
      .get("li")
      .should("not.contain", "16 plus");
    cy.get("@tagList")
      .get("li")
      .should("contain", "adults only");
    cy.get("@tagList")
      .get("li")
      .should("contain", "families");
  });
});
