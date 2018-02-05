import { put, call, takeLatest, select } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'
import log from 'loglevel'

import * as authLib from '_src/lib/auth'
import * as sagaLib from '_src/lib/saga'
import * as validationLib from '_src/lib/validation'
import * as authConstraints from '_src/constants/auth-constraints'
import * as formConstants from '_src/constants/form'
import * as authActions from '_src/store/actions/auth'
import { selectors } from '_src/store/reducers'
import history from '_src/history'

export function * attemptAutoLogIn () {
  try {
    const cognitoUser = yield call(authLib.attemptAutoLogIn)

    if (cognitoUser) {
      yield put(authActions.logInSucceeded(cognitoUser))
    }
  } catch (err) {
    yield call(log.error, err)
  } finally {
    yield put(authActions.autoLogInAttempted())
  }
}

export function * logIn ({ payload }) {
  try {
    yield put(startSubmit(formConstants.LOGIN_FORM_NAME))
    yield call(validationLib.validate, payload, authConstraints.logInConstraint)

    const cognitoUser = yield call(
      authLib.authenticateUser,
      payload.username,
      payload.password
    )

    yield put(stopSubmit(formConstants.LOGIN_FORM_NAME))
    yield put(authActions.logInSucceeded(cognitoUser))

    // TODO could remember where the user was before logging in:
    yield call(history.push, '/')
  } catch (err) {
    yield put(authActions.logInFailed())
    yield call(sagaLib.submitErrorHandler, err, formConstants.LOGIN_FORM_NAME)
  }
}

export function * logOut () {
  try {
    yield call(authLib.logOutCurrentUser)
  } catch (err) {
    yield call(log.error, err)
  } finally {
    yield put(authActions.loggedOut({ resetUsername: true }))
  }
}

// used by others
export function * getAuthTokenForCurrentUser () {
  const isLoggedIn = yield select(selectors.isLoggedIn)

  if (isLoggedIn) {
    const cognitoUser = yield select(selectors.cognitoUser)
    const token = yield call(authLib.getSessionToken, cognitoUser)

    if (token) {
      return token
    } else {
      yield put(authActions.loggedOut)
      throw new Error('user not authenticated')
    }
  } else {
    throw new Error('user not authenticated')
  }
}

export default [
  takeLatest(authActions.types.LOG_IN, logIn),
  takeLatest(authActions.types.LOG_OUT, logOut),
  takeLatest(authActions.types.ATTEMPT_AUTO_LOG_IN, attemptAutoLogIn)
]
