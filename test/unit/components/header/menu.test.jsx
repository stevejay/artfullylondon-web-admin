import React from 'react'
import { shallow } from 'enzyme'

import HeaderMenu from '_src/components/header/menu'

it('should render correctly', () => {
  const wrapper = shallow(
    <HeaderMenu
      label='The Label'
      items={[{ label: 'Label A', path: '/path-a' }]}
      history={{}}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
