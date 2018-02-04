import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import Datepicker from '_src/components/datepicker'
import Text from '_src/components/text'
import DatepickerModal from '_src/components/datepicker/modal'

it('should render correctly', () => {
  const wrapper = shallow(
    <Datepicker
      value='2017-01-01'
      htmlId='some-id'
      dateFormat='YYYY-MM-DD'
      onChange={_.noop}
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

it('should handle being clicked to show the datepicker modal', () => {
  const wrapper = shallow(
    <Datepicker
      value='2017-01-01'
      htmlId='some-id'
      dateFormat='YYYY-MM-DD'
      onChange={_.noop}
      error={null}
      touched={false}
      disabled={false}
      minDate='2016-01-01'
      maxDate='2020-01-01'
      placeholder='The Placeholder'
    />
  )

  wrapper.find(Text).simulate('click', { preventDefault: jest.fn() })
  wrapper.update() // TODO remove when enzyme bug fixed

  expect(wrapper).toMatchSnapshot()
})

it('should handle hiding the datepicker modal', () => {
  const wrapper = shallow(
    <Datepicker
      value='2017-01-01'
      htmlId='some-id'
      dateFormat='YYYY-MM-DD'
      onChange={_.noop}
      error={null}
      touched={false}
      disabled={false}
      minDate='2016-01-01'
      maxDate='2020-01-01'
      placeholder='The Placeholder'
    />
  )

  wrapper.find(DatepickerModal).prop('onHide')()

  expect(wrapper).toMatchSnapshot()
})

it('should not update when props have not changed', () => {
  const wrapper = shallow(
    <Datepicker
      value='2017-01-01'
      htmlId='some-id'
      dateFormat='YYYY-MM-DD'
      onChange={_.noop}
      error={null}
      touched={false}
      disabled={false}
      minDate='2016-01-01'
      maxDate='2020-01-01'
      placeholder='The Placeholder'
    />
  )

  const result = wrapper.instance().shouldComponentUpdate({
    value: '2017-01-01',
    touched: false,
    error: null,
    disabled: false,
    minDate: '2016-01-01',
    maxDate: '2020-01-01'
  })

  expect(result).toEqual(false)
})

it('should update when props have changed', () => {
  const wrapper = shallow(
    <Datepicker
      value='2017-01-01'
      htmlId='some-id'
      dateFormat='YYYY-MM-DD'
      onChange={_.noop}
      error={null}
      touched={false}
      disabled={false}
      minDate='2016-01-01'
      maxDate='2020-01-01'
      placeholder='The Placeholder'
    />
  )

  const result = wrapper.instance().shouldComponentUpdate({
    value: '2018-12-12',
    touched: false,
    error: null,
    disabled: false,
    minDate: '2016-01-01',
    maxDate: '2020-01-01'
  })

  expect(result).toEqual(true)
})
