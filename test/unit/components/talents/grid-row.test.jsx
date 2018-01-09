import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import TalentsGridRow from '_src/components/talents/grid-row'

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
