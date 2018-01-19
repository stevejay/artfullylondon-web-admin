import deepFreeze from 'deep-freeze'

import * as authConstants from '_src/constants/auth'
import * as authActionTypes from '_src/constants/action/auth'
import authReducer from '_src/store/reducers/auth'

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
  const state = {
    autoLogInAttempted: false,
    state: authConstants.AUTH_STATE_NOT_LOGGED_IN,
    cognitoUser: null,
    username: ''
  }

  const actual = authReducer(state, {
    type: authActionTypes.AUTO_LOG_IN_ATTEMPTED
  })

  expect(actual).toEqual({
    autoLogInAttempted: true,
    state: authConstants.AUTH_STATE_NOT_LOGGED_IN,
    cognitoUser: null,
    username: ''
  })
})

it('should handle a login succeeded message', () => {
  const state = {
    autoLogInAttempted: true,
    state: authConstants.AUTH_STATE_NOT_LOGGED_IN,
    cognitoUser: null,
    username: ''
  }

  const actual = authReducer(state, {
    type: authActionTypes.LOG_IN_SUCCEEDED,
    payload: {
      cognitoUser: {
        username: 'steve'
      }
    }
  })

  expect(actual).toEqual({
    autoLogInAttempted: true,
    state: authConstants.AUTH_STATE_LOGGED_IN,
    cognitoUser: { username: 'steve' },
    username: 'steve'
  })
})

it('should handle a login failed message', () => {
  const state = {
    autoLogInAttempted: true,
    state: authConstants.AUTH_STATE_NOT_LOGGED_IN,
    cognitoUser: null,
    username: ''
  }

  const actual = authReducer(state, {
    type: authActionTypes.LOG_IN_FAILED
  })

  expect(actual).toEqual({
    autoLogInAttempted: true,
    state: authConstants.AUTH_STATE_NOT_LOGGED_IN,
    cognitoUser: null,
    username: ''
  })
})

it('should handle a logged out message that resets the username', () => {
  const state = {
    autoLogInAttempted: true,
    state: authConstants.AUTH_STATE_LOGGED_IN,
    cognitoUser: { username: 'steve' },
    username: 'steve'
  }

  const actual = authReducer(state, {
    type: authActionTypes.LOGGED_OUT,
    payload: {
      resetUsername: true
    }
  })

  expect(actual).toEqual({
    autoLogInAttempted: true,
    state: authConstants.AUTH_STATE_NOT_LOGGED_IN,
    cognitoUser: null,
    username: ''
  })
})

it('should handle a logged out message that does not reset the username', () => {
  const state = {
    autoLogInAttempted: true,
    state: authConstants.AUTH_STATE_LOGGED_IN,
    cognitoUser: { username: 'steve' },
    username: 'steve'
  }

  const actual = authReducer(state, {
    type: authActionTypes.LOGGED_OUT
  })

  expect(actual).toEqual({
    autoLogInAttempted: true,
    state: authConstants.AUTH_STATE_NOT_LOGGED_IN,
    cognitoUser: null,
    username: 'steve'
  })
})
