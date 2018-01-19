import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import DropdownMenuLink from '_src/modules/header/components/dropdown/menu-link'

function createComponent (props) {
  return (
    <DropdownMenuLink
      label='The Label'
      index={3}
      to='/to/path'
      selected
      onMouseDown={_.noop}
      onMouseEnter={_.noop}
      onClick={_.noop}
      {...props}
    />
  )
}

it('should render a selected menu link correctly', () => {
  const wrapper = shallow(createComponent())
  expect(wrapper).toMatchSnapshot()
})

it('should render an unselected menu link correctly', () => {
  const wrapper = shallow(createComponent({ selected: false }))
  expect(wrapper).toMatchSnapshot()
})

it('should handle a mouse enter event', () => {
  const handleMouseEnter = jest.fn()
  const wrapper = shallow(createComponent({ onMouseEnter: handleMouseEnter }))
  wrapper.find('Link').prop('onMouseEnter')()

  expect(handleMouseEnter).toHaveBeenCalled()
  expect(handleMouseEnter.mock.calls[0]).toEqual([3])
})

it('should handle should component update when should not update', () => {
  const wrapper = shallow(createComponent())
  const result = wrapper.instance().shouldComponentUpdate({ selected: true })
  expect(result).toEqual(false)
})

it('should handle should component update when should update', () => {
  const wrapper = shallow(createComponent())
  const result = wrapper.instance().shouldComponentUpdate({ selected: false })
  expect(result).toEqual(true)
})
