import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import {
  UpdateVenueMonitorModal
} from '_src/containers/modals/update-venue-monitor'

it('should render correctly', () => {
  const wrapper = shallow(
    <UpdateVenueMonitorModal
      onHide={_.noop}
      onSubmit={_.noop}
      initialValues={{}}
      getInProgress={false}
      getFailed={false}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
