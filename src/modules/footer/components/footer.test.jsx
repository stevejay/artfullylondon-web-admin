import React from 'react'
import { shallow } from 'enzyme'
import log from 'loglevel'
import _ from 'lodash'

import * as dateLib from '_src/lib/date'
import { Footer } from '_src/modules/footer/components/footer'

dateLib.getYearNow = jest.fn().mockReturnValue('2015')

it('should render correctly when has no error', () => {
  const wrapper = shallow(<Footer hasError={false} setHasError={_.noop} />)
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has an error', () => {
  const wrapper = shallow(<Footer hasError setHasError={_.noop} />)

  expect(wrapper).toMatchSnapshot()
})

it('should update state when an error is caught', () => {
  log.error = jest.fn()
  const setHasError = jest.fn()

  const wrapper = shallow(<Footer hasError={false} setHasError={setHasError} />)

  wrapper.instance().componentDidCatch({}, {})

  expect(setHasError).toHaveBeenCalled()
  expect(log.error).toHaveBeenCalled()
})
