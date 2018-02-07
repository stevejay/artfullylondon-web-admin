import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import DayAndTimeEntry from '_src/components/time/day-and-time-entry'

it('should render correctly', () => {
  const wrapper = shallow(
    <DayAndTimeEntry
      value={{
        key: 'some-key',
        day: '2',
        at: '13:00',
        timesRangeId: 'some-id',
        audienceTags: [{ id: 'tag-id', label: 'Tag Name' }]
      }}
      onDelete={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})