import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import _ from 'lodash'

import * as types from '_src/constants/notifications'
import * as notificationsSagas from '_src/store/sagas/notifications'

describe('addNotification', () => {
  _.uniqueId = jest.fn().mockReturnValue('1234')

  const generator = notificationsSagas.addNotification({
    type: types.ADD_NOTIFICATION,
    payload: { name: 'Some name' }
  })

  it('adds the notification', () => {
    expect(generator.next().value).toEqual(
      put.resolve({
        type: types.NOTIFICATION_ADDED,
        payload: { name: 'Some name', id: '1234' }
      })
    )
  })

  it('delays', () => {
    expect(generator.next().value).toEqual(call(delay, 5000))
  })

  it('removes the notification', () => {
    expect(generator.next().value).toEqual(
      put.resolve({
        type: types.REMOVE_NOTIFICATION,
        payload: { id: '1234' }
      })
    )
  })
})
