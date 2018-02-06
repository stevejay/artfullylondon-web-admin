export const AUTH_STATE_NOT_LOGGED_IN = 'AUTH_STATE_NOT_LOGGED_IN'
export const AUTH_STATE_LOGGED_IN = 'AUTH_STATE_LOGGED_IN'

export const ALLOWED_AUTH_STATES = [
  AUTH_STATE_NOT_LOGGED_IN,
  AUTH_STATE_LOGGED_IN
]

export const logInConstraint = {
  username: {
    presence: true,
    length: { maximum: 100 }
  },
  password: {
    presence: true,
    length: { maximum: 30 }
  }
}
