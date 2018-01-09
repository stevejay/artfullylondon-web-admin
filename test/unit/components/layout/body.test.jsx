import React from 'react'
import { shallow } from 'enzyme'

import Body from '_src/components/layout/body'

it('should render correctly', () => {
  const wrapper = shallow(
    <Body>
      <div id='child' />
    </Body>
  )

  expect(wrapper).toMatchSnapshot()
})
