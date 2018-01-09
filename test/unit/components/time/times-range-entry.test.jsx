import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import TimesRangeEntry from '_src/components/time/times-range-entry'

it('should render correctly', () => {
  const wrapper = shallow(
    <TimesRangeEntry
      value={{
        id: 'some-id',
        dateFrom: '2017/01/18',
        dateTo: '2017/01/28',
        label: 'The Label'
      }}
      onDelete={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
