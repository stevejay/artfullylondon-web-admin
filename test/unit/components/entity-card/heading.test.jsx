import React from 'react'
import { shallow } from 'enzyme'

import EntityCardHeading from '_admin/components/entity-card/heading'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityCardHeading id='some-id'>
      <div id='child' />
    </EntityCardHeading>
  )

  expect(wrapper).toMatchSnapshot()
})
