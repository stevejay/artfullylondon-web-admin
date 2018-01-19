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

    expect(generator.next().value).toEqual(
      put(startSubmit(formConstants.LOGIN_FORM_NAME))
    )

    expect(generator.next().value).toEqual(
      call(validationLib.validate, payload, authConstraints.logInConstraint)
    )

    expect(generator.next().value).toEqual(
      call(authLib.authenticateUser, payload.username, payload.password)
    )

    expect(generator.next(cognitoUser).value).toEqual(
      put(stopSubmit(formConstants.LOGIN_FORM_NAME))
    )

    expect(generator.next().value).toEqual(
      put({
        type: authActionTypes.LOG_IN_SUCCEEDED,
        payload: { cognitoUser }
      })
    )

    expect(generator.next().value).toEqual(call(history.push, '/'))

    expect(generator.next().done).toEqual(true)
  })

  it('should handle a form validation error on login', () => {
    const payload = { username: 'steve', password: 'pwd' }
    const cognitoUser = { username: 'steve' }
    const error = new Error('deliberately thrown')

    const generator = authSagas.logIn({
      type: authActionTypes.LOG_IN,
      payload
    })

    expect(generator.next().value).toEqual(
      put(startSubmit(formConstants.LOGIN_FORM_NAME))
    )

    expect(generator.next().value).toEqual(
      call(validationLib.validate, payload, authConstraints.logInConstraint)
    )

    expect(generator.throw(error).value).toEqual(
      put({ type: authActionTypes.LOG_IN_FAILED })
    )

    expect(generator.next().value).toEqual(
      call(sagaLib.submitErrorHandler, error, formConstants.LOGIN_FORM_NAME)
    )

    expect(generator.next().done).toEqual(true)
  })
})

describe('logOut', () => {
  it('should successfully log the user out', () => {
    const generator = authSagas.logOut({
      type: authActionTypes.LOG_OUT
    })

    expect(generator.next().value).toEqual(call(authLib.logOutCurrentUser))

    expect(generator.next().value).toEqual(
      put({
        type: authActionTypes.LOGGED_OUT,
        payload: { resetUsername: true }
      })
    )

    expect(generator.next().done).toEqual(true)
  })

  it('should handle a failed log out attempt', () => {
    log.error = jest.fn()

    const generator = authSagas.logOut({
      type: authActionTypes.LOG_OUT
    })

    expect(generator.next().value).toEqual(call(authLib.logOutCurrentUser))

    expect(generator.throw(new Error('deliberately thrown')).value).toEqual(
      put({
        type: authActionTypes.LOGGED_OUT,
        payload: { resetUsername: true }
      })
    )

    expect(generator.next().done).toEqual(true)
  })
})

describe('attemptAutoLogIn', () => {
  const generator = cloneableGenerator(authSagas.attemptAutoLogIn)({
    type: authActionTypes.ATTEMPT_AUTO_LOG_IN
  })

  it('should attempt the auto login', () => {
    expect(generator.next().value).toEqual(call(authLib.attemptAutoLogIn))
  })

  it('should handle a successful login', () => {
    const generatorClone = generator.clone()

    expect(
      generatorClone.next({
        username: 'steve'
      }).value
    ).toEqual(
      put.resolve({
        type: authActionTypes.LOG_IN_SUCCEEDED,
        payload: { cognitoUser: { username: 'steve' } }
      })
    )

    expect(generatorClone.next().value).toEqual(
      put({
        type: authActionTypes.AUTO_LOG_IN_ATTEMPTED
      })
    )

    expect(generatorClone.next().done).toEqual(true)
  })

  it('should handle a failed login', () => {
    const generatorClone = generator.clone()

    expect(generatorClone.next().value).toEqual(
      put({
        type: authActionTypes.AUTO_LOG_IN_ATTEMPTED
      })
    )

    expect(generatorClone.next().done).toEqual(true)
  })

  it('should handle an error being thrown on the auto login attempt', () => {
    const generatorClone = generator.clone()
    log.error = jest.fn()

    expect(
      generatorClone.throw(new Error('deliberately thrown')).value
    ).toEqual(
      put({
        type: authActionTypes.AUTO_LOG_IN_ATTEMPTED
      })
    )

    expect(generatorClone.next().done).toEqual(true)
    expect(log.error).toHaveBeenCalled()
  })
})
