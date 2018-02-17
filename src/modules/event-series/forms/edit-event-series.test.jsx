import React from 'react'
import _ from 'lodash'

import { EditEventSeriesForm } from './edit-event-series'
import { actions as linkActions } from '_src/modules/link'
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
