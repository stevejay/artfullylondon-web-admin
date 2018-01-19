import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js'
import _ from 'lodash'
import log from 'loglevel'

import store from '_src/store'
import * as authConstants from '_src/constants/auth'
import * as authActions from '_src/actions/auth'

const USER_POOL_DATA = {
  UserPoolId: process.env.WEBSITE_COGNITO_USER_POOL_ID,
  ClientId: process.env.WEBSITE_COGNITO_USER_POOL_APP_CLIENT_ID,
  Paranoia: 7
}

const redirectToLogIn = (nextState, replace) => {
  if (!_.startsWith(nextState.location.pathname.toLowerCase(), '/log-in')) {
    replace({
      pathname: '/log-in',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

const createCognitoUser = username => {
  const userPool = new CognitoUserPool(USER_POOL_DATA)
  const userData = { Username: username, Pool: userPool }
  return new CognitoUser(userData)
}

const getCognitoUserFromLocalStorage = () => {
  const userPool = new CognitoUserPool(USER_POOL_DATA)
  return userPool.getCurrentUser()
}

export const authenticateUser = (username, password) => {
  return new Promise((resolve, reject) => {
    const cognitoUser = createCognitoUser(username)

    const authenticationData = {
      Username: username,
      Password: password
    }

    const authenticationDetails = new AuthenticationDetails(authenticationData)

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: () => resolve(cognitoUser),
      onFailure: err => reject(err)
    })
  })
}

export const logOutCurrentUser = () => {
  const cognitoUser = getCognitoUserFromLocalStorage()

  if (cognitoUser !== null) {
    cognitoUser.signOut()
  }
}

export const getAuthTokenForCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const { auth } = store.getState()

    if (auth.state === authConstants.AUTH_STATE_LOGGED_IN) {
      // log.info('getAuthTokenForCurrentUser', 'found authenticated user in store');

      auth.cognitoUser.getSession((err, session) => {
        if (err || !session.isValid()) {
          // the authenticated user is no longer valid.
          // log.info('getAuthTokenForCurrentUser', 'the authenticated user in store is no longer valid');

          store.dispatch(authActions.resetLogIn()) // clear the user from store.

          // TODO display modal to capture login details.
        } else {
          resolve(session.getIdToken().getJwtToken())
        }
      })
    } else {
      // user not logged in
      reject(new Error('user not authenticated'))
    }
  })
}

export function attemptAutoLogIn () {
  return new Promise(resolve => {
    const cognitoUser = getCognitoUserFromLocalStorage()

    if (cognitoUser) {
      cognitoUser.getSession((err, session) => {
        resolve(!err && session.isValid() ? cognitoUser : null)
      })
    } else {
      resolve()
    }
  })
}

export const handleEnterRestrictedRoute = (nextState, replace) => {
  return new Promise(resolve => {
    // log.info('auth', store);

    const { auth } = store.getState()

    if (auth.state === authConstants.AUTH_STATE_LOGGED_IN) {
      // we have an authenticated user in store.
      log.info(
        'handleEnterRestrictedRoute',
        'found authenticated user in store'
      )

      auth.cognitoUser.getSession((err, session) => {
        if (err || !session.isValid()) {
          // the authenticated user is no longer valid.
          log.info(
            'handleEnterRestrictedRoute',
            'the authenticated user in store is no longer valid'
          )

          store.dispatch(authActions.logOut()) // clear the user from store.
          redirectToLogIn(nextState, replace) // allow the user to log in.
        } else {
          log.info(
            'handleEnterRestrictedRoute',
            'the authenticated user in store is still valid'
          )
        }

        // if authenticated user is valid then we are fine to exit now.
        resolve()
      })
    } else {
      const cognitoUser = getCognitoUserFromLocalStorage()

      if (!cognitoUser) {
        // user has not authenticated ever?
        log.info(
          'handleEnterRestrictedRoute',
          'user seems to have never authenticated or did it ages ago or signed out'
        )

        redirectToLogIn(nextState, replace)
        resolve()
      } else {
        cognitoUser.getSession((err, session) => {
          if (err || !session.isValid()) {
            // the authenticated user is no longer valid.
            // log.info('handleEnterRestrictedRoute', 'user in local storage is no longer valid');
            redirectToLogIn(nextState, replace) // allow the user to log in.
          } else {
            // the authenticated user is still valid, so use it.
            // log.info('handleEnterRestrictedRoute', 'user in local storage is still valid so setting it in store');
            store.dispatch(authActions.logInSucceeded({ cognitoUser }))
          }

          resolve()
        })
      }
    }
  })
}
