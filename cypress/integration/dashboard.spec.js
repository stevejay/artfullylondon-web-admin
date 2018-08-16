import fetchStub from "../stubs/fetch";
import entityCounts from "../fixtures/entity-counts";

describe("dashboard", () => {
  beforeEach(() => {
    // cy.visit("/foo");
    cy.visit("/", { onBeforeLoad: win => fetchStub(win, [entityCounts]) });
    // cy.window().then(win => {
    //   fetchStub(win, [entityCounts]);
    // });
    cy.get('[data-test="login"] input[name="username"]').type(
      Cypress.env("COGNITO_SIGN_IN_USERNAME")
    );
    cy.get('[data-test="login"] input[name="password"]').type(
      Cypress.env("COGNITO_SIGN_IN_PASSWORD") + "{enter}"
    );
  });

  it("should display the dashboard", () => {
    cy.get("main article header h1").contains("Dashboard");
    assertEntityStatistic("EVENT", "Event");
    assertEntityStatistic("EVENT_SERIES", "Event Series");
    assertEntityStatistic("VENUE", "Venue");
    assertEntityStatistic("TALENT", "Talent");
  });
});

function assertEntityStatistic(entity, displayName) {
  cy.get(`[data-test="${entity} statistic" i] h2`, { timeout: 15000 }).should(
    "have.text",
    displayName
  );
  // match some formatted positive integer:
  cy.get(
    `[data-test="${entity} statistic" i] p[data-test="entity count"]`
  ).contains(/[\d, ]+/);
}
