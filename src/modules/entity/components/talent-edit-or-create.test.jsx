import React from 'react'
import _ from 'lodash'

import { TalentEditOrCreate } from './talent-edit-or-create'
import EditTalentForm from '_src/modules/entity/forms/edit-talent'
import * as entityActions from '_src/modules/entity/actions'
import { actions as notificationActions } from '_src/modules/notification'
import * as entityConstants from '_src/constants/entity'

it('should render correctly when creating a talent', () => {
  const wrapper = shallow(
    <TalentEditOrCreate
      entity={{ lastName: '' }}
      isEdit={false}
      history={{}}
      dispatch={_.noop}
      imageEditorIsPristine
      linkEditorIsPristine
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when editing a talent', () => {
  const wrapper = shallow(
    <TalentEditOrCreate
      entity={{ lastName: 'Some Name' }}
      isEdit
      history={{}}
      dispatch={_.noop}
      imageEditorIsPristine
      linkEditorIsPristine
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle cancelling editing', () => {
  const goBack = jest.fn()
  const preventDefault = jest.fn()

  const wrapper = shallow(
    <TalentEditOrCreate
      entity={{ lastName: 'Some Name' }}
      isEdit
      history={{ goBack }}
      dispatch={_.noop}
      imageEditorIsPristine
      linkEditorIsPristine
    />
  )

  wrapper.find(EditTalentForm).simulate('cancel', { preventDefault })

  expect(preventDefault).toHaveBeenCalled()
  expect(goBack).toHaveBeenCalled()
})

it('should successfully submit the form when the subforms are pristine', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <TalentEditOrCreate
      entity={{ lastName: 'Some Name' }}
      isEdit
      history={{}}
      dispatch={dispatch}
      imageEditorIsPristine
      linkEditorIsPristine
    />
  )

  wrapper.find(EditTalentForm).simulate('submit', { lastName: 'Other Name' })

  expect(dispatch).toHaveBeenCalledWith(
    entityActions.saveEntity(
      entityConstants.ENTITY_TYPE_TALENT,
      { lastName: 'Other Name' },
      true
    )
  )
})

it('should fail to submit the form when the subforms are not pristine', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <TalentEditOrCreate
      entity={{ lastName: 'Some Name' }}
      isEdit
      history={{}}
      dispatch={dispatch}
      imageEditorIsPristine
      linkEditorIsPristine={false}
    />
  )

  wrapper.find(EditTalentForm).simulate('submit', { lastName: 'Other Name' })

  expect(dispatch).toHaveBeenCalledWith(
    notificationActions.addErrorNotification(
      'Submit Cancelled',
      'There are unsaved changes in the sub editors.'
    )
  )
})
