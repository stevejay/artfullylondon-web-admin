import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import * as notificationsConstants from '_admin/constants/notifications'
import Notification from '_admin/components/notifications/notification'

it('should render a success notification with no message correctly', () => {
  const wrapper = shallow(
    <Notification
      notification={{
        id: 'some-id',
        title: 'The Title',
        type: notificationsConstants.NOTIFICATION_TYPE_SUCCESS
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
        type: notificationsConstants.NOTIFICATION_TYPE_ERROR
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
        type: notificationsConstants.NOTIFICATION_TYPE_SUCCESS
      }}
      onClose={onCloseHandler}
    />
  )

  wrapper.find('CloseButton').simulate('click')

  expect(onCloseHandler.mock.calls.length).toEqual(1)
  expect(onCloseHandler.mock.calls[0]).toEqual([{ id: 'some-id' }])
})
