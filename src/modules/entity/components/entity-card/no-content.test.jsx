import React from 'react'

import NoContent from './no-content'

it('should render correctly', () => {
  const wrapper = shallow(<NoContent />)
  expect(wrapper).toMatchSnapshot()
})

it('should not update', () => {
  const wrapper = shallow(<NoContent />)
  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
