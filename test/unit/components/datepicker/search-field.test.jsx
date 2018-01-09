import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import DatepickerSearchField from '_admin/components/datepicker/search-field'

it('should render correctly', () => {
  const wrapper = shallow(
    <DatepickerSearchField
      input={{
        value: '2017/01/01',
        onChange: _.noop
      }}
      meta={{
        touched: false,
        error: null
      }}
      disabled={false}
      minDate='2016/01/01'
      htmlId='some-id'
      dateFormat='YYYY/MM/DD'
      placeholder='The Placeholder'
      showModal={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when it has no value', () => {
  const wrapper = shallow(
    <DatepickerSearchField
      input={{
        value: null,
        onChange: _.noop
      }}
      meta={{
        touched: false,
        error: null
      }}
      disabled={false}
      minDate='2016/01/01'
      htmlId='some-id'
      dateFormat='YYYY/MM/DD'
      placeholder='The Placeholder'
      showModal={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when it has an error', () => {
  const wrapper = shallow(
    <DatepickerSearchField
      input={{
        value: '2017/01/01',
        onChange: _.noop
      }}
      meta={{
        touched: true,
        error: 'The Error'
      }}
      disabled={false}
      minDate='2016/01/01'
      htmlId='some-id'
      dateFormat='YYYY/MM/DD'
      placeholder='The Placeholder'
      showModal={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
