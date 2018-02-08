import React from 'react'
import { shallow } from 'enzyme'

import EntityColumn from './column'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityColumn>
      <div id='child' />
    </EntityColumn>
  )

  expect(wrapper).toMatchSnapshot()
})
