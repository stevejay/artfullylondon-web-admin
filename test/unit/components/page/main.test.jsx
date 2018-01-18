import React from 'react'
import { shallow } from 'enzyme'
import log from 'loglevel'

import PageMain from '_src/components/page/main'

it('should render correctly', () => {
  const wrapper = shallow(<PageMain><div id='child' /></PageMain>)
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has no children', () => {
  const wrapper = shallow(<PageMain />)
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has an error', () => {
  log.error = jest.fn()
  const wrapper = shallow(<PageMain><div id='child' /></PageMain>)

  wrapper.instance().componentDidCatch({}, {})

  expect(wrapper.state().hasError).toEqual(true)
  wrapper.update() // TODO remove when enzyme bug fixed
  expect(wrapper).toMatchSnapshot()
})
