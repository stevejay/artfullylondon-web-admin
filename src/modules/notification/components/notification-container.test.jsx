import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import * as notificationConstants from '_src/modules/notification/constants'
import * as notificationActions from '_src/modules/notification/actions'
import {
  NotificationContainer
} from '_src/modules/notification/components/notification-container'

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

  wrapper.find('shouldUpdate(Notification)').prop('onClose')({ id: 'some-id' })

  expect(dispatchHandler).toHaveBeenCalledWith(
    notificationActions.removeNotification('some-id')
  )
})

it('should not update if props do not change', () => {
  const notifications = [
    {
      id: 'some-id',
      type: notificationConstants.NOTIFICATION_TYPE_SUCCESS
    }
  ]

  const wrapper = shallow(
    <NotificationContainer notifications={notifications} dispatch={_.noop} />
  )

  const result = wrapper.instance().shouldComponentUpdate({ notifications })
  expect(result).toEqual(false)
})

it('should update if props change', () => {
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

  const result = wrapper.instance().shouldComponentUpdate({ notifications: [] })
  expect(result).toEqual(true)
})
