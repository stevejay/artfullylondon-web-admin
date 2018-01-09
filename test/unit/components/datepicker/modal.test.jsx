import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import DatepickerModal from '_admin/components/datepicker/modal'

it('should render correctly', () => {
  const wrapper = shallow(
    <DatepickerModal
      title='The Title'
      onHide={_.noop}
      onSubmit={_.noop}
      value='2017/01/01'
      minDate='2016/01/01'
      maxDate='2040/01/01'
    />
  )

  expect(wrapper).toMatchSnapshot()
})
