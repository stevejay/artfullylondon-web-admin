import React from 'react'
import _ from 'lodash'

import { EventSeriesEditOrCreate } from './event-series-edit-or-create'
import { FullEventSeries } from '_src/entities/event-series'
import EditEventSeriesForm from '../forms/edit-event-series'
import { actions as notificationActions } from '_src/modules/notification'
import { actions as entityActions } from '_src/modules/entity'
import * as eventSeriesConstants from '../constants'
import * as eventSeriesMapper from '../lib/mapper'
import * as entityConstants from '_src/constants/entity'

it('should render correctly when creating an event series', () => {
  eventSeriesMapper.getInitialValues = jest.fn().mockReturnValue({ id: 1 })

  const entity = new FullEventSeries()

  const wrapper = shallow(
    <EventSeriesEditOrCreate
      entity={entity}
      isEdit={false}
      history={{}}
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
      history={{}}
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
        history={{}}
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
        history={{}}
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
  const event = { preventDefault: jest.fn() }
  const history = { push: jest.fn() }

  const wrapper = shallow(
    <EventSeriesEditOrCreate
      entity={entity}
      isEdit={false}
      history={history}
      dispatch={_.noop}
      imageEditorIsPristine
      linkEditorIsPristine
    />
  )

  wrapper.find(EditEventSeriesForm).prop('onCancel')(event)

  expect(event.preventDefault).toHaveBeenCalled()
  expect(history.push).toHaveBeenCalledWith('/event-series/some-id')
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
        history={{}}
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
        history={{}}
        dispatch={dispatch}
        imageEditorIsPristine
        linkEditorIsPristine
      />
    )

    wrapper.find(EditEventSeriesForm).prop('onSubmit')({ name: 'New name' })

    expect(dispatch).toHaveBeenCalledWith(
      entityActions.saveEntity(
        entityConstants.ENTITY_TYPE_EVENT_SERIES,
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
