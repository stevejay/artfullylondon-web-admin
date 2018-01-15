import { put, call, takeLatest } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import * as authActionTypes from '_src/constants/action/auth'
// import { logOutCurrentUser, authenticateUser } from '_src/lib/auth'
import * as authLib from '_src/lib/auth'
import { validate } from '_src/lib/validation'
import { logInConstraint } from '_src/constants/auth-constraints'
import { submitErrorHandler } from '_src/lib/saga'
import * as formConstants from '_src/constants/form'
import * as tagActionTypes from '_src/constants/action/tag'
import history from '_src/history'

function * attemptAutoLogIn () {
  try {
    const cognitoUser = yield call(authLib.attemptAutoLogIn)

    if (cognitoUser) {
      console.log('auto logged in')

      yield put({
        type: authActionTypes.LOG_IN_SUCCEEDED,
        payload: { cognitoUser }
      })
    }
  } catch (err) {
    console.log('auto login attempt failed', err)
  }

  yield put({
    type: authActionTypes.AUTO_LOG_IN_ATTEMPTED
  })
}

function * logIn (action) {
  try {
    yield put(startSubmit(formConstants.LOGIN_FORM_NAME))
    yield call(validate, action.payload, logInConstraint)

    const cognitoUser = yield call(
      authLib.authenticateUser,
      action.payload.username,
      action.payload.password
    )

    yield put(stopSubmit(formConstants.LOGIN_FORM_NAME))

    yield put({
      type: authActionTypes.LOG_IN_SUCCEEDED,
      payload: { cognitoUser }
    })

    yield call(history.push, '/')
  } catch (err) {
    yield put({ type: authActionTypes.LOG_IN_FAILED })
    yield call(submitErrorHandler, err, formConstants.LOGIN_FORM_NAME)
  }
}

function * logOut () {
  try {
    yield call(authLib.logOutCurrentUser)
  } catch (err) {
    console.error('logOut error', err.message)
  } finally {
    yield put({
      type: authActionTypes.LOGGED_OUT,
      payload: { resetUsername: true }
    })
  }
}

// TODO why is this here?
function * getAllTags () {
  try {
    yield put.resolve({ type: tagActionTypes.GET_ALL_TAGS })
  } catch (err) {
    console.error('getAllTags error', err)
  }
}

export default [
  takeLatest(authActionTypes.LOG_IN, logIn),
  takeLatest(authActionTypes.LOG_OUT, logOut),
  takeLatest(authActionTypes.LOG_IN_SUCCEEDED, getAllTags),
  takeLatest(authActionTypes.ATTEMPT_AUTO_LOG_IN, attemptAutoLogIn)
]
