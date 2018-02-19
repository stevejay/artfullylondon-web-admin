import React from 'react'

import NotFoundPage from './not-found-page'

it('should render correctly', () => {
  const wrapper = shallow(<NotFoundPage />)
  expect(wrapper).toMatchSnapshot()
})
