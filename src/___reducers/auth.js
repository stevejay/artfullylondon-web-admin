import { handleActions } from 'redux-actions'
import * as types from '_src/constants/auth'

const initialState = {
  state: types.AUTH_STATE_NOT_LOGGED_IN,
  cognitoUser: null,
  username: '',
  error: ''
}

export default handleActions({
  [types.LOGGED_OUT]: (state, action) => ({
    ...state,
    state: types.AUTH_STATE_NOT_LOGGED_IN,
    error: '',
    username: action.payload && action.payload.resetUsername
      ? '' : state.username,
    cognitoUser: null
  }),
  [types.LOG_IN_SUCCEEDED]: (state, action) => {
    return {
      ...state,
      state: types.AUTH_STATE_LOGGED_IN,
      error: '',
      cognitoUser: action.payload.cognitoUser,
      username: action.payload.cognitoUser.username
    }
  },
  [types.LOG_IN_FAILED]: state => ({
    ...state,
    state: types.AUTH_STATE_NOT_LOGGED_IN,
    cognitoUser: null
  })
}, initialState)
