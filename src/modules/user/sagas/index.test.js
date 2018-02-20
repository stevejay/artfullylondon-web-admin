import { put, call, select } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import { startSubmit, stopSubmit } from 'redux-form'
import log from 'loglevel'

import * as userSagas from './index'
import * as authLib from '../lib/auth'
import * as sagaLib from '_src/lib/saga'
import * as validationLib from '_src/lib/validation'
import * as userConstants from '../constants'
import * as userActions from '../actions'
import { selectors } from '../reducers'
import history from '_src/lib/history'

describe('getAuthTokenForCurrentUser', () => {
  describe('user is not logged in', () => {
    it('should fail', () => {
      const generator = userSagas.getAuthTokenForCurrentUser()

      let result = generator.next()

      expect(result.value).toEqual(select(selectors.userIsLoggedIn))

      expect(() => generator.next(false)).toThrow()
    })
  })

  describe('user is logged in', () => {
    const generator = cloneableGenerator(userSagas.getAuthTokenForCurrentUser)()

    it('should try to get an auth token', () => {
      let result = generator.next()

      expect(result.value).toEqual(select(selectors.userIsLoggedIn))

      result = generator.next(true)

      expect(result.value).toEqual(select(selectors.cognitoUser))

      result = generator.next({ id: 'some-user' })

      expect(result.value).toEqual(
        call(authLib.getSessionToken, { id: 'some-user' })
      )
    })

    it('should handle successfully getting an auth token', () => {
      const generatorClone = generator.clone()

      let result = generatorClone.next('some-token')

      expect(result.value).toEqual('some-token')

      result = generatorClone.next()

      expect(result.done).toEqual(true)
    })

    it('should handle failing to get an auth token', () => {
      const generatorClone = generator.clone()

      let result = generatorClone.next(null)

      expect(result.value).toEqual(put(userActions.loggedOut))

      expect(() => generatorClone.next(false)).toThrow()
    })
  })
})

describe('logIn', () => {
  it('should successfully log the user in', () => {
    const payload = { username: 'steve', password: 'pwd' }
    const cognitoUser = { username: 'steve' }
    const generator = userSagas.logIn(userActions.logIn(payload))

    let result = generator.next()

    expect(result.value).toEqual(
      put(startSubmit(userConstants.LOGIN_FORM_NAME))
    )

    result = generator.next()

    expect(result.value).toEqual(
      call(validationLib.validate, payload, userConstants.logInConstraint)
    )

    result = generator.next()

    expect(result.value).toEqual(
      call(authLib.authenticateUser, payload.username, payload.password)
    )

    result = generator.next(cognitoUser)

    expect(result.value).toEqual(put(stopSubmit(userConstants.LOGIN_FORM_NAME)))

    result = generator.next()

    expect(result.value).toEqual(put(userActions.logInSucceeded(cognitoUser)))

    result = generator.next()

    expect(result.value).toEqual(call(history.push, '/'))

    result = generator.next()

    expect(result.done).toEqual(true)
  })

  it('should handle a validation error', () => {
    const payload = { username: 'steve', password: '' }
    const error = new Error('deliberately thrown')
    const generator = userSagas.logIn(userActions.logIn(payload))

    let result = generator.next()

    expect(result.value).toEqual(
      put(startSubmit(userConstants.LOGIN_FORM_NAME))
    )

    result = generator.next()

    expect(result.value).toEqual(
      call(validationLib.validate, payload, userConstants.logInConstraint)
    )

    result = generator.throw(error)

    expect(result.value).toEqual(put(userActions.logInFailed()))

    result = generator.next()

    expect(result.value).toEqual(
      call(sagaLib.submitErrorHandler, error, userConstants.LOGIN_FORM_NAME)
    )

    result = generator.next()

    expect(result.done).toEqual(true)
  })
})

describe('logOut', () => {
  const generator = cloneableGenerator(userSagas.logOut)(userActions.logOut())

  it('should try to log the user out', () => {
    const result = generator.next()
    expect(result.value).toEqual(call(authLib.logOutCurrentUser))
  })

  it('should handle a successful user logout', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next()

    expect(result.value).toEqual(
      put(userActions.loggedOut({ resetUsername: true }))
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
      put(userActions.loggedOut({ resetUsername: true }))
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })
})

describe('attemptAutoLogIn', () => {
  const generator = cloneableGenerator(userSagas.attemptAutoLogIn)(
    userActions.attemptAutoLogIn()
  )

  it('should attempt the auto login', () => {
    const result = generator.next()
    expect(result.value).toEqual(call(authLib.attemptAutoLogIn))
  })

  it('should handle a successful auto login attempt', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next({ username: 'steve' })

    expect(result.value).toEqual(
      put(userActions.logInSucceeded({ username: 'steve' }))
    )

    result = generatorClone.next()

    expect(result.value).toEqual(put(userActions.autoLogInAttempted()))

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })

  it('should handle a failed auto login attempt', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next()

    expect(result.value).toEqual(put(userActions.autoLogInAttempted()))

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })

  it('should handle an error being thrown on the auto login attempt', () => {
    const generatorClone = generator.clone()
    const error = new Error('deliberately thrown')

    let result = generatorClone.throw(error)

    expect(result.value).toEqual(call(log.error, error))

    result = generatorClone.next()

    expect(result.value).toEqual(put(userActions.autoLogInAttempted()))

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })
})
