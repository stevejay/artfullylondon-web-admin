import React from 'react'
import _ from 'lodash'

import DateAndTimePeriodEntry from './date-and-time-period-entry'

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

it('should render correctly when there are no time range values', () => {
  const wrapper = shallow(
    <DateAndTimePeriodEntry
      value={{
        key: 'some-key',
        date: '2017/01/18',
        audienceTags: [{ id: 'tag-id', label: 'Tag Name' }]
      }}
      onDelete={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
