import deepFreeze from 'deep-freeze'

import * as authConstants from '_src/constants/auth'
import * as authActions from '_src/store/actions/auth'
import authReducer, { selectors } from '_src/store/reducers/auth'

it('should have the correct initial state', () => {
  const actual = authReducer(undefined, {})

  expect(actual).toEqual({
    autoLogInAttempted: false,
    state: authConstants.AUTH_STATE_NOT_LOGGED_IN,
    cognitoUser: null,
    username: ''
  })
})

it('should handle an auto login attempted message', () => {
  const state = deepFreeze({
    autoLogInAttempted: false,
    state: authConstants.AUTH_STATE_NOT_LOGGED_IN,
    cognitoUser: null,
    username: ''
  })

  const actual = authReducer(state, authActions.autoLogInAttempted())

  expect(actual).toEqual({
    autoLogInAttempted: true,
    state: authConstants.AUTH_STATE_NOT_LOGGED_IN,
    cognitoUser: null,
    username: ''
  })
})

it('should handle a login succeeded message', () => {
  const state = deepFreeze({
    autoLogInAttempted: true,
    state: authConstants.AUTH_STATE_NOT_LOGGED_IN,
    cognitoUser: null,
    username: ''
  })

  const actual = authReducer(
    state,
    authActions.logInSucceeded({
      username: 'steve'
    })
  )

  expect(actual).toEqual({
    autoLogInAttempted: true,
    state: authConstants.AUTH_STATE_LOGGED_IN,
    cognitoUser: { username: 'steve' },
    username: 'steve'
  })
})

it('should handle a login failed message', () => {
  const state = deepFreeze({
    autoLogInAttempted: true,
    state: authConstants.AUTH_STATE_NOT_LOGGED_IN,
    cognitoUser: null,
    username: ''
  })

  const actual = authReducer(state, authActions.logInFailed())

  expect(actual).toEqual({
    autoLogInAttempted: true,
    state: authConstants.AUTH_STATE_NOT_LOGGED_IN,
    cognitoUser: null,
    username: ''
  })
})

it('should handle a logged out message that resets the username', () => {
  const state = deepFreeze({
    autoLogInAttempted: true,
    state: authConstants.AUTH_STATE_LOGGED_IN,
    cognitoUser: { username: 'steve' },
    username: 'steve'
  })

  const actual = authReducer(
    state,
    authActions.loggedOut({
      resetUsername: true
    })
  )

  expect(actual).toEqual({
    autoLogInAttempted: true,
    state: authConstants.AUTH_STATE_NOT_LOGGED_IN,
    cognitoUser: null,
    username: ''
  })
})

it('should handle a logged out message that does not reset the username', () => {
  const state = deepFreeze({
    autoLogInAttempted: true,
    state: authConstants.AUTH_STATE_LOGGED_IN,
    cognitoUser: { username: 'steve' },
    username: 'steve'
  })

  const actual = authReducer(state, authActions.loggedOut())

  expect(actual).toEqual({
    autoLogInAttempted: true,
    state: authConstants.AUTH_STATE_NOT_LOGGED_IN,
    cognitoUser: null,
    username: 'steve'
  })
})

describe('selectors', () => {
  describe('isLoggedIn', () => {
    it('should return false when null', () => {
      const state = { auth: { state: null } }
      const result = selectors.isLoggedIn(state)
      expect(result).toEqual(false)
    })

    it('should return false when not logged in', () => {
      const state = { auth: { state: authConstants.AUTH_STATE_NOT_LOGGED_IN } }
      const result = selectors.isLoggedIn(state)
      expect(result).toEqual(false)
    })

    it('should return true when logged in', () => {
      const state = { auth: { state: authConstants.AUTH_STATE_LOGGED_IN } }
      const result = selectors.isLoggedIn(state)
      expect(result).toEqual(true)
    })
  })
})
