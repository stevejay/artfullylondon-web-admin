import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import * as notificationsConstants from '_src/constants/notifications'
import NotificationContainer
  from '_src/modules/notifications/components/notification-container'

it('should render correctly', () => {
  const wrapper = shallow(
    <NotificationContainer
      notifications={[
        {
          id: 'some-id',
          title: 'The Title',
          message: 'The Message',
          type: notificationsConstants.NOTIFICATION_TYPE_SUCCESS
        }
      ]}
      onClose={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
