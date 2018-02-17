import React from 'react'
import _ from 'lodash'

import { EditTalentForm } from './edit-talent'
import { actions as linkActions } from '_src/modules/link'
import * as talentConstants from '../constants'
import * as talentDomainConstants from '_src/constants/talent'

it('should render correctly when editing an individual', () => {
  const wrapper = shallow(
    <EditTalentForm
      initialValues={{}}
      isEdit
      onSubmit={_.noop}
      onCancel={_.noop}
      talentTypeValue={talentDomainConstants.TALENT_TYPE_INDIVIDUAL}
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
      talentTypeValue={talentDomainConstants.TALENT_TYPE_GROUP}
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
    <EditTalentForm
      initialValues={{}}
      isEdit
      onSubmit={_.noop}
      onCancel={_.noop}
      talentTypeValue={talentDomainConstants.TALENT_TYPE_INDIVIDUAL}
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
      talentConstants.EDIT_TALENT_FORM_NAME
    )
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
      talentTypeValue={talentDomainConstants.TALENT_TYPE_INDIVIDUAL}
      submitting={false}
      handleSubmit={_.noop}
      change={_.noop}
      dispatch={dispatch}
    />
  )

  wrapper.find('[name="links"]').prop('onAddLink')({ foo: 'bar' })

  expect(dispatch).toHaveBeenCalledWith(
    linkActions.addLink({ foo: 'bar' }, talentConstants.EDIT_TALENT_FORM_NAME)
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
      talentTypeValue={talentDomainConstants.TALENT_TYPE_INDIVIDUAL}
      submitting={false}
      handleSubmit={_.noop}
      change={change}
      dispatch={_.noop}
    />
  )

  wrapper.find('[name="talentType"]').prop('onChange')(
    _.noop,
    talentDomainConstants.TALENT_TYPE_GROUP
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
      talentTypeValue={talentDomainConstants.TALENT_TYPE_GROUP}
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
