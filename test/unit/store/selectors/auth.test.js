import * as authSelectors from '_src/store/selectors/auth'
import * as authConstants from '_src/constants/auth'

describe('isLoggedIn', () => {
  it('should return false when null', () => {
    const state = { auth: { state: null } }
    const result = authSelectors.isLoggedIn(state)
    expect(result).toEqual(false)
  })

  it('should return false when not logged in', () => {
    const state = { auth: { state: authConstants.AUTH_STATE_NOT_LOGGED_IN } }
    const result = authSelectors.isLoggedIn(state)
    expect(result).toEqual(false)
  })

  it('should return true when logged in', () => {
    const state = { auth: { state: authConstants.AUTH_STATE_LOGGED_IN } }
    const result = authSelectors.isLoggedIn(state)
    expect(result).toEqual(true)
  })
})
