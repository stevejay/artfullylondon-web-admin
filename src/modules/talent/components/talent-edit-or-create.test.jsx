import React from 'react'
import _ from 'lodash'

import { TalentEditOrCreate } from './talent-edit-or-create'
import { FullTalent } from '_src/entities/talent'
import * as talentMapper from '_src/modules/talent/lib/mapper'

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
