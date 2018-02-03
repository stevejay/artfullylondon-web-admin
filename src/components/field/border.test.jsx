import React from 'react'
import { shallow } from 'enzyme'

import FieldBorder from '_src/components/field/border'

it('should render correctly', () => {
  const wrapper = shallow(<FieldBorder><div id='child' /></FieldBorder>)
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly with a style', () => {
  const wrapper = shallow(
    <FieldBorder style={{ marginLeft: 5 }}><div id='child' /></FieldBorder>
  )

  expect(wrapper).toMatchSnapshot()
})
