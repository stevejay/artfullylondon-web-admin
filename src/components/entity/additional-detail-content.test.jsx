import React from 'react'
import { shallow } from 'enzyme'

import EntityAdditionalDetailContent
  from '_src/components/entity/additional-detail-content'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityAdditionalDetailContent>
      <div id='child' />
    </EntityAdditionalDetailContent>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should not update', () => {
  const wrapper = shallow(
    <EntityAdditionalDetailContent>
      <div id='child' />
    </EntityAdditionalDetailContent>
  )

  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
