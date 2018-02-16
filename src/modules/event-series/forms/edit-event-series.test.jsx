import React from 'react'
import _ from 'lodash'

import { EditEventSeriesForm } from './edit-event-series'
import { actions as imageActions } from '_src/modules/image'
import { actions as linkActions } from '_src/modules/link'
import * as entityConstants from '_src/constants/entity'
import * as eventSeriesConstants from '../constants'

it('should render correctly when editing', () => {
  const wrapper = shallow(
    <EditEventSeriesForm
      initialValues={{}}
      isEdit
      onSubmit={_.noop}
      onCancel={_.noop}
      submitting={false}
      handleSubmit={_.noop}
      change={_.noop}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when creating', () => {
  const wrapper = shallow(
    <EditEventSeriesForm
      initialValues={{}}
      isEdit={false}
      onSubmit={_.noop}
      onCancel={_.noop}
      submitting={false}
      handleSubmit={_.noop}
      change={_.noop}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle deleting an image', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <EditEventSeriesForm
      initialValues={{}}
      isEdit
      onSubmit={_.noop}
      onCancel={_.noop}
      submitting={false}
      handleSubmit={_.noop}
      change={_.noop}
      dispatch={dispatch}
    />
  )

  wrapper.find('[name="images"]').prop('onDeleteImage')('some-image-id')

  expect(dispatch).toHaveBeenCalledWith(
    imageActions.deleteImage(
      'some-image-id',
      eventSeriesConstants.EDIT_EVENT_SERIES_FORM_NAME
    )
  )
})

it('should handle setting the main image', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <EditEventSeriesForm
      initialValues={{}}
      isEdit
      onSubmit={_.noop}
      onCancel={_.noop}
      submitting={false}
      handleSubmit={_.noop}
      change={_.noop}
      dispatch={dispatch}
    />
  )

  wrapper.find('[name="images"]').prop('onSetMainImage')('some-image-id')

  expect(dispatch).toHaveBeenCalledWith(
    imageActions.setMainImage(
      'some-image-id',
      eventSeriesConstants.EDIT_EVENT_SERIES_FORM_NAME
    )
  )
})

it('should handle updating an image', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <EditEventSeriesForm
      initialValues={{}}
      isEdit
      onSubmit={_.noop}
      onCancel={_.noop}
      submitting={false}
      handleSubmit={_.noop}
      change={_.noop}
      dispatch={dispatch}
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
      eventSeriesConstants.EDIT_EVENT_SERIES_FORM_NAME
    )
  )
})

it('should handle adding an image', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <EditEventSeriesForm
      initialValues={{}}
      isEdit
      onSubmit={_.noop}
      onCancel={_.noop}
      submitting={false}
      handleSubmit={_.noop}
      change={_.noop}
      dispatch={dispatch}
    />
  )

  wrapper.find('[name="images"]').prop('onAddImage')({ name: 'foo' })

  expect(dispatch).toHaveBeenCalledWith(
    imageActions.addImage(
      { name: 'foo' },
      entityConstants.ENTITY_TYPE_EVENT_SERIES,
      eventSeriesConstants.EDIT_EVENT_SERIES_FORM_NAME
    )
  )
})

it('should handle deleting a link', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <EditEventSeriesForm
      initialValues={{}}
      isEdit
      onSubmit={_.noop}
      onCancel={_.noop}
      submitting={false}
      handleSubmit={_.noop}
      change={_.noop}
      dispatch={dispatch}
    />
  )

  wrapper.find('[name="links"]').prop('onDeleteLink')('some-link-id')

  expect(dispatch).toHaveBeenCalledWith(
    linkActions.deleteLink(
      'some-link-id',
      eventSeriesConstants.EDIT_EVENT_SERIES_FORM_NAME
    )
  )
})

it('should handle adding a link', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <EditEventSeriesForm
      initialValues={{}}
      isEdit
      onSubmit={_.noop}
      onCancel={_.noop}
      submitting={false}
      handleSubmit={_.noop}
      change={_.noop}
      dispatch={dispatch}
    />
  )

  wrapper.find('[name="links"]').prop('onAddLink')({ foo: 'bar' })

  expect(dispatch).toHaveBeenCalledWith(
    linkActions.addLink(
      { foo: 'bar' },
      eventSeriesConstants.EDIT_EVENT_SERIES_FORM_NAME
    )
  )
})
