import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import _ from 'lodash'

import * as notificationActionTypes from '_src/constants/action/notification'
import * as notificationsSagas from '_src/store/sagas/notifications'
import * as notificationsConstants from '_src/constants/notifications'

describe('addNotification', () => {
  it('should handle adding a notification', () => {
    _.uniqueId = jest.fn().mockReturnValue('1234')

    const generator = notificationsSagas.addNotification({
      type: notificationActionTypes.ADD_NOTIFICATION,
      payload: { name: 'Some name' }
    })

    let result = generator.next()

    expect(result.value).toEqual(
      put({
        type: notificationActionTypes.NOTIFICATION_ADDED,
        payload: { name: 'Some name', id: '1234' }
      })
    )

    result = generator.next()

    expect(result.value).toEqual(
      call(delay, notificationsConstants.DEFAULT_NOTIFICATION_DISPLAY_TIME_MS)
    )

    result = generator.next()

    expect(result.value).toEqual(
      put({
        type: notificationActionTypes.REMOVE_NOTIFICATION,
        payload: { id: '1234' }
      })
    )

    result = generator.next()

    expect(result.done).toEqual(true)
  })
})
