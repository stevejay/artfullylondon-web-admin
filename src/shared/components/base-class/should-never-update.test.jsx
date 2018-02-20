import React from 'react'

import ShouldNeverUpdateComponent from './should-never-update'

class TestClass extends ShouldNeverUpdateComponent {
  render () {
    return <div id='content'>Foo</div>
  }
}

it('should not affect the rendering of the test component', () => {
  const wrapper = shallow(<TestClass />)
  expect(wrapper).toMatchSnapshot()
})

it('should not update', () => {
  const wrapper = shallow(<TestClass />)
  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
