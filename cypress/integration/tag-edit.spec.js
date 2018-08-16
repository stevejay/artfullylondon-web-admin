import uuidv1 from "uuid/v1";

const RANDOM_LABEL = uuidv1().replace(/-/g, "");

describe("tags", () => {
  beforeEach(() => {
    cy.visit("/tag/audience");
    cy.login();
  });

  it("should display the audience tags", () => {
    cy.get("main article header h1").contains("Audience Tags");
    cy.get('main article section[data-test="tag list"] ul').as("tagList");
    cy.get("@tagList").contains("li", "16 plus", { timeout: 15000 });
    cy.get("@tagList").contains("li", "adults only");
    cy.get("@tagList").contains("li", "families");
  });

  it("should add and then delete an audience tag", () => {
    cy.get('main article form[data-test="add tag form"]').as("addTagForm");
    cy.get("@addTagForm")
      .get('input[name="label"]')
      .type(`${RANDOM_LABEL}{enter}`);
    cy.contains(
      'main article section[data-test="tag list"] ul li',
      RANDOM_LABEL,
      { timeout: 15000 }
    ).within(() => {
      cy.get("button").click();
    });
    // wait for the async tag deletion handling to complete:
    // TODO find a way to avoid this wait.
    cy.wait(10000);
    cy.queryByText(RANDOM_LABEL).should("not.exist");
  });
});
