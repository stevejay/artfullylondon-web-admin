import React from 'react'
import { shallow } from 'enzyme'

import EntityCardHeading from '_src/components/entity-card/heading'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityCardHeading id='some-id'>
      <div id='child' />
    </EntityCardHeading>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should not update', () => {
  const wrapper = shallow(
    <EntityCardHeading id='some-id'>
      <div id='child' />
    </EntityCardHeading>
  )

  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
