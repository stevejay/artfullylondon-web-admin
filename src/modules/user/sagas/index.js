import { put, call, takeLatest, select } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'
import log from 'loglevel'

import * as sagaLib from '_src/lib/saga'
import * as validationLib from '_src/lib/validation'
import * as authLib from '_src/modules/user/lib/auth'
import * as userConstants from '_src/modules/user/constants'
import * as formConstants from '_src/constants/form'
import * as userActions from '_src/modules/user/actions'
import { selectors } from '_src/modules/user/reducers'
import history from '_src/history'

export function * attemptAutoLogIn () {
  try {
    const cognitoUser = yield call(authLib.attemptAutoLogIn)

    if (cognitoUser) {
      yield put(userActions.logInSucceeded(cognitoUser))
    }
  } catch (err) {
    yield call(log.error, err)
  } finally {
    yield put(userActions.autoLogInAttempted())
  }
}

export function * logIn ({ payload }) {
  try {
    yield put(startSubmit(formConstants.LOGIN_FORM_NAME))
    yield call(validationLib.validate, payload, userConstants.logInConstraint)

    const cognitoUser = yield call(
      authLib.authenticateUser,
      payload.username,
      payload.password
    )

    yield put(stopSubmit(formConstants.LOGIN_FORM_NAME))
    yield put(userActions.logInSucceeded(cognitoUser))

    // TODO could remember where the user was before logging in:
    yield call(history.push, '/')
  } catch (err) {
    yield put(userActions.logInFailed())
    yield call(sagaLib.submitErrorHandler, err, formConstants.LOGIN_FORM_NAME)
  }
}

export function * logOut () {
  try {
    yield call(authLib.logOutCurrentUser)
  } catch (err) {
    yield call(log.error, err)
  } finally {
    yield put(userActions.loggedOut({ resetUsername: true }))
  }
}

// used by others
export function * getAuthTokenForCurrentUser () {
  const isLoggedIn = yield select(selectors.userIsLoggedIn)

  if (isLoggedIn) {
    const cognitoUser = yield select(selectors.cognitoUser)
    const token = yield call(authLib.getSessionToken, cognitoUser)

    if (token) {
      return token
    } else {
      yield put(userActions.loggedOut)
      throw new Error('user not authenticated')
    }
  } else {
    throw new Error('user not authenticated')
  }
}

export default [
  takeLatest(userActions.types.LOG_IN, logIn),
  takeLatest(userActions.types.LOG_OUT, logOut),
  takeLatest(userActions.types.ATTEMPT_AUTO_LOG_IN, attemptAutoLogIn)
]
