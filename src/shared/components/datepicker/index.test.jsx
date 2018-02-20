import React from 'react'
import _ from 'lodash'

import Datepicker from '_src/shared/components/datepicker'
import Text from '_src/shared/components/text'
import DatepickerModal from '_src/shared/components/datepicker/modal'

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
