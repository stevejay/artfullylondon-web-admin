import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import {
  UpdateVenueEventMonitorModal
} from '_src/containers/modals/update-venue-event-monitor'

it('should render correctly', () => {
  const wrapper = shallow(
    <UpdateVenueEventMonitorModal
      onHide={_.noop}
      onSubmit={_.noop}
      initialValues={{}}
      getInProgress={false}
      getFailed={false}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
