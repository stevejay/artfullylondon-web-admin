import React from 'react'
import { shallow } from 'enzyme'
import * as timeLib from '_admin/lib/time'

import CopyrightFooter from '_admin/components/copyright-footer'

it('should render correctly', () => {
  timeLib.getYearNow = jest.fn().mockReturnValue(2016)
  const wrapper = shallow(<CopyrightFooter />)
  expect(wrapper).toMatchSnapshot()
})
