import React from 'react'

import FormText from '_src/shared/components/form/text'

it('should render correctly', () => {
  const wrapper = shallow(
    <FormText>
      <div id='child' />
    </FormText>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should not update', () => {
  const wrapper = shallow(
    <FormText>
      <div id='child' />
    </FormText>
  )

  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
