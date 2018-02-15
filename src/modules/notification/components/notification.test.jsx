import React from 'react'
import _ from 'lodash'

import * as notificationConstants from '_src/modules/notification/constants'
import Notification from '_src/modules/notification/components/notification'

it('should render a success notification with no message correctly', () => {
  const wrapper = shallow(
    <Notification
      notification={{
        id: 'some-id',
        title: 'The Title',
        type: notificationConstants.NOTIFICATION_TYPE_SUCCESS
      }}
      onClose={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render an error notification with no title correctly', () => {
  const wrapper = shallow(
    <Notification
      notification={{
        id: 'some-id',
        message: 'The Message',
        type: notificationConstants.NOTIFICATION_TYPE_ERROR
      }}
      onClose={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should invoke the onClose handler with the correct id when the notification is closed', () => {
  const onCloseHandler = jest.fn()

  const wrapper = shallow(
    <Notification
      notification={{
        id: 'some-id',
        title: 'The Title',
        message: 'The Message',
        type: notificationConstants.NOTIFICATION_TYPE_SUCCESS
      }}
      onClose={onCloseHandler}
    />
  )

  wrapper.find('CloseButton').simulate('click')

  expect(onCloseHandler).toHaveBeenCalled()
  expect(onCloseHandler.mock.calls[0]).toEqual([{ id: 'some-id' }])
})
