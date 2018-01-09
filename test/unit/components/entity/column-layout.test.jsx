import React from 'react'
import { shallow } from 'enzyme'

import EntityColumnLayout from '_admin/components/entity/column-layout'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityColumnLayout>
      <div id='child' />
    </EntityColumnLayout>
  )

  expect(wrapper).toMatchSnapshot()
})
