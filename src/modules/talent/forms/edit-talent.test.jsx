import React from 'react'
import _ from 'lodash'
import { Field } from 'redux-form'

import { EditTalentForm } from './edit-talent'
import talentType from '_src/domain/types/talent-type'

it('should render correctly when editing an individual', () => {
  const wrapper = shallow(
    <EditTalentForm
      initialValues={{}}
      isEdit
      onSubmit={_.noop}
      onCancel={_.noop}
      talentTypeValue={talentType.INDIVIDUAL}
      submitting={false}
      handleSubmit={_.noop}
      change={_.noop}
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
      talentTypeValue={talentType.GROUP}
      submitting={false}
      handleSubmit={_.noop}
      change={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle changing the talent type from individual to group', () => {
  const change = jest.fn()

  const wrapper = shallow(
    <EditTalentForm
      initialValues={{}}
      isEdit
      onSubmit={_.noop}
      onCancel={_.noop}
      talentTypeValue={talentType.INDIVIDUAL}
      submitting={false}
      handleSubmit={_.noop}
      change={change}
    />
  )

  wrapper.find(Field).at(0).simulate('change', null, talentType.GROUP)

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
      talentTypeValue={talentType.GROUP}
      submitting={false}
      handleSubmit={_.noop}
      change={change}
    />
  )

  wrapper.find(Field).at(0).simulate('change', null, talentType.INDIVIDUAL)

  expect(change).not.toHaveBeenCalled()
})
