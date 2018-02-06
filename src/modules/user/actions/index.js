export const types = {
  LOGGED_OUT: 'user/LOGGED_OUT',
  LOG_IN: 'user/LOG_IN',
  LOG_IN_SUCCEEDED: 'user/LOG_IN_SUCCEEDED',
  LOG_IN_FAILED: 'user/LOG_IN_FAILED',
  LOG_OUT: 'user/LOG_OUT',
  ATTEMPT_AUTO_LOG_IN: 'user/ATTEMPT_AUTO_LOG_IN',
  AUTO_LOG_IN_ATTEMPTED: 'user/AUTO_LOG_IN_ATTEMPTED'
}

export const attemptAutoLogIn = () => ({
  type: types.ATTEMPT_AUTO_LOG_IN
})

export const autoLogInAttempted = () => ({
  type: types.AUTO_LOG_IN_ATTEMPTED
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

export const loggedOut = options => ({
  type: types.LOGGED_OUT,
  payload: options
})
