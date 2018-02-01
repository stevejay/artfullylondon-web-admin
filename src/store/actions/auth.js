export const types = {
  LOGGED_OUT: 'auth/LOGGED_OUT',
  LOG_IN: 'auth/LOG_IN',
  LOG_IN_SUCCEEDED: 'auth/LOG_IN_SUCCEEDED',
  LOG_IN_FAILED: 'auth/LOG_IN_FAILED',
  LOG_OUT: 'auth/LOG_OUT',
  ATTEMPT_AUTO_LOG_IN: 'auth/ATTEMPT_AUTO_LOG_IN',
  AUTO_LOG_IN_ATTEMPTED: 'auth/AUTO_LOG_IN_ATTEMPTED'
}

export const loggedOut = options => ({
  type: types.LOGGED_OUT,
  payload: options
})

export const logIn = values => ({
  type: types.LOG_IN,
  payload: values
})

export const logInSucceeded = cognitoUser => ({
  type: types.LOG_IN_SUCCEEDED,
  payload: { cognitoUser }
})

export const logInFailed = () => ({
  type: types.LOG_IN_FAILED
})

export const logOut = () => ({
  type: types.LOG_OUT
})

export const attemptAutoLogIn = () => ({
  type: types.ATTEMPT_AUTO_LOG_IN
})

export const autoLogInAttempted = () => ({
  type: types.AUTO_LOG_IN_ATTEMPTED
})
