import { handleActions } from 'redux-actions'

import * as userConstants from '_src/modules/user/constants'
import { types } from '_src/modules/user/actions'

export const module = 'auth'

const initialState = {
  autoLogInAttempted: false,
  state: userConstants.AUTH_STATE_NOT_LOGGED_IN,
  cognitoUser: null,
  username: ''
}

export const reducer = handleActions(
  {
    [types.AUTO_LOG_IN_ATTEMPTED]: state => ({
      ...state,
      autoLogInAttempted: true
    }),
    [types.LOG_IN_SUCCEEDED]: (state, action) => {
      return {
        ...state,
        state: userConstants.AUTH_STATE_LOGGED_IN,
        cognitoUser: action.payload.cognitoUser,
        username: action.payload.cognitoUser.username
      }
    },
    [types.LOG_IN_FAILED]: state => ({
      ...state,
      state: userConstants.AUTH_STATE_NOT_LOGGED_IN,
      cognitoUser: null
    }),
    [types.LOGGED_OUT]: (state, action) => ({
      ...state,
      state: userConstants.AUTH_STATE_NOT_LOGGED_IN,
      username: action.payload && action.payload.resetUsername
        ? ''
        : state.username,
      cognitoUser: null
    })
  },
  initialState
)

export const selectors = {
  userIsLoggedIn: state => state.state === userConstants.AUTH_STATE_LOGGED_IN,
  username: state => state.username,
  autoLogInAttempted: state => state.autoLogInAttempted,
  cognitoUser: state => state.cognitoUser
}