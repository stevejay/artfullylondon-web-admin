import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import MenuLink from './menu-link'

it('should render correctly', () => {
  const wrapper = shallow(
    <MenuLink path='/some/path' label='The Label' onClick={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should never update', () => {
  const wrapper = shallow(
    <MenuLink path='/some/path' label='The Label' onClick={_.noop} />
  )

  const result = wrapper.instance().shouldComponentUpdate({})

  expect(result).toEqual(false)
})
