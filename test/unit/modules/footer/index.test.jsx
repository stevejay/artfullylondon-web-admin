import React from 'react'
import { shallow } from 'enzyme'

import * as timeLib from '_src/lib/time'
import Footer from '_src/modules/footer'

it('should render correctly', () => {
  timeLib.getYearNow = jest.fn().mockReturnValue('2015')
  const wrapper = shallow(<Footer />)
  expect(wrapper).toMatchSnapshot()
})
