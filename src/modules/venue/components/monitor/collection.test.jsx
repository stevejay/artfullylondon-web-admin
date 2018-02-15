import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { MonitorCollection } from './collection'
import { FullVenue } from '_src/entities/venue'

it('should render correctly', () => {
  const wrapper = shallow(
    <MonitorCollection
      title='The Title'
      venue={new FullVenue({})}
      monitors={[{ key: 'some-key' }]}
      getInProgress={false}
      showIgnoredMonitors={false}
      gridRowComponent={() => 'div'}
      onMounted={_.noop}
      onSubmit={_.noop}
      setShowIgnoredMonitors={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
