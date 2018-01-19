import { put, call, takeLatest } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'
import log from 'loglevel'

import * as authActionTypes from '_src/constants/action/auth'
import * as tagActionTypes from '_src/constants/action/tag'
import * as authLib from '_src/lib/auth'
import * as sagaLib from '_src/lib/saga'
import * as validationLib from '_src/lib/validation'
import * as authConstraints from '_src/constants/auth-constraints'
import * as formConstants from '_src/constants/form'
import history from '_src/history'

export function * attemptAutoLogIn () {
  try {
    const cognitoUser = yield call(authLib.attemptAutoLogIn)

    if (cognitoUser) {
      yield put({
        type: authActionTypes.LOG_IN_SUCCEEDED,
        payload: { cognitoUser }
      })
    }
  } catch (err) {
    yield call(log.error, err)
  } finally {
    yield put({ type: authActionTypes.AUTO_LOG_IN_ATTEMPTED })
  }
}

export function * logIn ({ payload }) {
  try {
    yield put(startSubmit(formConstants.LOGIN_FORM_NAME))

    yield call(
      validationLib.validateSync,
      payload,
      authConstraints.logInConstraint
    )

    const cognitoUser = yield call(
      authLib.authenticateUser,
      payload.username,
      payload.password
    )

    yield put(stopSubmit(formConstants.LOGIN_FORM_NAME))

    yield put({
      type: authActionTypes.LOG_IN_SUCCEEDED,
      payload: { cognitoUser }
    })

    // TODO could remember where the user was before logging in:
    yield call(history.push, '/')
  } catch (err) {
    yield put({ type: authActionTypes.LOG_IN_FAILED })
    yield call(sagaLib.submitErrorHandler, err, formConstants.LOGIN_FORM_NAME)
  }
}

export function * logOut () {
  try {
    yield call(authLib.logOutCurrentUser)
  } catch (err) {
    yield call(log.error, err)
  } finally {
    yield put({
      type: authActionTypes.LOGGED_OUT,
      payload: { resetUsername: true }
    })
  }
}

// // TODO why is this here?
// function * getUserData () {
//   try {
//     yield put.resolve({ type: tagActionTypes.GET_ALL_TAGS })
//   } catch (err) {
//     log.error('getAllTags error', err)
//   }
// }

export default [
  takeLatest(authActionTypes.LOG_IN, logIn),
  takeLatest(authActionTypes.LOG_OUT, logOut),
  // takeLatest(authActionTypes.LOG_IN_SUCCEEDED, getUserData),
  takeLatest(authActionTypes.ATTEMPT_AUTO_LOG_IN, attemptAutoLogIn)
]
