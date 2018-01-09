import React from 'react'
import { shallow, mount } from 'enzyme'
import _ from 'lodash'

import * as browser from '_src/lib/browser'
import BrowserResizeListener from '_src/components/browser-resize-listener'

beforeEach(() => {
  browser.addWindowEventListener = jest.fn()
  browser.removeWindowEventListener = jest.fn()
  browser.getWindowInnerWidth = jest.fn()
})

it('should render correctly', () => {
  const wrapper = shallow(<BrowserResizeListener onWindowResize={_.noop} />)
  expect(wrapper).toMatchSnapshot()
})

it('should add the window resize event listener on mount', () => {
  mount(<BrowserResizeListener onWindowResize={_.noop} />)

  expect(browser.addWindowEventListener.mock.calls.length).toEqual(1)
  expect(browser.removeWindowEventListener.mock.calls.length).toEqual(0)
})

it('should remove the window resize event listener on unmount', () => {
  const wrapper = mount(<BrowserResizeListener onWindowResize={_.noop} />)

  wrapper.unmount()

  expect(browser.addWindowEventListener.mock.calls.length).toEqual(1)
  expect(browser.removeWindowEventListener.mock.calls.length).toEqual(1)
})

it('should handle a window resize event', () => {
  const onWindowResizeHandler = jest.fn()

  browser.getWindowInnerWidth.mockReturnValue(123)

  const wrapper = shallow(
    <BrowserResizeListener onWindowResize={onWindowResizeHandler} />
  )

  wrapper.instance().handleWindowResize()

  expect(onWindowResizeHandler.mock.calls.length).toEqual(1)
  expect(onWindowResizeHandler.mock.calls[0]).toEqual([123])
})
