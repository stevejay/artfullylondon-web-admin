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
