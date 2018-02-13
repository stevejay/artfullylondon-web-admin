import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import TalentsField from './talents-field'
import TalentsGridRow from './talents-grid-row'

it('should render correctly', () => {
  const wrapper = shallow(
    <TalentsField
      label='The Label'
      input={{
        value: [
          {
            key: 'some-key',
            id: 'some-id',
            talentType: 'Actor',
            roles: 'The Roles',
            characters: 'The Characters'
          }
        ],
        onChange: _.noop
      }}
      meta={{ touched: false, error: null }}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

describe('shouldComponentUpdate', () => {
  it('should not update when props have not changed', () => {
    const value = [
      {
        key: 'some-key',
        id: 'some-id',
        talentType: 'Actor',
        roles: 'The Roles',
        characters: 'The Characters'
      }
    ]

    const wrapper = shallow(
      <TalentsField
        label='The Label'
        input={{ value, onChange: _.noop }}
        meta={{ touched: false, error: null }}
      />
    )

    const result = wrapper.instance().shouldComponentUpdate({
      input: { value },
      meta: { touched: false, error: null }
    })

    expect(result).toEqual(false)
  })

  it('should update when props have changed', () => {
    const value = [
      {
        key: 'some-key',
        id: 'some-id',
        talentType: 'Actor',
        roles: 'The Roles',
        characters: 'The Characters'
      }
    ]

    const wrapper = shallow(
      <TalentsField
        label='The Label'
        input={{ value, onChange: _.noop }}
        meta={{ touched: false, error: null }}
      />
    )

    const result = wrapper.instance().shouldComponentUpdate({
      input: { value },
      meta: { touched: true, error: null }
    })

    expect(result).toEqual(true)
  })
})

it('should handle deleting a talent', () => {
  const handleChange = jest.fn()

  const value = [
    {
      key: 'some-key',
      id: 'some-id',
      talentType: 'Actor',
      roles: 'The Roles',
      characters: 'The Characters'
    }
  ]

  const wrapper = shallow(
    <TalentsField
      label='The Label'
      input={{ value, onChange: handleChange }}
      meta={{ touched: false, error: null }}
    />
  )

  wrapper.find(TalentsGridRow).at(0).simulate('delete', 'some-key')

  expect(handleChange).toHaveBeenCalledWith([])
})

it('should handle changing the roles of a talent', () => {
  const handleChange = jest.fn()

  const value = [
    {
      key: 'some-key',
      id: 'some-id',
      talentType: 'Actor',
      roles: 'The Roles',
      characters: 'The Characters'
    }
  ]

  const wrapper = shallow(
    <TalentsField
      label='The Label'
      input={{ value, onChange: handleChange }}
      meta={{ touched: false, error: null }}
    />
  )

  wrapper
    .find(TalentsGridRow)
    .at(0)
    .simulate('rolesChange', 'some-key', 'New Roles')

  expect(handleChange).toHaveBeenCalledWith([
    {
      key: 'some-key',
      id: 'some-id',
      talentType: 'Actor',
      roles: 'New Roles',
      characters: 'The Characters'
    }
  ])
})

it('should handle changing the characters of a talent', () => {
  const handleChange = jest.fn()

  const value = [
    {
      key: 'some-key',
      id: 'some-id',
      talentType: 'Actor',
      roles: 'The Roles',
      characters: 'The Characters'
    }
  ]

  const wrapper = shallow(
    <TalentsField
      label='The Label'
      input={{ value, onChange: handleChange }}
      meta={{ touched: false, error: null }}
    />
  )

  wrapper
    .find(TalentsGridRow)
    .at(0)
    .simulate('charactersChange', 'some-key', 'New Characters')

  expect(handleChange).toHaveBeenCalledWith([
    {
      key: 'some-key',
      id: 'some-id',
      talentType: 'Actor',
      roles: 'The Roles',
      characters: 'New Characters'
    }
  ])
})
