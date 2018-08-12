import fetchStub from "../stubs/fetch";
import entityCounts from "../fixtures/entity-counts";

describe("dashboard", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/", {
      onBeforeLoad: win => fetchStub(win, [entityCounts])
    });
  });

  it("should display the dashboard", () => {
    cy.get("main article header h1").contains("Dashboard");
    assertEntityStatistic("EVENT", 1);
    assertEntityStatistic("EVENT_SERIES", 2);
    assertEntityStatistic("VENUE", 3);
    assertEntityStatistic("TALENT", 4);
  });
});

function assertEntityStatistic(entity, entityCount) {
  cy.get(`[data-test="${entity} statistic" i] p[data-test="entity count"]`).should(
    "have.text",
    entityCount.toString()
  );
}
