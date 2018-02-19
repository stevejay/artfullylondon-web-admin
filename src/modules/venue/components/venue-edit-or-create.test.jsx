import React from 'react'
import _ from 'lodash'

import { VenueEditOrCreate } from './venue-edit-or-create'
import { FullVenue } from '_src/domain/venue'
import EditVenueForm from '../forms/edit-venue'
import { actions as notificationActions } from '_src/modules/notification'
import { actions as entityActions } from '_src/modules/entity'
import * as venueConstants from '../constants'
import * as venueMapper from '../lib/mapper'
import entityType from '_src/domain/types/entity-type'

it('should render correctly when creating a venue', () => {
  venueMapper.getInitialValues = jest.fn().mockReturnValue({ id: 1 })

  const entity = new FullVenue()

  const wrapper = shallow(
    <VenueEditOrCreate
      entity={entity}
      isEdit={false}
      onCancel={_.noop}
      dispatch={_.noop}
      imageEditorIsPristine
      linkEditorIsPristine
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when editing a venue', () => {
  venueMapper.getInitialValues = jest.fn().mockReturnValue({ id: 1 })

  const entity = new FullVenue({
    firstNames: 'First',
    lastName: 'Last',
    images: []
  })

  const wrapper = shallow(
    <VenueEditOrCreate
      entity={entity}
      isEdit
      onCancel={_.noop}
      dispatch={_.noop}
      imageEditorIsPristine
      linkEditorIsPristine
    />
  )

  expect(wrapper).toMatchSnapshot()
})

describe('shouldComponentUpdate', () => {
  it('should not update when props have not changed', () => {
    const entity = new FullVenue()

    const wrapper = shallow(
      <VenueEditOrCreate
        entity={entity}
        isEdit={false}
        onCancel={_.noop}
        dispatch={_.noop}
        imageEditorIsPristine
        linkEditorIsPristine
      />
    )

    const actual = wrapper.instance().shouldComponentUpdate({ entity: entity })
    expect(actual).toEqual(false)
  })

  it('should update when props have changed', () => {
    const entity = new FullVenue()

    const wrapper = shallow(
      <VenueEditOrCreate
        entity={entity}
        isEdit={false}
        onCancel={_.noop}
        dispatch={_.noop}
        imageEditorIsPristine
        linkEditorIsPristine
      />
    )

    const actual = wrapper
      .instance()
      .shouldComponentUpdate({ entity: new FullVenue({}) })

    expect(actual).toEqual(true)
  })
})

it('should handle a cancel click', () => {
  venueMapper.getInitialValues = jest.fn().mockReturnValue({ id: 1 })
  const entity = new FullVenue({ id: 'some-id' })
  const onCancel = jest.fn()

  const wrapper = shallow(
    <VenueEditOrCreate
      entity={entity}
      isEdit={false}
      onCancel={onCancel}
      dispatch={_.noop}
      imageEditorIsPristine
      linkEditorIsPristine
    />
  )

  wrapper.find(EditVenueForm).prop('onCancel')()

  expect(onCancel).toHaveBeenCalled()
})

describe('handleSubmit', () => {
  it('should not submit when the sub editors are not pristine', () => {
    venueMapper.getInitialValues = jest.fn().mockReturnValue({ id: 1 })
    const entity = new FullVenue()
    const dispatch = jest.fn()

    const wrapper = shallow(
      <VenueEditOrCreate
        entity={entity}
        isEdit={false}
        onCancel={_.noop}
        dispatch={dispatch}
        imageEditorIsPristine
        linkEditorIsPristine={false}
      />
    )

    wrapper.find(EditVenueForm).prop('onSubmit')({ name: 'New name' })

    expect(dispatch).toHaveBeenCalledWith(
      notificationActions.addErrorNotification(
        'Submit Cancelled',
        'There are unsaved changes in the sub editors.'
      )
    )
  })

  it('should submit when the sub editors are pristine', () => {
    venueMapper.getInitialValues = jest.fn().mockReturnValue({ id: 1 })
    const entity = new FullVenue()
    const dispatch = jest.fn()

    const wrapper = shallow(
      <VenueEditOrCreate
        entity={entity}
        isEdit={false}
        onCancel={_.noop}
        dispatch={dispatch}
        imageEditorIsPristine
        linkEditorIsPristine
      />
    )

    wrapper.find(EditVenueForm).prop('onSubmit')({ name: 'New name' })

    expect(dispatch).toHaveBeenCalledWith(
      entityActions.saveEntity(
        entityType.VENUE,
        { name: 'New name' },
        false,
        venueConstants.EDIT_VENUE_FORM_NAME,
        venueConstants.VENUE_NORMALISER,
        venueConstants.VENUE_CONSTRAINT,
        venueMapper.mapSubmittedValues
      )
    )
  })
})
