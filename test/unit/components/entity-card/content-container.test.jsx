import React from 'react'
import { shallow } from 'enzyme'

import EntityCardContentContainer
  from '_src/components/entity-card/content-container'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityCardContentContainer>
      <div id='child' />
    </EntityCardContentContainer>
  )

  expect(wrapper).toMatchSnapshot()
})
