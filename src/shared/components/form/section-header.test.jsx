import React from 'react'

import FormSectionHeader from '_src/shared/components/form/section-header'

it('should render correctly', () => {
  const wrapper = shallow(
    <FormSectionHeader><div id='child' /></FormSectionHeader>
  )

  expect(wrapper).toMatchSnapshot()
})
