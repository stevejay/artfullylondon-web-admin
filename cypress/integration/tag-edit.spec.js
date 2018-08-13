import uuidv1 from "uuid/v1";
import fetchStub from "../stubs/fetch";
import audienceTags from "../fixtures/audience-tags";
import createTag from "../fixtures/create-tag";
import deleteTag from "../fixtures/delete-tag";

const RANDOM_LABEL = uuidv1().replace(/\-/g, "");

describe("tags", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/tag/audience", {
      onBeforeLoad: win => {
        fetchStub(win, [audienceTags, createTag(RANDOM_LABEL), deleteTag]);
      }
    });
  });

  it("should display the audience tags", () => {
    cy.get("main article header h1").contains("Audience Tags");
    cy.get('main article section[data-test="tag list"] ul').as("tagList");
    cy.get("@tagList")
      .get("li")
      .contains("16 plus");
    cy.get("@tagList")
      .get("li")
      .contains("adults only");
    cy.get("@tagList")
      .get("li")
      .contains("families");
  });

  it("should add and then delete an audience tag", () => {
    cy.get('main article form[data-test="add tag form"]').as("addTagForm");
    cy.get("@addTagForm")
      .get('input[name="label"]')
      .type(`${RANDOM_LABEL}{enter}`);
    // TODO change from trigger to click when cypress v3.1.0+ is released
    // https://github.com/cypress-io/cypress/issues/2252
    cy.contains(
      'main article section[data-test="tag list"] ul li',
      RANDOM_LABEL
    ).within(() => {
      cy.get("button").trigger("click");
    });
    // wait for the async handling to complete
    cy.wait(10000);
  });
});
