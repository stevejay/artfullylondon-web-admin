import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import DateAndTimeEntry from '_src/components/time/date-and-time-entry'

it('should render correctly', () => {
  const wrapper = shallow(
    <DateAndTimeEntry
      value={{
        key: 'some-key',
        date: '2017/01/18',
        at: '13:00',
        audienceTags: [{ id: 'tag-id', label: 'Tag Name' }]
      }}
      onDelete={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
