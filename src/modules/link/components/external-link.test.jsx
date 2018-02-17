import React from 'react'
import Twitter from 'react-icons/lib/fa/twitter'

import EntityExternalLink from './external-link'

it('should render correctly', () => {
  const wrapper = shallow(<EntityExternalLink url='/some/url' icon={Twitter} />)
  expect(wrapper).toMatchSnapshot()
})
