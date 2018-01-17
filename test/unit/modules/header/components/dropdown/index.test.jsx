import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import Dropdown from '_src/modules/header/components/dropdown'
import * as browserConstants from '_src/constants/browser'

it('should render correctly', () => {
  const wrapper = shallow(
    <Dropdown
      label='The Label'
      items={[{ label: 'Label A', path: '/path-a' }]}
      history={{}}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should initially render the menu closed', () => {
  const wrapper = shallow(
    <Dropdown
      label='The Label'
      items={[{ label: 'Label A', path: '/path-a' }]}
      history={{}}
    />
  )

  expect(wrapper.state()).toEqual({ isOpen: false, selectedIndex: null })
})

it('should open the menu on focus', () => {
  const wrapper = shallow(
    <Dropdown
      label='The Label'
      items={[{ label: 'Label A', path: '/path-a' }]}
      history={{}}
    />
  )

  wrapper.find('DropdownButton').prop('onFocus')()

  expect(wrapper.state()).toEqual({ isOpen: true, selectedIndex: null })
})

it('should open the menu on button click', () => {
  const wrapper = shallow(
    <Dropdown
      label='The Label'
      items={[{ label: 'Label A', path: '/path-a' }]}
      history={{}}
    />
  )

  wrapper.find('DropdownButton').prop('onClick')()

  expect(wrapper.state()).toEqual({ isOpen: true, selectedIndex: null })
})

it('should close the menu on blur', () => {
  const wrapper = shallow(
    <Dropdown
      label='The Label'
      items={[{ label: 'Label A', path: '/path-a' }]}
      history={{}}
    />
  )

  wrapper.find('DropdownButton').prop('onFocus')()
  wrapper.find('DropdownButton').prop('onBlur')()

  expect(wrapper.state()).toEqual({ isOpen: false, selectedIndex: null })
})

it('should select the first menu item on an arrow down press', () => {
  const preventDefault = jest.fn()

  const wrapper = shallow(
    <Dropdown
      label='The Label'
      items={[{ label: 'Label A', path: '/path-a' }]}
      history={{}}
    />
  )

  wrapper.find('DropdownButton').prop('onFocus')()

  wrapper.find('DropdownButton').prop('onKeyDown')({
    keyCode: browserConstants.ARROW_DOWN_KEYCODE,
    preventDefault
  })

  expect(preventDefault.mock.calls.length).toEqual(1)
  expect(wrapper.state()).toEqual({ isOpen: true, selectedIndex: 0 })
})

it('should handle multiple up and down arrow presses', () => {
  const wrapper = shallow(
    <Dropdown
      label='The Label'
      items={[
        { label: 'Label A', path: '/path-a' },
        { label: 'Label B', path: '/path-b' }
      ]}
      history={{}}
    />
  )

  wrapper.find('DropdownButton').prop('onFocus')()

  wrapper.find('DropdownButton').prop('onKeyDown')({
    keyCode: browserConstants.ARROW_DOWN_KEYCODE,
    preventDefault: _.noop
  })

  wrapper.find('DropdownButton').prop('onKeyDown')({
    keyCode: browserConstants.ARROW_DOWN_KEYCODE,
    preventDefault: _.noop
  })

  wrapper.find('DropdownButton').prop('onKeyDown')({
    keyCode: browserConstants.ARROW_UP_KEYCODE,
    preventDefault: _.noop
  })

  expect(wrapper.state()).toEqual({ isOpen: true, selectedIndex: 0 })
})

it('should ignore an unknown key down key code', () => {
  const wrapper = shallow(
    <Dropdown
      label='The Label'
      items={[{ label: 'Label A', path: '/path-a' }]}
      history={{}}
    />
  )

  wrapper.find('DropdownButton').prop('onFocus')()

  wrapper.find('DropdownButton').prop('onKeyDown')({
    keyCode: 1234
  })

  expect(wrapper.state()).toEqual({ isOpen: true, selectedIndex: null })
})

it('should handle enter key press after selecting the first menu item', () => {
  const preventDefault = jest.fn()
  const history = { push: jest.fn() }

  const wrapper = shallow(
    <Dropdown
      label='The Label'
      items={[{ label: 'Label A', path: '/path-a' }]}
      history={history}
    />
  )

  wrapper.find('DropdownButton').prop('onFocus')()

  wrapper.find('DropdownButton').prop('onKeyDown')({
    keyCode: browserConstants.ARROW_DOWN_KEYCODE,
    preventDefault: _.noop
  })

  wrapper.find('DropdownButton').prop('onKeyPress')({
    charCode: browserConstants.ENTER_CHARCODE,
    preventDefault
  })

  expect(preventDefault.mock.calls.length).toEqual(1)
  expect(wrapper.state()).toEqual({ isOpen: false, selectedIndex: null })
  expect(history.push.mock.calls.length).toEqual(1)
  expect(history.push.mock.calls[0]).toEqual(['/path-a'])
})

it('should ignore a non-enter key press after selecting the first menu item', () => {
  const preventDefault = jest.fn()
  const history = { push: jest.fn() }

  const wrapper = shallow(
    <Dropdown
      label='The Label'
      items={[{ label: 'Label A', path: '/path-a' }]}
      history={history}
    />
  )

  wrapper.find('DropdownButton').prop('onFocus')()

  wrapper.find('DropdownButton').prop('onKeyDown')({
    keyCode: browserConstants.ARROW_DOWN_KEYCODE,
    preventDefault: _.noop
  })

  wrapper.find('DropdownButton').prop('onKeyPress')({
    charCode: 1234,
    preventDefault
  })

  expect(preventDefault.mock.calls.length).toEqual(0)
  expect(wrapper.state()).toEqual({ isOpen: true, selectedIndex: 0 })
  expect(history.push.mock.calls.length).toEqual(0)
})

it('should ignore an enter key press when no menu item is selected', () => {
  const preventDefault = jest.fn()
  const history = { push: jest.fn() }

  const wrapper = shallow(
    <Dropdown
      label='The Label'
      items={[{ label: 'Label A', path: '/path-a' }]}
      history={history}
    />
  )

  wrapper.find('DropdownButton').prop('onFocus')()

  wrapper.find('DropdownButton').prop('onKeyPress')({
    charCode: browserConstants.ENTER_CHARCODE,
    preventDefault
  })

  expect(preventDefault.mock.calls.length).toEqual(0)
  expect(wrapper.state()).toEqual({ isOpen: true, selectedIndex: null })
  expect(history.push.mock.calls.length).toEqual(0)
})

it('should select a menu item on mouse enter', () => {
  const wrapper = shallow(
    <Dropdown
      label='The Label'
      items={[{ label: 'Label A', path: '/path-a' }]}
      history={{}}
    />
  )

  wrapper.find('DropdownButton').prop('onFocus')()

  wrapper.find('Menu').prop('onMouseEnter')(0)

  expect(wrapper.state()).toEqual({ isOpen: true, selectedIndex: 0 })
})

it('should close the menu on menu item click', () => {
  const wrapper = shallow(
    <Dropdown
      label='The Label'
      items={[{ label: 'Label A', path: '/path-a' }]}
      history={{}}
    />
  )

  wrapper.find('DropdownButton').prop('onFocus')()

  wrapper.find('Menu').prop('onClick')()

  expect(wrapper.state()).toEqual({ isOpen: false, selectedIndex: null })
})
