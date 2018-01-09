import React from 'react'
import { shallow } from 'enzyme'

import FormBorder from '_admin/components/form/border'

it('should render correctly', () => {
  const wrapper = shallow(
    <FormBorder title='The Title'>
      <div id='child' />
    </FormBorder>
  )

  expect(wrapper).toMatchSnapshot()
})
