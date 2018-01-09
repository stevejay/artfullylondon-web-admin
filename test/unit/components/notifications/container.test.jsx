import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import * as notificationsConstants from '_admin/constants/notifications'
import NotificationsContainer from '_admin/components/notifications/container'

it('should render correctly', () => {
  const wrapper = shallow(
    <NotificationsContainer
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
