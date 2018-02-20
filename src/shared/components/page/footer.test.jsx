import React from 'react'

import PageFooter from '_src/shared/components/page/footer'

it('should render correctly', () => {
  const wrapper = shallow(<PageFooter><div id='child' /></PageFooter>)
  expect(wrapper).toMatchSnapshot()
})
