import React from 'react'
import _ from 'lodash'

import { EditEventBasicsForm } from './basics'
import occurrenceType from '_src/domain/types/occurrence-type'
import costType from '_src/domain/types/cost-type'
import bookingType from '_src/domain/types/booking-type'
import eventType from '_src/domain/types/event-type'
import entityType from '_src/domain/types/entity-type'
import * as eventActions from '../actions'
import * as eventConstants from '../constants'
import { actions as searchActions } from '_src/modules/search'

function createSubject (editProps) {
  const props = {
    initialValues: { name: 'The Name' },
    isEdit: false,
    eventTypeValue: eventType.EXHIBITION,
    bookingTypeValue: bookingType.NOT_REQUIRED,
    costTypeValue: costType.FREE,
    occurrenceTypeValue: occurrenceType.CONTINUOUS,
    submitting: false,
    handleSubmit: _.noop,
    onSubmit: _.noop,
    onCancel: _.noop,
    change: _.noop,
    dispatch: _.noop,
    ...editProps
  }

  return <EditEventBasicsForm {...props} />
}

it('should render correctly when creating an exhibition event', () => {
  const wrapper = shallow(createSubject())
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when editing a performance event', () => {
  const wrapper = shallow(
    createSubject({ isEdit: true, eventTypeValue: eventType.PERFORMANCE })
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when editing a full feature performance event', () => {
  const wrapper = shallow(
    createSubject({
      isEdit: true,
      eventTypeValue: eventType.PERFORMANCE,
      bookingTypeValue: bookingType.REQUIRED,
      costTypeValue: costType.PAID,
      dateFromValue: '2018/01/01',
      occurrenceTypeValue: occurrenceType.BOUNDED
    })
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle changing the occurrence type when new value is continuous', () => {
  const change = jest.fn()

  const wrapper = shallow(
    createSubject({
      occurrenceTypeValue: occurrenceType.BOUNDED,
      change
    })
  )

  wrapper
    .find('Field[name="occurrenceType"]')
    .simulate('change', null, occurrenceType.CONTINUOUS)

  expect(change).toHaveBeenCalledWith('dateFrom', '')
  expect(change).toHaveBeenCalledWith('dateTo', '')
})

it('should handle changing the occurrence type when new value is not continuous', () => {
  const change = jest.fn()

  const wrapper = shallow(
    createSubject({
      occurrenceTypeValue: occurrenceType.BOUNDED,
      change
    })
  )

  wrapper
    .find('Field[name="occurrenceType"]')
    .simulate('change', null, occurrenceType.ONETIME)

  expect(change).not.toHaveBeenCalled()
})

it('should handle changing the date from when the occurrence type is onetime', () => {
  const change = jest.fn()

  const wrapper = shallow(
    createSubject({
      occurrenceTypeValue: occurrenceType.ONETIME,
      change
    })
  )

  wrapper.find('Field[name="dateFrom"]').simulate('change', null, '2018/02/02')

  expect(change).toHaveBeenCalledWith('dateTo', '2018/02/02')
})

it('should handle changing the date from when the occurrence type is not onetime', () => {
  const change = jest.fn()

  const wrapper = shallow(
    createSubject({
      occurrenceTypeValue: occurrenceType.BOUNDED,
      change
    })
  )

  wrapper.find('Field[name="dateFrom"]').simulate('change', null, '2018/02/02')

  expect(change).not.toHaveBeenCalled()
})

it('should handle changing the date to when the occurrence type is onetime', () => {
  const change = jest.fn()

  const wrapper = shallow(
    createSubject({
      occurrenceTypeValue: occurrenceType.ONETIME,
      change
    })
  )

  wrapper.find('Field[name="dateTo"]').simulate('change', null, '2018/02/02')

  expect(change).toHaveBeenCalledWith('dateFrom', '2018/02/02')
})

it('should handle changing the date to when the occurrence type is not onetime', () => {
  const change = jest.fn()

  const wrapper = shallow(
    createSubject({
      occurrenceTypeValue: occurrenceType.BOUNDED,
      change
    })
  )

  wrapper.find('Field[name="dateTo"]').simulate('change', null, '2018/02/02')

  expect(change).not.toHaveBeenCalled()
})

it('should handle changing the cost type when the new cost type is unknown', () => {
  const change = jest.fn()

  const wrapper = shallow(
    createSubject({
      costTypeValue: costType.PAID,
      change
    })
  )

  wrapper
    .find('Field[name="costType"]')
    .simulate('change', null, costType.UNKNOWN)

  expect(change).toHaveBeenCalledWith('costFrom', '')
  expect(change).toHaveBeenCalledWith('costTo', '')
})

it('should handle changing the cost type when the new cost type is paid', () => {
  const change = jest.fn()

  const wrapper = shallow(
    createSubject({
      costTypeValue: costType.UNKNOWN,
      change
    })
  )

  wrapper.find('Field[name="costType"]').simulate('change', null, costType.PAID)

  expect(change).not.toHaveBeenCalled()
})

it('should handle changing the booking type when the new booking type is not required', () => {
  const change = jest.fn()

  const wrapper = shallow(
    createSubject({
      bookingTypeValue: bookingType.REQUIRED,
      change
    })
  )

  wrapper
    .find('Field[name="bookingType"]')
    .simulate('change', null, bookingType.NOT_REQUIRED)

  expect(change).toHaveBeenCalledWith('bookingOpens', '')
})

it('should handle changing the booking type when the new booking type is required', () => {
  const change = jest.fn()

  const wrapper = shallow(
    createSubject({
      bookingTypeValue: bookingType.NOT_REQUIRED,
      change
    })
  )

  wrapper
    .find('Field[name="bookingType"]')
    .simulate('change', null, bookingType.REQUIRED)

  expect(change).not.toHaveBeenCalled()
})

it('should handle an autocomplete select event', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(createSubject({ dispatch }))

  wrapper
    .find('Field[name="venue"]')
    .simulate('autocompleteSelect', entityType.TALENT, 'some-talent-id')

  expect(dispatch).toHaveBeenCalledWith(
    eventActions.getSubEntity(
      entityType.TALENT,
      'some-talent-id',
      eventConstants.EDIT_EVENT_BASICS_FORM_NAME
    )
  )
})

it('should handle an autocomplete search event', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(createSubject({ dispatch }))

  wrapper
    .find('Field[name="venue"]')
    .simulate('autocompleteSearch', 'some term', entityType.TALENT)

  expect(dispatch).toHaveBeenCalledWith(
    searchActions.autocompleteSearch('some term', entityType.TALENT)
  )
})
