import React from 'react'
import { shallow } from 'enzyme'

import NotFoundPage from '_src/modules/error/pages/not-found'

it('should render correctly', () => {
  const wrapper = shallow(<NotFoundPage />)
  expect(wrapper).toMatchSnapshot()
})
