import React from 'react'
import _ from 'lodash'

import { EventSeriesEditOrCreate } from './event-series-edit-or-create'
import { FullEventSeries } from '_src/entities/event-series'
import EditEventSeriesForm from '../forms/edit-event-series'
import { actions as notificationActions } from '_src/modules/notification'
import { actions as entityActions } from '_src/modules/entity'
import * as eventSeriesConstants from '../constants'
import * as eventSeriesMapper from '../lib/mapper'
import entityType from '_src/entities/types/entity-type'

it('should render correctly when creating an event series', () => {
  eventSeriesMapper.getInitialValues = jest.fn().mockReturnValue({ id: 1 })

  const entity = new FullEventSeries()

  const wrapper = shallow(
    <EventSeriesEditOrCreate
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

it('should render correctly when editing an event series', () => {
  eventSeriesMapper.getInitialValues = jest.fn().mockReturnValue({ id: 1 })

  const entity = new FullEventSeries({
    firstNames: 'First',
    lastName: 'Last',
    images: []
  })

  const wrapper = shallow(
    <EventSeriesEditOrCreate
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
    const entity = new FullEventSeries()

    const wrapper = shallow(
      <EventSeriesEditOrCreate
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
    const entity = new FullEventSeries()

    const wrapper = shallow(
      <EventSeriesEditOrCreate
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
      .shouldComponentUpdate({ entity: new FullEventSeries({}) })

    expect(actual).toEqual(true)
  })
})

it('should handle a cancel click', () => {
  eventSeriesMapper.getInitialValues = jest.fn().mockReturnValue({ id: 1 })
  const entity = new FullEventSeries({ id: 'some-id' })
  const onCancel = jest.fn()

  const wrapper = shallow(
    <EventSeriesEditOrCreate
      entity={entity}
      isEdit={false}
      onCancel={onCancel}
      dispatch={_.noop}
      imageEditorIsPristine
      linkEditorIsPristine
    />
  )

  wrapper.find(EditEventSeriesForm).prop('onCancel')()

  expect(onCancel).toHaveBeenCalled()
})

describe('handleSubmit', () => {
  it('should not submit when the sub editors are not pristine', () => {
    eventSeriesMapper.getInitialValues = jest.fn().mockReturnValue({ id: 1 })
    const entity = new FullEventSeries()
    const dispatch = jest.fn()

    const wrapper = shallow(
      <EventSeriesEditOrCreate
        entity={entity}
        isEdit={false}
        onCancel={_.noop}
        dispatch={dispatch}
        imageEditorIsPristine
        linkEditorIsPristine={false}
      />
    )

    wrapper.find(EditEventSeriesForm).prop('onSubmit')({ name: 'New name' })

    expect(dispatch).toHaveBeenCalledWith(
      notificationActions.addErrorNotification(
        'Submit Cancelled',
        'There are unsaved changes in the sub editors.'
      )
    )
  })

  it('should submit when the sub editors are pristine', () => {
    eventSeriesMapper.getInitialValues = jest.fn().mockReturnValue({ id: 1 })
    const entity = new FullEventSeries()
    const dispatch = jest.fn()

    const wrapper = shallow(
      <EventSeriesEditOrCreate
        entity={entity}
        isEdit={false}
        onCancel={_.noop}
        dispatch={dispatch}
        imageEditorIsPristine
        linkEditorIsPristine
      />
    )

    wrapper.find(EditEventSeriesForm).prop('onSubmit')({ name: 'New name' })

    expect(dispatch).toHaveBeenCalledWith(
      entityActions.saveEntity(
        entityType.EVENT_SERIES,
        { name: 'New name' },
        false,
        eventSeriesConstants.EDIT_EVENT_SERIES_FORM_NAME,
        eventSeriesConstants.EVENT_SERIES_NORMALISER,
        eventSeriesConstants.EVENT_SERIES_CONSTRAINT,
        eventSeriesMapper.mapSubmittedValues
      )
    )
  })
})
