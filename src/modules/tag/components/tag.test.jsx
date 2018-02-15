import React from 'react'

import Tag from './tag'

it('should render correctly', () => {
  const wrapper = shallow(<Tag tag={{ label: 'The Label' }} />)
  expect(wrapper).toMatchSnapshot()
})
