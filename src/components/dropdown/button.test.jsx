import React from 'react'
import _ from 'lodash'

import DropdownButton from '_src/components/dropdown/button'

it('should render correctly when the dropdown is closed', () => {
  const wrapper = shallow(
    <DropdownButton
      label='The Label'
      dropdownIsOpen={false}
      onClick={_.noop}
      onKeyDown={_.noop}
      onKeyPress={_.noop}
      onFocus={_.noop}
      onBlur={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when the dropdown is open', () => {
  const wrapper = shallow(
    <DropdownButton
      label='The Label'
      dropdownIsOpen
      onClick={_.noop}
      onKeyDown={_.noop}
      onKeyPress={_.noop}
      onFocus={_.noop}
      onBlur={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when the dropdown is compact', () => {
  const wrapper = shallow(
    <DropdownButton
      label='The Label'
      compact
      dropdownIsOpen={false}
      onClick={_.noop}
      onKeyDown={_.noop}
      onKeyPress={_.noop}
      onFocus={_.noop}
      onBlur={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

describe('shouldComponentUpdate', () => {
  it('should not update when the props have not changed', () => {
    const wrapper = shallow(
      <DropdownButton
        label='The Label'
        compact
        dropdownIsOpen={false}
        onClick={_.noop}
        onKeyDown={_.noop}
        onKeyPress={_.noop}
        onFocus={_.noop}
        onBlur={_.noop}
      />
    )

    const result = wrapper.instance().shouldComponentUpdate({
      label: 'The Label',
      dropdownIsOpen: false
    })

    expect(result).toEqual(false)
  })

  it('should update when the props have changed', () => {
    const wrapper = shallow(
      <DropdownButton
        label='The Label'
        compact
        dropdownIsOpen={false}
        onClick={_.noop}
        onKeyDown={_.noop}
        onKeyPress={_.noop}
        onFocus={_.noop}
        onBlur={_.noop}
      />
    )

    const result = wrapper.instance().shouldComponentUpdate({
      label: 'The Label',
      dropdownIsOpen: true
    })

    expect(result).toEqual(true)
  })
})
