import React from 'react'
import DayPicker from 'react-day-picker'
import _ from 'lodash'

import DatepickerModal from '_src/components/datepicker/modal'

it('should render correctly when not shown', () => {
  const wrapper = shallow(
    <DatepickerModal
      show={false}
      title='The Title'
      value='2017/01/01'
      minDate='2016/01/01'
      maxDate='2040/01/01'
      onHide={_.noop}
      onChange={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when shown', () => {
  const wrapper = shallow(
    <DatepickerModal
      show
      title='The Title'
      value='2017/01/01'
      minDate='2016/01/01'
      maxDate='2040/01/01'
      onHide={_.noop}
      onChange={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when shown and value is missing', () => {
  const wrapper = shallow(
    <DatepickerModal
      show
      title='The Title'
      minDate='2016/01/01'
      maxDate='2040/01/01'
      onHide={_.noop}
      onChange={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

describe('componentWillReceiveProps', () => {
  it('should update the component state when the props are updated', () => {
    const wrapper = shallow(
      <DatepickerModal
        show={false}
        title='The Title'
        value='2017/01/01'
        minDate='2016/01/01'
        maxDate='2040/01/01'
        onHide={_.noop}
        onChange={_.noop}
      />
    )

    wrapper.instance().componentWillReceiveProps({
      value: '2017/01/01',
      minDate: '2016/01/01',
      maxDate: '2018/01/01'
    })

    expect(wrapper.state()).toEqual({
      selectedDay: new Date(2017, 0, 1),
      from: new Date(2016, 0, 1),
      to: new Date(2018, 0, 1)
    })
  })

  it('should update the component state when the props are not updated', () => {
    const wrapper = shallow(
      <DatepickerModal
        show={false}
        title='The Title'
        value='2017/01/01'
        minDate='2016/01/01'
        maxDate='2040/01/01'
        onHide={_.noop}
        onChange={_.noop}
      />
    )

    wrapper.instance().componentWillReceiveProps({
      value: '2017/01/01',
      minDate: '2016/01/01',
      maxDate: '2040/01/01'
    })

    expect(wrapper.state()).toEqual({
      selectedDay: new Date(2017, 0, 1),
      from: new Date(2016, 0, 1),
      to: new Date(2040, 0, 1)
    })
  })
})

it('should handle a day being clicked', () => {
  const handleHide = jest.fn()
  const handleChange = jest.fn()

  const wrapper = shallow(
    <DatepickerModal
      show
      title='The Title'
      value='2017/01/01'
      minDate='2016/01/01'
      maxDate='2040/01/01'
      onHide={handleHide}
      onChange={handleChange}
    />
  )

  wrapper.find(DayPicker).prop('onDayClick')(new Date(2018, 1, 5))

  expect(handleChange).toHaveBeenCalledWith('2018/02/05')
  expect(handleHide).toHaveBeenCalled()
})

describe('selectedDays', () => {
  it('should handle testing a date when it is the same as the selected date', () => {
    const wrapper = shallow(
      <DatepickerModal
        show={false}
        title='The Title'
        value='2017/01/01'
        minDate='2016/01/01'
        maxDate='2040/01/01'
        onHide={_.noop}
        onChange={_.noop}
      />
    )

    const result = wrapper.instance().selectedDays(new Date(2017, 0, 1))

    expect(result).toEqual(true)
  })

  it('should handle testing a date when it is different to the selected date', () => {
    const wrapper = shallow(
      <DatepickerModal
        show={false}
        title='The Title'
        value='2017/01/01'
        minDate='2016/01/01'
        maxDate='2040/01/01'
        onHide={_.noop}
        onChange={_.noop}
      />
    )

    const result = wrapper.instance().selectedDays(new Date(2018, 11, 12))

    expect(result).toEqual(false)
  })

  it('should handle testing a date when the selected date is null', () => {
    const wrapper = shallow(
      <DatepickerModal
        show={false}
        title='The Title'
        minDate='2016/01/01'
        maxDate='2040/01/01'
        onHide={_.noop}
        onChange={_.noop}
      />
    )

    const result = wrapper.instance().selectedDays(new Date(2018, 11, 12))

    expect(result).toEqual(false)
  })
})

describe('disabledDays', () => {
  it('should handle testing a date when it is in the min/max range', () => {
    const wrapper = shallow(
      <DatepickerModal
        show={false}
        title='The Title'
        value='2017/01/01'
        minDate='2016/01/01'
        maxDate='2040/01/01'
        onHide={_.noop}
        onChange={_.noop}
      />
    )

    const result = wrapper.instance().disabledDays(new Date(2017, 0, 1))

    expect(result).toEqual(false)
  })

  it('should handle testing a date when it is outside the min/max range', () => {
    const wrapper = shallow(
      <DatepickerModal
        show={false}
        title='The Title'
        value='2017/01/01'
        minDate='2016/01/01'
        maxDate='2040/01/01'
        onHide={_.noop}
        onChange={_.noop}
      />
    )

    const result = wrapper.instance().disabledDays(new Date(2000, 0, 1))

    expect(result).toEqual(true)
  })

  it('should handle testing a date when there is no min/max range', () => {
    const wrapper = shallow(
      <DatepickerModal
        show={false}
        title='The Title'
        value='2017/01/01'
        onHide={_.noop}
        onChange={_.noop}
      />
    )

    const result = wrapper.instance().disabledDays(new Date(2017, 0, 1))

    expect(result).toEqual(false)
  })
})
