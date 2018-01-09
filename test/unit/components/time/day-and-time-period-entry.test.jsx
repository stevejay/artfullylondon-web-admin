import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import DayAndTimePeriodEntry
  from '_src/components/time/day-and-time-period-entry'

it('should render correctly', () => {
  const wrapper = shallow(
    <DayAndTimePeriodEntry
      value={{
        key: 'some-key',
        day: '2',
        from: '13:00',
        to: '14:00',
        timesRangeId: 'some-id',
        audienceTags: [{ id: 'tag-id', label: 'Tag Name' }]
      }}
      onDelete={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
