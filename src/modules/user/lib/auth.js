import { AuthenticationDetails } from 'amazon-cognito-identity-js'
import window from 'global/window'

import * as cognitoUserLib from './cognito-user'

const auth = {
  attemptAutoLogIn: () =>
    new Promise(resolve => {
      const cognitoUser = cognitoUserLib.getCurrentCognitoUser()

      if (cognitoUser) {
        cognitoUser.getSession((err, session) => {
          resolve(!err && session.isValid() ? cognitoUser : null)
        })
      } else {
        resolve(null)
      }
    }),
  authenticateUser: (username, password) =>
    new Promise((resolve, reject) => {
      const cognitoUser = cognitoUserLib.createCognitoUser(username)
      const authData = { Username: username, Password: password }
      const authDetails = new AuthenticationDetails(authData)

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: () => resolve(cognitoUser),
        onFailure: () => reject(new Error('Authentication failed'))
      })
    }),
  logOutCurrentUser: () => {
    const cognitoUser = cognitoUserLib.getCurrentCognitoUser()
    cognitoUser && cognitoUser.signOut()
  },
  getSessionToken: cognitoUser =>
    new Promise(resolve => {
      cognitoUser.getSession((err, session) => {
        if (err || !session.isValid()) {
          resolve(null)
        } else {
          resolve(session.getIdToken().getJwtToken())
        }
      })
    })
}

// Hack: Add them to global window object to make it accessible to Cypress.io
// for stubbing purposes:
window.auth = auth

export { auth }
