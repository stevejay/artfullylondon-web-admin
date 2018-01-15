import { handleActions } from 'redux-actions'
import * as authConstants from '_src/constants/auth'
import * as authActionTypes from '_src/constants/action/auth'

const initialState = {
  autoLogInAttempted: false,
  state: authConstants.AUTH_STATE_NOT_LOGGED_IN,
  cognitoUser: null,
  username: '',
  error: ''
}

export default handleActions(
  {
    [authActionTypes.AUTO_LOG_IN_ATTEMPTED]: state => ({
      ...state,
      autoLogInAttempted: true
    }),
    [authActionTypes.LOGGED_OUT]: (state, action) => ({
      ...state,
      state: authConstants.AUTH_STATE_NOT_LOGGED_IN,
      error: '',
      username: action.payload && action.payload.resetUsername
        ? ''
        : state.username,
      cognitoUser: null
    }),
    [authActionTypes.LOG_IN_SUCCEEDED]: (state, action) => {
      return {
        ...state,
        state: authConstants.AUTH_STATE_LOGGED_IN,
        error: '',
        cognitoUser: action.payload.cognitoUser,
        username: action.payload.cognitoUser.username
      }
    },
    [authActionTypes.LOG_IN_FAILED]: state => ({
      ...state,
      state: authConstants.AUTH_STATE_NOT_LOGGED_IN,
      cognitoUser: null
    })
  },
  initialState
)
