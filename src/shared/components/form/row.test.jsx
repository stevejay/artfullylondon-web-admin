import React from 'react'

import FormRow from '_src/shared/components/form/row'

it('should render correctly', () => {
  const wrapper = shallow(
    <FormRow>
      <div id='child' />
    </FormRow>
  )

  expect(wrapper).toMatchSnapshot()
})
