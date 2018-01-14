import * as authConstants from '_src/constants/auth'

export function isLoggedIn (state) {
  return state.auth.state === authConstants.AUTH_STATE_LOGGED_IN
}
