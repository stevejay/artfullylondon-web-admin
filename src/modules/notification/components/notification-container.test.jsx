import React from 'react'
import _ from 'lodash'

import * as notificationConstants from '../constants'
import * as notificationActions from '../actions'
import { NotificationContainer } from './notification-container'
import Notification from './notification'

it('should render correctly', () => {
  const wrapper = shallow(
    <NotificationContainer
      notifications={[
        {
          id: 'some-id',
          type: notificationConstants.NOTIFICATION_TYPE_SUCCESS
        }
      ]}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should raise a remove notification action when a notification is closed', () => {
  const dispatchHandler = jest.fn()

  const wrapper = shallow(
    <NotificationContainer
      notifications={[
        {
          id: 'some-id',
          type: notificationConstants.NOTIFICATION_TYPE_SUCCESS
        }
      ]}
      dispatch={dispatchHandler}
    />
  )

  wrapper.find(Notification).prop('onClose')({ id: 'some-id' })

  expect(dispatchHandler).toHaveBeenCalledWith(
    notificationActions.removeNotification('some-id')
  )
})
