import React from 'react'
import { shallow } from 'enzyme'

import EntitySectionHeading from '_admin/components/entity/section-heading'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntitySectionHeading>
      <div id='child' />
    </EntitySectionHeading>
  )

  expect(wrapper).toMatchSnapshot()
})
