import React from 'react'
import _ from 'lodash'

import { TalentEditOrCreate } from './talent-edit-or-create'
import { FullTalent } from '_src/entities/talent'

it('should render correctly when creating a talent', () => {
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
