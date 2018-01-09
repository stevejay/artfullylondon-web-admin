import React from 'react'
import { shallow } from 'enzyme'

import EntityCardFacets from '_admin/components/entity-card/facets'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityCardFacets>
      <div id='child' />
    </EntityCardFacets>
  )

  expect(wrapper).toMatchSnapshot()
})
