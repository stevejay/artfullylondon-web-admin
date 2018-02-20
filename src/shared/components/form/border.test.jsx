import React from 'react'

import FormBorder from '_src/shared/components/form/border'

it('should render correctly', () => {
  const wrapper = shallow(
    <FormBorder title='The Title'>
      <div id='child' />
    </FormBorder>
  )

  expect(wrapper).toMatchSnapshot()
})
