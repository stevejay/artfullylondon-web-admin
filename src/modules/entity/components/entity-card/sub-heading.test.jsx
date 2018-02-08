import React from 'react'
import { shallow } from 'enzyme'

import EntityCardSubHeading from './sub-heading'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityCardSubHeading>
      <div id='child' />
    </EntityCardSubHeading>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should not update', () => {
  const wrapper = shallow(
    <EntityCardSubHeading>
      <div id='child' />
    </EntityCardSubHeading>
  )

  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
