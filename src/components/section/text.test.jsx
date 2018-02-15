import React from 'react'

import TextSection from '_src/components/section/text'

it('should render a default text section correctly', () => {
  const wrapper = shallow(
    <TextSection type='default'><div id='child' /></TextSection>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render a smallprint text section correctly', () => {
  const wrapper = shallow(
    <TextSection type='smallprint'><div id='child' /></TextSection>
  )

  expect(wrapper).toMatchSnapshot()
})
