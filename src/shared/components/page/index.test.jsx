import React from 'react'

import Page from '_src/shared/components/page'

it('should render correctly', () => {
  const wrapper = shallow(<Page><div id='child' /></Page>)
  expect(wrapper).toMatchSnapshot()
})
