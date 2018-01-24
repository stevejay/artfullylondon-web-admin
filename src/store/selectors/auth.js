import { createSelector } from 'reselect'

import * as authConstants from '_src/constants/auth'

// parameters: (state)
export const isLoggedIn = createSelector(
  state => state.auth.state,
  authState => authState === authConstants.AUTH_STATE_LOGGED_IN
)
