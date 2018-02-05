import { put, call, apply } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import { delay } from 'redux-saga'
import window from 'global/window'
import store from 'store2'
import log from 'loglevel'

import * as fetchLib from '_src/lib/fetch'
import { actions as notificationActions } from '_src/modules/notification'
import * as sagaActions from '_src/store/actions/saga'
import * as appUpdaterConstants from '_src/modules/app-updater/constants'
import * as appUpdaterSagas from './index'

describe('updateApp', () => {
  it('should handle updating the app', () => {
    const generator = appUpdaterSagas.updateApp()

    let result = generator.next()

    expect(result.value).toEqual(
      call(store.session, appUpdaterConstants.UPDATED_APP_VERSION_KEY, true)
    )

    result = generator.next()

    expect(result.value).toEqual(apply(window.location, window.location.reload))

    result = generator.next()

    expect(result.done).toEqual(true)
  })
})

describe('checkIfAppWasUpdated', () => {
  const generator = cloneableGenerator(appUpdaterSagas.checkIfAppWasUpdated)()

  it('should check if the app has been updated', () => {
    const result = generator.next()

    expect(result.value).toEqual(
      apply(store.session, store.session.has, [
        appUpdaterConstants.UPDATED_APP_VERSION_KEY
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
        appUpdaterConstants.UPDATED_APP_VERSION_KEY
      ])
    )

    result = generatorClone.next()

    expect(result.value).toEqual(
      put(
        notificationActions.addSuccessNotification(
          'App Successfully Updated',
          `This app was updated to version ${process.env.WEBSITE_VERSION}.`
        )
      )
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })
})

describe('checkForNewAppVersion', () => {
  it('should handle finding a new version of the app on the second try', () => {
    const generator = appUpdaterSagas.checkForNewAppVersion({ meta: 1234 })

    let result = generator.next()

    expect(result.value).toEqual(call(fetchLib.get, '/version.json'))

    result = generator.next()

    expect(result.value).toEqual(
      call(delay, appUpdaterConstants.CHECK_FOR_UPDATE_POLL_MS)
    )

    result = generator.next()

    expect(result.value).toEqual(call(fetchLib.get, '/version.json'))

    result = generator.next({ version: '0.0.2' })

    expect(result.value).toEqual(put(sagaActions.returnAsPromise(null, 1234)))

    result = generator.next()

    expect(result.done).toEqual(true)
  })

  it('should handle an exception being thrown when the version file is fetched', () => {
    const generator = appUpdaterSagas.checkForNewAppVersion({ meta: 1234 })
    const error = new Error('deliberately thrown')

    let result = generator.next()

    expect(result.value).toEqual(call(fetchLib.get, '/version.json'))

    result = generator.throw(error)

    expect(result.value).toEqual(call(log.error, error))

    result = generator.next()

    expect(result.value).toEqual(
      call(delay, appUpdaterConstants.CHECK_FOR_UPDATE_POLL_MS)
    )

    result = generator.next()

    expect(result.value).toEqual(call(fetchLib.get, '/version.json'))
  })
})
