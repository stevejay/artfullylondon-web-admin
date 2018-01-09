import React from 'react'
import { shallow } from 'enzyme'

import EntityCardSummary from '_src/components/entity-card/summary'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityCardSummary>
      <div id='child' />
    </EntityCardSummary>
  )

  expect(wrapper).toMatchSnapshot()
})
