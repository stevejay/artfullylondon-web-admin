import React from 'react'
import { shallow } from 'enzyme'

import FormText from '_admin/components/form/text'

it('should render correctly', () => {
  const wrapper = shallow(
    <FormText>
      <div id='child' />
    </FormText>
  )

  expect(wrapper).toMatchSnapshot()
})
