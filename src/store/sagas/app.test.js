import { put, call, apply } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import { delay } from 'redux-saga'
import window from 'global/window'
import store from 'store2'
import log from 'loglevel'

import * as fetchLib from '_src/lib/fetch'
import { appActions, notificationActions } from '_src/store'
import * as appConstants from '_src/constants/app'
import * as notificationConstants from '_src/constants/notification'
import * as appSagas from '_src/store/sagas/app'

describe('updateApp', () => {
  it('should handle updating the app', () => {
    const generator = appSagas.updateApp()

    let result = generator.next()

    expect(result.value).toEqual(
      call(store.session, appConstants.UPDATED_APP_VERSION_KEY, true)
    )

    result = generator.next()

    expect(result.value).toEqual(apply(window.location, window.location.reload))

    result = generator.next()

    expect(result.done).toEqual(true)
  })
})

describe('checkIfAppWasUpdated', () => {
  const generator = cloneableGenerator(appSagas.checkIfAppWasUpdated)()

  it('should check if the app has been updated', () => {
    const result = generator.next()

    expect(result.value).toEqual(
      apply(store.session, store.session.has, [
        appConstants.UPDATED_APP_VERSION_KEY
      ])
    )
  })

  it('should handle an app that was not updated', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next(false)

    expect(result.done).toEqual(true)
  })

  it('should handle an app that was updated', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next(true)

    expect(result.value).toEqual(
      apply(store.session, store.session.remove, [
        appConstants.UPDATED_APP_VERSION_KEY
      ])
    )

    result = generatorClone.next()

    expect(result.value).toEqual(
      put(
        notificationActions.addNotification(
          notificationConstants.NOTIFICATION_TYPE_SUCCESS,
          'App Successfully Updated',
          `This app was updated to version ${process.env.WEBSITE_VERSION}.`
        )
      )
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })
})

describe('checkForUpdate', () => {
  it('should handle finding a new version of the app on the second try', () => {
    const generator = appSagas.checkForUpdate()

    let result = generator.next()

    expect(result.value).toEqual(call(fetchLib.get, '/version.json'))

    result = generator.next()

    expect(result.value).toEqual(
      call(delay, appConstants.CHECK_FOR_UPDATE_POLL_MS)
    )

    result = generator.next()

    expect(result.value).toEqual(call(fetchLib.get, '/version.json'))

    result = generator.next({ version: '0.0.2' })

    expect(result.value).toEqual(put(appActions.appShouldUpdate()))

    result = generator.next()

    expect(result.done).toEqual(true)
  })

  it('should handle an exception being thrown when the version file is fetched', () => {
    const generator = appSagas.checkForUpdate()
    const error = new Error('deliberately thrown')

    let result = generator.next()

    expect(result.value).toEqual(call(fetchLib.get, '/version.json'))

    result = generator.throw(error)

    expect(result.value).toEqual(call(log.error, error))

    result = generator.next()

    expect(result.value).toEqual(
      call(delay, appConstants.CHECK_FOR_UPDATE_POLL_MS)
    )

    result = generator.next()

    expect(result.value).toEqual(call(fetchLib.get, '/version.json'))
  })
})
