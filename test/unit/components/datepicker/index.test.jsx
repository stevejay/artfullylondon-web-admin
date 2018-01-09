import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import Datepicker from '_admin/components/datepicker'

it('should render correctly', () => {
  const wrapper = shallow(
    <Datepicker
      value='2017-01-01'
      htmlId='some-id'
      dateFormat='YYYY-MM-DD'
      onChange={_.noop}
      showModal={_.noop}
      error={null}
      touched={false}
      disabled={false}
      minDate='2016-01-01'
      maxDate='2020-01-01'
      placeholder='The Placeholder'
    />
  )

  expect(wrapper).toMatchSnapshot()
})
