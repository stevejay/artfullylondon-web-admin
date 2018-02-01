import { handleActions } from 'redux-actions'

import * as authConstants from '_src/constants/auth'
import { types } from '_src/store/actions/auth'

const initialState = {
  autoLogInAttempted: false,
  state: authConstants.AUTH_STATE_NOT_LOGGED_IN,
  cognitoUser: null,
  username: ''
}

export default handleActions(
  {
    [types.AUTO_LOG_IN_ATTEMPTED]: state => ({
      ...state,
      autoLogInAttempted: true
    }),
    [types.LOG_IN_SUCCEEDED]: (state, action) => {
      return {
        ...state,
        state: authConstants.AUTH_STATE_LOGGED_IN,
        cognitoUser: action.payload.cognitoUser,
        username: action.payload.cognitoUser.username
      }
    },
    [types.LOG_IN_FAILED]: state => ({
      ...state,
      state: authConstants.AUTH_STATE_NOT_LOGGED_IN,
      cognitoUser: null
    }),
    [types.LOGGED_OUT]: (state, action) => ({
      ...state,
      state: authConstants.AUTH_STATE_NOT_LOGGED_IN,
      username: action.payload && action.payload.resetUsername
        ? ''
        : state.username,
      cognitoUser: null
    })
  },
  initialState
)
