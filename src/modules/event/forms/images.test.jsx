import React from 'react'
import _ from 'lodash'

import { EditEventImagesForm } from './images'
import Form from '_src/shared/components/form'
import { actions as notificationActions } from '_src/modules/notification'

it('should render correctly when creating', () => {
  const wrapper = shallow(
    <EditEventImagesForm
      initialValues={{ name: 'The Name' }}
      isEdit={false}
      submitting={false}
      imageEditorIsPristine
      handleSubmit={func => func}
      onSubmit={_.noop}
      onCancel={_.noop}
      onPreviousPage={_.noop}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when editing', () => {
  const wrapper = shallow(
    <EditEventImagesForm
      initialValues={{ name: 'The Name' }}
      isEdit
      submitting={false}
      imageEditorIsPristine
      handleSubmit={func => func}
      onSubmit={_.noop}
      onCancel={_.noop}
      onPreviousPage={_.noop}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle a submit event when the image editor is pristine', () => {
  const onSubmit = jest.fn()

  const wrapper = shallow(
    <EditEventImagesForm
      initialValues={{ name: 'The Name' }}
      isEdit
      submitting={false}
      imageEditorIsPristine
      handleSubmit={func => func}
      onSubmit={onSubmit}
      onCancel={_.noop}
      onPreviousPage={_.noop}
      dispatch={_.noop}
    />
  )

  wrapper.find(Form).simulate('submit', { some: 'values' })

  expect(onSubmit).toHaveBeenCalledWith({ some: 'values' })
})

it('should handle a submit event when the image editor is not pristine', () => {
  const onSubmit = jest.fn()
  const dispatch = jest.fn()

  const wrapper = shallow(
    <EditEventImagesForm
      initialValues={{ name: 'The Name' }}
      isEdit
      submitting={false}
      imageEditorIsPristine={false}
      handleSubmit={func => func}
      onSubmit={onSubmit}
      onCancel={_.noop}
      onPreviousPage={_.noop}
      dispatch={dispatch}
    />
  )

  wrapper.find(Form).simulate('submit', { some: 'values' })

  expect(onSubmit).not.toHaveBeenCalled()

  expect(dispatch).toHaveBeenCalledWith(
    notificationActions.addErrorNotification(
      'Submit Cancelled',
      'There are unsaved changes in the Add Image editor.'
    )
  )
})
