import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import TalentsGridRow from '_src/components/talents/grid-row'
import Text from '_src/components/text'

it('should render correctly', () => {
  const wrapper = shallow(
    <TalentsGridRow
      value={{
        key: 'some-key',
        id: 'some-id',
        talentType: 'Actor',
        roles: 'The Roles',
        characters: 'The Characters',
        firstNames: 'First Names',
        lastName: 'LastName',
        name: 'The Name'
      }}
      onDelete={_.noop}
      onRolesChange={_.noop}
      onCharactersChange={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is no value.name field', () => {
  const wrapper = shallow(
    <TalentsGridRow
      value={{
        key: 'some-key',
        id: 'some-id',
        talentType: 'Actor',
        roles: 'The Roles',
        characters: 'The Characters',
        firstNames: 'First Names',
        lastName: 'LastName'
      }}
      onDelete={_.noop}
      onRolesChange={_.noop}
      onCharactersChange={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle a roles change', () => {
  const handleRolesChange = jest.fn()

  const wrapper = shallow(
    <TalentsGridRow
      value={{
        key: 'some-key',
        id: 'some-id',
        talentType: 'Actor',
        roles: 'The Roles',
        characters: 'The Characters',
        firstNames: 'First Names',
        lastName: 'LastName',
        name: 'The Name'
      }}
      onDelete={_.noop}
      onRolesChange={handleRolesChange}
      onCharactersChange={_.noop}
    />
  )

  wrapper
    .find(Text)
    .at(0)
    .simulate('change', { target: { value: 'New value' } })

  expect(handleRolesChange).toHaveBeenCalledWith('some-key', 'New value')
})

it('should handle a characters change', () => {
  const handleCharactersChange = jest.fn()

  const wrapper = shallow(
    <TalentsGridRow
      value={{
        key: 'some-key',
        id: 'some-id',
        talentType: 'Actor',
        roles: 'The Roles',
        characters: 'The Characters',
        firstNames: 'First Names',
        lastName: 'LastName',
        name: 'The Name'
      }}
      onDelete={_.noop}
      onRolesChange={_.noop}
      onCharactersChange={handleCharactersChange}
    />
  )

  wrapper
    .find(Text)
    .at(1)
    .simulate('change', { target: { value: 'New value' } })

  expect(handleCharactersChange).toHaveBeenCalledWith('some-key', 'New value')
})
