import React from 'react'
import { shallow } from 'enzyme'

import EntityCardSubHeading from '_src/components/entity-card/sub-heading'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityCardSubHeading>
      <div id='child' />
    </EntityCardSubHeading>
  )

  expect(wrapper).toMatchSnapshot()
})
