import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import * as notificationsConstants from '_src/constants/notifications'
import * as types from '_src/constants/notifications'
import { Notifications } from '_src/components/notifications'

it('should render correctly', () => {
  const wrapper = shallow(
    <Notifications
      notifications={[
        {
          id: 'some-id',
          type: notificationsConstants.NOTIFICATION_TYPE_SUCCESS
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
    <Notifications
      notifications={[
        {
          id: 'some-id',
          type: notificationsConstants.NOTIFICATION_TYPE_SUCCESS
        }
      ]}
      dispatch={dispatchHandler}
    />
  )

  wrapper.find('NotificationContainer').prop('onClose')({ id: 'some-id' })

  expect(dispatchHandler.mock.calls.length).toEqual(1)

  expect(dispatchHandler.mock.calls[0]).toEqual([
    {
      type: types.REMOVE_NOTIFICATION,
      payload: { id: 'some-id' }
    }
  ])
})
