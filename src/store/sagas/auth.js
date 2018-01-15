import { put, call, takeLatest } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'

import * as authActionsTypes from '_src/constants/actions/auth'
import { logOutCurrentUser, authenticateUser } from '_src/lib/auth'
import { validate } from '_src/lib/validation'
import { logInConstraint } from '_src/constants/auth-constraints'
import { submitErrorHandler } from '_src/lib/saga'
import * as formConstants from '_src/constants/form'
import * as tagActionsTypes from '_src/constants/actions/tag'
import history from '_src/history'

function * tryAutoLogIn () {
  try {
  } catch (err) {
    console.log('auto login attempt failed', err)
  }
}

function * logIn (action) {
  try {
    yield put(startSubmit(formConstants.LOGIN_FORM_NAME))
    yield call(validate, action.payload, logInConstraint)

    const cognitoUser = yield call(
      authenticateUser,
      action.payload.username,
      action.payload.password
    )

    yield put(stopSubmit(formConstants.LOGIN_FORM_NAME))

    yield put({
      type: authActionsTypes.LOG_IN_SUCCEEDED,
      payload: { cognitoUser }
    })

    yield call(history.push, '/')
  } catch (err) {
    yield put({ type: authActionsTypes.LOG_IN_FAILED })
    yield call(submitErrorHandler, err, formConstants.LOGIN_FORM_NAME)
  }
}

function * logOut () {
  try {
    yield call(logOutCurrentUser)
  } catch (err) {
    console.error('logOut error', err.message)
  } finally {
    yield put({
      type: authActionsTypes.LOGGED_OUT,
      payload: { resetUsername: true }
    })
  }
}

// TODO why is this here?
function * getAllTags () {
  try {
    yield put.resolve({ type: tagActionsTypes.GET_ALL_TAGS })
  } catch (err) {
    console.error('getAllTags error', err)
  }
}

export default [
  takeLatest(authActionsTypes.LOG_IN, logIn),
  takeLatest(authActionsTypes.LOG_OUT, logOut),
  takeLatest(authActionsTypes.LOG_IN_SUCCEEDED, getAllTags)
]
