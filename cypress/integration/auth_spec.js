describe('initial load', function () {
  it('visits the site', function () {
    cy.server()

    cy.route({
      method: 'GET',
      url: '/version.json',
      response: { version: '0.1.0' }
    })

    cy.route({
      method: 'GET',
      url: 'https://api.artfully.london/data-service/admin-site-data',
      response: {}
    })

    cy.route({
      method: 'GET',
      url: 'https://api.artfully.london/search-service/admin/search/preset/entity-counts',
      response: {
        items: [
          { entityType: 'event', count: 435 },
          { entityType: 'event-series', count: 9 },
          { entityType: 'talent', count: 1125 },
          { entityType: 'venue', count: 413 }
        ]
      }
    })

    cy.visit('/', {
      onLoad: win => {
        cy.stub(win.auth, 'authenticateUser').resolves({})
      }
    })

    cy.contains('Log In')
    cy.get('#Username').type('Steve')
    cy.get('#Password').type('Password')
    cy.get('button[type="submit"]').click()
  })
})
