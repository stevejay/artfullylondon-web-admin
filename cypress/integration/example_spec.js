describe('initial load', function () {
  it('visits the site', function () {
    cy.server()

    cy.route({
      method: 'GET',
      url: '/version.json',
      response: { version: '0.1.0' }
    })

    cy.visit('/', {
      // onBeforeLoad: win => {
      //   win.auth = { attemptAutoLogIn: cy.stub().resolves(null) }
      // },
      onLoad: win => {
        cy.stub(win.auth, 'attemptAutoLogIn').resolves(null)
        cy.stub(win.auth, 'authenticateUser').resolves({})
      }
    })

    cy.contains('Log In')
    cy.get('#Username').type('Steve')
    cy.get('#Password').type('Password')
    cy.get('button[type="submit"]').click()
  })
})
