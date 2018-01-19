import { put, call } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import { startSubmit, stopSubmit } from 'redux-form'
import log from 'loglevel'

import * as formConstants from '_src/constants/form'
import * as authSagas from '_src/store/sagas/auth'
import * as authActionTypes from '_src/constants/action/auth'
import * as authLib from '_src/lib/auth'
import * as sagaLib from '_src/lib/saga'
import * as validationLib from '_src/lib/validation'
import * as authConstraints from '_src/constants/auth-constraints'
import history from '_src/history'

describe('logIn', () => {
  it('should successfully log the user in', () => {
    const payload = { username: 'steve', password: 'pwd' }
    const cognitoUser = { username: 'steve' }

    const generator = authSagas.logIn({
      type: authActionTypes.LOG_IN,
      payload
    })

    let result = generator.next()

    expect(result.value).toEqual(
      put(startSubmit(formConstants.LOGIN_FORM_NAME))
    )

    result = generator.next()

    expect(result.value).toEqual(
      call(validationLib.validateSync, payload, authConstraints.logInConstraint)
    )

    result = generator.next()

    expect(result.value).toEqual(
      call(authLib.authenticateUser, payload.username, payload.password)
    )

    result = generator.next(cognitoUser)

    expect(result.value).toEqual(put(stopSubmit(formConstants.LOGIN_FORM_NAME)))

    result = generator.next()

    expect(result.value).toEqual(
      put({
        type: authActionTypes.LOG_IN_SUCCEEDED,
        payload: { cognitoUser }
      })
    )

    result = generator.next()

    expect(result.value).toEqual(call(history.push, '/'))

    result = generator.next()

    expect(result.done).toEqual(true)
  })

  it('should handle a validation error', () => {
    const payload = { username: 'steve', password: '' }
    const error = new Error('deliberately thrown')

    const generator = authSagas.logIn({
      type: authActionTypes.LOG_IN,
      payload
    })

    let result = generator.next()

    expect(result.value).toEqual(
      put(startSubmit(formConstants.LOGIN_FORM_NAME))
    )

    result = generator.next()

    expect(result.value).toEqual(
      call(validationLib.validateSync, payload, authConstraints.logInConstraint)
    )

    result = generator.throw(error)

    expect(result.value).toEqual(put({ type: authActionTypes.LOG_IN_FAILED }))

    result = generator.next()

    expect(result.value).toEqual(
      call(sagaLib.submitErrorHandler, error, formConstants.LOGIN_FORM_NAME)
    )

    result = generator.next()

    expect(result.done).toEqual(true)
  })
})

describe('logOut', () => {
  const generator = cloneableGenerator(authSagas.logOut)({
    type: authActionTypes.LOG_OUT
  })

  it('should try to log the user out', () => {
    const result = generator.next()
    expect(result.value).toEqual(call(authLib.logOutCurrentUser))
  })

  it('should handle a successful user logout', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next()

    expect(result.value).toEqual(
      put({
        type: authActionTypes.LOGGED_OUT,
        payload: { resetUsername: true }
      })
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })

  it('should handle a failed user logout', () => {
    const generatorClone = generator.clone()
    const error = new Error('deliberately thrown')

    let result = generatorClone.throw(error)

    expect(result.value).toEqual(call(log.error, error))

    result = generatorClone.next()

    expect(result.value).toEqual(
      put({
        type: authActionTypes.LOGGED_OUT,
        payload: { resetUsername: true }
      })
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })
})

describe('attemptAutoLogIn', () => {
  const generator = cloneableGenerator(authSagas.attemptAutoLogIn)({
    type: authActionTypes.ATTEMPT_AUTO_LOG_IN
  })

  it('should attempt the auto login', () => {
    const result = generator.next()
    expect(result.value).toEqual(call(authLib.attemptAutoLogIn))
  })

  it('should handle a successful auto login attempt', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next({ username: 'steve' })

    expect(result.value).toEqual(
      put({
        type: authActionTypes.LOG_IN_SUCCEEDED,
        payload: { cognitoUser: { username: 'steve' } }
      })
    )

    result = generatorClone.next()

    expect(result.value).toEqual(
      put({ type: authActionTypes.AUTO_LOG_IN_ATTEMPTED })
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })

  it('should handle a failed auto login attempt', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next()

    expect(result.value).toEqual(
      put({ type: authActionTypes.AUTO_LOG_IN_ATTEMPTED })
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })

  it('should handle an error being thrown on the auto login attempt', () => {
    const generatorClone = generator.clone()
    const error = new Error('deliberately thrown')

    let result = generatorClone.throw(error)

    expect(result.value).toEqual(call(log.error, error))

    result = generatorClone.next()

    expect(result.value).toEqual(
      put({ type: authActionTypes.AUTO_LOG_IN_ATTEMPTED })
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })
})
