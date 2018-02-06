import { AuthenticationDetails } from 'amazon-cognito-identity-js'

import * as cognitoUserLib from '_src/modules/user/lib/cognito-user'

export function attemptAutoLogIn () {
  return new Promise(resolve => {
    const cognitoUser = cognitoUserLib.getCurrentCognitoUser()

    if (cognitoUser) {
      cognitoUser.getSession((err, session) => {
        resolve(!err && session.isValid() ? cognitoUser : null)
      })
    } else {
      resolve(null)
    }
  })
}

export function authenticateUser (username, password) {
  return new Promise((resolve, reject) => {
    const cognitoUser = cognitoUserLib.createCognitoUser(username)
    const authData = { Username: username, Password: password }
    const authDetails = new AuthenticationDetails(authData)

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: () => resolve(cognitoUser),
      onFailure: () => reject(new Error('Authentication failed'))
    })
  })
}

export function logOutCurrentUser () {
  const cognitoUser = cognitoUserLib.getCurrentCognitoUser()
  cognitoUser && cognitoUser.signOut()
}

export function getSessionToken (cognitoUser) {
  return new Promise(resolve => {
    cognitoUser.getSession((err, session) => {
      if (err || !session.isValid()) {
        resolve(null)
      } else {
        resolve(session.getIdToken().getJwtToken())
      }
    })
  })
}

// function redirectToLogIn (nextState, replace) {
//   if (!_.startsWith(nextState.location.pathname.toLowerCase(), '/log-in')) {
//     replace({
//       pathname: '/log-in',
//       state: { nextPathname: nextState.location.pathname }
//     })
//   }
// }

// export const getAuthTokenForCurrentUser = () => {
//   return new Promise((resolve, reject) => {
//     const { auth } = store.getState()

//     if (auth.state === authConstants.AUTH_STATE_LOGGED_IN) {
//       // log.info('getAuthTokenForCurrentUser', 'found authenticated user in store');

//       auth.cognitoUser.getSession((err, session) => {
//         if (err || !session.isValid()) {
//           // the authenticated user is no longer valid.
//           // log.info('getAuthTokenForCurrentUser', 'the authenticated user in store is no longer valid');

//           // clear the user from store.
//           store.dispatch(authActions.loggedOut())

//           // TODO display modal to capture login details.
//         } else {
//           resolve(session.getIdToken().getJwtToken())
//         }
//       })
//     } else {
//       // user not logged in
//       reject(new Error('user not authenticated'))
//     }
//   })
// }

// export const handleEnterRestrictedRoute = (nextState, replace) => {
//   return new Promise(resolve => {
//     // log.info('auth', store);

//     const { auth } = store.getState()

//     if (auth.state === authConstants.AUTH_STATE_LOGGED_IN) {
//       // we have an authenticated user in store.
//       log.info(
//         'handleEnterRestrictedRoute',
//         'found authenticated user in store'
//       )

//       auth.cognitoUser.getSession((err, session) => {
//         if (err || !session.isValid()) {
//           // the authenticated user is no longer valid.
//           log.info(
//             'handleEnterRestrictedRoute',
//             'the authenticated user in store is no longer valid'
//           )

//           // clear the user from store.
//           store.dispatch(authActions.logOut())

//           // allow the user to log in.
//           redirectToLogIn(nextState, replace)
//         } else {
//           log.info(
//             'handleEnterRestrictedRoute',
//             'the authenticated user in store is still valid'
//           )
//         }

//         // if authenticated user is valid then we are fine to exit now.
//         resolve()
//       })
//     } else {
//       const cognitoUser = getCognitoUserFromLocalStorage()

//       if (!cognitoUser) {
//         // user has not authenticated ever?
//         log.info(
//           'handleEnterRestrictedRoute',
//           'user seems to have never authenticated or did it ages ago or signed out'
//         )

//         redirectToLogIn(nextState, replace)
//         resolve()
//       } else {
//         cognitoUser.getSession((err, session) => {
//           if (err || !session.isValid()) {
//             // the authenticated user is no longer valid.
//             // log.info('handleEnterRestrictedRoute', 'user in local storage is no longer valid');
//             redirectToLogIn(nextState, replace) // allow the user to log in.
//           } else {
//             // the authenticated user is still valid, so use it.
//             // log.info('handleEnterRestrictedRoute', 'user in local storage is still valid so setting it in store');
//             store.dispatch(authActions.logInSucceeded(cognitoUser))
//           }

//           resolve()
//         })
//       }
//     }
//   })
// }