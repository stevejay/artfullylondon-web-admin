import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import _ from 'lodash'

import * as sagas from '_src/modules/notification/sagas'
import * as notificationConstants from '_src/modules/notification/constants'
import * as notificationActions from '_src/modules/notification/actions'

describe('addNotification', () => {
  it('should handle adding a notification', () => {
    _.uniqueId = jest.fn().mockReturnValue('1234')

    const generator = sagas.addNotification(
      notificationActions.addErrorNotification('Title', 'Message')
    )

    let result = generator.next()

    expect(result.value).toEqual(
      put(
        notificationActions.notificationAdded({
          id: '1234',
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
