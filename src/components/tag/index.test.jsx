import React from 'react'
import { shallow } from 'enzyme'

import Tag from '_src/components/tag'

it('should render correctly', () => {
  const wrapper = shallow(<Tag tag={{ label: 'The Label' }} />)
  expect(wrapper).toMatchSnapshot()
})
