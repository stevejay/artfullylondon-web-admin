describe('initial load', function () {
  it('visits the site', function () {
    cy.visit('/')
    cy.contains('Log In')
  })
})
