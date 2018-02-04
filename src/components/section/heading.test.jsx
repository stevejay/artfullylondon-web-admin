import React from 'react'
import { shallow } from 'enzyme'
import Checkmark from 'react-icons/lib/fa/check'

import SectionHeading from '_src/components/section/heading'

it('should render correctly when has a logo', () => {
  const wrapper = shallow(
    <SectionHeading logo={Checkmark}><div id='child' /></SectionHeading>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has no logo', () => {
  const wrapper = shallow(<SectionHeading><div id='child' /></SectionHeading>)
  expect(wrapper).toMatchSnapshot()
})
