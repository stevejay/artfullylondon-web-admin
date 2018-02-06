import deepFreeze from 'deep-freeze'

import * as userConstants from '_src/modules/user/constants'
import * as userActions from '_src/modules/user/actions'
import { reducer, selectors } from '_src/modules/user/reducers/user'

it('should have the correct initial state', () => {
  const actual = reducer(undefined, {})

  expect(actual).toEqual({
    autoLogInAttempted: false,
    state: userConstants.AUTH_STATE_NOT_LOGGED_IN,
    cognitoUser: null,
    username: ''
  })
})

it('should handle an auto login attempted message', () => {
  const state = deepFreeze({
    autoLogInAttempted: false,
    state: userConstants.AUTH_STATE_NOT_LOGGED_IN,
    cognitoUser: null,
    username: ''
  })

  const actual = reducer(state, userActions.autoLogInAttempted())

  expect(actual).toEqual({
    autoLogInAttempted: true,
    state: userConstants.AUTH_STATE_NOT_LOGGED_IN,
    cognitoUser: null,
    username: ''
  })
})

it('should handle a login succeeded message', () => {
  const state = deepFreeze({
    autoLogInAttempted: true,
    state: userConstants.AUTH_STATE_NOT_LOGGED_IN,
    cognitoUser: null,
    username: ''
  })

  const actual = reducer(
    state,
    userActions.logInSucceeded({
      username: 'steve'
    })
  )

  expect(actual).toEqual({
    autoLogInAttempted: true,
    state: userConstants.AUTH_STATE_LOGGED_IN,
    cognitoUser: { username: 'steve' },
    username: 'steve'
  })
})

it('should handle a login failed message', () => {
  const state = deepFreeze({
    autoLogInAttempted: true,
    state: userConstants.AUTH_STATE_NOT_LOGGED_IN,
    cognitoUser: null,
    username: ''
  })

  const actual = reducer(state, userActions.logInFailed())

  expect(actual).toEqual({
    autoLogInAttempted: true,
    state: userConstants.AUTH_STATE_NOT_LOGGED_IN,
    cognitoUser: null,
    username: ''
  })
})

it('should handle a logged out message that resets the username', () => {
  const state = deepFreeze({
    autoLogInAttempted: true,
    state: userConstants.AUTH_STATE_LOGGED_IN,
    cognitoUser: { username: 'steve' },
    username: 'steve'
  })

  const actual = reducer(
    state,
    userActions.loggedOut({
      resetUsername: true
    })
  )

  expect(actual).toEqual({
    autoLogInAttempted: true,
    state: userConstants.AUTH_STATE_NOT_LOGGED_IN,
    cognitoUser: null,
    username: ''
  })
})

it('should handle a logged out message that does not reset the username', () => {
  const state = deepFreeze({
    autoLogInAttempted: true,
    state: userConstants.AUTH_STATE_LOGGED_IN,
    cognitoUser: { username: 'steve' },
    username: 'steve'
  })

  const actual = reducer(state, userActions.loggedOut())

  expect(actual).toEqual({
    autoLogInAttempted: true,
    state: userConstants.AUTH_STATE_NOT_LOGGED_IN,
    cognitoUser: null,
    username: 'steve'
  })
})

describe('selectors', () => {
  describe('userIsLoggedIn', () => {
    it('should return false when null', () => {
      const state = { state: null }
      const result = selectors.userIsLoggedIn(state)
      expect(result).toEqual(false)
    })

    it('should return false when not logged in', () => {
      const state = { state: userConstants.AUTH_STATE_NOT_LOGGED_IN }
      const result = selectors.userIsLoggedIn(state)
      expect(result).toEqual(false)
    })

    it('should return true when logged in', () => {
      const state = { state: userConstants.AUTH_STATE_LOGGED_IN }
      const result = selectors.userIsLoggedIn(state)
      expect(result).toEqual(true)
    })
  })

  describe('username', () => {
    it('should get the current value', () => {
      const state = { username: 'foo' }
      const result = selectors.username(state)
      expect(result).toEqual('foo')
    })
  })

  describe('autoLogInAttempted', () => {
    it('should get the current value', () => {
      const state = { autoLogInAttempted: true }
      const result = selectors.autoLogInAttempted(state)
      expect(result).toEqual(true)
    })
  })

  describe('cognitoUser', () => {
    it('should get the current value', () => {
      const state = { cognitoUser: { id: 1 } }
      const result = selectors.cognitoUser(state)
      expect(result).toEqual({ id: 1 })
    })
  })
})
