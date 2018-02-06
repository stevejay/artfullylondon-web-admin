import React from 'react'
import _ from 'lodash'

import { EditTalentForm } from './edit-talent'
import * as formConstants from '_src/constants/form'
import { actions as imageActions } from '_src/modules/image'
import { actions as linkActions } from '_src/modules/link'
import * as entityConstants from '_src/constants/entity'
import * as talentConstants from '_src/constants/talent'

it('should render correctly when editing an individual', () => {
  const wrapper = shallow(
    <EditTalentForm
      initialValues={{}}
      isEdit
      onSubmit={_.noop}
      onCancel={_.noop}
      talentTypeValue={talentConstants.TALENT_TYPE_INDIVIDUAL}
      submitting={false}
      handleSubmit={_.noop}
      change={_.noop}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when creating a group', () => {
  const wrapper = shallow(
    <EditTalentForm
      initialValues={{}}
      isEdit={false}
      onSubmit={_.noop}
      onCancel={_.noop}
      talentTypeValue={talentConstants.TALENT_TYPE_GROUP}
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
    <EditTalentForm
      initialValues={{}}
      isEdit
      onSubmit={_.noop}
      onCancel={_.noop}
      talentTypeValue={talentConstants.TALENT_TYPE_INDIVIDUAL}
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
      formConstants.EDIT_TALENT_FORM_NAME
    )
  )
})

it('should handle setting the main image', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <EditTalentForm
      initialValues={{}}
      isEdit
      onSubmit={_.noop}
      onCancel={_.noop}
      talentTypeValue={talentConstants.TALENT_TYPE_INDIVIDUAL}
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
      formConstants.EDIT_TALENT_FORM_NAME
    )
  )
})

it('should handle updating an image', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <EditTalentForm
      initialValues={{}}
      isEdit
      onSubmit={_.noop}
      onCancel={_.noop}
      talentTypeValue={talentConstants.TALENT_TYPE_INDIVIDUAL}
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
      formConstants.EDIT_TALENT_FORM_NAME
    )
  )
})

it('should handle adding an image', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <EditTalentForm
      initialValues={{}}
      isEdit
      onSubmit={_.noop}
      onCancel={_.noop}
      talentTypeValue={talentConstants.TALENT_TYPE_INDIVIDUAL}
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
      entityConstants.ENTITY_TYPE_TALENT,
      formConstants.EDIT_TALENT_FORM_NAME
    )
  )
})

it('should handle deleting a link', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <EditTalentForm
      initialValues={{}}
      isEdit
      onSubmit={_.noop}
      onCancel={_.noop}
      talentTypeValue={talentConstants.TALENT_TYPE_INDIVIDUAL}
      submitting={false}
      handleSubmit={_.noop}
      change={_.noop}
      dispatch={dispatch}
    />
  )

  wrapper.find('[name="links"]').prop('onDeleteLink')('some-link-id')

  expect(dispatch).toHaveBeenCalledWith(
    linkActions.deleteLink('some-link-id', formConstants.EDIT_TALENT_FORM_NAME)
  )
})

it('should handle adding a link', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <EditTalentForm
      initialValues={{}}
      isEdit
      onSubmit={_.noop}
      onCancel={_.noop}
      talentTypeValue={talentConstants.TALENT_TYPE_INDIVIDUAL}
      submitting={false}
      handleSubmit={_.noop}
      change={_.noop}
      dispatch={dispatch}
    />
  )

  wrapper.find('[name="links"]').prop('onAddLink')({ foo: 'bar' })

  expect(dispatch).toHaveBeenCalledWith(
    linkActions.addLink({ foo: 'bar' }, formConstants.EDIT_TALENT_FORM_NAME)
  )
})

it('should handle changing the talent type from individual to group', () => {
  const change = jest.fn()

  const wrapper = shallow(
    <EditTalentForm
      initialValues={{}}
      isEdit
      onSubmit={_.noop}
      onCancel={_.noop}
      talentTypeValue={talentConstants.TALENT_TYPE_INDIVIDUAL}
      submitting={false}
      handleSubmit={_.noop}
      change={change}
      dispatch={_.noop}
    />
  )

  wrapper.find('[name="talentType"]').prop('onChange')(
    _.noop,
    talentConstants.TALENT_TYPE_GROUP
  )

  expect(change).toHaveBeenCalledWith('firstNames', '')
})

it('should handle changing the talent type from group to individual', () => {
  const change = jest.fn()

  const wrapper = shallow(
    <EditTalentForm
      initialValues={{}}
      isEdit
      onSubmit={_.noop}
      onCancel={_.noop}
      talentTypeValue={talentConstants.TALENT_TYPE_GROUP}
      submitting={false}
      handleSubmit={_.noop}
      change={change}
      dispatch={_.noop}
    />
  )

  wrapper.find('[name="talentType"]').prop('onChange')(
    _.noop,
    talentConstants.TALENT_TYPE_INDIVIDUAL
  )

  expect(change).not.toHaveBeenCalled()
})
