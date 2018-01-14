import { handleActions } from 'redux-actions'
import * as authConstants from '_src/constants/auth'
import * as authActionsTypes from '_src/constants/actions/auth'

const initialState = {
  state: authConstants.AUTH_STATE_NOT_LOGGED_IN,
  cognitoUser: null,
  username: '',
  error: ''
}

export default handleActions(
  {
    [authActionsTypes.LOGGED_OUT]: (state, action) => ({
      ...state,
      state: authConstants.AUTH_STATE_NOT_LOGGED_IN,
      error: '',
      username: action.payload && action.payload.resetUsername
        ? ''
        : state.username,
      cognitoUser: null
    }),
    [authActionsTypes.LOG_IN_SUCCEEDED]: (state, action) => {
      return {
        ...state,
        state: authConstants.AUTH_STATE_LOGGED_IN,
        error: '',
        cognitoUser: action.payload.cognitoUser,
        username: action.payload.cognitoUser.username
      }
    },
    [authActionsTypes.LOG_IN_FAILED]: state => ({
      ...state,
      state: authConstants.AUTH_STATE_NOT_LOGGED_IN,
      cognitoUser: null
    })
  },
  initialState
)
