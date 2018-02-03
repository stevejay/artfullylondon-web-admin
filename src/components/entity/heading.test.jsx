import React from 'react'
import { shallow } from 'enzyme'

import EntityHeading from '_src/components/entity/heading'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityHeading>
      <div id='child' />
    </EntityHeading>
  )

  expect(wrapper).toMatchSnapshot()
})
