import React from 'react'
import { shallow } from 'enzyme'

import EntityAdditionalDetailHeading
  from '_src/components/entity/additional-detail-heading'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityAdditionalDetailHeading>
      <div id='child' />
    </EntityAdditionalDetailHeading>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should not update', () => {
  const wrapper = shallow(
    <EntityAdditionalDetailHeading>
      <div id='child' />
    </EntityAdditionalDetailHeading>
  )

  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
