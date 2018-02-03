import React from 'react'
import { shallow } from 'enzyme'

import EntityAddress from '_src/components/entity/address'

it('should render correctly', () => {
  const wrapper = shallow(<EntityAddress fullAddress='26 Foo Street, Bar' />)
  expect(wrapper).toMatchSnapshot()
})
