import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import DateAndTimePeriodEntry
  from '_src/components/time/date-and-time-period-entry'

it('should render correctly', () => {
  const wrapper = shallow(
    <DateAndTimePeriodEntry
      value={{
        key: 'some-key',
        date: '2017/01/18',
        from: '13:00',
        to: '14:00',
        audienceTags: [{ id: 'tag-id', label: 'Tag Name' }]
      }}
      onDelete={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
