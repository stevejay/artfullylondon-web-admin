import React from 'react'
import { shallow } from 'enzyme'

import FormRow from '_admin/components/form/row'

it('should render correctly', () => {
  const wrapper = shallow(
    <FormRow>
      <div id='child' />
    </FormRow>
  )

  expect(wrapper).toMatchSnapshot()
})
