import React from 'react'
import _ from 'lodash'

import { EditVenueForm } from './edit-venue'
import { actions as imageActions } from '_src/modules/image'
import { actions as linkActions } from '_src/modules/link'
import * as entityConstants from '_src/constants/entity'
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

it('should handle deleting an image', () => {
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

  wrapper.find('[name="images"]').prop('onDeleteImage')('some-image-id')

  expect(dispatch).toHaveBeenCalledWith(
    imageActions.deleteImage(
      'some-image-id',
      venueConstants.EDIT_VENUE_FORM_NAME
    )
  )
})

it('should handle setting the main image', () => {
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

  wrapper.find('[name="images"]').prop('onSetMainImage')('some-image-id')

  expect(dispatch).toHaveBeenCalledWith(
    imageActions.setMainImage(
      'some-image-id',
      venueConstants.EDIT_VENUE_FORM_NAME
    )
  )
})

it('should handle updating an image', () => {
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

  wrapper.find('[name="images"]').prop('onUpdateImage')({
    id: 'some-image-id',
    values: { name: 'foo' }
  })

  expect(dispatch).toHaveBeenCalledWith(
    imageActions.updateImage(
      { name: 'foo' },
      'some-image-id',
      venueConstants.EDIT_VENUE_FORM_NAME
    )
  )
})

it('should handle adding an image', () => {
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

  wrapper.find('[name="images"]').prop('onAddImage')({ name: 'foo' })

  expect(dispatch).toHaveBeenCalledWith(
    imageActions.addImage(
      { name: 'foo' },
      entityConstants.ENTITY_TYPE_VENUE,
      venueConstants.EDIT_VENUE_FORM_NAME
    )
  )
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
