import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import TalentsField from '_src/components/talents/field'

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
      meta={{
        touched: false,
        error: null
      }}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
