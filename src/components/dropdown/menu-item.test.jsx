import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import DropdownMenuItem from '_src/components/dropdown/menu-item'

it('should render correctly when is selected and compact', () => {
  const wrapper = shallow(
    <DropdownMenuItem
      item={{ label: 'a' }}
      index={1}
      selected
      compact
      onMouseEnter={_.noop}
      onClick={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when is not selected and not compact', () => {
  const wrapper = shallow(
    <DropdownMenuItem
      item={{ label: 'a' }}
      index={1}
      selected={false}
      compact={false}
      onMouseEnter={_.noop}
      onClick={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle the mouse entering the button', () => {
  const handleMouseEnter = jest.fn()

  const wrapper = shallow(
    <DropdownMenuItem
      item={{ label: 'a' }}
      index={1}
      selected
      compact
      onMouseEnter={handleMouseEnter}
      onClick={_.noop}
    />
  )

  wrapper.find('button').simulate('mouseEnter')

  expect(handleMouseEnter).toHaveBeenCalledWith(1)
})

it('should handle a click on the button', () => {
  const handleClick = jest.fn()

  const wrapper = shallow(
    <DropdownMenuItem
      item={{ label: 'a' }}
      index={1}
      selected
      compact
      onMouseEnter={_.noop}
      onClick={handleClick}
    />
  )

  wrapper.find('button').simulate('click')

  expect(handleClick).toHaveBeenCalledWith(1)
})

describe('shouldComponentUpdate', () => {
  it('should not update when props have not changed', () => {
    const wrapper = shallow(
      <DropdownMenuItem
        item={{ label: 'a' }}
        index={1}
        selected
        compact
        onMouseEnter={_.noop}
        onClick={_.noop}
      />
    )

    const result = wrapper.instance().shouldComponentUpdate({ selected: true })
    expect(result).toEqual(false)
  })

  it('should update when props have changed', () => {
    const wrapper = shallow(
      <DropdownMenuItem
        item={{ label: 'a' }}
        index={1}
        selected
        compact
        onMouseEnter={_.noop}
        onClick={_.noop}
      />
    )

    const result = wrapper.instance().shouldComponentUpdate({ selected: false })
    expect(result).toEqual(true)
  })
})
