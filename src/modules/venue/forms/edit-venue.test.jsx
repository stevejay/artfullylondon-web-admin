import React from 'react'
import _ from 'lodash'

import { EditVenueForm } from './edit-venue'
import { actions as linkActions } from '_src/modules/link'
import * as venueConstants from '../constants'
import * as dateLib from '_src/lib/date'

const timeActions = {
  addOpeningTime: _.noop,
  addAdditionalOpeningTime: _.noop,
  addOpeningTimeClosure: _.noop
}

it('should render correctly when editing', () => {
  dateLib.getTodayDateAsString = jest.fn().mockReturnValue('2018/01/01')

  const wrapper = shallow(
    <EditVenueForm
      initialValues={{}}
      isEdit
      onSubmit={_.noop}
      onCancel={_.noop}
      submitting={false}
      handleSubmit={_.noop}
      change={_.noop}
      dispatch={_.noop}
      timeActions={timeActions}
      namedClosuresDropdownOptions={[]}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when creating', () => {
  dateLib.getTodayDateAsString = jest.fn().mockReturnValue('2018/01/01')

  const wrapper = shallow(
    <EditVenueForm
      initialValues={{}}
      isEdit={false}
      onSubmit={_.noop}
      onCancel={_.noop}
      submitting={false}
      handleSubmit={_.noop}
      change={_.noop}
      dispatch={_.noop}
      timeActions={timeActions}
      namedClosuresDropdownOptions={[]}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle deleting a link', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <EditVenueForm
      initialValues={{}}
      isEdit
      onSubmit={_.noop}
      onCancel={_.noop}
      submitting={false}
      handleSubmit={_.noop}
      change={_.noop}
      dispatch={dispatch}
      timeActions={timeActions}
      namedClosuresDropdownOptions={[]}
    />
  )

  wrapper.find('[name="links"]').prop('onDeleteLink')('some-link-id')

  expect(dispatch).toHaveBeenCalledWith(
    linkActions.deleteLink('some-link-id', venueConstants.EDIT_VENUE_FORM_NAME)
  )
})

it('should handle adding a link', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <EditVenueForm
      initialValues={{}}
      isEdit
      onSubmit={_.noop}
      onCancel={_.noop}
      submitting={false}
      handleSubmit={_.noop}
      change={_.noop}
      dispatch={dispatch}
      timeActions={timeActions}
      namedClosuresDropdownOptions={[]}
    />
  )

  wrapper.find('[name="links"]').prop('onAddLink')({ foo: 'bar' })

  expect(dispatch).toHaveBeenCalledWith(
    linkActions.addLink({ foo: 'bar' }, venueConstants.EDIT_VENUE_FORM_NAME)
  )
})
