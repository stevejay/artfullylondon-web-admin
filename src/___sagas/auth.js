import { put, call, takeLatest } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'
import * as types from '_src/constants/auth'
import { logOutCurrentUser, authenticateUser } from '_src/lib/auth'
import { validate, validateAcceptedTerms } from '_src/lib/validation'
import { logInConstraint } from '_src/constants/auth-constraints'
import { submitErrorHandler } from '_src/lib/saga'
import { LOGIN_FORM_NAME } from '_src/constants/form'
import { GET_ALL_TAGS } from '_src/constants/tag'
import history from '_src/history'

function * submitLogIn (action) {
  try {
    yield put(startSubmit(LOGIN_FORM_NAME))
    yield call(validate, action.payload, logInConstraint, validateAcceptedTerms)
    yield call(
      authenticateUser,
      action.payload.username,
      action.payload.password
    )
    yield put(stopSubmit(LOGIN_FORM_NAME))
    yield call(history.push, '/')
  } catch (err) {
    yield put({ type: types.LOG_IN_FAILED })
    yield call(submitErrorHandler, err, LOGIN_FORM_NAME)
  }
}

function * logOut () {
  try {
    yield call(logOutCurrentUser)
  } catch (err) {
    console.error('logOut error', err.message)
  } finally {
    yield put({ type: types.LOGGED_OUT, payload: { resetUsername: true } })
  }
}

function * getAllTags () {
  try {
    yield put.resolve({ type: GET_ALL_TAGS })
  } catch (err) {
    console.error('getAllTags error', err)
  }
}

export default [
  takeLatest(types.SUBMIT_LOGIN, submitLogIn),
  takeLatest(types.LOG_OUT, logOut),
  takeLatest(types.LOG_IN_SUCCEEDED, getAllTags)
]
