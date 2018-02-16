import React from 'react'
import _ from 'lodash'

import EditTalentForm from '../forms/edit-talent'
import { TalentEditOrCreate } from './talent-edit-or-create'
import { FullTalent } from '_src/entities/talent'
import { actions as entityActions } from '_src/modules/entity'
import { actions as notificationActions } from '_src/modules/notification'
import * as talentMapper from '../lib/mapper'
import * as talentConstants from '../constants'
import * as entityConstants from '_src/constants/entity'

it('should render correctly when creating a talent', () => {
  talentMapper.getInitialValues = jest.fn().mockReturnValue({ id: 1 })

  const talent = new FullTalent()

  const wrapper = shallow(
    <TalentEditOrCreate
      entity={talent}
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
  talentMapper.getInitialValues = jest.fn().mockReturnValue({ id: 1 })

  const talent = new FullTalent({
    firstNames: 'First',
    lastName: 'Last',
    images: []
  })

  const wrapper = shallow(
    <TalentEditOrCreate
      entity={talent}
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
    const talent = new FullTalent()

    const wrapper = shallow(
      <TalentEditOrCreate
        entity={talent}
        isEdit={false}
        history={{}}
        dispatch={_.noop}
        imageEditorIsPristine
        linkEditorIsPristine
      />
    )

    const actual = wrapper.instance().shouldComponentUpdate({ entity: talent })
    expect(actual).toEqual(false)
  })

  it('should update when props have changed', () => {
    const talent = new FullTalent()

    const wrapper = shallow(
      <TalentEditOrCreate
        entity={talent}
        isEdit={false}
        history={{}}
        dispatch={_.noop}
        imageEditorIsPristine
        linkEditorIsPristine
      />
    )

    const actual = wrapper
      .instance()
      .shouldComponentUpdate({ entity: new FullTalent({}) })

    expect(actual).toEqual(true)
  })
})

it('should handle a cancel click', () => {
  talentMapper.getInitialValues = jest.fn().mockReturnValue({ id: 1 })
  const entity = new FullTalent({ id: 'some-id' })
  const event = { preventDefault: jest.fn() }
  const history = { goBack: jest.fn() }

  const wrapper = shallow(
    <TalentEditOrCreate
      entity={entity}
      isEdit={false}
      history={history}
      dispatch={_.noop}
      imageEditorIsPristine
      linkEditorIsPristine
    />
  )

  wrapper.find(EditTalentForm).prop('onCancel')(event)

  expect(event.preventDefault).toHaveBeenCalled()
  expect(history.goBack).toHaveBeenCalled()
})

describe('handleSubmit', () => {
  it('should not submit when the sub editors are not pristine', () => {
    talentMapper.getInitialValues = jest.fn().mockReturnValue({ id: 1 })
    const entity = new FullTalent()
    const dispatch = jest.fn()

    const wrapper = shallow(
      <TalentEditOrCreate
        entity={entity}
        isEdit={false}
        history={{}}
        dispatch={dispatch}
        imageEditorIsPristine
        linkEditorIsPristine={false}
      />
    )

    wrapper.find(EditTalentForm).prop('onSubmit')({ name: 'New name' })

    expect(dispatch).toHaveBeenCalledWith(
      notificationActions.addErrorNotification(
        'Submit Cancelled',
        'There are unsaved changes in the sub editors.'
      )
    )
  })

  it('should submit when the sub editors are pristine', () => {
    talentMapper.getInitialValues = jest.fn().mockReturnValue({ id: 1 })
    const entity = new FullTalent()
    const dispatch = jest.fn()

    const wrapper = shallow(
      <TalentEditOrCreate
        entity={entity}
        isEdit={false}
        history={{}}
        dispatch={dispatch}
        imageEditorIsPristine
        linkEditorIsPristine
      />
    )

    wrapper.find(EditTalentForm).prop('onSubmit')({ name: 'New name' })

    expect(dispatch).toHaveBeenCalledWith(
      entityActions.saveEntity(
        entityConstants.ENTITY_TYPE_TALENT,
        { name: 'New name' },
        false,
        talentConstants.EDIT_TALENT_FORM_NAME,
        talentConstants.TALENT_NORMALISER,
        talentConstants.TALENT_CONSTRAINT,
        talentMapper.mapSubmittedValues
      )
    )
  })
})
