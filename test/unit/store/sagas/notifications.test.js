import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import _ from 'lodash'

import * as notificationSagas from '_src/store/sagas/notification'
import * as notificationConstants from '_src/constants/notification'
import * as notificationActions from '_src/store/actions/notification'

describe('addNotification', () => {
  it('should handle adding a notification', () => {
    _.uniqueId = jest.fn().mockReturnValue('1234')

    const generator = notificationSagas.addNotification(
      notificationActions.addNotification('Error', 'Title', 'Message')
    )

    let result = generator.next()

    expect(result.value).toEqual(
      put(
        notificationActions.notificationAdded({
          type: 'Error',
          title: 'Title',
          message: 'Message'
        })
      )
    )

    result = generator.next()

    expect(result.value).toEqual(
      call(delay, notificationConstants.DEFAULT_NOTIFICATION_DISPLAY_TIME_MS)
    )

    result = generator.next()

    expect(result.value).toEqual(
      put(notificationActions.removeNotification('1234'))
    )

    result = generator.next()

    expect(result.done).toEqual(true)
  })
})
