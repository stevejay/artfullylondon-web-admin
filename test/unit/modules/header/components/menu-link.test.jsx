import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import HeaderMenuLink from '_src/modules/header/components/menu-link'

it('should render a selected menu link correctly', () => {
  const wrapper = shallow(
    <HeaderMenuLink
      label='The Label'
      index={3}
      to='/to/path'
      selected
      onMouseDown={_.noop}
      onMouseEnter={_.noop}
      onClick={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render an unselected menu link correctly', () => {
  const wrapper = shallow(
    <HeaderMenuLink
      label='The Label'
      index={3}
      to='/to/path'
      selected={false}
      onMouseDown={_.noop}
      onMouseEnter={_.noop}
      onClick={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle a mouse enter event', () => {
  const handleMouseEnter = jest.fn()

  const wrapper = shallow(
    <HeaderMenuLink
      label='The Label'
      index={3}
      to='/to/path'
      selected
      onMouseDown={_.noop}
      onMouseEnter={handleMouseEnter}
      onClick={_.noop}
    />
  )

  wrapper.find('Link').prop('onMouseEnter')()

  expect(handleMouseEnter.mock.calls.length).toEqual(1)
  expect(handleMouseEnter.mock.calls[0]).toEqual([3])
})
