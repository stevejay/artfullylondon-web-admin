import React from 'react'
import { shallow } from 'enzyme'
import * as timeLib from '_src/lib/time'

import CopyrightFooter from '_src/components/copyright-footer'

it('should render correctly', () => {
  timeLib.getYearNow = jest.fn().mockReturnValue(2016)
  const wrapper = shallow(<CopyrightFooter />)
  expect(wrapper).toMatchSnapshot()
})

it('should not update', () => {
  const wrapper = shallow(<CopyrightFooter />)
  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
