import React from 'react'
import { shallow } from 'enzyme'

import FormSectionHeader from '_src/components/form/section-header'

it('should render correctly', () => {
  const wrapper = shallow(
    <FormSectionHeader><div id='child' /></FormSectionHeader>
  )

  expect(wrapper).toMatchSnapshot()
})
