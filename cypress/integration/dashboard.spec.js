describe("dashboard", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("should display the dashboard", () => {
    cy.contains("main article header h1", "Dashboard", { timeout: 15000 });
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
