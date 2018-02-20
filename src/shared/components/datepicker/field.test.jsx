import React from 'react'
import _ from 'lodash'

import DatepickerField from '_src/shared/components/datepicker/field'

it('should render correctly', () => {
  const wrapper = shallow(
    <DatepickerField
      label='The Label'
      input={{ value: '2017-01-01', onChange: _.noop }}
      meta={{ touched: false, error: null }}
      dateFormat='YYYY-MM-DD'
      required={false}
      disabled={false}
      minDate='2016-01-01'
      maxDate='2020-01-01'
      placeholder='The Placeholder'
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should not update when props have not changed', () => {
  const wrapper = shallow(
    <DatepickerField
      label='The Label'
      input={{ value: '2017-01-01', onChange: _.noop }}
      meta={{ touched: false, error: null }}
      dateFormat='YYYY-MM-DD'
      required={false}
      disabled={false}
      minDate='2016-01-01'
      maxDate='2020-01-01'
      placeholder='The Placeholder'
    />
  )

  const result = wrapper.instance().shouldComponentUpdate({
    input: { value: '2017-01-01' },
    meta: { touched: false, error: null },
    disabled: false,
    minDate: '2016-01-01',
    maxDate: '2020-01-01'
  })

  expect(result).toEqual(false)
})

it('should update when props have changed', () => {
  const wrapper = shallow(
    <DatepickerField
      label='The Label'
      input={{ value: '2017-01-01', onChange: _.noop }}
      meta={{ touched: false, error: null }}
      dateFormat='YYYY-MM-DD'
      required={false}
      disabled={false}
      minDate='2016-01-01'
      maxDate='2020-01-01'
      placeholder='The Placeholder'
    />
  )

  const result = wrapper.instance().shouldComponentUpdate({
    input: { value: '2018-12-12' },
    meta: { touched: false, error: null },
    disabled: false,
    minDate: '2016-01-01',
    maxDate: '2020-01-01'
  })

  expect(result).toEqual(true)
})
