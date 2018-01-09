import React from 'react'
import { shallow } from 'enzyme'

import EntityAdditionalDetailContent
  from '_admin/components/entity/additional-detail-content'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityAdditionalDetailContent>
      <div id='child' />
    </EntityAdditionalDetailContent>
  )

  expect(wrapper).toMatchSnapshot()
})
