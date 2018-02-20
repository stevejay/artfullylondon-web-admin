import React from 'react'

import PageHeader from '_src/shared/components/page/header'

it('should render correctly', () => {
  const wrapper = shallow(<PageHeader><div id='child' /></PageHeader>)
  expect(wrapper).toMatchSnapshot()
})
