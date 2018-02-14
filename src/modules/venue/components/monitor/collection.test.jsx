import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import MonitorCollection from './collection'
import { FullVenue } from '_src/entities/venue'

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
