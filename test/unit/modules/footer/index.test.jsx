import React from 'react'
import { shallow } from 'enzyme'
import log from 'loglevel'

import * as timeLib from '_src/lib/time'
import Footer from '_src/modules/footer'

timeLib.getYearNow = jest.fn().mockReturnValue('2015')

it('should render correctly', () => {
  const wrapper = shallow(<Footer />)
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has an error', () => {
  log.error = jest.fn()
  const wrapper = shallow(<Footer />)

  wrapper.instance().componentDidCatch({}, {})

  expect(wrapper.state().hasError).toEqual(true)
  wrapper.update() // TODO remove when enzyme bug fixed
  expect(wrapper).toMatchSnapshot()
})
