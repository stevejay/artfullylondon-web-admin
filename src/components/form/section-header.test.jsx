import React from 'react'

import FormSectionHeader from '_src/components/form/section-header'

it('should render correctly', () => {
  const wrapper = shallow(
    <FormSectionHeader><div id='child' /></FormSectionHeader>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should not update', () => {
  const wrapper = shallow(
    <FormSectionHeader><div id='child' /></FormSectionHeader>
  )

  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
