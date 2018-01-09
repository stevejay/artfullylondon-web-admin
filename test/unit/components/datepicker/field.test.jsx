import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import DatepickerField from '_admin/components/datepicker/field'

it('should render correctly', () => {
  const wrapper = shallow(
    <DatepickerField
      label='The Label'
      input={{
        value: '2017-01-01',
        onChange: _.noop
      }}
      meta={{
        touched: false,
        error: null
      }}
      dateFormat='YYYY-MM-DD'
      required={false}
      disabled={false}
      minDate='2016-01-01'
      maxDate='2020-01-01'
      placeholder='The Placeholder'
      showModal={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
