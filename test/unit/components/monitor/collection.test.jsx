import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { FullVenue } from '_src/entities/venue'
import MonitorCollection from '_src/components/monitor/collection'

it('should render correctly', () => {
  const wrapper = shallow(
    <MonitorCollection
      venue={new FullVenue({})}
      monitors={[{ key: 'some-key' }]}
      getInProgress={false}
      onMounted={_.noop}
      onEdit={_.noop}
      gridRowComponent={() => 'div'}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
